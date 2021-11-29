import * as React from "react";
import { changeBio, getUserInfo } from "./generalUtils";
import {
    Typography,
    Paper,
    Avatar,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Button,
} from '@mui/material';
import UserTransactions from './UserTransactions';
import UserGames from './UserGames';
import PageContext from "./PageContext";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            user: undefined,
            error: "Loading...",
            defaultBio: "We don't know much about this person, but they must be pretty cool!",
            bio: undefined,
        };
        this._isMounted = false;
    };

    componentDidUpdate(prevProps) {
        if(this.props.userID !== prevProps.userID) {
            this.componentDidMount()
        }
    }

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

    handleBioChange = (e) => {
        this._isMounted && this.setState({
            bio: e.target.value,
        })
    }

    render() {
        const isUser = !(this.state.user === undefined)
        return (
            <Paper elevation={5} sx={{padding: 2}}>
                {isUser ? (
                <React.Fragment>
                    <PageContext.Consumer>
                        {({loginId, expiration, token})=> (
                            <React.Fragment>
                                {this.state.user.user_id === loginId ? (
                                    <React.Fragment>
                                        <Grid container spacing={2} sx={{margin: 2, padding: 2}}>
                                            <Grid item xs={5}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <Avatar alt={this.state.user.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
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
                                            <Grid item xs={5}>
                                                <Typography variant="h4">
                                                    Bio:
                                                </Typography>
                                                <FormControl sx={{ m: 1, width: "80%", height: "100%" }}>
                                                    <InputLabel htmlFor="filled-adornment-amount">Edit</InputLabel>
                                                    <OutlinedInput
                                                        defaultValue={this.state.user.bio}
                                                        multiline
                                                        rows={3}
                                                        onChange={(event) => {this.handleBioChange(event)}}
                                                        label="Bio"
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button 
                                                    variant="contained"
                                                    onClick={() => {changeBio(loginId, this.state.bio, token)}}
                                                >
                                                    Send Changes
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    <UserTransactions userID={this.state.user.user_id} />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                        <Grid container spacing={2} sx={{margin: 2, padding: 2}}>
                                            <Grid item xs={5}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <Avatar alt={this.state.user.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
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
                            )}
                        </React.Fragment>
                        )}
                    </PageContext.Consumer>
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
