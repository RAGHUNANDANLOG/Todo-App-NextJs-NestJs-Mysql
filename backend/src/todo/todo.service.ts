import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  findAll() {
    return this.todoRepo.find();
  }

  create(task: string) {
    const todo = this.todoRepo.create({ task });
    return this.todoRepo.save(todo);
  }

  update(id: number, task: string, completed: boolean) {
    return this.todoRepo.update(id, { task, completed });
  }

  delete(id: number) {
    return this.todoRepo.delete(id);
  }
}
