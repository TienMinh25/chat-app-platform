import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';
import {
  ConversationPage,
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
} from './pages';
import { ConversationChannelPage } from './pages';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from './hooks';

type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps): React.ReactNode {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return children ? children : <Outlet />;
}

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
