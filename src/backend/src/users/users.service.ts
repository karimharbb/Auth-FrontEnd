import { Injectable, ConflictException, UnauthorizedException,Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto';
import { appendFileSync } from 'fs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private logToFile(message: string) {
    const timestamp = new Date().toISOString();
    appendFileSync('logs.txt', `[${timestamp}] ${message}\n`);
  }

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) {
      this.logToFile(`Failed To Register Email:  ${dto.email} Already Exists`);
      this.logger.warn(`Failed To Register Email:  ${dto.email} Already Exists`);
      throw new ConflictException('User exists');
    }

    dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create(dto);

    this.logToFile(`Registered Email:  ${dto.email} Successfully`);
    this.logger.log(`Registered Email:  ${dto.email} Successfully`);

    return { message: 'Registered' };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      this.logToFile(`Failed To Login Email:  ${dto.email} Invalid Credentials`);
      this.logger.warn(`Failed To Login Email:  ${dto.email} Invalid Credentials`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    this.logToFile(`Logged In Email:  ${dto.email} Successfully`);
    this.logger.log(`Logged In Email:  ${dto.email} Successfully`);

    return { access_token: token };
  }
}