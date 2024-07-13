import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthenticationPage } from './pages';
import './index.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AuthenticationPage />}></Route>
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
