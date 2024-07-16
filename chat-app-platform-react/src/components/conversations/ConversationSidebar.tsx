import { FC } from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import {
  ConversationSibbarContainer,
  ConversationSidebarHeader,
  ConversationSidebarStyle,
} from '../../utils/styles';
import { Props } from './conversation.type';
import { ConversationItem } from './ConversationItem';
import { useNavigate } from 'react-router-dom';

export const ConversationSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();
  return (
    <ConversationSidebarStyle>
      <ConversationSidebarHeader>
        <h1>Conversations</h1>
        <MdOutlineAddToPhotos size={20} />
      </ConversationSidebarHeader>
      <ConversationSibbarContainer>
        {conversations.map((conversation, idx) => (
          <ConversationItem
            key={idx}
            conversation={conversation}
            onClick={() => navigate(`/conversations/${conversation.id}`)}
          />
        ))}
      </ConversationSibbarContainer>
    </ConversationSidebarStyle>
  );
};
