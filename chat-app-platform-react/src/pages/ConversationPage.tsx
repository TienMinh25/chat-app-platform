import { Outlet, useParams } from 'react-router-dom';
import mockConversations from '../__mocks__/conversations';
import { ConversationSidebar } from '../components/conversations';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { Page } from '../utils/styles';

export const ConversationPage = () => {
  const { conversationId } = useParams();

  return (
    <Page>
      <ConversationSidebar conversations={mockConversations} />
      {conversationId ? <Outlet /> : <ConversationPanel />}
    </Page>
  );
};
