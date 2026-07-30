import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common"
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassContructor {
    new(...args: []): {}
}

export function Serialize(dto: ClassContructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(map((data: any) => {
            return plainToClass(this.dto, data, {
                excludeExtraneousValues: true
            })
        })
        );
    }
}