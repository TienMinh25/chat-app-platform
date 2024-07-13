import { Routes, Route, Outlet } from 'react-router-dom';
import { LoginPage, RegisterPage } from './pages';
import './index.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='conversations'
          element={
            <div>
              <div>Conversations</div>
              <Outlet />
            </div>
          }
        >
          <Route path=':id' element={<div>Conversation ID Page</div>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
