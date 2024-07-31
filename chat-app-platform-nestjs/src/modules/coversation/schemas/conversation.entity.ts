import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ type: 'uuid' })
  createdById: string;

  @Column()
  title: string;

  @Column()
  avatar: string;

  @Column({ type: 'enum', enum: ConversationType })
  type: ConversationType;

  @Column({ nullable: true })
  subType: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastMessageAt: Date;

  @Column({ type: 'json', nullable: true })
  lastMessageSent: Record<string, any>;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(
    () => ConversationMembers,
    (conversationMembers) => conversationMembers.conversations,
  )
  members: ConversationMembers[];
}
