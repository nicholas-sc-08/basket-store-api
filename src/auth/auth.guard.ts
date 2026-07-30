import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const token = request.cookies.access_token;

        if (!token) {
            return false;
        }

        const payload = await this.jwtService.verifyAsync(token);

        request.user = payload;

        return true;
    }
}