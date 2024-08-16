import React, { Dispatch, useEffect, useRef } from 'react';
import { OverlayStyle } from '../../utils/styles';
import { CreateConversationForm } from '../forms';
import { ModalContainer } from './ModalContainer';
import { ModalContentBody } from './ModalContentBody';
import { ModalHeader } from './ModalHeader';
import { MdClose } from 'react-icons/md';

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationModal: React.FC<Props> = ({ setShowModal }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { current } = ref;

    if (current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Create a Conversation</h2>
          <MdClose
            size={26}
            onClick={() => setShowModal(false)}
            style={{ cursor: 'pointer' }}
          />
        </ModalHeader>
        <ModalContentBody>
          <CreateConversationForm />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};
