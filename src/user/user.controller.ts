import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('user')
@Serialize(UserDto)
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }
    
}
