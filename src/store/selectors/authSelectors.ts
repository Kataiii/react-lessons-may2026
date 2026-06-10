// При получении данных с бека 3 состояния:
// 1. Ожидание
// 2. Успешный ответ
// 3. Упала ошибка

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("/url", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const { user, token } = await response.json(); // user, token
      localStorage.setItem("token", token);
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Ошибка входа");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    body: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch("/url/regist", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const { user, token } = await response.json(); // user, token
      localStorage.setItem("token", token);
      return { user, token };
      // получает почту -> достает всех пользователей и смотрит есть ли такая почта
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Ошибка регистрации"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          const { user, token } = action.payload;
          state.isLoading = false;
          state.user = user;
          state.token = token;
          state.error = null;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          const { user, token } = action.payload;
          state.isLoading = false;
          state.user = user;
          state.token = token;
          state.error = null;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
