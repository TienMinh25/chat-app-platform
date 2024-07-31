import { Injectable } from '@nestjs/common';
import { IConversationService } from './conversation.type';
import { CreateConversationRequest } from './dto';

@Injectable()
export class ConversationService implements IConversationService {
  createConversation(payload: CreateConversationRequest) {}
}
