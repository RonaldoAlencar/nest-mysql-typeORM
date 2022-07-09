import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { TokenProviders } from './user.providers';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule), UserModule],
  providers: [...TokenProviders, TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
