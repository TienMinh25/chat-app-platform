import { Route, Routes } from 'react-router-dom';
import './index.css';
import {
  ConversationPage,
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
} from './pages';
import { ConversationChannelPage } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='conversations' element={<ConversationPage />}>
          <Route
            path=':conversationId'
            element={<ConversationChannelPage />}
          ></Route>
        </Route>
        <Route path='/verify-email' element={<VerifyEmailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
