import * as React from "react";
import { getGames } from "./generalUtils";
import {
    Chip,
    Box
} from '@mui/material';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGames: false,
            games: undefined,
            error: "Loading...",
        };
        this._isMounted = false;
    };

    async componentDidMount() {
        this._isMounted = true;

        var result = await getGames(this.props.userID)
        if(result){
            this._isMounted && this.setState({
                hasGames: true,
                games: result.data.games
            });
        }
        else{
            this._isMounted && this.setState({
                hasGames: false,
                games: undefined,
                error: "Error loading games!"
            })
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render() {
        const hasGames = !(this.state.games === undefined)
        return (
            <React.Fragment>
                {hasGames ? (
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                      }}>
                        {
                        this.state.games.sort((a, b) => b.game_name - a.game_name).map((game, index) => (
                            <Chip key={index} label={game.game_name} size="small" sx={{margin: "2px"}} />
                        ))}
                    </Box>
                ) : (
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                      }}>
                        <Chip label={this.state.error} size="small" />
                    </Box>
                )}
            </React.Fragment>
        );
    }
}

export default User;
