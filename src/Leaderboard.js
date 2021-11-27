import * as React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Typography,
    Button,
    Avatar,
} from '@mui/material';
import {getTopUsers, validAvatar} from './generalUtils.js'

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: undefined,
            limit: 10,
            offset: 0,
            selectedID: "",
            error: "Loading...",
            indexLimiter: 10,
        };
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;

        var result = await getTopUsers()
        if(result){
            this._isMounted && this.setState({
                users: result.data.users
            });
        }
        else{
            this._isMounted && this.setState({
                error: "Error loading users!"
            })
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        const isUsers = !(this.state.users === undefined)
        const indexLimiter = (isUsers && (this.state.users.length <= this.state.indexLimiter ? this.state.users.length : this.state.indexLimiter))
        return (
            <Paper elevation={5}>
            {isUsers ? (
                <React.Fragment>
                    <TableContainer align='center'>
                        <Table align='center'>
                            <TableHead>
                                <TableRow sx={{
                                    backgroundColor: "primary.main"
                                }}>
                                    <TableCell sx={{width: 5}} />
                                    <TableCell align="left" sx={{
                                        color: "text.head",
                                        fontWeight: 'bold'
                                        }}>Rank</TableCell>
                                    <TableCell align="left" sx={{
                                        color: "text.head",
                                        fontWeight: 'bold'
                                        }}>Name</TableCell>
                                    <TableCell align="left" sx={{
                                        color: "text.head",
                                        fontWeight: 'bold'
                                        }}>Rep</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                this.state.users.sort((a, b) => b.rep - a.rep).slice(0, this.state.indexLimiter).map((user, index) => (
                                <TableRow
                                    key={index}
                                    hover
                                    onClick={(event) => this.props.userSelect(user.user_id)}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>

                                    <TableCell align="left"><Avatar alt={this.state.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar}?size=480`}/></TableCell>
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left">{user.username}</TableCell>
                                    <TableCell align="left">{user.rep}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {this.state.indexLimiter > 10 ? (
                        <Button variant="outlined">view 5 less</Button>
                    ): (<div></div>)}
                    <Button 
                        variant="contained" 
                        onClick={(event) => {this.state.indexLimiter = this.state.indexLimiter + 5}}
                        sx={{
                            margin: 2
                        }}>
                            view 5 more
                    </Button>
                </React.Fragment>
            ):(
                <Typography variant="h2" sx={{display: 'flex', justifyContent: 'center', margin: 2, padding: 3}}>
                    {this.state.error}
                </Typography>

            )}
            </Paper>
        );
    }
}
