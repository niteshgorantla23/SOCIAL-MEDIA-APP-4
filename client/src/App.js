
import './App.css';
import Navbar from './components/pages/Navbar';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegisterForm';
import About from './components/pages/About';
import Profile from './components/pages/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {UserProvider} from './context/user/userContext.js'


function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<About />} />
              <Route path='profile' element={<Profile />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
