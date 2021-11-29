import * as React from "react";
import { getGames } from "./generalUtils";
import {
    Chip,
    Box,
    Input,
} from '@mui/material';
import PageContext from "./PageContext";

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

    componentDidUpdate(prevProps) {
        if(this.props.userID !== prevProps.userID) {
            this.componentDidMount()
        }
    }

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

    handleGameDelete(selectedGame) {
        this._isMounted && this.setState({
            games: this.state.games.filter(function(game) {
                return game.game_name !== selectedGame
            })
        })
        // this.props.setGames(this.state.games)
    }

    handleGameAdd() {
        this._isMounted && this.setState({
            games: [...this.state.games, [this.props.userID, ""]]
        })
        // this.props.setGames(this.state.games)
    }
    
    // handleGameEdit(selectedGameIndex) {
    //     this._isMounted && this.setState({
    //         games: this.state.games.
    //     })
    // }

    render() {
        const hasGames = !(this.state.games === undefined)
        return (
            <PageContext.Consumer>
                {({loginId})=> (
                    <React.Fragment>
                        {hasGames && this.props.userID === loginId ? (
                            <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                            }}>
                                {
                                this.state.games.sort((a, b) => b.game_name - a.game_name).map((game) => (
                                    <Chip 
                                        key={game.game_name}
                                        onDelete={() => this.handleGameDelete(game.game_name)}
                                        label={
                                            <Input
                                                defaultValue={game.game_name}
                                                disableUnderline={true}
                                                // onChange={()=> {handleGameEdit(game.game_name)}}
                                                size="small"
                                                sx={{ padding: 0}}
                                                />
                                        }
                                        size="small"
                                        sx={{margin: "2px"}}
                                    />
                                ))}

                                <Chip
                                    key="add"
                                    onClick={(event) => this.handleGameAdd()}
                                    label="+"
                                    size="small"
                                    sx={{margin: "2px"}}
                                />
                            </Box>
                        ) : 
                        hasGames && !(this.props.userID === loginId) ? (
                            <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                listStyle: 'none',
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
                            }}>
                                <Chip label={this.state.error} size="small" />
                            </Box>
                        )}
                    </React.Fragment>
                )}
            </PageContext.Consumer>
        );
    }
}

export default User;
