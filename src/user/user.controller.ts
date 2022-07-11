import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { IResultDto } from 'src/dto/result.dto';
import { IUserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async findOne(@Param('email') email: string): Promise<IResultDto> {
    return this.userService.findOneUser(email);
  }

  @Post()
  async create(@Body() body: IUserCreateDto): Promise<IResultDto> {
    return this.userService.create(body);
  }

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
