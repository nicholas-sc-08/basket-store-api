import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UserService } from "./user.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signup(name: string, email: string, password: string) {
        const users = await this.userService.findByEmail(email);
        if(users.length) {
            throw new BadRequestException('email in use');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(password, salt, 32) as Buffer;

        const result = salt + '.' + hash;

        const user = this.userService.create(name, email, result);

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.findByEmail(email);
        if(!user) {
            throw new BadRequestException('user not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = await scrypt(password, salt, 32) as Buffer;

        if(storedHash != hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }

        return user;
    }
}