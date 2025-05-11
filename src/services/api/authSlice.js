import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logOutSession, store } from "../db";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const user = await loginUser(credentials);
      const token = btoa(JSON.stringify({ email: user.email, time: new Date() }));
      await store({
        user_id: user.id,
        access_token: token,
        device: navigator.userAgent,
        created_at: new Date().toISOString(),
      },'sessions');
      localStorage.setItem("user", user.id);
      if (user.photo != null) {
        localStorage.setItem("user_photo", user.photo); 
      }
      localStorage.setItem("token", token);
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
      const logout = await logOutSession();
      return logout;
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