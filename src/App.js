import * as React from "react";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Leaderboard from './Leaderboard';
import Header from './Header';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isDark: true,
            isProfile: false
        }
    }
    handleSwitchChange = () =>{
        this.setState({isDark: !this.state.isDark})
    }
    render() {
        const theme = createTheme({ palette: { mode: (this.state.isDark ? "dark": "light") } });
        return (
            <ThemeProvider theme={theme}>
                <Box
                sx={{
                    backgroundColor: "background.default",
                    width: '99vw',
                    height: '99vh',
                    position: 'absolute'
                }}>
                <Header
                handleSwitchChange={this.handleSwitchChange}
                checkBox={this.state.isDark}
                 />
                <Paper elevation={1} sx={{
                    marginTop: 8,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 2,
                    paddingTop: 2

                }}>
                    {(!this.state.isProfile) ? <Leaderboard /> : <Leaderboard />}
                </Paper>
                </Box>
            </ThemeProvider>
        );
    }
}
