import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import SignIn from './SignIn';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState<boolean>(true);
    const [openAlert, setOpenAlert] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        if (!isLogin) {
            setOpenAlert(true);
        }
    };

    const handleSignInSubmit = (email: string, password: string) => {
        console.log('Форма отправлена:', email, password);
        if (isLogin) {
            // navigate('/profile');
        } else {
            // navigate('/success');
        }
    };
    const handleSwitchForm = () => {
        setIsLogin(!isLogin);
    };

    const handleCloseAlert = (
        // @ts-ignore
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    return (
        <header className="bg-neutral-900 p-4 flex items-center gap-3 w-full rounded-b-sm border-b-1 border-netural-400 justify-between">
            <div role="presentation">
                <Breadcrumbs
                    aria-label="breadcrumb"
                    className="cursor-pointer"
                >
                    <Link
                        underline="none"
                        color="inherit"
                        onClick={() => navigate('/reactStore')}
                    >
                        Main
                    </Link>
                    <Link
                        underline="none"
                        color="inherit"
                        onClick={() => navigate('/reactStore/basket')}
                    >
                        Bakset
                    </Link>
                    <Link
                        underline="none"
                        color="inherit"
                        onClick={() => navigate('/reactStore/favourite')}
                    >
                        Favourite
                    </Link>
                </Breadcrumbs>
            </div>
            <div>

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
                        onClick={() => navigate('/reactStore/my-profile')}
                    >
                        My Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => navigate('/reactStore/settings')}
                    >
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={handleOpenModal}
                        className="p-4 place-content-center"
                    >
                        {isLogin ? 'Sign In' : 'Sign Out'}
                    </MenuItem>
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

                    <Snackbar
                        open={openAlert}
                        autoHideDuration={1600}
                        onClose={handleCloseAlert}
                    >
                        <Alert
                            onClose={handleCloseAlert}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {isLogin ? 'Succes Login' : 'Succes Registration'}!
                        </Alert>
                    </Snackbar>

                </Menu>
            </div>
        </header>
    );
}

export default Header;