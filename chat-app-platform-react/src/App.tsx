import { Route, Routes } from 'react-router-dom';
import './index.css';
import { ConversationPage, LoginPage, RegisterPage } from './pages';
import { ConversationChannelPage } from './pages/ConversationChannelPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='conversations' element={<ConversationPage />}>
          <Route path=':conversationId' element={<ConversationChannelPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
