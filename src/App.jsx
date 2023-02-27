import { BrowserRouter, Router, Routes } from 'react-router-dom';
import './App.scss';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Router path="login" element={<LoginPage />} />
          <Router path="signup" element={<SignUpPage />} />
          <Router path="todo" element={<TodoPage />} />
          <Router path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
