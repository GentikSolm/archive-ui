import * as React from "react";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon} from '../icons/Discord-Logo-White.svg';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default class Header extends React.Component {
    render() {
        return (
            <AppBar>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant="text" color='secondary' sx={{
                        fontSize: '25px',
                        float: 'left',
                        margin: '5px',
                    }}>
                      Reppo
                    </Button>
                    <TextField
                        id="searchBar"
                        label="Search For a User"
                        variant="filled"
                        color="secondary"
                        sx={{
                            width: '40%',
                            float: 'center'
                        }}/>
                    <IconButton aria-label="discord" sx={{
                        height: "40px",
                        width: "60px",
                        float: "right",
                        margin: '10px',
                    }}>
                      <DiscordIcon color='secondary' />
                    </IconButton >
                </Toolbar>
            </AppBar>
        );
    }
}
