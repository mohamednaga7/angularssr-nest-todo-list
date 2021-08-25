import { TodosService } from './../services/todos.service';
import { Todo } from './../models/todo.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  callInProgress: boolean = false;

  constructor(private todosService: TodosService) {}

  ngOnDestroy(): void {
    this.todosService.todos.unsubscribe();
  }

  ngOnInit() {
    this.todosService.todos.subscribe((todos) => (this.todos = todos));
    this.getTodos();
  }

  async getTodos() {
    this.callInProgress = true;
    await this.todosService.getTodos();
    this.callInProgress = false;
  }

  async toggleTodo({ todoId, done }: { todoId: string; done: boolean }) {
    if (this.callInProgress) return;
    this.callInProgress = true;
    await this.todosService.updateTodo(todoId, done);
    this.callInProgress = false;
  }

  async deleteTodo(todoId: string) {
    if (this.callInProgress) return;
    this.callInProgress = true;
    await this.todosService.deleteTodo(todoId);
    this.callInProgress = false;
  }
}
