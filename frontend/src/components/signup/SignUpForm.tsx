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
} from '@nextui-org/react';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SignUpData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface ErrorData {
    message: string;
}

export default function SignUpForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    const [isPasswordVisible, setIsPasswordVisibleVisible] = useState(false);
    const [isPasswordConfVisible, setIsPasswordConfVisibleVisible] =
        useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignUpData>({
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const togglePasswordVisibility = () =>
        setIsPasswordVisibleVisible(!isPasswordVisible);

    const togglePasswordConfVisibility = () =>
        setIsPasswordConfVisibleVisible(!isPasswordConfVisible);

    const onSubmit = handleSubmit(async (data) => {
        const jsonUserData = {
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        };

        try {
            setIsLoading(true);

            await axios.post(
                `${import.meta.env.VITE_API_ENDPOINT}/signup`,
                jsonUserData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setTimeout(() => {
                setIsLoading(false);
                navigate('/login');
            }, 1000);
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
                    <Card className="w-10/12 md:w-7/12 lg:w-5/12 my-24 sm:mt-20 sm:mb-0 md:mt-24 md:mb-10">
                        <CardHeader>
                            <h4 className="text-3xl text-green-500 font-bold hover:cursor-default">
                                Sign Up
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
                                className="flex flex-col justify-center"
                                noValidate
                            >
                                <div className="flex flex-row">
                                    <Input
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'Name should be more than 1 letter.',
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z' ]+$/,
                                                message: 'Invalid name',
                                            },
                                        })}
                                        isInvalid={errors.name ? true : false}
                                        errorMessage={errors.name?.message}
                                        type="text"
                                        label="Name"
                                        labelPlacement="outside"
                                    />
                                    <Spacer x={2} />
                                    <Input
                                        {...register('lastname', {
                                            required: 'Lastname is required',
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'Lastname should be more than 1 letter.',
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z' ]+$/,
                                                message: 'Invalid lastname',
                                            },
                                        })}
                                        isInvalid={
                                            errors.lastname ? true : false
                                        }
                                        errorMessage={errors.lastname?.message}
                                        type="text"
                                        label="Lastname"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
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
                                        minLength: {
                                            value: 8,
                                            message:
                                                'Password must be at least 8 characters long',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
                                            message:
                                                'Password must include uppercase, lowercase, number, and special character',
                                        },
                                    })}
                                    isInvalid={errors.password ? true : false}
                                    errorMessage={errors.password?.message}
                                    label="Password"
                                    labelPlacement="outside"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            aria-label="toggle password visibility"
                                        >
                                            {isPasswordVisible ? (
                                                <svg
                                                    aria-hidden="true"
                                                    fill="none"
                                                    focusable="false"
                                                    height="1em"
                                                    role="presentation"
                                                    viewBox="0 0 24 24"
                                                    width="1em"
                                                    className="text-2xl text-default-400 pointer-events-none"
                                                >
                                                    <path
                                                        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    aria-hidden="true"
                                                    fill="none"
                                                    focusable="false"
                                                    height="1em"
                                                    role="presentation"
                                                    viewBox="0 0 24 24"
                                                    width="1em"
                                                    className="text-2xl text-default-400 pointer-events-none"
                                                >
                                                    <path
                                                        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    }
                                    type={
                                        isPasswordVisible ? 'text' : 'password'
                                    }
                                />
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register('confirm_password', {
                                        required:
                                            'Password confirmation is required',
                                        validate: (value) =>
                                            value === getValues('password') ||
                                            'The confirmation password does not match the password entered.',
                                    })}
                                    isInvalid={
                                        errors.confirm_password ? true : false
                                    }
                                    errorMessage={
                                        errors.confirm_password?.message
                                    }
                                    label="Confirm your Password"
                                    labelPlacement="outside"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={
                                                togglePasswordConfVisibility
                                            }
                                            aria-label="toggle password visibility"
                                        >
                                            {isPasswordConfVisible ? (
                                                <svg
                                                    aria-hidden="true"
                                                    fill="none"
                                                    focusable="false"
                                                    height="1em"
                                                    role="presentation"
                                                    viewBox="0 0 24 24"
                                                    width="1em"
                                                    className="text-2xl text-default-400 pointer-events-none"
                                                >
                                                    <path
                                                        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    aria-hidden="true"
                                                    fill="none"
                                                    focusable="false"
                                                    height="1em"
                                                    role="presentation"
                                                    viewBox="0 0 24 24"
                                                    width="1em"
                                                    className="text-2xl text-default-400 pointer-events-none"
                                                >
                                                    <path
                                                        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    }
                                    type={
                                        isPasswordConfVisible
                                            ? 'text'
                                            : 'password'
                                    }
                                />
                                <Spacer y={6}></Spacer>
                                <Button
                                    type="submit"
                                    className="self-center w-4/12 bg-green-500 font-semibold"
                                >
                                    Sign Up
                                </Button>
                            </form>
                        </CardBody>
                        <CardFooter>
                            <p className="hover:cursor-default">
                                Already have an account?
                            </p>
                            <Spacer x={2} />
                            <Link
                                onPress={() => navigate('/login')}
                                className="text-green-500 font-semibold hover:cursor-pointer"
                            >
                                Login
                            </Link>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </>
    );
}
