import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    async find() {
        return await this.repo.findAndCount();
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

    async update(id: string, data: Partial<Category>) {
        const category = await this.repo.findOne({ where: { id } });

        if (!category) {
            throw new NotFoundException('category with this id does not exists');
        }

        Object.assign(category, data);

        return this.repo.save(category);
    }

    async remove(id: string) {
        const category = await this.repo.findOne({ where: { id } });

        if(!category) {
            throw new NotFoundException('category with this id does not exists');
        }

        return await this.repo.remove(category);
    }
}
