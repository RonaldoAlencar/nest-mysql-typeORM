import { Injectable, Inject } from '@nestjs/common';
import { IResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(body: User): Promise<IResultDto> {
    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = bcrypt.hashSync(body.password, 8);

    try {
      await this.userRepository.save(user);
      return <IResultDto>{
        success: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      return <IResultDto>{
        success: false,
        message: 'Error creating user',
        data: error,
      };
    }
  }

  async findOneUser(email: string): Promise<IResultDto> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return <IResultDto>{
        success: false,
        message: 'User not found',
        data: null,
      };
    }

    return <IResultDto>{
      success: true,
      message: 'User found',
      data: user,
    };
  }

  async findbyEmail(email: string): Promise<any> {
    return this.userRepository.findOneBy({ email });
  }
}
