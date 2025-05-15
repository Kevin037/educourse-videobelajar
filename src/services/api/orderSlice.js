import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  orderData: [],
  orderLessons: [],
  myClassData: [],
  currentOrder: null,
  loading: false,
  error: null,
  status: null,
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
      await api.post(`/orders/review`, reviewData);
      return true;
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
      return {
        order: res?.data?.data,
        orderLessons: res?.data.orderLessons
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
        state.currentOrder = action.payload.order;
        state.orderLessons = action.payload.orderLessons;
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