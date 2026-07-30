import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    findOne(id: string) {
        const user = this.repo.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }

    async create(email: string, password: string) {
        const userExists = await this.repo.findOne({ where: { email } });

        if (userExists) {
            throw new ConflictException('User with this e-mail already exists');
        }

        return await this.repo.save({ email, password });
    }

}
