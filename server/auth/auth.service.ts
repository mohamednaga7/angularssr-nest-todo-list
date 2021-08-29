import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/userSchema';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { RequestSignInDto } from './dto/request-sign-in.dto';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>, private configService: ConfigService) { }

    async signUp(createUserDto: CreateUserDto) {
        const user = new this.UserModel();
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.phoneNumber = createUserDto.phoneNumber;

        const saltOrRounds = 12;
        const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

        user.password = hash;

        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) throw new HttpException('Error Registering the user, please contact support', HttpStatus.INTERNAL_SERVER_ERROR);

        const savedUser = await user.save();
        if (!savedUser) throw new HttpException("Error saving the user to the database", HttpStatus.INTERNAL_SERVER_ERROR);

        const jwtData = jwt.sign({
            username: savedUser.username,
            _id: savedUser._id
        }, secret);

        const response: ResponseAuthDto = { user: savedUser, jwt: jwtData };

        return response;


    }

    async signIn(signInRequestDto: RequestSignInDto) {
        const foundUser = await this.UserModel.findOne({
            $or: [
                { email: signInRequestDto.usernameOrPassword },
                { username: signInRequestDto.usernameOrPassword }
            ]
        });

        if (!foundUser) throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);

        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) throw new HttpException('Error Registering the user, please contact support', HttpStatus.INTERNAL_SERVER_ERROR);

        const correctPassword = bcrypt.compare(signInRequestDto.password, foundUser.password);
        console.log(correctPassword);
        if (!correctPassword) throw new HttpException('Wrong Credentials', HttpStatus.UNAUTHORIZED);

        const jwtData = jwt.sign({
            username: foundUser.username,
            _id: foundUser._id
        }, secret);

        const response: ResponseAuthDto = { user: foundUser, jwt: jwtData };

        return response;


    }
}
