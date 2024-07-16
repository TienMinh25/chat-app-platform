import { Outlet, useParams } from 'react-router-dom';
import { ConversationSidebar } from '../components/conversations';
import { ConversationPanel } from '../components/conversations/ConversationPanel';
import { Page } from '../utils/styles';

export const ConversationPage = () => {
  const { conversationId } = useParams();

  return (
    <Page>
      <ConversationSidebar />
      {conversationId ? <Outlet /> : <ConversationPanel />}
    </Page>
  );
};
