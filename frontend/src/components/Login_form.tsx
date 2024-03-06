import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button, Spacer } from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface Login_form {
    email: string;
    password: string;
}

export default function Login_form() {
    const { register, handleSubmit } = useForm<Login_form>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = handleSubmit(data => console.log(data))


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
                                {...register("email")}
                                isRequired={true}
                                type="email"
                                label="Email"
                                labelPlacement="outside" />
                            <Spacer y={2}></Spacer>
                            <Input
                                {...register("password")}
                                isRequired={true}
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