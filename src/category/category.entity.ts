import { AfterInsert, AfterRemove, AfterUpdate, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

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