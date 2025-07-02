import { makeAutoObservable } from "mobx";

class Todo {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTodo(values) {
    this.todos = values;
  }

  addTodo(value) {
    this.todos = [...this.todos, value];
  }

  updateTodo(id, value) {
    console.log(id);
    
    for(let i = 0; i < this.todos.length; i++ ){
        // console.log(this.todos[i].id);
        if(this.todos[i].id === id){
            this.todos[i] = {...this.todos[i], title: value.title, description: value.description}
        }
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((value) => value.id !== id);
  }
    toggleTodoComplete(id){
    this.todos = this.todos.map((value) =>
      value.id === id
        ? { ...value, complete: !value.complete }
        : value
    );
  }
}

const todo = new Todo();
export default todo;
