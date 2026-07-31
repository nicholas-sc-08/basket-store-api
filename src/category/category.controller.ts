import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
@UseGuards(AuthGuard)
@Serialize(CategoryDto)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body() data: CreateCategoryDto) {
        const { name, description } = data;
        return this.categoryService.create(name, description);
    }
}
