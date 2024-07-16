import { FC } from 'react';
import { ConversationSidebarItem } from '../../utils/styles';
import { ConversationType } from './conversation.type';
import style from './index.module.scss';

export const ConversationItem: FC<{
  conversation: ConversationType;
  onClick: () => void;
}> = ({ conversation, onClick }) => {
  return (
    <ConversationSidebarItem onClick={onClick}>
      <div className={style.conversationAvatar}></div>
      <div className={style.conversationContainerMessage}>
        <span className={style.conversationName}>{conversation.name}</span>
        <span className={style.conversationLastMessage}>
          {conversation.lastMessage}
        </span>
      </div>
    </ConversationSidebarItem>
  );
};
