import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('sessions')
export class Session {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int' })
    user_id!: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ type: 'varchar', length: 512 })
    token!: string;

    @Column({ type: 'timestamp' })
    expires_at!: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
