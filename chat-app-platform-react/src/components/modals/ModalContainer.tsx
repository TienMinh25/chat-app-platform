import { PropsWithChildren } from 'react';
import { ModalContainerStyle } from '../../utils/styles';

export const ModalContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalContainerStyle>{children}</ModalContainerStyle>;
};
