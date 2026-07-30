import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies.access_token;

        if (!token) {
            throw new UnauthorizedException('you must be logged in');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);

            request.user = payload;

            return true;
        } catch (error) {
            throw new UnauthorizedException('invalid or expired token');
        }
    }
}