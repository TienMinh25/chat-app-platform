import { PropsWithChildren } from 'react';
import { ModalHeaderStyle } from '../../utils/styles';

export const ModalHeader: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
};
