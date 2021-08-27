import { Todo } from './../models/todo.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.scss'],
})
export class TodosItemComponent {
  @Input() todo: Todo | undefined;
  @Output() todoToggled = new EventEmitter<{ todoId: string; done: boolean }>();
  @Output() todoDeleted = new EventEmitter<string>();

  handleToggleTodo() {
    this.todo &&
      this.todoToggled.emit({ todoId: this.todo._id, done: !this.todo.done });
  }

  handleDelete(event: any) {
    event.stopPropagation();
    this.todo &&
      this.todoDeleted.emit(this.todo._id);
  }
}
