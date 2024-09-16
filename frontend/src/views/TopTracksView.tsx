import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserContext } from '../services/UserContext';
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
} from '@nextui-org/react';

interface SpotifyTrack {
    album: {
        album_type: string;
        artists: Array<{
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        }>;
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: Array<{
            height: number;
            url: string;
            width: number;
        }>;
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    };
    artists: Array<{
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
}

export default function TopTracksView() {
    const { userInfo, spotifyToken } = useUserContext();
    const [tracksList, setTracksList] = useState<SpotifyTrack[]>([]);
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
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_ENDPOINT
                    }/spotify/top/tracks?spotify_token=${
                        spotifyToken.access_token
                    }&timespan=${Array.from(periodSelected).join(',')}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.jwt}`,
                        },
                    }
                );
                setTracksList(response.data.items);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTracks();
    }, [spotifyToken.access_token, userInfo.jwt, periodSelected]);

    return (
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
                {tracksList.map((track: SpotifyTrack) => (
                    <Card
                        key={track.id}
                        className="max-w-[300px] mx-auto  my-4"
                    >
                        <CardHeader>
                            <Image
                                isZoomed
                                alt={track.album.name}
                                className="object-cover"
                                src={track.album.images[0].url}
                            />
                        </CardHeader>
                        <CardBody>
                            <p className="text-lg font-semibold">
                                {track.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {track.artists[0].name}
                            </p>
                        </CardBody>
                        <CardFooter>
                            <div className="flex flex-row items-center justify-center">
                                <Link
                                    href={track.external_urls.spotify}
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
    );
}
