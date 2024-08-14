import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import {
  ConversationChannelPage,
  ConversationPage,
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
} from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='conversations' element={<ConversationPage />}>
            <Route
              path=':conversationId'
              element={<ConversationChannelPage />}
            ></Route>
          </Route>
        </Route>

        <Route path='/verify-email' element={<VerifyEmailPage />}></Route>
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default App;
