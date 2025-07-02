import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo";
const todoStore = configureStore({
    reducer:{
        todo: todoReducer
    }
})

export default todoStore