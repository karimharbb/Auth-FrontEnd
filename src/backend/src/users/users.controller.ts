import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

  @Post('signin')
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.usersService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  me(@Req() req) {
    console.log(req.user);
    return req.user;
  }
}
