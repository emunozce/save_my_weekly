import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';
import { useUserContext } from '../services/UserContext';
import { useEffect } from 'react';

export interface User {
    name: string;
    lastname: string;
    shouldRemember: boolean;
    jwt: string;
}

export default function Callback_page() {
    const navigate = useNavigate();
    const { handleLogin, handleLogout } = useUserContext();

    useEffect(() => {
        get_query_params();
    }, []);

    const get_query_params = async () => {
        const query_params = new URLSearchParams(window.location.search);
        const codeParam = query_params.get('code');

        if (codeParam === null) {
            handleLogout();
        }

        if (codeParam !== null) {
            try {
                let jwt: string;
                if (localStorage.length !== 0) {
                    jwt = localStorage.getItem('auth_token')!;
                } else {
                    jwt = sessionStorage.getItem('auth_token')!;
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_ENDPOINT}/spotify/token`,
                    {
                        params: {
                            code: codeParam,
                        },
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                let userInfo: User;

                if (localStorage.length !== 0) {
                    // If selected, save to local storage
                    localStorage.setItem(
                        'access_token',
                        response.data.access_token
                    );
                    localStorage.setItem(
                        'refresh_token',
                        response.data.refresh_token
                    );
                    localStorage.setItem(
                        'expires_in',
                        response.data.expires_in
                    );
                    localStorage.setItem('scope', response.data.scope);

                    userInfo = {
                        name: localStorage.getItem('name')!,
                        lastname: localStorage.getItem('lastname')!,
                        shouldRemember: true,
                        jwt: localStorage.getItem('auth_token')!,
                    };
                } else {
                    // If not selected, save to session storage
                    sessionStorage.setItem(
                        'access_token',
                        response.data.access_token
                    );
                    sessionStorage.setItem(
                        'refresh_token',
                        response.data.refresh_token
                    );
                    sessionStorage.setItem(
                        'expires_in',
                        response.data.expires_in
                    );
                    sessionStorage.setItem('scope', response.data.scope);

                    userInfo = {
                        name: sessionStorage.getItem('name')!,
                        lastname: sessionStorage.getItem('lastname')!,
                        shouldRemember: false,
                        jwt: sessionStorage.getItem('auth_token')!,
                    };
                }

                handleLogin(
                    userInfo.name,
                    userInfo.lastname,
                    userInfo.shouldRemember,
                    userInfo.jwt,
                    response.data.access_token,
                    response.data.token_type,
                    response.data.refresh_token,
                    response.data.expires_in,
                    response.data.scope
                );
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error);
                }
            }
        }
        navigate('/');
    };

    return (
        <div className="my-72">
            <Loader />
        </div>
    );
}
