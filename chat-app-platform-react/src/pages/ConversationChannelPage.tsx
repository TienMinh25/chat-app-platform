import { useContext } from 'react';
import { ConversationChannelPageStyle } from '../utils/styles';
import { AuthContext } from '../utils/context';

export const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <ConversationChannelPageStyle>
      {user && user.email}
    </ConversationChannelPageStyle>
  );
};
