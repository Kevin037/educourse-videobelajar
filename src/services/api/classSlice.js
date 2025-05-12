import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFacilities } from '../../data';
import api from '../api';

const initialState = {
  selectedClass:null,
  classLessons: [],
  classData: [],
  classFacilities: [],
  classCategoriesData: [],
  loading: false,
  error: null,
};

export const getClasses = createAsyncThunk(
  'class/fetch',
  async (params,thunkAPI) => {
    try {
      const response = await api.get('/classes',{params});
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getClassCategories = createAsyncThunk(
  'class_categories/fetch',
  async (thunkAPI) => {
    try {
      const response = await api.get('/class_categories');
      let data = response.data.data;
      data.push({ id: 0, name: 'Semua Kelas' });
      data.sort((a, b) => a.id - b.id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchClassById = createAsyncThunk(
  'class/getById',
  async (id, thunkAPI) => {
    try {
      const response = await api.get('/classes/' + id);
      const updatedFacilities = getFacilities().map((item) => ({
        ...item,
        value: response.data.data?.[item.key] ?? null
      }));
      return {
        classData: response.data.data,
        classFacilities: updatedFacilities
      };
    } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    resetAll: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = false;
    },
    resetclass: (state) => {
      state.classData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classData = action.payload;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getClassCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.classCategoriesData = action.payload;
      })
      .addCase(getClassCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedClass = action.payload.classData;
        state.classFacilities = action.payload.classFacilities;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAll, resetError, resetclass } = classSlice.actions;

export default classSlice.reducer;