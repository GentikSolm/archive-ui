import * as React from "react";
import { getUserInfo } from "./generalUtils";
import {
    Typography,
    Paper,
    Avatar,
    Grid,
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
            defaultBio: "We don't know much about this person, but they must be pretty cool!",
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
                    <Grid container spacing={2} sx={{margin: 2, padding: 2}}>
                        <Grid item xs={5}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}>
                                    <Avatar alt={this.state.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
                                        width: 80,
                                        height: 80,
                                    }} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid container spacing={1} justifyContent="flex-start">
                                        <Grid item xs={12}>
                                            <Typography variant="h4">
                                            {this.state.user.username}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7} sx={{display: "flex", justifyContent: "space-between"}}>
                                            <Typography sx={{display: "flex", fontSize: "small"}}>
                                            {"Rep: " + this.state.user.rep}
                                            </Typography>
                                            <Typography sx={{display: "flex", fontSize: "small"}}>
                                            {"Transactions: " + this.state.user.total_trans}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={8} sx={{display: "flex"}}>
                                            <UserGames userID={this.state.user.user_id} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h4">
                                Bio:
                            </Typography>
                            {this.state.user.bio != null ? (
                                <Typography sx={{marginRight: 5}}>
                                    {this.state.user.bio}
                                </Typography>
                            ) : (
                                <Typography sx={{marginRight: 5}}>
                                    {this.state.defaultBio}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
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
