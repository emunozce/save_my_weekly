import {
    Button,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from '@nextui-org/react';
import { useUserContext } from '../services/UserContext';
import NotAuthView from './NotAuthView';
import axios from 'axios';
import { useState } from 'react';

export default function DiscoverWeekly() {
    const { userInfo, spotifyToken } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [playlistURL, setPlaylistURL] = useState('');
    const { isOpen, onOpenChange } = useDisclosure();

    const savemyweekly = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_ENDPOINT
                }/spotify/save/weekly-playlist?spotify_token=${
                    spotifyToken.access_token
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.jwt}`,
                    },
                }
            );
            setPlaylistURL(response.data.url);
            onOpenChange();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {userInfo.isLoggedIn ? (
                <>
                    <div className="flex flex-col justify-center items-center w-screen">
                        <p>
                            Discover Weekly is a playlist of songs we think
                            you'll love.
                        </p>
                        <Button
                            className="text-black text-lg font-semibold"
                            color="success"
                            isLoading={isLoading}
                            onPress={savemyweekly}
                        >
                            Save Playlist 🎶🥳
                        </Button>
                    </div>
                    <Modal
                        backdrop="blur"
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        className="dark"
                        placement="center"
                    >
                        <ModalContent>
                            <>
                                <ModalHeader>
                                    <h3 className="text-white">
                                        Thanks for using Save My Weekly!
                                    </h3>
                                </ModalHeader>
                                <ModalBody>
                                    <p className="text-white">
                                        Your Discover Weekly playlist has been
                                        saved.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Link
                                        href={playlistURL}
                                        color="success"
                                        isExternal
                                    >
                                        Open Playlist on Spotify 😎
                                    </Link>
                                </ModalFooter>
                            </>
                        </ModalContent>
                    </Modal>
                </>
            ) : (
                <NotAuthView />
            )}
        </>
    );
}
