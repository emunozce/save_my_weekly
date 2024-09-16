import { NextUIProvider } from '@nextui-org/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sign_up_view from './views/SignUpView';
import Login_view from './views/LoginView';
import Home_view from './views/HomeView';
import Footer from './components/Footer';
import Callback_page from './views/CallbackView';
import { UserProvider } from './services/UserContext';
import NotFoundView from './views/NotFoundView';
import TopArtistsView from './views/TopArtistsView';

function App() {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <UserProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home_view />} />
                    <Route path="/login" element={<Login_view />} />
                    <Route path="/signup" element={<Sign_up_view />} />
                    <Route path="/callback" element={<Callback_page />} />
                    <Route path="/tracks" element={<TopArtistsView />} />
                    <Route path="*" element={<NotFoundView />} />
                </Routes>
                <Footer />
            </UserProvider>
        </NextUIProvider>
    );
}

export default App;
