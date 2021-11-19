import * as React from "react";
import './App.css';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Leaderboard from './assets/components/Leaderboard';
import Header from './assets/components/Header';


export default class App extends React.Component {
    render() {
        const darkTheme = createTheme({ palette: { mode: 'dark' } });
        const lightTheme = createTheme({ palette: { mode: 'light' } });
        return (
            <ThemeProvider theme={darkTheme}>
                <Header />
                <Paper elevation={1} sx={{
                    height: '100%',
                    padding: '10%',
                    }}>
                    <Leaderboard />
                </Paper>
            </ThemeProvider>
        );
    }
}
