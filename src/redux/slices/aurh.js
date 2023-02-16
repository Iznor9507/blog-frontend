import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../axios";

const initialState = {
  data: null,
  status: false,
  error: "error",
};

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await instance.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await instance.post("/auth/register", params);
    return data;
  });

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await instance.get("/auth/me");
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = true;
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = false;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.error = "error";
        state.status = false;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = true;
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = false;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.error = "error";
        state.status = false;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = true;
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = false;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.error = "error";
        state.status = false;
      })
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
