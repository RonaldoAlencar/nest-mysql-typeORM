import { Body, Controller, Put } from '@nestjs/common';
import { IRefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: IRefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
