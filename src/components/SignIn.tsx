import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import logo from '../assets/images/logo.svg';
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

interface SignInProps {
    isLogin: boolean;
    onFormSubmit: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
    onSwitchForm: () => void;
    onCloseModal: () => void;
}
//@ts-ignore
function SignIn({ isLogin, onFormSubmit, onSwitchForm, onCloseModal }: SignInProps) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleFormSubmit = async () => {
        if (!username || !password) {
            setAlertMessage('Пожалуйста, заполните все поля');
            setAlertSeverity('error');
            return;
        }
        const result = await onFormSubmit(username, password);
        setAlertMessage(result.message);
        setAlertSeverity(result.success ? 'success' : 'error');
        if (result.success) {
            setIsSuccess(true);
            setUsername('');
            setPassword('');
        }
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
            <div className="flex flex-col gap-6 justify-center items-center p-4">
                <img
                    src={logo}
                    alt="logo"
                    className="w-32"
                />

                {alertMessage && (
                    <Alert
                        severity={alertSeverity}
                        variant="filled"
                        sx={{ width: '100%' }}
                        onClose={() => setAlertMessage('')}
                    >
                        {alertMessage}
                    </Alert>
                )}

                <TextField
                    required
                    id="outlined-required"
                    label={isSuccess ? 'Already logged in' : "Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="small"
                    fullWidth
                    disabled={isSuccess}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label={isSuccess ? 'Already logged in' : "Password"}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    size="small"
                    fullWidth
                    disabled={isSuccess}
                />
                <Button
                    className="w-full"
                    variant="outlined"
                    type="submit"
                    disabled={isSuccess}
                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
                <div className="flex w-full justify-between mt-1">
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
                        <Link
                            underline='hover'
                            className="cursor-pointer"
                        >
                            Forgot Password?
                        </Link>
                    </Tooltip>
                    <Link
                        underline='hover'
                        className="cursor-pointer"
                        onClick={onSwitchForm}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </Link>
                </div>
            </div>
        </Box>
    );
}

export default SignIn;
