import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import SignIn from './SignIn';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { type AuthUser } from '../types/User'
import { registerUser } from '../store/usersSlice';
import ToggleButton from '@mui/material/ToggleButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface HeaderProps {
    toggleColor: () => void,
    isPrimaryColorAlt: boolean,
    onSecret: () => void,
}

const Header: React.FC<HeaderProps> = ({ toggleColor, isPrimaryColorAlt, onSecret }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState<boolean>(true);
    const [secret, setSecret] = React.useState<boolean>(false);
    const [selected, setSelected] = React.useState(false);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users)
    const { user, login, logout } = useAuth();


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleSignInSubmit = async (username: string, password: string) => {
        if (isLogin) {
            const foundUser = users.find(u => u.username === username && u.password === password);
            if (foundUser) {
                const authUser: AuthUser = { id: foundUser.id, username: foundUser.username, isVip:foundUser.isVip };
                login(authUser);
                if (authUser.isVip) {
                    setSecret(true);
                }
                return { success: true, message: 'Succesful login' };
            }
            else {
                return { success: false, message: 'Wrong username or password' }
            }
        }
        else {
            const userExists = users.some(u => u.username === username);
            if (userExists) {
                return { success: false, message: 'Username already exist' }
            }
            dispatch(registerUser({ username, password }));
            return { success: true, message: 'Succesful registration, now log in' }
        }
    };
    const handleSwitchForm = () => {
        setIsLogin(!isLogin);
    };
    const secretFunction=()=>{
        onSecret();
    }
    //Checking current path
    const isActive = (path: string): boolean => location.pathname === path;
    return (
        <header className="bg-neutral-900 p-4 flex items-center gap-3 w-full rounded-b-sm border-b-1 border-neutral-800 justify-between">
            <div role="presentation">
                <Breadcrumbs
                    aria-label="breadcrumb"
                    className="cursor-pointer"
                >
                    <Link
                        underline='hover'
                        color={isActive('/reactStore') ? 'primary' : 'inherit'}
                        onClick={() => navigate('/reactStore')}
                    >
                        Main
                    </Link>
                    <Link
                        underline='hover'
                        color={isActive('/reactStore/basket') ? 'primary' : 'inherit'}
                        onClick={() => navigate('/reactStore/basket')}
                    >
                        Bakset
                    </Link>
                    <Link
                        underline='hover'
                        color={isActive('/reactStore/favourite') ? 'primary' : 'inherit'}
                        onClick={() => navigate('/reactStore/favourite')}
                    >
                        Favourite
                    </Link>
                </Breadcrumbs>
            </div>
            <div
                className="flex gap-4"
            >
                <ToggleButton
                    value="check"
                    size='small'
                    selected={selected}
                    onChange={() => {
                        setSelected((prevSelected) => !prevSelected);
                        secretFunction();
                    }}
                    hidden={secret ? false : true}
                >
                    {selected ? <StarBorderIcon /> : <StarIcon />}
                </ToggleButton>
                <FormControlLabel
                    control={
                        <Switch
                            sx={{
                                ".MuiSwitch-thumb": {
                                    backgroundColor: "#93C572",
                                },
                                ".MuiSwitch-track": {
                                    backgroundColor: "#93C572",
                                },
                                ".Mui-checked": {
                                    ".MuiSwitch-thumb": {
                                        backgroundColor: "#E3256b",
                                    },
                                    ".MuiSwitch-track": {
                                        backgroundColor: "#E3256b",
                                    },
                                },
                            }}
                            checked={isPrimaryColorAlt}
                            onChange={toggleColor}
                        />
                    }
                    label=""
                    labelPlacement="start"
                />
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Menu
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            navigate('/reactStore/my-profile');
                            handleClose();
                        }}
                    >
                        My Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate('/reactStore/settings');
                            handleClose();
                        }}
                    >
                        Settings
                    </MenuItem>
                    {user ? (
                        <MenuItem
                            onClick={() => {
                                logout();
                                handleClose();
                                setSecret(false);
                            }}
                        >
                            Sign Out
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                handleOpenModal();
                                //TODO: Add handleClose and fix error
                            }}
                        >
                            Sign In/Sign Up
                        </MenuItem>
                    )}

                    <Modal
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                    >
                        <SignIn
                            isLogin={isLogin}
                            onFormSubmit={handleSignInSubmit}
                            onSwitchForm={handleSwitchForm}
                            onCloseModal={handleCloseModal}
                        />
                    </Modal>
                </Menu>
            </div>
        </header>
    );
}

export default Header;