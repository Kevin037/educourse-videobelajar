import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDataById, getDataById, parseFirestoreFields, retrieveData, retrieveDataMultipleCondition, store, update } from "../db";

const initialState = {
  orderData: [],
  orderLessons: [],
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
      const res = await store(orderData,'orders');
      if (res?.fields) {
        const order = parseFirestoreFields(res.fields);
        return order;
      }
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
  async ({id,orderData}, thunkAPI) => {
    try {
      const res = await update(orderData,'orders',id);
      return res; // res berisi data document baru dari Firestore
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const paidOrderThunk = createAsyncThunk(
  'order/paid',
  async (id, thunkAPI) => {
    try {
      const paidData = { status:"success", paid_at: new Date().toISOString() }
      const orderRaw = await getDataById(id,'orders');
      const order = parseFirestoreFields(orderRaw.fields);
      const pretestsRaw = await retrieveData('pretests');
      const pretests = pretestsRaw.map(({ id, ...item }) => ({
        ...item,
        type: 'pre-test'
      }));
      pretests.sort((a, b) => a.no - b.no);
      const lessonsRaw = await retrieveData('lessons');
      const lessons = lessonsRaw.map(item => ({
        ...item,
        type: 'video'
      }));
      lessons.sort((a, b) => a.ordering - b.ordering);
      const quizesRaw = await retrieveData('materials',"quiz","type");
      const quizes = quizesRaw.map(item => ({
        ...item,
        type: 'quiz'
      }));
      quizes.sort((a, b) => a.no - b.no);
      const summariesRaw = await retrieveData('materials',"rangkuman","type");
      const summaries = summariesRaw.map(item => ({
        ...item,
        type: 'rangkuman'
      }));

      const groupNames = [
        ...new Set([...lessons.map(l => l.group_name), ...quizes.map(m => m.group_name), ...summaries.map(s => s.group_name)])
      ];

      const groupedData = groupNames.map(group => {
        const lessonItems = lessons
          .filter(item => item.group_name === group)
          .map(({ ordering, id, ...rest }) => rest); // remove ordering
      
        const quizItems = quizes
          .filter(item => item.group_name === group)
          .map(({ ordering, id, ...rest }) => rest); // remove ordering
      
        const summaryItems = summaries
          .filter(item => item.group_name === group)
          .map(({ ordering, id, ...rest }) => rest); // remove ordering
      
        return {
          group_name: group,
          items: [...lessonItems, ...summaryItems, ...quizItems]
        };
      });
      
      
      let template_no = order.order_id.slice(0, 4);
      let no = "";
      let new_ordering = 0;
      
      for (let i = 0; i < pretests.length; i++) {
        no = template_no+new_ordering;
        await store({
          order_id: order.order_id,
          class_id: order.class_id,
          ordering: new_ordering,
          ...pretests[i],
        },'order_lessons',no);
        new_ordering++;
      }
      for (let x = 0; x < groupedData.length; x++) {
        for (let i = 0; i < groupedData[x].items.length; i++) {
          no = template_no+new_ordering;
          await store({
            order_id: order.order_id,
            class_id: order.class_id,
            ordering: new_ordering,
            ...groupedData[x].items[i],
          },'order_lessons',no);
          new_ordering++;
        }
      }
      const res = await update(paidData,'orders',id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  'order/fetch',
  async ({order_id,columnName,user_id}, thunkAPI) => {
    try {
      const data = await retrieveData('orders', order_id, columnName,user_id);
      let pretestId = null;
      let totalModule = 0;
      let totalCompletedModule = 0;
      let groupedData = [];
      if (data[0]?.order_id) {
        if (order_id != null && columnName != null) {
          const lessons = await retrieveData('order_lessons', data[0].order_id, "order_id");
          lessons.sort((a, b) => a.ordering - b.ordering);
          const groupNames = [...new Set(lessons.map(item => item.group_name))];

          groupedData = groupNames.map(group => {
            const itemsInGroup = lessons.filter(item => item.group_name === group);

            const pretest = itemsInGroup.find(item => item.type === 'pre-test');
            const quiz = itemsInGroup.find(item => item.type === 'quiz');
            const summary = itemsInGroup.find(item => item.type === 'rangkuman');
            const others = itemsInGroup.filter(item => 
              item.type !== 'pre-test' && item.type !== 'quiz' && item.type !== 'rangkuman'
            );

            const finalItems = [
              ...(pretest ? [pretest] : []),
              ...others,
              ...(summary ? [summary] : []),
              ...(quiz ? [quiz] : []),
            ];

            return {
              title: group,
              lessons: finalItems
            };
          });
          lessons.forEach(lesson => {
            if (lesson.type === 'video') totalModule++;
            if (lesson.type === 'video' && lesson.complete) totalCompletedModule++;
          });
        }
        pretestId = groupedData[0]?.lessons[0]?.id;
        groupedData.shift();
        
        data[0].pretestId = pretestId
        data[0].totalModule = totalModule
        data[0].totalCompletedModule = totalCompletedModule
        data[0].progress = (totalCompletedModule / totalModule) * 100  
        return {
          orderData: data,
          orderLessons: groupedData
        } 
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getById',
  async (id, thunkAPI) => {
    try {
      const res = await getDataById(id,'orders');
      return res;
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
        state.orderData = action.payload.orderData;
        state.orderLessons = action.payload.orderLessons;
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
        state.currentOrder = parseFirestoreFields(action.payload.fields);
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReviewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReviewThunk.fulfilled, (state, action) => {
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
  },
});

export const { resetorder } = orderSlice.actions;

export default orderSlice.reducer;