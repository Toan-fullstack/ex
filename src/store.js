import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './pages/Auth/auth.slice'

const reducer = combineReducers({
  auth: authReducer
})

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false })
  ]
})

export default store
