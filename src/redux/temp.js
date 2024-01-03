import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/userReducer'
import artikelReducer from './reducer/artikelReducer'


export const store = configureStore({
  reducer: {
    users: userReducer,
    artikel: artikelReducer
  },
})