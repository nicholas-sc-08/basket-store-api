import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@Serialize(UserDto)
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() data: CreateUserDto) {
        return this.userService.create(data.name, data.email, data.password);
    }
}
