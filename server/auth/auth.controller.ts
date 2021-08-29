import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestSignInDto } from './dto/request-sign-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,) { }

  @Post('/signup')
  signin(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('/signin')
  signup(@Body() requestSignInDto: RequestSignInDto) {
    return this.authService.signIn(requestSignInDto);
  }
}
