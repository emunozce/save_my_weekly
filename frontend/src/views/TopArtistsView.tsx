import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Image,
    Link,
    Select,
    Selection,
    SelectItem,
    Spacer,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useUserContext } from '../services/UserContext';
import axios from 'axios';
import NotAuthView from './NotAuthView';

interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Array<{
        height: number;
        url: string;
        width: number;
    }>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export default function TopArtistsView() {
    const { userInfo, spotifyToken } = useUserContext();
    const [artistsList, setArtistsList] = useState<SpotifyArtist[]>([]);
    const [periodSelected, setPeriodSelected] = useState<Selection>(
        new Set(['short_term'])
    );

    const time = [
        { key: 'short_term', label: 'Last 4 weeks' },
        { key: 'medium_term', label: 'Last 6 months' },
        { key: 'long_term', label: 'Last year' },
    ];

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                if (!userInfo.isLoggedIn) return;
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_ENDPOINT
                    }/spotify/top/artists?spotify_token=${
                        spotifyToken.access_token
                    }&timespan=${Array.from(periodSelected).join(',')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.jwt}`,
                        },
                    }
                );
                setArtistsList(response.data.items);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTracks();
    }, [periodSelected]);

    return (
        <>
            {userInfo.isLoggedIn ? (
                <>
                    <Select
                        label="Period"
                        placeholder="Select a period"
                        className="max-w-sm m-5"
                        color="success"
                        selectedKeys={periodSelected}
                        onSelectionChange={setPeriodSelected}
                    >
                        {time.map((item) => (
                            <SelectItem key={item.key}>{item.label}</SelectItem>
                        ))}
                    </Select>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                        {artistsList.map((artist: SpotifyArtist) => (
                            <Card
                                key={artist.id}
                                className="max-w-[300px] mx-auto my-4"
                            >
                                <CardHeader>
                                    <Image
                                        isZoomed
                                        alt={artist.name}
                                        className="object-cover"
                                        src={artist.images[1].url}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <p className="text-2xl font-semibold">
                                        {artist.name}
                                    </p>
                                    <Spacer y={5} />
                                    <div className="flex flex-row">
                                        <p className="text-lg font-semibold">
                                            Followers
                                        </p>
                                        <Spacer x={2} />
                                        <p className="text-lg text-gray-500">
                                            {artist.followers.total.toLocaleString()}
                                        </p>
                                    </div>
                                    <Spacer y={5} />
                                    <div className="flex flex-row">
                                        <p className="text-lg font-semibold">
                                            Popularity
                                        </p>
                                        <Spacer x={2} />
                                        <p className="text-lg text-gray-500">
                                            {artist.popularity}
                                        </p>
                                    </div>
                                    <Spacer y={5} />
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold">
                                            Genres
                                        </p>
                                        <Spacer x={2} />
                                        <p className="text-lg text-gray-500">
                                            {artist.genres.join(', ')}
                                        </p>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="flex flex-row items-center justify-center">
                                        <Link
                                            href={artist.external_urls.spotify}
                                            isExternal
                                            showAnchorIcon
                                            className="text-green-500"
                                        >
                                            Open in Spotify
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </>
            ) : (
                <NotAuthView />
            )}
        </>
    );
}
