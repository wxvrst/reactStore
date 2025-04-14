import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import logo from '../assets/images/logo.svg';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
interface SignInProps {
    isLogin: boolean;
    onFormSubmit: (email: string, password: string) => void;
    onSwitchForm: () => void;
    onCloseModal: () => void;
}
function SignIn({ isLogin, onFormSubmit, onSwitchForm, onCloseModal }: SignInProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleFormSubmit = () => {
        onFormSubmit(email, password);
        onCloseModal();
    };

    return (

        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
            }}
            noValidate
            autoComplete="off"
            className="absolute top-1/2 left-1/2 w-[60%] lg:w-1/4 bg-neutral-900 rounded-md p-4 shadow-xl transform -translate-x-1/2 -translate-y-1/2"
        >
            <div
                className="flex flex-col gap-6 justify-center items-center p-4"
            >
                <img
                    src={logo}
                    alt="logo"
                    className="w-32"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Username or E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="small"
                    fullWidth
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    size="small"
                    fullWidth
                />
                <button
                    className="w-full rounded-md border-transparent border-1 transition-colors duration-250
                     bg-blue-800 py-2 cursor-pointer hover:bg-blue-600"

                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
                <div
                    className="flex w-full justify-between mt-1"
                >
                    <Tooltip
                        placement="top"
                        title="Oh, that's a very, very pity"
                        slotProps={{
                            popper: {
                                modifiers: [
                                    {
                                        name: 'offset',
                                        options: {
                                            offset: [0, -14],
                                        },
                                    },
                                ],
                            },
                        }}
                    >
                        <a
                            className="cursor-pointer"
                        >
                            Forgot Password?</a>
                    </Tooltip>

                    <a
                        className="cursor-pointer"
                        onClick={onSwitchForm}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </a>
                </div>
            </div>


        </Box>
    );
}

export default SignIn;