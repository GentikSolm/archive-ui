import * as React from "react";
import './App.css';
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { purple } from "@mui/material/colors";
import reactDom from "react-dom";

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

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
        <header className="App-header">
          <ThemeProvider theme={darkTheme}>
            <Paper elevation={3} sx={{
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
            
          </ThemeProvider>
        </header>
        <body>
          <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper} elevation={5}>
              <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{
                    color: "#9146FF",
                  }}>Rank</TableCell>
                    <TableCell align="left" sx={{
                    color: "#9146FF",
                  }}>Name</TableCell>
                    <TableCell align="left" sx={{
                    color: "#9146FF",
                  }}>Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" >
                      {1}
                    </TableCell>
                    <TableCell align="left">{"HE WAS NUMBER ONE!"}</TableCell>
                    <TableCell align="left">{"69,420"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" >
                      {2}
                    </TableCell>
                    <TableCell align="left">{"The first of the losers!"}</TableCell>
                    <TableCell align="left">{"69,069"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" >
                      {3}
                    </TableCell>
                    <TableCell align="left">{"I mean it's kind of winning I guess"}</TableCell>
                    <TableCell align="left">{"69"}</TableCell>
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
          </ThemeProvider>
        </body>
      </div>
    );
  }
}

export default App;
