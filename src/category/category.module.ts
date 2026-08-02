import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { SecurityModule } from '../security/security.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category]), SecurityModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule { }
