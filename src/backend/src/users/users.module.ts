import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.model';
import { JwtStrategy } from '../auth/jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}