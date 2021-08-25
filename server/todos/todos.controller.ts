import { Todo } from './../../src/app/models/todo.model';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

let todos: Todo[] = [
  new Todo('1', 'take the medecine'),
  new Todo('2', 'finish your work tasks'),
  new Todo('3', 'stop whatever you are doing and focus on the django course'),
];

@Controller('todos')
export class TodosController {
  @Post()
  create(@Body() { title }: { title: string }) {
    const newTodo = new Todo(`${todos.length + 1}`, title);
    todos = [newTodo, ...todos];
    return newTodo;
  }

  @Get()
  findAll() {
    return todos;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() { done }: { done: boolean }) {
    for (const todo of todos) {
      if (todo.id === id) {
        todo.done = done;
        return todo;
      }
    }
    throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    todos = todos.filter((td) => td.id !== id);
    return {};
  }
}
