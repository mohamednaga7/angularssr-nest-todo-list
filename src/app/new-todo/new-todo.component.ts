import { TodosService } from './../services/todos.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
})
export class NewTodoComponent implements OnInit {
  callInProgress: boolean = false;
  todoText: string = '';

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {}

  async onSubmit(f: NgForm) {
    this.callInProgress = true;
    await this.todosService.addTodo(f.form.value.title);
    this.todoText = '';

    this.callInProgress = false;
  }
}
