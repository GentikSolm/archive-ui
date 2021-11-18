import * as React from "react";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as DiscordIcon} from '../icons/Discord-Logo-White.svg';
import TextField from '@mui/material/TextField';

class Header extends React.Component {
    render() {
        return (
            <Paper elevation={3} sx={{
              bgcolor: 'background.default',
              lineHeight: '10%',
              minWidth: '100%',
              height: 60,
              gap: 2,
              textAlign: "center",
              padding: '5px',
              display: 'inline-block',
            }}>
              <form className="search" noValidate autoComplete="off">
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
              </form>
            </Paper>
        );
    }
}

export default Header;
