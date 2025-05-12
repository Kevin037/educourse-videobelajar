import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  status: null
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      const res = await api.post('/auth/register', userData);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  'user/getById',
  async (thunkAPI) => {
    try {
      const res = await api.get('/auth/profile');
      if (res?.data?.data.photo != null) {
        localStorage.setItem("user_photo", res?.data?.data.photo); 
      }
      
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'order/update',
  async (userData, thunkAPI) => {
    try {
      const response = await api.patch(`/auth/update`, userData);

      return response; // res berisi data document baru dari Firestore
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserPhotoThunk = createAsyncThunk(
  'user/updatePhoto',
  async (userData, thunkAPI) => {
    try {
      const response = await api.post(`/auth/upload`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      return response; // res berisi data document baru dari Firestore
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
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
      state.userData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload; // data user baru dari Firestore
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload; // data user baru dari Firestore
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;// data user baru dari Firestore
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateUserPhotoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPhotoThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true;// data user baru dari Firestore
      })
      .addCase(updateUserPhotoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;