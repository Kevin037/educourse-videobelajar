import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { retrieveData } from "../db";

const initialState = {
  selectedClass:null,
  tutorData: [],
  loading: false,
  error: null,
};

export const getTutors = createAsyncThunk(
  'class_tutors/fetch',
  async ({class_id,columnName}, thunkAPI) => {
    try {
      const data = await retrieveData('class_tutors', class_id, columnName);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetTutor: (state) => {
      state.tutorData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorData = action.payload;
      })
      .addCase(getTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetAll, resetError, resetTutor } = tutorSlice.actions;

export default tutorSlice.reducer;