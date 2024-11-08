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
     * The `handleLogin` function sets user information and Spotify token based on the provided
     * parameters.
     * @param {string} name - The `name` parameter is a string representing the user's first name.
     * @param {string} lastname - The `lastname` parameter in the `handleLogin` function is a string
     * representing the last name of the user who is logging in.
     * @param {boolean} isRemembered - The `isRemembered` parameter in the `handleLogin` function is a
     * boolean value that indicates whether the user has chosen to be remembered or not during the
     * login process. If `isRemembered` is `true`, it typically means that the user has selected an
     * option like "Remember Me"
     * @param {string} jwt - JWT (JSON Web Token) is a compact, URL-safe means of representing claims
     * to be transferred between two parties. It is commonly used for authentication and information
     * exchange in web development.
     * @param {string} access_token - An access token is a credential used to access protected
     * resources on behalf of a user. It is typically obtained after a user authenticates and
     * authorizes access to their data.
     * @param {string} token_type - The `token_type` parameter in the `handleLogin` function is a
     * string that represents the type of token being used for authentication. It is commonly used in
     * OAuth 2.0 authentication flows to specify the type of token being issued, such as "Bearer" for
     * access tokens.
     * @param {string} refresh_token - The `refresh_token` parameter in the `handleLogin` function is
     * used to store the refresh token received during the authentication process. This token can be
     * used to obtain a new access token without requiring the user to log in again. It is commonly
     * used in OAuth2 authentication flows to maintain user sessions and
     * @param {number} expires_in - The `expires_in` parameter in the `handleLogin` function represents
     * the time in seconds for which the access token is valid before it expires. This value is
     * typically provided by the authentication server when issuing the access token and indicates how
     * long the token can be used to access protected resources before it needs to
     * @param {string} scope - The `scope` parameter in the `handleLogin` function represents the scope
     * of the access permissions granted by the user during the authentication process. It specifies
     * what actions the application is allowed to perform on behalf of the user.
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
     * The `handleLogout` function clears user information and Spotify token, updating the state
     * accordingly.
     */
    const handleLogout = () => {
        userInfo.shouldRemember
            ? clear_storage('local')
            : clear_storage('session'); // Clear storage wether it is local or session
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

    const clear_storage = (targetStorage: string) => {
        if (targetStorage === 'local') {
            localStorage.removeItem('sv_my_wkly_auth_token');
            localStorage.removeItem('name');
            localStorage.removeItem('lastname');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('expires_in');
            localStorage.removeItem('scope');
        }
        if (targetStorage === 'session') {
            sessionStorage.removeItem('sv_my_wkly_auth_token');
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('lastname');
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('refresh_token');
            sessionStorage.removeItem('expires_in');
            sessionStorage.removeItem('scope');
        }
    };

    /**
     * The function `isRemembered` checks if there is stored user information in localStorage or
     * sessionStorage and updates the user and Spotify token accordingly.
     * @returns The `isRemembered` function returns nothing (`undefined`) if none of the conditions are
     * met. If the conditions are met, the function sets the user info and Spotify token based on the
     * stored data in `localStorage` or `sessionStorage` and then returns nothing.
     */
    const isRemembered = () => {
        if (
            localStorage.getItem('sv_my_wkly_auth_token') &&
            !userInfo.isLoggedIn
        ) {
            setUserInfo({
                ...userInfo,
                name: localStorage.getItem('name')!,
                lastname: localStorage.getItem('lastname')!,
                jwt: localStorage.getItem('sv_my_wkly_auth_token')!,
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
        } else if (
            sessionStorage.getItem('sv_my_wkly_auth_token') &&
            !userInfo.isLoggedIn
        ) {
            setUserInfo({
                ...userInfo,
                name: sessionStorage.getItem('name')!,
                lastname: sessionStorage.getItem('lastname')!,
                jwt: sessionStorage.getItem('sv_my_wkly_auth_token')!,
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

/**
 * The useUserContext function is used to access the UserContext within a UserProvider in a TypeScript
 * React application.
 * @returns The `useUserContext` custom hook is being returned. This hook is designed to be used within
 * a `UserProvider` component to access the user context. It uses the `useContext` hook from React to
 * retrieve the context and throws an error if it is used outside of a `UserProvider`.
 */
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
