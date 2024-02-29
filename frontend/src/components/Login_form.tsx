import { Card, CardHeader, CardBody, CardFooter, Input, Link } from "@nextui-org/react";

export default function Login_form() {
    return (
        <form action="" className="flex justify-center items-center mt-60">
            <Card className="w-4/5 sm:w-3/5">
                <CardHeader>
                    <h4>Login</h4>
                </CardHeader>
                <CardBody>
                    <form action="">
                        <Input
                            className="py-2"
                            isRequired={true}
                            type="email"
                            label="Email"
                            labelPlacement="outside" />
                        <Input
                            className="pt-2 pr-1"
                            isRequired={true}
                            type="password"
                            label="Password"
                            labelPlacement="outside" />
                    </form>
                </CardBody>
                <CardFooter>
                    <p>Don't have an account? <Link href="/signin" className="text-green-500 font-semibold">Sign In</Link></p>
                </CardFooter>
            </Card>
        </form >
    )
}