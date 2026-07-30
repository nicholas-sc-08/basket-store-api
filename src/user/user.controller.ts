import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    @Patch('/:id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        return this.userService.update(id, data);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
