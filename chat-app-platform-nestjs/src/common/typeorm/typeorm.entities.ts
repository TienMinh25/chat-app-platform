import { RefreshToken } from '@modules/auth/refresh-token.entity';
import { User } from '../../modules/user/user.entity';
import { Conversation } from '@modules/coversation/schemas';
import { ConversationMembers } from '@modules/coversation/schemas/conversation-members.entity';

const entities = [User, RefreshToken, Conversation, ConversationMembers];

export { entities, User, RefreshToken, Conversation, ConversationMembers };
