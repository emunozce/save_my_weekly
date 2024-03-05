import { Card, CardHeader, CardBody, CardFooter, Input, Link, Button, Spacer } from "@nextui-org/react";

export default function Sign_in_form() {

    return (
        <form action="" className="flex justify-center items-center">
            <Card className="w-10/12 md:w-7/12 lg:w-5/12">
                <CardHeader>
                    <h4 className="text-3xl text-green-500 font-bold">Sign In</h4>
                </CardHeader>
                <CardBody>
                    <form action="" className="flex flex-col justify-center">
                        <div className="flex flex-row">
                            <Input
                                isRequired={true}
                                type="text"
                                label="Name"
                                labelPlacement="outside" />
                            <Spacer x={2} />
                            <Input
                                isRequired={true}
                                type="text"
                                label="Lastname"
                                labelPlacement="outside" />
                        </div>
                        <Spacer y={2}></Spacer>
                        <div className="flex flex-row">
                            <Input
                                isRequired={true}
                                type="text"
                                label="Username"
                                labelPlacement="outside" />
                            <Spacer x={2} />
                            <Input
                                isRequired={true}
                                type="email"
                                label="Email"
                                labelPlacement="outside" />
                        </div>
                        <Spacer y={2}></Spacer>
                        <Input
                            isRequired={true}
                            type="password"
                            label="Password"
                            labelPlacement="outside" />
                        <Spacer y={2}></Spacer>
                        <Input
                            isRequired={true}
                            type="password"
                            label="Confirm your Password"
                            labelPlacement="outside" />
                        <Spacer y={6}></Spacer>
                        <Button className="self-center w-4/12 bg-green-500 font-semibold">Sign In</Button>
                    </form>
                </CardBody>
                <CardFooter>
                    <p>Already have an account? <Link href="/login" className="text-green-500 font-semibold">Login</Link></p>
                </CardFooter>
            </Card>
        </form >
    )
}