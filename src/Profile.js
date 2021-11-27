import * as React from "react";
import { getUserInfo } from "./generalUtils";
import {
    Typography,
    Paper,
    Avatar,
} from '@mui/material';

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

    // https://cdn.discordapp.com/avatars/USERID/FILENAME.jpg

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
            <Paper elevation={5} sx={{}}>
                {isUser ? (
                    <React.Fragment sx={{
                        padding: 10
                    }}>
                        <Avatar alt={this.state.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
                            width: 80,
                            height: 80,
                        }} />
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
