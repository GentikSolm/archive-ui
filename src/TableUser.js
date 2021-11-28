import * as React from "react";
import { getUserInfo } from "./generalUtils";
import {
    TableCell,
    Avatar,
    IconButton,
} from '@mui/material';
import PageContext from "./PageContext";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            user: undefined,
            error: "Loading...",
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
                error: "Error loading user!"
            })
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        const isUser = !(this.state.user === undefined)
        return (
            <React.Fragment>
                {isUser ? (
                    <React.Fragment>
                        <TableCell align="left">
                            <PageContext.Consumer>
                            {({changeId})=> (
                                <IconButton onClick={() => changeId(this.state.user.user_id)}>
                                    <Avatar alt={this.state.user.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
                                        width: 30,
                                        height: 30,
                                    }} />
                                </IconButton>
                            )}
                            </PageContext.Consumer>
                        </TableCell>
                        <TableCell align="left">{this.state.user.username}</TableCell>
                    </React.Fragment>
                ) : (
                    <TableCell>
                        {this.state.error}
                    </TableCell>
                )}
            </React.Fragment>
        );
    }
}

export default User;
