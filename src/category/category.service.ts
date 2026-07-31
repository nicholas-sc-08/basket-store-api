import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    async find() {
        return await this.repo.find();
    }

    async findOne(id: string) {
        return await this.repo.findOne({ where: { id } })
    }

    async create(name: string, description: string) {
        const categoryExists = await this.repo.findOne({ where: { name } })

        if (categoryExists) {
            throw new ConflictException('category with this name already exists');
        }

        return await this.repo.save({ name, description });
    }
}
