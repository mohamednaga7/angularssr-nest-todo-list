import { HttpClient } from '@angular/common/http';
import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos = new BehaviorSubject<Todo[]>([]);
  callInProgress = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getTodos() {
    this.callInProgress.next(true);
    return this.http
      .get<Todo[]>('http://localhost:4200/api/todos')
      .toPromise()
      .then((todos: Todo[]) => {
        this.todos.next(todos);
        this.callInProgress.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.callInProgress.next(false);
      });
  }

  addTodo(title: string) {
    this.callInProgress.next(true);
    return this.http
      .post<Todo>('http://localhost:4200/api/todos', { title })
      .toPromise()
      .then((todo: Todo) => {
        this.todos.next([todo, ...this.todos.value]);
        this.callInProgress.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.callInProgress.next(false);
      });
  }

  updateTodo(todoId: string, status: boolean) {
    this.callInProgress.next(true);
    return this.http
      .patch<Todo>(`http://localhost:4200/api/todos/${todoId}`, {
        done: status,
      })
      .toPromise()
      .then((returnedTodo: Todo) => {
        const newTodos = this.todos.value.map((td) => {
          if (td.id === todoId) {
            td.done = returnedTodo.done;
          }
          return td;
        });
        this.todos.next(newTodos);
        this.callInProgress.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.callInProgress.next(false);
      });
  }

  deleteTodo(todoId: string) {
    this.callInProgress.next(true);
    return this.http
      .delete<Todo>(`http://localhost:4200/api/todos/${todoId}`)
      .toPromise()
      .then(() => {
        this.todos.next(
          this.todos.value.filter((todo: Todo) => todo.id != todoId)
        );
        this.callInProgress.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.callInProgress.next(false);
      });
  }
}
