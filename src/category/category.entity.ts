import { AfterInsert, AfterRemove, AfterUpdate, Column, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column() 
    description!: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted category with id ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated category with id ${this.id}`);
    }

    @AfterRemove()
    logRemove() {
        console.log(`Removed category with id ${this.id}`);
    }
}