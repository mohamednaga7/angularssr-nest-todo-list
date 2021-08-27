import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todosSchema';

@Injectable()
export class TodosService {

  constructor(@InjectModel(Todo.name) private TodoModel: Model<TodoDocument>) { }

  async create(createTodoDto: CreateTodoDto) {
    const createdTodo = new this.TodoModel(createTodoDto);
    return createdTodo.save();
  }

  async findAll() {
    return this.TodoModel.find().exec();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.TodoModel.findById(id).exec();
    if (!todo) {
      throw new HttpException('Todo Not Found', HttpStatus.NOT_FOUND);
    }
    todo.done = updateTodoDto.done;
    const savedTodo = await todo.save();
    if (!savedTodo) {
      throw new HttpException('Error updating the done status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return savedTodo;
  }

  async remove(id: string) {
    const deletedTodo = await this.TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      throw new HttpException('Error deleting the todo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {};
  }
}
