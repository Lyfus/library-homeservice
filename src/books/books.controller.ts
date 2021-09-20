import { Controller, Get, Res, HttpStatus, Put, Param, Body, Inject } from '@nestjs/common';
import { BookService } from './books.service';
import { Response } from 'express';
import { BookDto } from './DTO/book.dto';
import { ClientProxy, ClientProxyFactory, Ctx, EventPattern, MessagePattern, Payload, RedisContext, Transport } from '@nestjs/microservices';
import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('books')
export class BookController {
  public client: ClientProxy;

  constructor(
    private bookService: BookService,
    @InjectQueue('fixing') private reperationQueue: Queue
    ) { 
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379'
      },
    });
  }


  @Get()
  async getAll(@Res() res: Response)  {
    this.bookService.getAll().subscribe(books => {
      if(books.length > 0) {
        res.status(HttpStatus.OK).json(books);
      } else {
        res.status(HttpStatus.NOT_FOUND).json([])
      }
    })
  }

  @Get("userBooks/:id")
  async getAllByUserId(@Param() params, @Res() res: Response) {
    this.bookService.getBooksByUserId(params.id).subscribe(books => {
      if(books.length > 0) {
        res.status(HttpStatus.OK).json(books);
      } else {
        res.status(HttpStatus.OK).json([])
      }
    })
  }

  @Put("borrow/:id")
  async borrowBook(@Param() params, @Body() bookDto: BookDto, @Res() res: Response) {
    this.bookService.borrow(bookDto, params.id).subscribe(() => {
      res.status(HttpStatus.OK).json({});
    }); 
  }

  @Put("giveback/:id")
  async giveBackBook(@Param() params, @Res() res: Response) {
    let state = Math.floor(Math.random() * (9 - 1 + 1) + 1) >= 7 ? 'damaged' : 'good'
    this.bookService.giveBackBook(params.id, state)

    res.status(HttpStatus.OK).json(state);
  }
}