import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-server',
        port: 6379
      }
    }),
    BooksModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
