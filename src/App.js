import * as React from "react";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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
    componentDidMount() {
        document.body.style.background = "#2c2f33";
    }
    render() {
        const theme = createTheme({
            palette: {
                mode: (this.state.isDark ? "dark": "light"),
                background: {
                    default: "#2c2f33",
                    paper: "#2c2f33"
                }
        }
});
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
