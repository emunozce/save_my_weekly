import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Link,
    Button,
    Spacer,
    Checkbox,
} from '@nextui-org/react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginData {
    email: string;
    password: string;
    auth_token?: string;
}

interface ErrorData {
    message: string;
}

export default function Login_form({
    handleLogin,
}: {
    handleLogin: (
        name: string,
        lastname: string,
        auth_token: string,
        isRemembered: boolean
    ) => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    const [isRememberLogInInfo, setRememberLogInInfo] =
        useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('username', data.email);
        formData.append('password', data.password);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/login`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            if (isRememberLogInInfo) {
                // If selected, save to local storage
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('lastname', response.data.lastname);
                localStorage.setItem('token', response.data.auth_token);
            } else {
                // If not selected, save to session storage
                sessionStorage.setItem('name', response.data.name);
                sessionStorage.setItem('lastname', response.data.lastname);
                sessionStorage.setItem('token', response.data.auth_token);
            }

            handleLogin(
                response.data.name,
                response.data.lastname,
                response.data.auth_token,
                isRememberLogInInfo
            ); // Set user info

            setIsLoading(false);
            window.location.href = '/'; // Redirect to home page
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                setIsInvalid(error?.response?.data);
            }
        }
    });

    return (
        <>
            <div className="flex justify-center items-center">
                {isLoading ? (
                    <div className="my-32 sm:mb-0 md:mt-60 md:mb-10 lg:mb-0">
                        <Loader />
                    </div>
                ) : (
                    <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-32 sm:mb-0 md:mt-60 md:mb-24 lg:mb-4">
                        <CardHeader>
                            <h4 className="text-3xl text-green-500 font-bold hover:cursor-default">
                                Login
                            </h4>
                        </CardHeader>
                        <CardBody>
                            {isInvalid && (
                                <p className="text-red-600">
                                    {isInvalid?.message}
                                </p>
                            )}
                            <Spacer y={3} />
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-col justify-center items-center"
                                noValidate
                            >
                                <Input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: 'Invalid email',
                                        },
                                    })}
                                    isInvalid={errors.email ? true : false}
                                    errorMessage={errors.email?.message}
                                    type="email"
                                    label="Email"
                                    labelPlacement="outside"
                                />
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                    isInvalid={errors.password ? true : false}
                                    errorMessage={errors.password?.message}
                                    type="password"
                                    label="Password"
                                    labelPlacement="outside"
                                />
                                <Spacer y={6}></Spacer>

                                <Checkbox
                                    color="success"
                                    onValueChange={setRememberLogInInfo}
                                >
                                    Remember Me
                                </Checkbox>

                                <Spacer y={6}></Spacer>

                                <Button
                                    type="submit"
                                    className="w-4/12 bg-green-500 font-semibold"
                                >
                                    Login
                                </Button>
                            </form>
                        </CardBody>
                        <CardFooter>
                            <p className="hover:cursor-default">
                                Don't have an account?
                            </p>
                            <Spacer x={2} />
                            <Link
                                onPress={() => navigate('/signup')}
                                className="text-green-500 font-semibold hover:cursor-pointer"
                            >
                                Sign Up
                            </Link>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </>
    );
}
