import { FC, useState } from 'react';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  ConversationSibbarContainer,
  ConversationSidebarHeader,
  ConversationSidebarStyle,
} from '../../utils/styles';
import { CreateConversationModal } from '../modals';
import { Props } from './conversation.type';
import { ConversationItem } from './ConversationItem';

export const ConversationSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CreateConversationModal
          setShowModal={setShowModal}
        ></CreateConversationModal>
      )}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <h1>Conversations</h1>
          <div
            onClick={() => setShowModal(true)}
            style={{ cursor: 'pointer' }}
          >
            <MdOutlineAddToPhotos size={20} />
          </div>
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
    </>
  );
};
