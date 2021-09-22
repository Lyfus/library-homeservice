import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Get, Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Queue } from 'bull';
import { BookDto } from './DTO/book.dto';

@Injectable()
export class BookService {
  private client: ClientProxy;

  constructor(@InjectQueue('book') private bookQueue: Queue) {
    this.client = ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
          url: 'redis://redis-server:6379'
        },
      });
  }

  public getAll() {
    return this.client.send<any>('availableBooks', {});
  }

  public getBooksByUserId(userId: number) {
    return this.client.send<any>('userBooks', { userId });
  }

  public giveBackBook(bookId: number, state: string) {
    this.bookQueue.add('fromUserToHome', {
        bookId,
        state
    });
  }

  public borrow(book: BookDto, userId: number) {
    return this.client.send<any>('userBorrowBook', {bookId: book.id, userId})
  }
}