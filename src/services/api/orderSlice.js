import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDataById, getDataById, parseFirestoreFields, retrieveData, retrieveDataMultipleCondition, store, update } from "../db";
import api from '../api';

const initialState = {
  orderData: [],
  orderLessons: [],
  myClassData: [],
  currentOrder: null,
  loading: false,
  error: null,
  status: null,
  resultData: null
};

export const createOrderThunk = createAsyncThunk(
  'order/create',
  async (orderData, thunkAPI) => {
    try {
      const res = await api.post(`/orders`, orderData);
      return res?.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createReviewThunk = createAsyncThunk(
  'order/review',
  async (reviewData, thunkAPI) => {
    try {
      const reviews = await retrieveData('reviews', reviewData.order_id,"order_id");
      if (reviews.length > 0) {
        for (let i = 0; i < reviews.length; i++) {
          await deleteDataById(reviews[i].id,'reviews');
        }
      }
      const res = await store(reviewData,'reviews');
      if (res) {
        const order = await update({user_rating:reviewData.rating,user_review:reviewData.review},'orders',reviewData.order_id); 
        return order;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateOrderThunk = createAsyncThunk(
  'order/update',
  async (orderData, thunkAPI) => {
    try {
      await api.patch(`/orders/change_payment/`, orderData);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const paidOrderThunk = createAsyncThunk(
  'order/paid',
  async (id, thunkAPI) => {
    try {
      await api.patch(`/orders/process_payment`, id);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  'order/fetch',
  async (params,thunkAPI) => {
    try {
      const response = await api.get('/orders',{params});
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMyClasses = createAsyncThunk(
  'order/myClasses',
  async (params,thunkAPI) => {
    try {
      const response = await api.get('/auth/classes',{params});
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getById',
  async (id, thunkAPI) => {
    try {
      const res = await api.get('/orders/' + id);
      return res?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTestResult = createAsyncThunk(
  'test/result',
  async (testId, thunkAPI) => {
    try {
      const test = await getDataById(testId, 'order_lessons');
      
      if(test){
        const testData = parseFirestoreFields(test.fields)
        
        let whereTests = [];
        if (testData.type === "pre-test") {
          whereTests = [
            {field: "order_id", operator: "==", value: testData.order_id},
            {field: "type", operator: "==", value: testData.type},
          ]
        }
        if (testData.type === "quiz") {
          whereTests = [
            {field: "order_id", operator: "==", value: testData.order_id},
            {field: "type", operator: "==", value: testData.type},
            {field: "group_name", operator: "==", value: testData.group_name},
          ]
        }
        
        const tests = await retrieveDataMultipleCondition('order_lessons', whereTests);
        let correct = 0;
        for (let i = 0; i < tests.length; i++) {
          if (tests[i].answer == tests.user_answer) {
            correct++;
          }
        }
        const score = (correct / tests.length) * 100
        
        return {
          resultData : {
            total_questions : tests.length,
            correct_answers : correct,
            score : score,
            wrong_answers : tests.length - correct,
            submitted_at: testData.submitted_at
          }
        }
      }
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetorder: (state) => {
      state.orderData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload; // data user baru dari Firestore
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        // state.orderLessons = action.payload.orderLessons;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload; // data user baru dari Firestore
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReviewThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(createReviewThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchTestResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestResult.fulfilled, (state, action) => {
        state.loading = false;
        state.resultData = action.payload.resultData;
      })
      .addCase(fetchTestResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(paidOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paidOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload; // data user baru dari Firestore
      })
      .addCase(paidOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getMyClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.myClassData = action.payload;
        // state.orderLessons = action.payload.orderLessons;
      })
      .addCase(getMyClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetorder } = orderSlice.actions;

export default orderSlice.reducer;