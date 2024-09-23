import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'quest' })
export class QuestEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 255 })
    description: string;

    @Column({ type: 'int', default: 0 })
    points: number;

    @Column({ type: 'boolean', default: false })
    done: boolean;

    @ManyToOne(() => UserEntity, team => team.quests, { eager: false })
    @JoinColumn({ name: 'team_id' }) // Join column to reference team_id as the FK
    team: UserEntity;

}