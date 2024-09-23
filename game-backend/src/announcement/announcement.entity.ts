import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'announcements' })
export class AnnouncementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    day: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}