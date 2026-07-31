import { Expose } from "class-transformer";

export class CategoryDto {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    description!: string;

    @Expose()
    createdAt!: Date;

    @Expose()
    updatedAt!: Date;

    @Expose()
    deletedAt!: Date;
}