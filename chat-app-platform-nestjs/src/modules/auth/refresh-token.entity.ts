import { User } from '@common/typeorm';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh-tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Column({ unique: true })
  sessionId: string;

  @Column({ unique: true })
  refreshToken: string;

  @Column({ type: 'timestamptz' })
  expired: Date;
}
