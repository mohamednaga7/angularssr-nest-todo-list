import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NetworkService } from './network-service.service';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos = new BehaviorSubject<Todo[]>([]);
  callInProgress = new Subject<boolean>();

  constructor(
    private networkService: NetworkService
  ) { }

  getTodos() {
    this.callInProgress.next(true);
    return this.networkService
      .get<Todo[]>(`todos`)
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
    return this.networkService
      .post<Todo>(`todos`, { title })
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
    return this.networkService
      .patch<Todo>(`todos/${todoId}`, {
        done: status,
      })
      .then((returnedTodo: Todo) => {
        const newTodos = this.todos.value.map((td) => {
          if (td._id === todoId) {
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
    return this.networkService
      .delete<Todo>(`todos/${todoId}`)
      .then(() => {
        this.todos.next(
          this.todos.value.filter((todo: Todo) => todo._id != todoId)
        );
        this.callInProgress.next(false);
      })
      .catch((err) => {
        console.log(err);
        this.callInProgress.next(false);
      });
  }
}
