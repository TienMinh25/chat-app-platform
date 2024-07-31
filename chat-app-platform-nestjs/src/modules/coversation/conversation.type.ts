import { CreateConversationRequest } from './dto';

export interface IConversationService {
  createConversation(payload: CreateConversationRequest);
}
