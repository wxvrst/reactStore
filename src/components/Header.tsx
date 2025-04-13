import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
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
                        onClick={() => navigate('/')}
                    >
                        Main
                    </Link>
                    <Link
                        underline="none"
                        color="inherit"
                        onClick={() => navigate('/basket')}
                    >
                        Bakset
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
                    <MenuItem onClick={() => navigate('/my-profile')}>My Profile</MenuItem>
                    <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                    <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
                </Menu>
            </div>
        </header>
    );
}

export default Header;