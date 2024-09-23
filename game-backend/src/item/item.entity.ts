import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

}