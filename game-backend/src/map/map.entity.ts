import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity({ name: 'map' })
export class MapEntity {

    @Column({ primary: true, type: 'int', name: 'grid_number' })
    gridNumber: number;

    @Column({ type: 'boolean', default: false })
    shield: boolean;

    // The foreign key column referring to the primary key of the team table
    @ManyToOne(() => UserEntity, (team) => team.id, { nullable: true, eager: true })
    team: UserEntity | null; // Nullable in case a territory is not yet assigned to a team

}
