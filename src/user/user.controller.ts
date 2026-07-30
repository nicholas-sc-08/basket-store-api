import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    find() {
        return this.userService.find();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
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
