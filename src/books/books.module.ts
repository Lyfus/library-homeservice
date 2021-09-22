// import { Module } from '@nestjs/common';
// import { BookController } from './books.controller';
// import { BookService } from './books.service';
// import { BullModule } from '@nestjs/bull';

// @Module({
//   imports: [
//     BullModule.forRoot({
//         redis: {
//           host: 'redis',
//           port: 6379
//         }
//     }),
//     BullModule.registerQueue({
//       name: 'book',
//       redis: {
//         port: 6379,
//       }
//     }),
//     BullModule.registerQueue({
//       name: 'fixing',
//       redis: {
//         port: 6379,
//       }
//     }),
//   ],
//   controllers: [BookController],
//   providers: [
//     BookService
//   ],
// })
// export class BooksModule {}

import { Module } from '@nestjs/common';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
        redis: {
          host: 'redis-server',
          port: 6379
        }
      }),
      BullModule.registerQueue({
        name: 'book',
        redis: {
          host: 'redis-server',
          port: 6379,
        },
    }),
    BullModule.registerQueue({
        name: 'fixing',
        redis: {
            host: 'redis-server',
            port: 6379,
        },
    })
  ],
  controllers: [BookController],
  providers: [
    BookService
  ],
})
export class BooksModule {}