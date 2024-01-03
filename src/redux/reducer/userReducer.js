import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Cookies from 'universal-cookie'
const ToolsCookies = new Cookies()


export const getUser = () => async (dispatch) => {
    let config = {
      url: "https://64532ddfe9ac46cedf1ede09.mockapi.io/Users",
      method: "get",
      headers: {
          "Content-Type": "application/json",
    }
}
    try {
      let getDataUser = await axios(config);
        let result = getDataUser.data;
        dispatch(setUserData(result));
    } catch (error) {
      console.error('Error:', error);
    }
  };

export const getUserById=(id)=>async(dispatch)=>{
  let config = {
    method: "get",
    url: `https://64532ddfe9ac46cedf1ede09.mockapi.io/Users/${id}`,
    headers: {
        "Content-Type": "application/json",
  }
}
  
  try {
    let response = await axios(config);
        dispatch(setUserData([response.data]));
      } catch (error) {
        console.error('Errorbang:', error);
      }
}

export const updateUser = (userid, userData) => async (dispatch) => {
    try {
     let config = {
            url:`https://64532ddfe9ac46cedf1ede09.mockapi.io/Users/${userid}`,
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            data: userData,
     }
     await axios(config)

     dispatch(editUser({
        id: userid,
        userData: userData,
     }))
    } catch (error) {
      console.error('ErrorUpdate:', error);
    }
  }



let getStatusAuth = ToolsCookies.get('status_login')
let getDataAuth = ToolsCookies.get('user_data')

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        authStatus: getStatusAuth ? true : false,
        userData: getDataAuth ? getDataAuth : null,
        token: null, // duration 1 day
        refreshToken: '', // duration 1 month
        user: [],
    },
    reducers: {
        setAuthStatus: (state, action) => {
            state.authStatus += action.payload
        },

        setUserData: (state, action) => {
            // state.userData = action.payload
            state.user = action.payload
        },

        setToken: (state, action) => {
            state.token = action.payload
        },

        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
        logout: (state, action) =>{
            state.authStatus = false
            state.userData = null
            state.token = null
            state.refreshToken = null
        },
        editUser: (state, action) => {
          const { id, newData } = action.payload;
      const index = state.user.findIndex(user => user.id === id);
      if (index !== -1) {
        state.user[index] = { ...state.user[index], ...newData };
      }
          },
          adduser: (state, action) => {
            state.user.push(action.payload);
          },
    }
})


export const { setAuthStatus,setUserData,setToken,setRefreshToken,logout,editUser,adduser } = userSlice.actions

export default userSlice.reducer