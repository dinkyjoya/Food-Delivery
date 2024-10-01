import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './Reducer'

export const store = configureStore({
    reducer:{
        User: userReducer
    }
})