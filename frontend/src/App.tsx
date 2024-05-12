import { NextUIProvider } from '@nextui-org/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sign_up_page from './components/Sign_up_page';
import Login_Page from './components/Login_page';
import Home_Page from './components/Home_Page';
import Footer from './components/Footer';
import { useState } from 'react';

export interface UserInfo {
    name: string;
    lastname: string;
    isLoggedIn: boolean;
    shouldRemember: boolean;
}

function App() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        lastname: '',
        isLoggedIn: false,
        shouldRemember: false,
    });

    const handleLogout = () => {
        userInfo.shouldRemember ? localStorage.clear() : sessionStorage.clear(); // Clear storage wether it is local or session
        setUserInfo({
            ...userInfo,
            name: '',
            lastname: '',
            isLoggedIn: false,
            shouldRemember: false,
        }); // Delete user info
    };

    const handleLogin = (
        name: string,
        lastname: string,
        isRemembered: boolean
    ) => {
        setUserInfo({
            ...userInfo,
            name: name,
            lastname: lastname,
            isLoggedIn: true,
            shouldRemember: isRemembered,
        }); // Set user info
    };

    const isRemembered = () => {
        if (localStorage.length > 0 && !userInfo.isLoggedIn) {
            setUserInfo({
                ...userInfo,
                name: localStorage.getItem('name')!,
                lastname: localStorage.getItem('lastname')!,
                isLoggedIn: true,
                shouldRemember: true,
            }); // Set user info
            return;
        } else if (sessionStorage.length > 0 && !userInfo.isLoggedIn) {
            setUserInfo({
                ...userInfo,
                name: sessionStorage.getItem('name')!,
                lastname: sessionStorage.getItem('lastname')!,
                isLoggedIn: true,
                shouldRemember: false,
            }); // Set user info
            return;
        }
        return;
    };

    isRemembered(); // Check if there is user data in storage at first web page start up

    return (
        <NextUIProvider navigate={navigate}>
            <Navbar userInfo={userInfo} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home_Page userInfo={userInfo} />} />
                <Route
                    path="/login"
                    element={<Login_Page handleLogin={handleLogin} />}
                />
                <Route path="/signup" element={<Sign_up_page />} />
            </Routes>
            <Footer />
        </NextUIProvider>
    );
}

export default App;
