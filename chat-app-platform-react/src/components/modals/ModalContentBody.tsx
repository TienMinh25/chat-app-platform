import { PropsWithChildren } from 'react';
import { ModalContentBodyStyle } from '../../utils/styles';

export const ModalContentBody: React.FC<PropsWithChildren> = ({ children }) => {
  return <ModalContentBodyStyle>{children}</ModalContentBodyStyle>;
};
