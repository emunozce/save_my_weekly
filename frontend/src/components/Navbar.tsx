import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavbarComponent() {
    return (
        <Navbar className="bg-black flex justify" shouldHideOnScroll>
            <NavbarContent>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-green-500 font-semibold" href="#">
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent>
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