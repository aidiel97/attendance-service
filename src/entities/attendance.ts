import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('attendances')
export class Attendance {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    user_id!: number;

    @Column({ type: 'timestamp', nullable: true })
    clock_in!: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    clock_out!: Date | null;

    @Column({ type: 'enum', enum: ['IN', 'OUT'] })
    status!: 'IN' | 'OUT';

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}
