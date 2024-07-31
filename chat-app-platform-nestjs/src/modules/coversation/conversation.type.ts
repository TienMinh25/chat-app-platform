import { IUserContext } from './../../common/types/user.type';
import { CreateConversationRequest } from './dto';
import { Conversation } from './schemas';

export interface IConversationService {
  createConversation(userCtx: IUserContext, payload: CreateConversationRequest);
  getConversations(id: string): Promise<Conversation[]>;
}
