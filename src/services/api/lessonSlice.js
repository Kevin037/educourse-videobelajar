import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDataById, parseFirestoreFields, retrieveData, retrieveDataMultipleCondition, update } from "../db";

const initialState = {
  beforeLesson: null,
  selectedLesson:null,
  afterLesson: null,
  test: null,
  tests: [],
  loading: false,
  error: null,
  status:false,
  submitStatus:false
};

export const fetchLessonById = createAsyncThunk(
  'lesson/getById',
  async (id, thunkAPI) => {
    try {
      const res = await getDataById(id, 'lessons');
      const lesson = parseFirestoreFields(res.fields)
      let beforeLesson = null;
      let afterLesson = null;
      const lessons = await retrieveData('lessons', lesson.class_id,"class_id");
      lessons.forEach((item) => {
        if (lesson.ordering > 0) {
          if (Number(item.ordering) === (lesson.ordering - 1)) {
            beforeLesson = item 
          }
        }
        if (lesson.ordering < (lessons.length-1)) {
          if (Number(item.ordering) === (Number(lesson.ordering) + 1)) {
            afterLesson = item 
          }
        }
      })
      return {
        lesson : lesson,
        beforeLesson: beforeLesson,
        afterLesson: afterLesson
      }
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOrderLessonById = createAsyncThunk(
  'orderLesson/getById',
  async (id, thunkAPI) => {
    try {
      const res = await getDataById(id, 'order_lessons');
      const lesson = parseFirestoreFields(res.fields)
      let beforeLesson = null;
      let afterLesson = null;
      
      // if (lesson.type === "video") {
        let whereTests = [
          {field: "order_id", operator: "==", value: lesson.order_id},
          {field: "type", operator: "==", value: "video"},
        ]
        const lessons = await retrieveDataMultipleCondition('order_lessons', whereTests);
        lessons.sort((a, b) => a.ordering - b.ordering);
        lessons.forEach((item,key) => {          
          if (lesson.ordering > 0) {
            if (Number(item.ordering) < Number(lesson.ordering)) {
              beforeLesson = item
            }
          }
          if (key < lessons.length) {
            if (Number(item.ordering) > Number(lesson.ordering)) {
              
              if (afterLesson == null) afterLesson = item
            }
          }
        })
      // }
      return {
        lesson : lesson,
        beforeLesson: beforeLesson,
        afterLesson: afterLesson
      }
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchExamByNo = createAsyncThunk(
  'test/getByNo',
  async (no, thunkAPI) => {
    try {
      const test = await getDataById(no, 'order_lessons');
      
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

        return {
          test : testData,
          tests: tests,
        }
      }
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAnswerThunk = createAsyncThunk(
  'order/update',
  async ({id,AnswerData}, thunkAPI) => {
    try {
      const res = await update(AnswerData,'order_lessons',id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const CompleteModuleThunk = createAsyncThunk(
  'order_lesson/complete',
  async (id, thunkAPI) => {
    try {
      const res = await update({complete:true},'order_lessons',id);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const submitTestThunk = createAsyncThunk(
  'test/submit',
  async (orderLessonId, thunkAPI) => {
    try {
      const orderLesson = await getDataById(orderLessonId,'order_lessons');
      let whereTests = [];
      if (orderLesson.type === "pre-test") {
        whereTests = [
          {field: "order_id", operator: "==", value: orderLesson.order_id},
          {field: "type", operator: "==", value: orderLesson.type},
        ]
      }
      if (orderLesson.type === "quiz") {
        whereTests = [
          {field: "order_id", operator: "==", value: orderLesson.order_id},
          {field: "type", operator: "==", value: orderLesson.type},
          {field: "group_name", operator: "==", value: orderLesson.group_name},
        ]
      }
      
      const tests = await retrieveDataMultipleCondition('order_lessons', whereTests);
      if (tests.length > 0) {
        let correct = 0;
        for (let i = 0; i < tests.length; i++) {
          if (tests[i].answer == tests[i].user_answer) {
            correct++;
          }
          await update({submitted_at:new Date().toISOString()},'order_lessons',tests[i].id);
        }
        const score = (correct / tests.length) * 100
        
        if (orderLesson.type === "pre-test") {
          await update({pretest_score:score},'orders',orderLesson.order_id); 
        }
        return true; 
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetclass: (state) => {
      state.selectedLesson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLesson = action.payload.lesson;
        state.beforeLesson = action.payload.beforeLesson;
        state.afterLesson = action.payload.afterLesson;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderLessonById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLesson = action.payload.lesson;
        state.beforeLesson = action.payload.beforeLesson;
        state.afterLesson = action.payload.afterLesson;
      })
      .addCase(fetchOrderLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExamByNo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExamByNo.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload.test;
        state.tests = action.payload.tests;
      })
      .addCase(fetchExamByNo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAnswerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnswerThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true; // data user baru dari Firestore
      })
      .addCase(updateAnswerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(submitTestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTestThunk.fulfilled, (state) => {
        state.loading = false;
        state.submitStatus = true;
      })
      .addCase(submitTestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(CompleteModuleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CompleteModuleThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true; // data user baru dari Firestore
      })
      .addCase(CompleteModuleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
  },
});

export const { resetAll, resetError, resetlesson } = lessonSlice.actions;

export default lessonSlice.reducer;