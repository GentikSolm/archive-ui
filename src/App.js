import * as React from "react";
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from "@mui/material/Box";
import Leaderboard from './Leaderboard';
import Header from './Header';
import Profile from './Profile';
import PageContext from './PageContext';

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.setGames = (games) => {
            this.setState({games: games})
        }
        this.toggleTheme = () => {
            this.setState({isDark: !this.state.isDark})
        }
        this.changeId = (id) => {
            if(id === -1){
                return
            }
            this.setState({selectedID: id})
        }
        this.setLoginInfo = (expiration, token, id) => {
            this.setState({expiration: expiration, token: token, loginId: id})
        }
        this.state={
            setLoginInfo: this.setLoginInfo,
            changeId: this.changeId,
            toggleTheme: this.toggleTheme,
            isDark: true,
            isProfile: false,
            loginId: undefined,
            selectedID: undefined,
            token: undefined,
            expiration: undefined,
        }
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
            <PageContext.Provider value={this.state}>
            <ThemeProvider theme={theme}>
                <Box
                sx={{
                    backgroundColor: "background.default",
                    width: '98vw',
                    height: '98vh',
                    position: 'absolute'
                }}>
                <PageContext.Consumer>
                    {({setLoginInfo})=>(
                    <Header
                    returnToLeaderboard={this.returnToLeaderboard}
                    updateInfo={setLoginInfo}
                    userSelect={this.userSelectCallback}
                    />
                    )}
                 </PageContext.Consumer>
                 <Box sx={{
                    marginTop: 7,
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingBottom: 2,
                    paddingTop: 2,
                    justifyContent: "center",

                }}>
                    {(this.state.selectedID === undefined) ? <Leaderboard /> : <Profile userID={this.state.selectedID} isDark={this.state.isDark} userSelect = {this.userSelectCallback} />}
                </Box>
                </Box>
            </ThemeProvider>
            </PageContext.Provider>
        );
    }
}
