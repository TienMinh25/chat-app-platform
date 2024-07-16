import { ConversationSidebarStyle } from '../../utils/styles';
import { MdOutlineAddToPhotos } from 'react-icons/md';

export const ConversationSidebar = () => {
  return (
    <ConversationSidebarStyle>
      <header>
        <h1>Conversations</h1>
        <MdOutlineAddToPhotos size={20}/>
      </header>
    </ConversationSidebarStyle>
  );
};
