import * as React from "react";
import './App.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });
const drawerWidth = 240;

function createData(name, points) {
  return { name, points };
}

const rows = [
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ display: 'flex' }}>
            <AppBar
              position="fixed"
              sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  <Paper elevation={5} sx={{
                    bgcolor: 'background.default',
                    lineHeight: '60px',
                    minWidth: '100%',
                    height: 60,
                    gap: 2,
                    textAlign: "center",
                    padding: '5px',
                  }}>
                  {'Record Reppo Recipients'}
                  </Paper>
                  
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Toolbar />
              <Divider />
              <List>
                <ListItem>
                  <Button 
                  variant="outlined"
                  color="secondary"
                  sx={{
                    float: "right",
                    margin: 1,
                    width: "100%",
                  }}
                  onClick={() => {
                    alert('Login with Discord');
                  }}>
                    {'Login with Discord'}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button 
                  variant="outlined"
                  color="secondary"
                  sx={{
                    float: "right",
                    margin: 1,
                    width: "100%",
                  }}
                  onClick={() => {
                    alert('View my Profile');
                  }}>
                    {'View my Profile'}
                  </Button>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem>
                  <Button 
                  variant="outlined"
                  color="secondary"
                  sx={{
                    float: "right",
                    margin: 1,
                    width: "100%",
                  }}
                  onClick={() => {
                    alert('View Leaderboard');
                  }}>
                    {'View Leaderboard'}
                  </Button>
                </ListItem>
                <ListItem>
                  <Button 
                  variant="outlined"
                  color="secondary"
                  sx={{
                    float: "right",
                    margin: 1,
                    width: "100%",
                  }}
                  onClick={() => {
                    alert('View Transactions');
                  }}>
                    {'View Transactions'}
                  </Button>
                </ListItem>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
              <Toolbar />
                  
              <body>
                <ThemeProvider theme={darkTheme}>
                <Paper elevation={3} sx={{
                    bgcolor: 'background.default',
                    lineHeight: '60px',
                    minWidth: '100%',
                    gap: 2,
                    textAlign: "center",
                    padding: '5px',
                  }}>
                  <form className="search" noValidate autoComplete="off">
                    <TextField
                      id="searchBar"
                      label="Search For a User"
                      variant="filled"
                      color="secondary"
                      sx={{width: '80%'}}
                    />
                  </form>
                  <TableContainer component={Paper} elevation={2}>
                    <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left" color="secondary">Rank</TableCell>
                          <TableCell align="left" color="secondary">Name</TableCell>
                          <TableCell align="left" color="secondary">Points</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" >
                            {1}
                          </TableCell>
                          <TableCell align="left">{"First place!"}</TableCell>
                          <TableCell align="left">{"100,000,001"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" >
                            {2}
                          </TableCell>
                          <TableCell align="left">{"Second place!!"}</TableCell>
                          <TableCell align="left">{"588,2353"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" >
                            {3}
                          </TableCell>
                          <TableCell align="left">{"Third place!"}</TableCell>
                          <TableCell align="left">{"17"}</TableCell>
                        </TableRow>
                        
                        {rows.map((row, index) => (
                          
                          <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 4}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </Paper>
                </ThemeProvider>
              </body>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
