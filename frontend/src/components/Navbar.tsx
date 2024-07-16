import {
    Navbar,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Avatar,
    useDisclosure,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalHeader,
    Tooltip,
} from '@nextui-org/react';
import { UserInfo } from '../App';
import { useNavigate } from 'react-router-dom';
export default function NavbarComponent({
    userInfo,
    handleLogout,
}: {
    userInfo: UserInfo;
    handleLogout: () => void;
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const navigate = useNavigate();

    return (
        <Navbar
            className="flex bg-zinc-700"
            shouldHideOnScroll={true}
            maxWidth="full"
        >
            <NavbarContent justify="center">
                <NavbarItem className="md:pr-3">
                    <Link
                        className="text-green-500 font-semibold text-sm sm:text-base"
                        isBlock
                        onPress={() => navigate('/')}
                    >
                        Save My Weekly
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="center">
                {userInfo.isLoggedIn ? (
                    <>
                        <NavbarItem className="md:pr-3 hidden sm:block">
                            <Tooltip
                                className="bg-green-500 text-black font-semibold"
                                placement="left"
                                offset={15}
                                content={(
                                    userInfo.name +
                                    ' ' +
                                    userInfo.lastname
                                ).toUpperCase()}
                            >
                                <Avatar showFallback color={'success'} />
                            </Tooltip>
                        </NavbarItem>
                        <NavbarItem className="md:pl-3">
                            <Button
                                className="bg-green-500 text-black font-semibold text-sm sm:text-base"
                                onPress={onOpen}
                                variant="solid"
                            >
                                Logout
                            </Button>
                            <Modal
                                backdrop="blur"
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                className="dark"
                                placement="center"
                            >
                                <ModalContent>
                                    {(onClose) => (
                                        <>
                                            <ModalHeader>
                                                <h3 className="text-red-700">
                                                    Logout
                                                </h3>
                                            </ModalHeader>
                                            <ModalBody>
                                                <p className="text-white">
                                                    Are you sure you want to log
                                                    out?
                                                </p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    onPress={() => {
                                                        handleLogout();
                                                        onClose();
                                                        navigate('/');
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
                    </>
                ) : (
                    <>
                        <NavbarItem className="md:pr-3">
                            <Link
                                className="text-green-500 font-semibold hidden sm:block"
                                isBlock
                                onPress={() => navigate('/signup')}
                            >
                                Sign Up
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="md:pl-3">
                            <Button
                                className="bg-green-500 text-black font-semibold text-sm sm:text-base"
                                onPress={() => navigate('/login')}
                                variant="solid"
                            >
                                Login
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
}
