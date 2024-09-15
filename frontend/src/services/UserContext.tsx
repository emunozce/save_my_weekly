import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserInfo {
    name: string;
    lastname: string;
    isLoggedIn: boolean;
    shouldRemember: boolean;
    jwt: string;
}

interface SpotifyToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

interface UserContextType {
    userInfo: UserInfo;
    spotifyToken: SpotifyToken;
    handleLogin: (
        name: string,
        lastname: string,
        isRemembered: boolean,
        jwt: string,
        access_token: string,
        token_type: string,
        refresh_token: string,
        expires_in: number,
        scope: string
    ) => void;
    handleLogout: () => void;
    isRemembered: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
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

    useEffect(() => {
        isRemembered();
    }, []);

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

    return (
        <UserContext.Provider
            value={{
                userInfo,
                spotifyToken,
                handleLogin,
                handleLogout,
                isRemembered,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
