import { Link } from "@nextui-org/react";

export default function Footer() {
    return (
        <div className="relative sm:mt-72 md:mt-40 lg:mt-32">
            <footer className="bg-green-500 grid grid-cols-1 grid-rows-5 sm:grid-cols-2 sm:grid-rows-3 w-screen">
                <h1 className="text-slate-800 row-start-1 sm:col-start-1 self-center justify-self-center font-extrabold text-xl">Features</h1>
                <div className="row-start-2 sm:col-start-1 sm:row-start-2 self-center justify-self-center ">
                    <ul className="flex flex-col justify-center items-center">
                        <li><Link className="text-slate-900" isBlock href="/">Save My Weekly</Link></li>
                        <li><Link className="text-slate-900" isBlock href="/">Your Top 10</Link></li>
                    </ul>
                </div>
                <h1 className="text-slate-800 row-start-3 sm:col-start-2 sm:row-start-1 self-center justify-self-center font-extrabold text-xl">About</h1>
                <div className="row-start-4 sm:col-start-2 sm:row-start-2 self-center justify-self-center ">
                    <ul className="flex flex-col justify-center items-center">
                        <li><Link className="text-slate-900" isBlock isExternal href="https://github.com/emunozce/Save_My_Weekly" showAnchorIcon>Github Repo</Link></li>
                        <li><Link className="text-slate-900" isBlock isExternal href="https://open.spotify.com/" showAnchorIcon>Official Spotify Website</Link></li>
                    </ul>
                </div>
                <div className="text-slate-900 row-start-5 sm:row-start-3 sm:col-span-2 self-center justify-self-center">Save My Weekly ©2024 Made by emunozce</div>
            </footer >
        </div>
    )
}