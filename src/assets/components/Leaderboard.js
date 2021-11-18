import * as React from "react";
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(name, points) {
  return { name, points };
}

const rows = [
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
  createData("name", "points"),
];

class Leaderboard extends React.Component {
  render() {
    return (
      <div className="LeaderBoard">
        <TableContainer component={Paper} align='center' elevation={3} sx={{
          width: '100%',
          }}>
          <Table aria-label="simple table" align='center'sx={{
            width: '100%',
            }}>
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{
                color: "#5865F2",
              }}>Rank</TableCell>
                <TableCell align="left" sx={{
                color: "#5865F2",
              }}>Name</TableCell>
                <TableCell align="left" sx={{
                color: "#5865F2",
              }}>Points</TableCell>
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
      </div>
    );
  }
}

export default Leaderboard;
