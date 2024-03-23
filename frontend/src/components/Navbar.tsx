import { Navbar, NavbarContent, NavbarItem, Link, Button, Avatar, useDisclosure, Modal, ModalBody, ModalFooter, ModalContent, ModalHeader } from "@nextui-org/react";
export default function NavbarComponent({ isLoggedIn, handleLogout }: { isLoggedIn: boolean, handleLogout: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                {isLoggedIn ? (
                    <>
                        <NavbarItem className="md:pr-3">
                            <Avatar showFallback color={"success"} />
                        </NavbarItem>
                        <NavbarItem className="md:pl-3">
                            <Button className="bg-green-500 font-semibold text-sm sm:text-base" onPress={onOpen} variant="solid"
                            >
                                Logout
                            </Button>
                            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader>
                                                <h3 className="text-red-700">Logout</h3>
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className="text-white">Are you sure you want to log out?</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    onPress={() => {
                                                        handleLogout();
                                                        onClose();
                                                    }}
                                                    color="danger"
                                                    variant="light"
                                                >
                                                    Yes
                                                </Button>
                                                <Button
                                                    onPress={onClose}
                                                    className="bg-green-500"
                                                >
                                                    No
                                                </Button>
                                            </ModalFooter>
                                        </>
                                    )}
                                </ModalContent>

                            </Modal>
                        </NavbarItem>
                    </>)
                    : (
                        <>
                            <NavbarItem className="md:pr-3">
                                <Link className="text-green-500 font-semibold hidden sm:block" isBlock href="/signup"> Sign Up</Link>
                            </NavbarItem>
                            <NavbarItem className="md:pl-3">
                                <Button className="bg-green-500 font-semibold text-sm sm:text-base" as={Link} href="/login" variant="solid"
                                >
                                    Login
                                </Button>
                            </NavbarItem>
                        </>
                    )}
            </NavbarContent>
        </Navbar >
    );
}