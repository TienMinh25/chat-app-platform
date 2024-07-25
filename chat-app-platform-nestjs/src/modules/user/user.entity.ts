import { AutoMap } from '@automapper/classes';
import { RefreshToken } from '@common/typeorm';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap()
  @Column({ unique: true })
  username: string;

  @AutoMap()
  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ unique: true, nullable: true })
  emailVerfiedToken: string;

  @Column({ type: 'timestamptz', nullable: true })
  emailVerfiedExpired: Date;

  @Column({ unique: true, nullable: true })
  forgotPasswordToken: string;

  @Column({ type: 'timestamptz', nullable: true })
  forgotPasswordExpired: Date;

  @AutoMap()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];
}
