import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button } from "@nextui-org/react";
import { useState } from "react";

export default function Login_form() {
    const [isDisabled, setDisabled] = useState<boolean>(false);

    return (
        <form action="" className="flex justify-center items-center">
            <Card className="w-10/12 md:w-7/12 lg:w-5/12">
                <CardHeader>
                    <h4 className="text-3xl text-green-500 font-bold">Login</h4>
                </CardHeader>
                <CardBody>
                    <form action="" className="flex flex-col justify-center items-center">
                        <Input
                            className="pb-1"
                            isRequired={true}
                            type="email"
                            label="Email"
                            labelPlacement="outside" />
                        <Input
                            className="pt-2"
                            isRequired={true}
                            type="password"
                            label="Password"
                            labelPlacement="outside" />
                        <Button isDisabled={isDisabled} className="w-4/12 mt-7 bg-green-500 font-semibold">Login</Button>
                    </form>
                </CardBody>
                <CardFooter>
                    <p>Don't have an account? <Link href="/signin" className="text-green-500 font-semibold">Sign In</Link></p>
                </CardFooter>
            </Card>
        </form >
    )
}