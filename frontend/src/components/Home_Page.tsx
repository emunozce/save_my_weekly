import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Image,
    Link,
} from '@nextui-org/react';
import { UserInfo } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Home_Page({ userInfo }: { userInfo: UserInfo }) {
    const navigate = useNavigate();

    return (
        <>
            {userInfo.isLoggedIn ? (
                <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
                    <Card
                        isFooterBlurred
                        radius="lg"
                        className="col-start-1 row-start-1 lg:col-start-1 lg:row-start-1 border-none mx-10 lg:mt-20 place-self-center"
                    >
                        <Image
                            isZoomed
                            alt="Discover Weekly..."
                            className="object-cover"
                            src="discover_weekly.jpg"
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-tiny text-white/80">
                                Want to give your current Discover Weekly
                                playlist another chance?
                            </p>
                            <Button
                                className=" text-black text-tiny font-semibold"
                                color="success"
                                radius="lg"
                                size="md"
                            >
                                Save Playlist
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card
                        isFooterBlurred
                        radius="lg"
                        className="col-start-1 row-start-2 lg:col-start-1 lg:row-start-2 border-none mx-10 lg:m-12 place-self-center"
                    >
                        <Image
                            isZoomed
                            alt="Top Artists..."
                            className="object-cover"
                            src="artists.png"
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-tiny text-white/80">
                                It doesn't get any better than this.
                            </p>
                            <Button
                                className=" text-black text-tiny font-semibold"
                                color="success"
                                radius="lg"
                                size="md"
                            >
                                See Top Artists
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card
                        isFooterBlurred
                        radius="lg"
                        className="col-start-1 row-start-3 lg:row-start-1 lg:col-start-2 lg:row-span-2 border-none my-10 mx-10 md:mt-24 lg:mb-14 place-self-center"
                    >
                        <Image
                            isZoomed
                            alt="Top Songs..."
                            className="object-cover"
                            src="The_New_Abnormal.jpeg"
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-tiny text-white/80">
                                Find out which are the songs you can't get
                                enough of.
                            </p>
                            <Button
                                className=" text-black text-tiny font-semibold"
                                color="success"
                                radius="lg"
                                size="md"
                            >
                                See Top Songs
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                <div className="flex justify-center items-center m-40">
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">NextUI</p>
                                <p className="text-small text-default-500">
                                    nextui.org
                                </p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>
                                Make beautiful websites regardless of your
                                design experience.
                            </p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link
                                isExternal
                                showAnchorIcon
                                href="https://github.com/nextui-org/nextui"
                            >
                                Visit source code on GitHub.
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">NextUI</p>
                                <p className="text-small text-default-500">
                                    nextui.org
                                </p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>
                                Make beautiful websites regardless of your
                                design experience.
                            </p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link
                                isExternal
                                showAnchorIcon
                                href="https://github.com/nextui-org/nextui"
                            >
                                Visit source code on GitHub.
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">NextUI</p>
                                <p className="text-small text-default-500">
                                    nextui.org
                                </p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>
                                Make beautiful websites regardless of your
                                design experience.
                            </p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link
                                isExternal
                                showAnchorIcon
                                href="https://github.com/nextui-org/nextui"
                            >
                                Visit source code on GitHub.
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">NextUI</p>
                                <p className="text-small text-default-500">
                                    nextui.org
                                </p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>
                                Make beautiful websites regardless of your
                                design experience.
                            </p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Link
                                isExternal
                                showAnchorIcon
                                href="https://github.com/nextui-org/nextui"
                            >
                                Visit source code on GitHub.
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
