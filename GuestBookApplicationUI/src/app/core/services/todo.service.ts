import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  private todoBasePath: String = 'http://localhost:8080/api/todo'; 

  getTodoList() {
    return this.httpClient.get(this.todoBasePath + "/getTodoList");
  }

  createTodo(todo: any) {
    return this.httpClient.post(this.todoBasePath + "/createTodo", todo);
  }

  updateTodo(todo: any) {
    return this.httpClient.put(this.todoBasePath + "/updateTodo", todo);
  }

  deleteTodoById(id: String) {
    return this.httpClient.delete(this.todoBasePath + "/deleteTodoById/" + id);
  }

  getUpcomingTodo() {
    return this.httpClient.get(this.todoBasePath + "/getUpcomingTodo");
  }
  
}
