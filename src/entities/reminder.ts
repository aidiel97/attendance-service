import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('reminders')
export class Reminder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    user_id!: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'timestamp' })
    reminder_time!: Date;

    @Column({ type: 'text' })
    message!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
