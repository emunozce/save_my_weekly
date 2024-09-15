import { Link } from '@nextui-org/react';

export default function NotAuthView() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">You are not authorized</h1>
            <Link
                className="text-lg"
                href="/login"
                color="success"
                showAnchorIcon
                isBlock
            >
                Please log in to access this page
            </Link>
        </div>
    );
}
