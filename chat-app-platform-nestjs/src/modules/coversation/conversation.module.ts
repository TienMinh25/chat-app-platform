import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './schemas';
import { ConversationMembers } from './schemas/conversation-members.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, ConversationMembers])],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
