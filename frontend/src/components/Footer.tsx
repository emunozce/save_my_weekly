import { Link, Spacer } from "@nextui-org/react";

export default function Footer() {
    return (
        <div className="bg-green-500 grid grid-cols-1 grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 w-screen">
            <div className="row-start-1 sm:col-start-1 self-center justify-self-center flex flex-col items-center justify-center">
                <h1 className="text-slate-800 font-extrabold text-xl">Features</h1>
                <Spacer y={5}></Spacer>
                <ul className="flex flex-col items-center justify-center">
                    <li><Link className="text-slate-900" font-semibold isBlock href="/">Save My Weekly</Link></li>
                    <Spacer y={2}></Spacer>
                    <li><Link className="text-slate-900" font-semibold isBlock href="/">Your Top 10</Link></li>
                </ul>
            </div>
            <div className="row-start-2 sm:col-start-2 sm:row-start-1 self-center justify-self-center flex flex-col items-center justify-center">
                <h1 className="text-slate-800 font-extrabold text-xl">About</h1>
                <Spacer y={5}></Spacer>
                <ul className="flex flex-col items-center justify-center">
                    <Spacer y={2}></Spacer>
                    <li><Link className="text-slate-900" font-semibold isBlock isExternal href="https://github.com/emunozce/Save_My_Weekly" showAnchorIcon>Github Repo</Link></li>
                    <Spacer y={2}></Spacer>
                    <li><Link className="text-slate-900" font-semibold isBlock isExternal href="https://open.spotify.com/" showAnchorIcon>Official Spotify Website</Link></li>
                </ul>
            </div>
            <div className="text-slate-900 row-start-3 sm:row-start-2 sm:col-span-2 self-center justify-self-center">Save My Weekly ©2024 Made by emunozce</div>
        </div >
    )
}