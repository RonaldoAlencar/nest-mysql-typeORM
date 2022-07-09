import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string) {
    const objToken = await this.tokenRepository.findOneBy({ username });

    if (objToken) {
      await this.tokenRepository.update(objToken.id, { hash });
    } else {
      this.tokenRepository.insert({ hash, username });
    }
  }

  async refreshToken(oldToken: string): Promise<object | string> {
    const objToken = await this.tokenRepository.findOneBy({ hash: oldToken });

    if (objToken) {
      const user = await this.userService.findbyEmail(objToken.username);
      return await this.authService.login(user);
    }

    // is not a valid token
    return new HttpException(
      {
        errorMessage: 'Invalid token',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
