import * as React from "react";
import { changeBio, getUserInfo } from "./generalUtils";
import {
    Typography,
    Paper,
    Avatar,
    Grid,
    FormControl,
    InputLabel,
    OutlinedInput,
    Box,
    Alert,
    AlertTitle,
    IconButton,
    Chip,
    Button
} from '@mui/material';
import UserTransactions from './UserTransactions';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import UserGames from './UserGames';
import PageContext from "./PageContext";
import "./loader.css"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            user: undefined,
            error: "",
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

    changeBio = async (loginId, bio, token) => {
        try{
            var result = await changeBio(loginId, bio, token)
            if(result.errors){
                throw new Error("500")
            }
            this.sendAlert(1, "Successfully updated Bio");
        }
        catch(e){
            this.sendAlert(3, "Failed to update Bio");
            this.componentDidMount();
        }
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

    handleBioChange = (e) => {
        this._isMounted && this.setState({
            user: {...this.state.user, bio:e.target.value}
        })
    }

    render() {
        const isUser = !(this.state.user === undefined)
        return (
            <Paper elevation={5} sx={{padding: 2}}>
                {isUser ? (
                <React.Fragment>
                    <PageContext.Consumer>
                        {({loginId, token, setGames})=> (
                            <React.Fragment>
                                {this.state.user.user_id === loginId ? (
                                    <React.Fragment>
                                    <Grid container spacing={2} sx={{marginTop: 2,marginLeft: 1, padding: 2}}>
                                        <Grid item xs={4}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2} sx={{marginRight: 3}}>
                                                        <Avatar alt={this.state.user.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
                                                            width: 80,
                                                            height: 80,
                                                        }} />
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <Grid container spacing={1} justifyContent="flex-start">
                                                            <Grid item xs={12}>
                                                                <Typography variant="h4">
                                                                {this.state.user.username}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={7}>
                                                                <Chip sx={{fontWeight: 'bold', marginRight: 2}} color={"primary"} label={"Rep: " + this.state.user.rep} size="large" />
                                                                <Chip sx={{fontWeight: 'bold'}} color={"primary"} label={"Transactions: " + this.state.user.total_trans} size="large" />
                                                            </Grid>
                                                            <Grid item xs={8} sx={{display: "flex"}}>
                                                                <UserGames setGames={setGames} userID={this.state.user.user_id} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Grid item xs={12} sx={{display: "inline-flex"}}>
                                                    <Typography variant="h4">
                                                        Bio:
                                                    </Typography>
                                                    {!this.state.isEdit ? (
                                                        <IconButton onClick={()=>{this.setState({isEdit:true})}}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    ) : (
                                                        <Box>
                                                            <IconButton onClick={
                                                                ()=>{
                                                                    this.setState({isEdit:false});
                                                                    this.changeBio(loginId, this.state.user.bio, token)
                                                                }
                                                            }>
                                                                <SaveIcon/>
                                                            </IconButton>
                                                            <IconButton onClick={
                                                                ()=>{
                                                                    this.setState({isEdit:false})
                                                                    this.componentDidMount()
                                                                }
                                                            }>
                                                                <CancelIcon/>
                                                            </IconButton>
                                                        </Box>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {this.state.isEdit ? (
                                                        <FormControl sx={{ m: 1, width: "80%", height: "100%" }}>
                                                            <InputLabel htmlFor="filled-adornment-amount">Edit</InputLabel>
                                                            <OutlinedInput
                                                                defaultValue={this.state.user.bio}
                                                                multiline
                                                                rows={3}
                                                                onChange={(event) => {this.handleBioChange(event)}}
                                                                label="Bio"
                                                            />
                                                        </FormControl>
                                                    ) : (
                                                        <Typography>
                                                            {this.state.user.bio}
                                                        </Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    <UserTransactions userID={this.state.user.user_id} />
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                        <Grid container spacing={2} sx={{marginTop: 2,marginLeft: 1, padding: 2}}>
                                            <Grid item xs={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={2} sx={{marginRight: 3}}>
                                                        <Avatar alt={this.state.user.username} color='secondary' src={`https://cdn.discordapp.com/avatars/${this.state.user.user_id}/${this.state.user.avatar}?size=480`} sx={{
                                                            width: 80,
                                                            height: 80
                                                        }} />
                                                    </Grid>
                                                    <Grid item xs={9}>
                                                        <Grid container spacing={1} justifyContent="flex-start">
                                                            <Grid item xs={12}>
                                                                <Typography variant="h4">
                                                                {this.state.user.username}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                            <Chip sx={{fontWeight: 'bold', marginRight: 2}} color={"primary"} label={"Rep: " + this.state.user.rep} size="large" />
                                                            <Chip sx={{fontWeight: 'bold'}} color={"primary"} label={"Transactions: " + this.state.user.total_trans} size="large" />
                                                            </Grid>
                                                            <Grid item xs={10} sx={{display: "flex"}}>
                                                                <UserGames setGames={setGames} userID={this.state.user.user_id} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography variant="h4">
                                                    Bio:
                                                </Typography>
                                                <Typography sx={{marginRight: 5}}>
                                                    {this.state.user.bio != null ? this.state.user.bio : "We don't know much about this person, but they must be pretty cool!"}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <div style={{width: '30%', display: 'flex', justifyContent: 'center', marginBottom: 10}}>
                                        <Button variant="contained" color="success" sx={{marginRight: 4, width: '25%'}}>
                                        Thank
                                        </Button>
                                        <Button variant="contained" color="error" sx={{width: '25%'}}>
                                        Curse
                                        </Button>
                                        </div>
                                    <UserTransactions userID={this.state.user.user_id} />
                                </React.Fragment>
                            )}
                        </React.Fragment>
                        )}
                    </PageContext.Consumer>
                </React.Fragment>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    {this.state.error === "" ? (
                        <PageContext.Consumer>
                        {({isDark})=>(
                            <div className="lds-ellipsis">
                            <div style={{background: (isDark ? "white" : "#2c2f33")}}></div>
                            <div style={{background: (isDark ? "white" : "#2c2f33")}}></div>
                            <div style={{background: (isDark ? "white" : "#2c2f33")}}></div>
                            <div style={{background: (isDark ? "white" : "#2c2f33")}}></div>
                            </div>
                        )}
                        </PageContext.Consumer>                    ):(
                        <Typography>
                        {this.state.error}
                        </Typography>
                    )}
                    </div>
                )}
                {this.state.alert !== "" ? (

                    <Alert severity={this.state.alert} sx={{position: 'fixed', bottom: 0, right: 0}}>
                      <AlertTitle>{this.state.alert.charAt(0).toUpperCase() + this.state.alert.slice(1)}</AlertTitle>
                      {this.state.alertText}
                    </Alert>
                ):(
                    ""
                )}
            </Paper>
        );
    }
}

export default Profile;
