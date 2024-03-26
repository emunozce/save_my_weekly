import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { UserInfo } from "../App";

export default function Home_Page({ userInfo }: { userInfo: UserInfo }) {
    return (
        <>
            {userInfo.isLoggedIn ? (<div className="grid grid-cols-1 grid-rows-3 place-items-center">
                <Card
                    isFooterBlurred
                    radius="lg"
                    className="col-start-1 row-start-1 border-none m-10 w-fit"
                >
                    <Image
                        isZoomed
                        alt="Top Artists..."
                        className="object-cover"
                        src="artists.png"
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">Can you guess which artists are in your top?</p>
                        <Button className=" text-black text-tiny font-semibold" color="success" radius="lg" size="sm">
                            Top Artists
                        </Button>
                    </CardFooter>
                </Card>
                <Card
                    isFooterBlurred
                    radius="lg"
                    className="col-start-1 row-start-2 border-none m-10 w-fit"
                >
                    <Image
                        isZoomed
                        alt="Top Artists..."
                        className="object-cover"
                        src="artists.png"
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">Can you guess which artists are in your top?</p>
                        <Button className=" text-black text-tiny font-semibold" color="success" radius="lg" size="sm">
                            Top Artists
                        </Button>
                    </CardFooter>
                </Card>
                <Card
                    isFooterBlurred
                    radius="lg"
                    className="col-start-1 row-start-3 border-none m-10 w-fit"
                >
                    <Image
                        isZoomed
                        alt="Top Artists..."
                        className="object-cover"
                        src="The_New_Abnormal.jpeg"
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">Find out which are the songs you can't get enough of. </p>
                        <Button className=" text-black text-tiny font-semibold" color="success" radius="lg" size="sm">
                            Top Songs
                        </Button>
                    </CardFooter>
                </Card>
            </div >) : (
                <div>Hola, logueate</div>
            )}
        </>
    )
}