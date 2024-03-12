import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button, Spacer } from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface LoginData {
    email: string;
    password: string;
}

export default function Login_form() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return (
        <>
            <Spacer y={40} ></Spacer >
            <div className="flex justify-center items-center">
                <Card className="w-10/12 md:w-7/12 lg:w-5/12">
                    <CardHeader>
                        <h4 className="text-3xl text-green-500 font-bold">Login</h4>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={onSubmit}
                            className="flex flex-col justify-center items-center">
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
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long'
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
                        <p>Don't have an account? <Link href="/signin" className="text-green-500 font-semibold">Sign In</Link></p>
                    </CardFooter>
                </Card>
            </div>
            <Spacer y={40} ></Spacer>
        </>
    )
}