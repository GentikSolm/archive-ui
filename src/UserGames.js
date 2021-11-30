import * as React from "react";
import { getGames, changeGames } from "./generalUtils";
import {
    Chip,
    Box,
    Input,
    IconButton,
    Alert,
    AlertTitle,
} from '@mui/material';
import PageContext from "./PageContext";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGames: false,
            games: undefined,
            error: "Loading...",
            alert: "",
            alertText: "",
            isEdit: false,
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
    }

    handleGameAdd() {
        this._isMounted && this.setState({
            games: [...this.state.games, {user_id: this.props.userID, game_name: "", index: this.state.games.length+1}]
        })
    }

    handleGameEdit(e, index) {
        var objIndex = this.state.games.findIndex((game => game.index === index));
        var games = this.state.games;
        games[objIndex].game_name = e.target.value;
        this._isMounted && this.setState({
            games: games
        })
    }

    sendAlert = (levelId, details) =>{
        var level = "";
        if(levelId === 1){
            level = "success";
        }
        else if(levelId === 2){
            level = "warning";
        }
        else{
            level = "error";
        }
        this.setState({
            alert: level,
            alertText: details
        });
        setTimeout(async ()=> {await this.setState({alert: "", alertText: ""})}, 3000);
    }

    changeGames = async (loginId, games, token) =>{
        const gameNames = games.map((game)=>{
            return game.game_name;
        });
        try{
            var result = await changeGames(loginId, gameNames, token)
            if(result.errors){
                throw new Error("500")
            }
            this.sendAlert(1, "Successfully updated Games");
        }
        catch(e){
            this.sendAlert(3, "Failed to update Games");
        }
    }

    render() {
        const hasGames = !(this.state.games === undefined)
        return (
            <PageContext.Consumer>
                {({loginId, token})=> (
                    <React.Fragment>
                        {hasGames && this.props.userID === loginId ? (
                            <React.Fragment>
                                {this.state.isEdit ? (
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
                                        <IconButton size="small" onClick={()=>{this.handleGameAdd()}}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={
                                            ()=>{
                                                this.setState({isEdit:false});
                                                this.changeGames(loginId, this.state.games, token)
                                            }
                                        }>
                                            <SaveIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton onClick={
                                            ()=>{
                                                this.setState({isEdit:false})
                                                this.componentDidMount()
                                            }
                                        }>
                                            <CancelIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                ) :(
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
                                                label={game.game_name}
                                                size="small"
                                                sx={{margin: "2px"}}
                                            />
                                        ))}

                                        <IconButton size="small" onClick={()=>{this.setState({isEdit:true})}}>
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </Box>
                                )}
                            </React.Fragment>
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
                        {this.state.alert !== "" ? (

                        <Alert severity={this.state.alert} sx={{position: 'fixed', bottom: 0, right: 0}}>
                        <AlertTitle>{this.state.alert.charAt(0).toUpperCase() + this.state.alert.slice(1)}</AlertTitle>
                        {this.state.alertText}
                        </Alert>
                        ):(
                        ""
                        )}
                    </React.Fragment>
                
                
                    
                )}
            </PageContext.Consumer>
        );
    }
}

export default User;
