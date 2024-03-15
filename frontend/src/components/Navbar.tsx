import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
export default function NavbarComponent() {
    return (
        <Navbar className="flex bg-zinc-700" shouldHideOnScroll={true} maxWidth="full">
            <NavbarContent justify="center">
                <NavbarItem className="md:pr-3">
                    <Link className="text-green-500 font-semibold text-sm sm:text-base" isBlock href="/">
                        Save My Weekly
                    </Link>
                </NavbarItem >
                <NavbarItem className="md:pl-3">
                    <Link className="text-green-500 font-semibold text-sm sm:text-base" isBlock href="/">
                        Features
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="center">
                <NavbarItem className="md:pr-3">
                    <Link className="text-green-500 font-semibold hidden sm:block" isBlock href="/signin"> Sign In</Link>
                </NavbarItem>
                <NavbarItem className="md:pl-3">
                    <Button className="bg-green-500 font-semibold text-sm sm:text-base" as={Link} href="/login" variant="solid"
                    >
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}