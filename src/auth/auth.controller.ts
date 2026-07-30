import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from '../dto/signin-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    signup(@Body() data: CreateUserDto) {
        const { name, email, password } = data;
        const user = this.authService.signup(name, email, password);

        return user;
    }

    @Post('/signin')
    signin(@Body() data: SigninDto) {
        const { email, password } = data;
        return this.authService.signin(email, password);
    }

}
