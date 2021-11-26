import * as React from "react";
import Paper from '@mui/material/Paper';

class Profile extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         userID: "test"
    //     };
    // };

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
        return (
            <Paper elevation={1} sx={{
                height: '100%',
                padding: '10%',
            }}>
                user id is: {this.props.userID}
            </Paper>
        );
    }
}

export default Profile;
