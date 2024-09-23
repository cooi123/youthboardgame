import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['player', 'admin'], default: 'player' })
    role: string


    @Column({ type: 'int', default: 0 })
    points: number

    @Column()
    color: string

    @Column({ type: 'int', default: 0 })
    soldier: number

    @Column({ type: 'int', default: 0 })
    shield: number

}