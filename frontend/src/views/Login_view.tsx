import Login_form from '../components/Login_form';

export default function Login_page({
    handleLogin,
}: {
    handleLogin: (
        name: string,
        lastname: string,
        auth_token: string,
        isRemembered: boolean
    ) => void;
}) {
    return <Login_form handleLogin={handleLogin} />;
}
