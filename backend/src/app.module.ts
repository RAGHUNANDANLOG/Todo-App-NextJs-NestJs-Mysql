import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Change according to your DB credentials
      password: 'root',
      database: 'event_booking_system',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TodoModule,
  ],
})
export class AppModule {}
