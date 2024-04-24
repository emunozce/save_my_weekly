import Login_form from './Login_form';

export default function Login_page({
    handleLogin,
}: {
    handleLogin: (
        name: string,
        lastname: string,
        isRemembered: boolean
    ) => void;
}) {
    return <Login_form handleLogin={handleLogin} />;
}
