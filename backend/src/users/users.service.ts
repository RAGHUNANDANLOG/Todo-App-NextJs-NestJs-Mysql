import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  create(user: Partial<User>) {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: Partial<User>) {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.usersRepository.delete(id);
  }
}
