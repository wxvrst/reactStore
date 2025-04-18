import Header from "./components/Header";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import AppRoutes from "./routes/routes";
// import { useLocation } from "react-router-dom";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#2196f3',
		},
		secondary: {
			main: '#ff4081',
		},
	},
});

function App() {

	// const location = useLocation();

	// const getSelectedKey = () => {
	// 	switch (location.pathname) {
	// 		case "/": return ["1"];
	// 		default: return [""];
	// 	}
	// }

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div
				className="w-[100dvw] h-full bg-neutral-950"
			>
				<Header />
				<AppRoutes />
			</div>

		</ThemeProvider>
	);
}

export default App;


