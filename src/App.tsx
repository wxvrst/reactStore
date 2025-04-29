import Header from "./components/Header";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AppRoutes from "./routes/routes";
import './App.css'
import React from "react";

//TODO: Change theme button, hover on header links and other links
const App: React.FC = () => {

	// const location = useLocation();

	// const getSelectedKey = () => {
	// 	switch (location.pathname) {
	// 		case "/": return ["1"];
	// 		default: return [""];
	// 	}
	// }
	const [primaryColor, setPrimaryColor] = React.useState('#93C572');

	const toggleColor = () => {
		setPrimaryColor(prev =>
			prev === '#93C572' ? '#E3256b' : '#93C572'
		);
	};
	const isPrimaryColorAlt = primaryColor === '#E3256b';
	
	const activeTheme = createTheme({
		cssVariables: true,
		palette: {
			mode: 'dark',
			primary: {
				main: primaryColor,
			}
		},
	});

	return (
		<ThemeProvider theme={activeTheme}>
			<CssBaseline />
			<div>
				<Header
					toggleColor={toggleColor}
					isPrimaryColorAlt={isPrimaryColorAlt}
				/>
				<AppRoutes />
			</div>

		</ThemeProvider>
	);
}

export default App;