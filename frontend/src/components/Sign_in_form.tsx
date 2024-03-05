import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button } from "@nextui-org/react";
import { useState } from "react";

export default function Sign_in_form() {
    const [isDisabled, setDisabled] = useState<boolean>(false);

    return (
        <form action="" className="flex justify-center items-center">
            <Card className="w-10/12 md:w-7/12 lg:w-5/12">
                <CardHeader>
                    <h4 className="text-3xl text-green-500 font-bold">Sign In</h4>
                </CardHeader>
                <CardBody>
                    <form action="" className="flex flex-col justify-center">
                        <div className="flex flex-row pb-1">
                            <Input
                                className="pr-1"
                                isRequired={true}
                                type="text"
                                label="Name"
                                labelPlacement="outside" />
                            <Input
                                className="pl-1"
                                isRequired={true}
                                type="text"
                                label="Lastname"
                                labelPlacement="outside" />
                        </div>
                        <div className="flex flex-row pt-2">
                            <Input
                                className="pr-1"
                                isRequired={true}
                                type="text"
                                label="Username"
                                labelPlacement="outside" />
                            <Input
                                className="pl-1"
                                isRequired={true}
                                type="email"
                                label="Email"
                                labelPlacement="outside" />
                        </div>
                        <Input
                            className="pt-2"
                            isRequired={true}
                            type="password"
                            label="Password"
                            labelPlacement="outside" />
                        <Input
                            className="pt-2"
                            isRequired={true}
                            type="password"
                            label="Confirm your Password"
                            labelPlacement="outside" />
                        <Button isDisabled={isDisabled} className="self-center w-4/12 mt-7 bg-green-500 font-semibold">Sign In</Button>
                    </form>
                </CardBody>
                <CardFooter>
                    <p>Already have an account? <Link href="/login" className="text-green-500 font-semibold">Login</Link></p>
                </CardFooter>
            </Card>
        </form >
    )
}