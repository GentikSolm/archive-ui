import * as React from "react";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            limit: 10,
            offset: 0,
            isLoaded: false,
            selectedID: "",
        };
    }

    componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${"abcde"}`);
        
        fetch("http://localhost:3301/graphql", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                query: `query ExampleQuery {
                            users {
                            user_id,
                            rep
                            }
                        }`,
                // variables: {"userId":"109314596484939776"}
            }),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => {
                this.setState({
                    isLoaded: true,
                    users: result.data.users
                });
        });
    }

    render() {
        let users = this.state.users.slice(this.state.offset, this.state.limit);
        return (
            <React.Fragment>
                <TableContainer component={Paper} align='center' elevation={3}>
                    <Table align='center'>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="left" sx={{
                                    color: "#5865F2",
                                    }}>Rank</TableCell>
                                <TableCell align="left" sx={{
                                    color: "#5865F2",
                                    }}>Name</TableCell>
                                <TableCell align="left" sx={{
                                    color: "#5865F2",
                                    }}>Rep</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            users.sort((a, b) => b.rep - a.rep).map((user, index) => (
                            <TableRow
                                key={index}
                                hover
                                onClick={(event) => this.props.callback(user.user_id)}
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
            </React.Fragment>
        );
    }
}
