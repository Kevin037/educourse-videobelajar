import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const user = await api.post('/auth/login', credentials);
      let token = user?.data?.token;
      if (user?.data?.user) {
        localStorage.setItem("user", user?.data?.user.id);
        if (user?.data?.user.photo != null) {
          localStorage.setItem("user_photo", user?.data?.user.photo); 
        }
        localStorage.setItem("token", user?.data?.token);
      }
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOutuserThunk = createAsyncThunk(
  'lessons/deleteLesson',
async (thunkAPI) => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_photo");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    status:false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;   
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOutuserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutuserThunk.fulfilled, (state) => {
        state.loading = false;
        state.status = true;  
      })
      .addCase(logOutuserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;