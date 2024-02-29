import { Card, CardHeader, CardBody, CardFooter, Input, Link } from "@nextui-org/react";

export default function Sign_in_form() {
    return (
        <form action="" className="flex justify-center items-center mt-40">
            <Card className="w-4/5 sm:w-3/5">
                <CardHeader>
                    <h4>Sign In</h4>
                </CardHeader>
                <CardBody>
                    <form action="">
                        <div className="flex pb-2">
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
                        <Input
                            className="py-2"
                            isRequired={true}
                            type="text"
                            label="Username"
                            labelPlacement="outside" />
                        <Input
                            className="py-2"
                            isRequired={true}
                            type="email"
                            label="Email"
                            labelPlacement="outside" />
                        <Input
                            className="py-2"
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
                    </form>
                </CardBody>
                <CardFooter>
                    <p>Already have an account? <Link href="/login" className="text-green-500 font-semibold">Login</Link></p>
                </CardFooter>
            </Card>
        </form >
    )
}