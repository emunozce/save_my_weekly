import { Button, Card, CardFooter, Image } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../services/UserContext';
import NotAuthView from './NotAuthView';

export default function Home_Page() {
    const navigate = useNavigate();
    const { userInfo } = useUserContext();

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
                                onPress={() => navigate('/')}
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
                                onPress={() => navigate('/')}
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
                                onPress={() => navigate('/tracks')}
                            >
                                See Top Songs
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                <NotAuthView />
            )}
        </>
    );
}
