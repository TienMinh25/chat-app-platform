import { User } from '@common/typeorm';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { ConversationRole } from '../conversation.enum';

@Entity({ name: 'conversation_members' })
export class ConversationMembers {
  @PrimaryColumn({ name: 'conversationId', type: 'uuid' })
  @ManyToOne(() => Conversation, (conversation) => conversation.members)
  @JoinColumn({ referencedColumnName: 'id', name: 'conversationId' })
  conversations: Conversation;

  @PrimaryColumn({ name: 'userId', type: 'uuid' })
  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  users: User;

  @Column({ type: 'enum', enum: ConversationRole, nullable: true })
  role: ConversationRole;

  @Column({ type: 'timestamptz' })
  joinedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  leftAt: Date;
}
