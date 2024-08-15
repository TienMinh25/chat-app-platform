import { ConversationExceptionFactory } from '@common/factories/exception-factory/conversation.exception.factory';
import { UserExceptionFactory } from '@common/factories/exception-factory/user.exception.factory';
import { IUserContext } from '@common/types';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConversationService } from './conversation.type';
import { CreateConversationRequest } from './dto';
import { Conversation } from './schemas';
import { ConversationMembers } from '@common/typeorm';

@Injectable()
export class ConversationService implements IConversationService {
  constructor(
    private readonly userService: UserService,
    private readonly userExceptionFactory: UserExceptionFactory,
    private readonly conversationExceptionFactory: ConversationExceptionFactory,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(ConversationMembers)
    private readonly conversationMembersRepository: Repository<ConversationMembers>,
  ) {}

  async createConversation(
    userCtx: IUserContext,
    payload: CreateConversationRequest,
  ) {
    const recipients = await Promise.all(
      payload.recipients.map((recipientId) => {
        if (recipientId == userCtx.id) {
          throw this.conversationExceptionFactory.createConversationCreatedWithYourselfException();
        }

        return this.userService.findOne({ id: recipientId });
      }),
    );

    recipients.forEach((recipient) => {
      if (!recipient) {
        throw this.userExceptionFactory.createUserNotFoundException();
      }
    });

    // Neu la tin nhan giua 2 nguoi thi check them cai viec da co hay chua thoi
    // sau nay se check sau

    const newConversation = this.conversationRepository.create({
      creator: userCtx,
      type: payload.type,
      title: payload?.title ?? null,
    });

    return this.conversationRepository.save(newConversation);
  }

  getConversations(id: string): Promise<Conversation[]> {
    return;
  }
}
