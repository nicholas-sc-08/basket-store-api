import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async signup(name: string, email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user) {
            throw new BadRequestException('email in use');
        }

        const hash = await bcrypt.hash(password, 10);

        return await this.userService.create(name, email, hash);
    }

    async signin(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new BadRequestException('user not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException('Bad credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return { accessToken };
    }
}