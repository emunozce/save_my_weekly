import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavbarComponent() {
    return (
        <Navbar className="bg-black flex" shouldHideOnScroll={true} maxWidth="full">
            <NavbarContent>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">
                        Save My Weekly
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">Login</Link>
                </NavbarItem>
                <NavbarItem >
                    <Button className="bg-green-500 font-semibold" as={Link} href="#" variant="solid">
                        Sign In
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}