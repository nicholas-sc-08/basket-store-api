import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    async find() {
        return await this.repo.findAndCount();
    }

    async findOne(id: string) {
        const user = await this.repo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`user with id ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    async create(name: string, email: string, password: string) {
        const userExists = await this.repo.findOne({ where: { email } });

        if (userExists) {
            throw new ConflictException('user with this e-mail already exists');
        }

        return await this.repo.save({ name, email, password });
    }

    async update(id: string, data: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException(`user with id ${id} does not exists`);
        }

        Object.assign(user, data);

        return this.repo.save(user);
    }

    async remove(id: string) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException(`user with id ${id} does not exists`);
        }

        return await this.repo.remove(user);
    }

}
