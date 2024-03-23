import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

interface LoginData {
    email: string;
    password: string;
}

interface ErrorData {
    message: string;
}

export default function Login_form() {
    const [isLoading, setIsLoading] = useState(false);
    const [isInvalid, setIsInvalid] = useState<ErrorData | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = handleSubmit(data => {
        const jsonUserData = JSON.stringify({
            email: data.email,
            password: data.password
        })

        try {
            axios.post('http://localhost:8000/api/login/', jsonUserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTimeout(() => {
                setIsLoading(false);
                navigate('/home');
            }, 1000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/home');
                }, 1000);
                setIsInvalid(error.response?.data);
            }
        }
    })

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
                            <h4 className="text-3xl text-green-500 font-bold">Login</h4>
                        </CardHeader>
                        <CardBody>
                            {isInvalid && <p className="text-red-600">{isInvalid?.message}</p>}
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-col justify-center items-center"
                                noValidate
                            >
                                <Input
                                    {...register("email",
                                        {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Invalid email"
                                            }
                                        }
                                    )}
                                    isInvalid={errors.email ? true : false}
                                    errorMessage={errors.email?.message}
                                    type="email"
                                    label="Email"
                                    labelPlacement="outside" />
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register("password",
                                        {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: 'Password must include uppercase, lowercase, number, and special character'
                                            }
                                        }
                                    )}
                                    isInvalid={errors.password ? true : false}
                                    errorMessage={errors.password?.message}
                                    type="password"
                                    label="Password"
                                    labelPlacement="outside" />
                                <Spacer y={6}></Spacer>
                                <Button type="submit" className="w-4/12 bg-green-500 font-semibold">Login</Button>
                            </form>
                        </CardBody>
                        <CardFooter>
                            <p>Don't have an account? <Link href="/signup" className="text-green-500 font-semibold">Sign Up</Link></p>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </>
    )
}