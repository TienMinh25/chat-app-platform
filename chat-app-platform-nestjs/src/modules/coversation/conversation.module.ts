import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './schemas';
import { ConversationMembers } from './schemas/conversation-members.entity';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, ConversationMembers]),
    UserModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
