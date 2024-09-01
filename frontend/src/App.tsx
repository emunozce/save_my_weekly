import { NextUIProvider } from '@nextui-org/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sign_up_view from './views/SignUpView';
import Login_view from './views/LoginView';
import Home_view from './views/HomeView';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Callback_page from './views/CallbackView';

export interface UserInfo {
    name: string;
    lastname: string;
    isLoggedIn: boolean;
    shouldRemember: boolean;
    jwt: string;
}

export interface SpotifyToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

function App() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: '',
        lastname: '',
        isLoggedIn: false,
        shouldRemember: false,
        jwt: '',
    });
    const [spotifyToken, setSpotifyToken] = useState<SpotifyToken>({
        access_token: '',
        token_type: '',
        refresh_token: '',
        expires_in: 0,
        scope: '',
    });

    /**
     * The handleLogout function clears the localStorage or sessionStorage based on the shouldRemember
     * flag and resets the user information.
     */
    const handleLogout = () => {
        userInfo.shouldRemember ? localStorage.clear() : sessionStorage.clear(); // Clear storage wether it is local or session
        setUserInfo({
            ...userInfo,
            name: '',
            lastname: '',
            isLoggedIn: false,
            shouldRemember: false,
            jwt: '',
        }); // Delete user info
        setSpotifyToken({
            ...spotifyToken,
            access_token: '',
            token_type: '',
            refresh_token: '',
            expires_in: 0,
            scope: '',
        }); // Delete Spotify token
    };

    /**
     * The `handleLogin` function in TypeScript React sets user information including name, lastname,
     * login status, and remember preference.
     * @param {string} name - The `name` parameter is a string representing the user's first name.
     * @param {string} lastname - The `lastname` parameter in the `handleLogin` function represents the
     * last name of the user who is logging in. It is a string type parameter that should contain the
     * last name of the user.
     * @param {boolean} isRemembered - The `isRemembered` parameter in the `handleLogin` function is a
     * boolean value that indicates whether the user wants to be remembered or not. If `isRemembered`
     * is `true`, it means the user has chosen to be remembered for future logins, and if it is `false`
     * the user has chosen not to be remembered.
     */
    const handleLogin = (
        name: string,
        lastname: string,
        isRemembered: boolean,
        jwt: string,
        access_token: string,
        token_type: string,
        refresh_token: string,
        expires_in: number,
        scope: string
    ) => {
        setUserInfo({
            ...userInfo,
            name: name,
            lastname: lastname,
            isLoggedIn: true,
            shouldRemember: isRemembered,
            jwt: jwt,
        }); // Set user info
        setSpotifyToken({
            ...spotifyToken,
            access_token: access_token,
            token_type: token_type,
            refresh_token: refresh_token,
            expires_in: expires_in,
            scope: scope,
        }); // Set Spotify token
    };

    /**
     * The function `isRemembered` checks if there is stored user information in localStorage or
     * sessionStorage and updates the user info accordingly.
     * @returns The `isRemembered` function returns nothing (`undefined`) if none of the conditions
     * inside the function are met.
     */
    const isRemembered = () => {
        if (localStorage.length > 0 && !userInfo.isLoggedIn) {
            setUserInfo({
                ...userInfo,
                name: localStorage.getItem('name')!,
                lastname: localStorage.getItem('lastname')!,
                jwt: localStorage.getItem('auth_token')!,
                isLoggedIn: true,
                shouldRemember: true,
            }); // Set user info
            setSpotifyToken({
                ...spotifyToken,
                access_token: localStorage.getItem('access_token')!,
                token_type: 'Bearer',
                refresh_token: localStorage.getItem('refresh_token')!,
                expires_in: parseInt(localStorage.getItem('expires_in')!),
                scope: localStorage.getItem('scope')!,
            }); // Set Spotify token
            return;
        } else if (sessionStorage.length > 0 && !userInfo.isLoggedIn) {
            setUserInfo({
                ...userInfo,
                name: sessionStorage.getItem('name')!,
                lastname: sessionStorage.getItem('lastname')!,
                jwt: sessionStorage.getItem('auth_token')!,
                isLoggedIn: true,
                shouldRemember: false,
            }); // Set user info
            setSpotifyToken({
                ...spotifyToken,
                access_token: sessionStorage.getItem('access_token')!,
                token_type: 'Bearer',
                refresh_token: sessionStorage.getItem('refresh_token')!,
                expires_in: parseInt(sessionStorage.getItem('expires_in')!),
                scope: sessionStorage.getItem('scope')!,
            }); // Set Spotify token
            return;
        }
        return;
    };

    // Check if there is user data in storage at first web page start up
    useEffect(() => {
        isRemembered();
    }, []);

    return (
        <NextUIProvider navigate={navigate}>
            <Navbar userInfo={userInfo} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home_view userInfo={userInfo} />} />
                <Route path="/login" element={<Login_view />} />
                <Route path="/signup" element={<Sign_up_view />} />
                <Route
                    path="/callback"
                    element={
                        <Callback_page
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                        />
                    }
                />
            </Routes>
            <Footer />
        </NextUIProvider>
    );
}

export default App;
