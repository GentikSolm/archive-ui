import * as React from "react";
import { getUserInfo } from "./generalUtils";
import {
    Typography,
    Paper,
    Avatar,
} from '@mui/material';
import UserTransactions from './UserTransactions';
import UserGames from './UserGames';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            user: undefined,
            error: "Loading...",
        };
        this._isMounted = false;
    };

    async componentDidMount() {
        this._isMounted = true;

        var result = await getUserInfo(this.props.userID)
        if(result){
            this._isMounted && this.setState({
                isUser: true,
                user: result.data.user
            });
        }
        else{
            this._isMounted && this.setState({
                isUser: false,
                user: undefined,
                error: "There was an error loading this user! Have they interacted with Reppo yet?"
            })
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        const isUser = !(this.state.user === undefined)
        return (
            <Paper elevation={5} sx={{padding: 2}}>
                {isUser ? (
                    <React.Fragment>
                        <Typography sx={{display: 'flex', justifyContent: 'left', margin: 2, padding: 4}}>
                            <Avatar alt={this.state.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
                                width: 80,
                                height: 80,
                            }} />
                            <Typography variant="h4" sx={{padding: 1}}>
                                {this.state.user.username}
                                <Typography sx={{display: "flex", padding: 1, fontSize: "small"}}>
                                    {"Rep: " + this.state.user.rep}
                                    <Typography sx={{display: "flex", paddingLeft: 2, fontSize: "small"}}>
                                        {"Transactions: " + this.state.user.total_trans}
                                    </Typography>
                                </Typography>
                                <UserGames userID={this.state.user.user_id} />
                            </Typography>
                            <Typography sx={{padding: 2}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Typography>
                        </Typography>
                        <UserTransactions userID={this.state.user.user_id} />
                    </React.Fragment>
                ) : (
                    <Typography variant="h3" sx={{display: 'flex', justifyContent: 'center', margin: 2, padding: 3}}>
                        {this.state.error}
                    </Typography>
                )}
            </Paper>
        );
    }
}

export default Profile;
