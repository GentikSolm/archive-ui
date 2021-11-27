import * as React from "react";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box";
import Leaderboard from './Leaderboard';
import Header from './Header';
import Profile from './Profile';

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
    userSelectCallback = (userID) => {
        this.setState({
            isProfile: true,
            selectedID: userID,
        })
    }
    returnToLeaderboard = () =>{
        this.setState({
            isProfile: false,
            selectedID: ""
        })
    }
    render() {
        document.body.style.background = (this.state.isDark ? "#2c2f33": "#FFFFFF");
        const theme = createTheme({
            palette: this.state.isDark ? ({
                // Dark
                mode: "dark",
                background: {
                    default: "#2c2f33",
                    paper: "#2c2f33"
                },
                primary: {
                    main: "#5865F2",
                },
                secondary: {
                    main: "#FFFFFF",
                },
                text: {
                    head: "#FFFFFF",
                },
            }):({
                //Light
                mode: "light",
                background: {
                    default: "#FFFFFF",
                    paper: '#FFFFFF'
                },
                primary: {
                    main: "#5865F2",
                },
                secondary: {
                    main: "#FFFFFF",
                },
                text: {
                    head: "#000000",
                },
        })});
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
                returnToLeaderboard={this.returnToLeaderboard}
                checkBox={this.state.isDark}
                 />
                <Box sx={{
                    marginTop: 7,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 2,
                    paddingTop: 2

                }}>
                    {(!this.state.isProfile) ? <Leaderboard callback = {this.userSelectCallback} /> : <Profile userID = {this.state.selectedID}/>}
                </Box>
                </Box>
            </ThemeProvider>
        );
    }
}
