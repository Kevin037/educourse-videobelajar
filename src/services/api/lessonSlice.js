import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  beforeLesson: null,
  selectedLesson:null,
  afterLesson: null,
  test: null,
  tests: [],
  loading: false,
  error: null,
  status:false,
  submitStatus:false,
  answerStatus:false,
  resultData: null
};


export const fetchOrderLessonById = createAsyncThunk(
  'orderLesson/getById',
  async (id, thunkAPI) => {
    try {
      const lesson = await api.get('/my_classes/'+id);
      return {
        lesson : lesson?.data.data,
        beforeLesson: lesson?.data.beforeLesson,
        afterLesson: lesson?.data.afterLesson
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
      const res = await api.get('/my_classes/test/'+no);
      return {
        test : res?.data?.test,
        tests: res?.data?.tests,
        resultData: res?.data?.resultData
      }
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAnswerThunk = createAsyncThunk(
  'order/update',
  async (AnswerData, thunkAPI) => {
    try {
      await api.patch('/my_classes/send_answer',AnswerData);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const CompleteModuleThunk = createAsyncThunk(
  'order_lesson/complete',
  async (id, thunkAPI) => {
    try {
      const res = await api.patch('/my_classes/process',id);
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
      const res = await api.patch('/my_classes/submit',orderLessonId);
      return res;
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
        state.resultData = action.payload.resultData;
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
        state.answerStatus = true; // data user baru dari Firestore
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