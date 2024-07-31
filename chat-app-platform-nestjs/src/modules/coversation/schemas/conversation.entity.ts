import { User } from '@common/typeorm';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationType } from '../conversation.enum';
import { ConversationMembers } from './conversation-members.entity';

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById', referencedColumnName: 'id' })
  creator: User;

  @Column()
  title: string;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: ConversationType })
  type: ConversationType;

  @Column({ nullable: true })
  subType: string;

  @UpdateDateColumn({ name: 'last_message_at' })
  lastMessageAt: Date;

  @Column({ type: 'json', nullable: true })
  lastMessageSent: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @OneToMany(
    () => ConversationMembers,
    (conversationMembers) => conversationMembers.conversations,
  )
  members: ConversationMembers[];
}
