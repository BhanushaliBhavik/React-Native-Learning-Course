import { createSlice } from "@reduxjs/toolkit";

const todo = createSlice({
    name: "todo",
    initialState:{todos: []},
    reducers:{
        setToDo: (state, action) => {
            
            state.todos = action.payload;
        },
        addToDo: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },
        updateToDo: (state, action) => {
            for(let i = 0; i < state.todos.length; i++){
                if(state.todos[i].id === action.payload.id){
                    state.todos[i] = {
                        ...state.todos,
                        title: action.payload.value.title,
                        description: action.payload.value.description
                    }
                }
                // console.log(action.payload.value.title);
                
            }
        },
        deleteToDo: (state,action) => {
            state.todos = state.todos.filter((value) => value.id !== action.payload )
        },
        toggleToDoComplete: (state, action) => {
            // console.log(action.payload + " A");
            state.todos = state.todos.map((value) => {
                // console.log(value.id);
                
                if(value.id === action.payload){
                    return {
                        ...value,
                        complete: !value.complete
                    }
                }
                return value
            })
        }
    }
})

export const {setToDo, addToDo, updateToDo, deleteToDo, toggleToDoComplete} = todo.actions;

export default todo.reducer;