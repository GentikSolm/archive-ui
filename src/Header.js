import * as React from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon} from './icons/Discord-Logo-White.svg';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            loggedIn: 0,
            username: "",
            userAvatar: "",
            userId: ""
        }
    }
    async componentDidMount(){
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        if (!accessToken) {
            this.setState({loggedIn: false})
            return
        }

        var res = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`,
            },
        })
        res = await res.json();
        console.log(res)
        const {username, discriminator, avatar, id} = res;
        this.setState({username: username, loggedIn: true, userAvatar: avatar, userId: id})
    }
    render() {
        return (
            <AppBar>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant="text" color='secondary' sx={{
                        fontSize: '25px',
                        float: 'left',
                        margin: '5px',
                    }}>
                      Reppo
                    </Button>
                    <TextField
                        id="searchBar"
                        label="Search For a User"
                        variant="filled"
                        color="secondary"
                        sx={{
                            width: '40%',
                            float: 'center'
                        }}/>
                        <div style={{display: "flex", alignItems: "center"}}>
                        <FormControlLabel control={
                            <Switch
                                checked={this.props.checkBox}
                                onChange={this.props.handleSwitchChange}
                                />}
                            label="Dark Theme"/>
                            {this.state.loggedIn ? (
                                <React.Fragment>
                                    <Typography>
                                        Hello {this.state.username}
                                    </Typography>
                                    <IconButton aria-label="discord" sx={{
                                        height: "40px",
                                        width: "60px",
                                        float: "right",
                                        margin: '10px',
                                    }}>
                                    <Avatar alt={this.state.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.userId}/${this.state.userAvatar}.png?size=480`}/>
                                    </IconButton >
                                </React.Fragment>
                            ):(
                                <React.Fragment>
                                <Typography>
                                <a style={{color: "white"}} href="https://discord.com/api/oauth2/authorize?client_id=852589582733541416&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=token&scope=identify">Identify Yourself</a>
                                </Typography>
                                <IconButton aria-label="discord" sx={{
                                    height: "40px",
                                    width: "60px",
                                    float: "right",
                                    margin: '10px',
                                }}>
                                <DiscordIcon color='secondary' />
                                </IconButton >
                                </React.Fragment>
                            )}

                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
