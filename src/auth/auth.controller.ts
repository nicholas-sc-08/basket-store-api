import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from '../dto/signin-dto';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/user.entity';

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
    async signin(@Body() data: SigninDto, @Res({ passthrough: true }) response: Response) {
        const { accessToken } = await this.authService.signin(data.email, data.password);

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });

        return { message: 'Signed in successfully' };
    }

    @Post('/signout')
    async signout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token');

        return { message: 'signed out successfully' }
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    async whoAmI(@CurrentUser() user: User) {
        return user;
    }
}
