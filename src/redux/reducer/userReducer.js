import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const ToolsCookies = new Cookies();

const initialState = {
  authStatus: !!ToolsCookies.get("status_login"),
  userData: ToolsCookies.get("user_data") || null,
  token: null, // duration 1 day
  refreshToken: "", // duration 1 month
  user: [],
};

export const getUser = () => async (dispatch) => {
  const config = {
    url: "https://64532ddfe9ac46cedf1ede09.mockapi.io/Users",
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    dispatch(setUserData(response.data));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getUserById = (id) => async (dispatch) => {
  const config = {
    url: `https://64532ddfe9ac46cedf1ede09.mockapi.io/Users/${id}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    dispatch(setUserData([response.data]));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateUser = (userid, userData) => async (dispatch) => {
  const config = {
    url: `https://64532ddfe9ac46cedf1ede09.mockapi.io/Users/${userid}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: userData,
  };

  try {
    await axios(config);
    dispatch(editUser({ id: userid, userData }));
  } catch (error) {
    console.error("Error:", error);
  }
};

// Mocking the verification of the old password
export const verifyOldPassword = (userId, oldPassword) => async (dispatch, getState) => {
  const state = getState();
  const user = state.users.user.find((user) => user.id === userId);
  if (user && user.password === oldPassword) {
    return true;
  } else {
    return false;
  }
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.authStatus = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      state.authStatus = false;
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
    },
    editUser: (state, action) => {
      const { id, userData } = action.payload;
      const index = state.user.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.user[index] = { ...state.user[index], ...userData };
      }
    },
    addUser: (state, action) => {
      state.user.push(action.payload);
    },
  },
});

export const { setAuthStatus, setUserData, setToken, setRefreshToken, logout, editUser, addUser } = userSlice.actions;

export default userSlice.reducer;
