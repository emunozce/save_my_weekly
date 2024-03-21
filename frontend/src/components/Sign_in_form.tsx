import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button, Spacer } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

interface SignInData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
}

export default function Sign_in_form() {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignInData>({
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);

        try {
            const jsonUserData = JSON.stringify({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                password: data.password
            });

            console.log(jsonUserData);

            await axios.post('http://localhost:8000/api/signup/', jsonUserData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            window.location.href = "/login";
        }
    });

    return (
        <>
            <div className="flex justify-center items-center my-24 sm:my-30 md:my-40">
                {isLoading && <Loader />}
                {!isLoading && (
                    <Card className="w-10/12 md:w-7/12 lg:w-5/12">
                        <CardHeader>
                            <h4 className="text-3xl text-green-500 font-bold">Sign In</h4>
                        </CardHeader>
                        <CardBody>
                            <form
                                onSubmit={onSubmit}
                                className="flex flex-col justify-center"
                                noValidate
                            >
                                <div className="flex flex-row">
                                    <Input
                                        {...register("name",
                                            {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Name should be more than 1 letter."
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z' ]+$/,
                                                    message: "Invalid name"
                                                }
                                            }
                                        )}
                                        isInvalid={errors.name ? true : false}
                                        errorMessage={errors.name?.message}
                                        type="text"
                                        label="Name"
                                        labelPlacement="outside" />
                                    <Spacer x={2} />
                                    <Input
                                        {...register("lastname",
                                            {
                                                required: "Lastname is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Lastname should be more than 1 letter."
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z' ]+$/,
                                                    message: "Invalid lastname"
                                                }
                                            }
                                        )}
                                        isInvalid={errors.lastname ? true : false}
                                        errorMessage={errors.lastname?.message}
                                        type="text"
                                        label="Lastname"
                                        labelPlacement="outside" />
                                </div>
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register("email",
                                        {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
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
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters long'
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/,
                                                message: 'Password must include uppercase, lowercase, number, and special character'
                                            }
                                        }
                                    )}
                                    isInvalid={errors.password ? true : false}
                                    errorMessage={errors.password?.message}
                                    type="password"
                                    label="Password"
                                    labelPlacement="outside" />
                                <Spacer y={2}></Spacer>
                                <Input
                                    {...register(
                                        "confirm_password",
                                        {
                                            required: "Password confirmation is required",
                                            validate: (value) => value === getValues("password") || "The confirmation password does not match the password entered."
                                        }
                                    )}
                                    isInvalid={errors.confirm_password ? true : false}
                                    errorMessage={errors.confirm_password?.message}
                                    type="password"
                                    label="Confirm your Password"
                                    labelPlacement="outside" />
                                <Spacer y={6}></Spacer>
                                <Button type="submit" className="self-center w-4/12 bg-green-500 font-semibold">Sign In</Button>
                            </form>
                        </CardBody>
                        <CardFooter>
                            <p>Already have an account? <Link href="/login" className="text-green-500 font-semibold">Login</Link></p>
                        </CardFooter>
                    </Card>)}
            </div >
        </>
    )
}