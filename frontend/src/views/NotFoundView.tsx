import { Image, Link } from '@nextui-org/react';

export default function NotFoundView() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <Image src="../../public/404.png" width={300} />
                <p className="text-lg">Page not found</p>
                <Link
                    className="text-lg"
                    href="/"
                    color="success"
                    showAnchorIcon
                    isBlock
                >
                    Go back to home
                </Link>
            </div>
        </>
    );
}
