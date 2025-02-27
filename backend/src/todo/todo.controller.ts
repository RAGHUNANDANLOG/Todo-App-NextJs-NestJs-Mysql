import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() body: { task: string }) {
    return this.todoService.create(body.task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { task: string; completed: boolean }) {
    return this.todoService.update(Number(id), body.task, body.completed);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(Number(id));
  }
}
