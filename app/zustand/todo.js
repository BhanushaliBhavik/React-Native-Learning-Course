import { create } from "zustand";

const todo = create((set) => ({
    todos: [],
    setToDo: ((values) => set(() => ({todos: values}))),
    addToDo:((value) => set((state) => ({todos: [...state.todos, value]}))),
    updateToDo: ((id, value) => set((state) => ({
        todos: state.todos.map((data) => {
            if(data.id === id){
                return {
                    ...data,
                    title: value.title,
                    description: value.description
                };
            }
            console.log(id + " " + value);
            
            return data;
        })
    }))),
    deleteToDo: ((id) => set((state) => ({
        todos: state.todos.filter((data) => data.id !== id)
    }))),
    toggleToDoComplete: ((id) => set((state) => ({
        todos: state.todos.map((data) => {
            if(data.id === id){
                return {
                    ...data,
                    complete: !data.complete
                }
            }
            return data
        })
    })))

}))

export default todo;