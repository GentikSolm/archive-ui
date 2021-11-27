import * as React from "react";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {getTopUsers} from './generalUtils.js'

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
                    <TableContainer align='center' elevation={3}>
                        <Table align='center'>
                            <TableHead>
                                <TableRow sx={{
                                    backgroundColor: "primary.main"
                                }}>
                                    <TableCell />
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

                                    <TableCell>{}</TableCell>
                                    <TableCell component="th" scope="user">{index + 1}</TableCell>
                                    <TableCell align="left">{user.user_id}</TableCell>
                                    <TableCell align="left">{user.rep}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button>poopass</Button>
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
