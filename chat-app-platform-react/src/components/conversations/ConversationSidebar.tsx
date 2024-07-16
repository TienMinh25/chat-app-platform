import { FC } from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import {
  ConversationSibbarContainer,
  ConversationSidebarHeader,
  ConversationSidebarStyle,
} from '../../utils/styles';
import { Props } from './conversation.type';
import { ConversationItem } from './ConversationItem';

export const ConversationSidebar: FC<Props> = ({ conversations }) => {
  return (
    <ConversationSidebarStyle>
      <ConversationSidebarHeader>
        <h1>Conversations</h1>
        <MdOutlineAddToPhotos size={20} />
      </ConversationSidebarHeader>
      <ConversationSibbarContainer>
        {conversations.map((conversation) => (
          <ConversationItem conversation={conversation} />
        ))}
      </ConversationSibbarContainer>
    </ConversationSidebarStyle>
  );
};
