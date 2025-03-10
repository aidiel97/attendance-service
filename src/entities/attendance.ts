import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('attendances')
export class Attendance {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    user_id!: string;

    @Column({ type: 'int' })
    clock_in!: number;

    @Column({ type: 'int' })
    clock_out!: number;

    @Column({ type: 'enum', enum: ['IN', 'OUT'] })
    status!: 'IN' | 'OUT';

    @Column({ type: 'boolean' })
    is_deleted!: boolean;

    @Column({ type: 'int' })
    created_at!: number;

    @Column({ type: 'int' })
    updated_at!: number;
}
