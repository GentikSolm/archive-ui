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
            result.data.games = result.data.games.map((element, index) => {return {...element, index: index}});
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
        console.log(this.state.games)
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleGameDelete(index) {
        this._isMounted && this.setState({
            games: this.state.games.filter(function(game) {
                return game.index !== index
            })
        })
        // this.props.setGames(this.state.games)
    }

    handleGameAdd() {
        this._isMounted && this.setState({
            games: [...this.state.games, {user_id: this.props.userID, game_name: "", index: this.state.games.length+1}]
        })
        // this.props.setGames(this.state.games)
    }

    handleGameEdit(e, index) {
        console.log(e.target.value)
        var objIndex = this.state.games.findIndex((game => game.index === index));
        var games = this.state.games;
        games[objIndex].game_name = e.target.value;
        this._isMounted && this.setState({
            games: games
        })
    }

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
                                        key={game.index}
                                        onDelete={() => this.handleGameDelete(game.index)}
                                        label={
                                            <Input
                                                defaultValue={game.game_name}
                                                disableUnderline={true}
                                                onChange={(e)=> {this.handleGameEdit(e, game.index)}}
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
                            <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',}}>
                            {this.state.games.sort((a, b) => b.game_name - a.game_name).map((game, index) => (
                                <Chip key={index} label={game.game_name} size="small" sx={{margin: "2px"}} />))}
                            </Box>
                        ) : (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',}}>
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
