import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
export default function NavbarComponent() {
    return (
        <Navbar className="bg-black flex justify-around" shouldHideOnScroll={true} maxWidth="full">
            <NavbarContent justify="center">
                <NavbarItem className="pr-3">
                    <Link className="text-green-500 font-semibold" href="/loader">
                        Save My Weekly
                    </Link>
                </NavbarItem >
                <NavbarItem className="pl-3">
                    <Link className="text-green-500 font-semibold" href="/">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="/">
                    </Link>
                </NavbarItem>
            </NavbarContent >
            <NavbarContent justify="center">
                <NavbarItem className="pr-3">
                    <Link className="text-green-500 font-semibold" href="/signin"> Sign In</Link>
                </NavbarItem>
                <NavbarItem className="pl-3">
                    <Button className="bg-green-500 font-semibold" as={Link} href="login" variant="solid"
                    >
                        Login
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}