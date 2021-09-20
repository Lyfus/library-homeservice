import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { LoginDto } from './DTO/login.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response)  {
    await this.userService.login(loginDto).subscribe(result => {
      if(result == null) {
        res.status(HttpStatus.OK).json(null);
      } else {
        res.status(HttpStatus.OK).json(result);
      }
    })
  }
}