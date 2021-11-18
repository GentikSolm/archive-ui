import * as React from "react";
import './App.css';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Leaderboard from './assets/components/Leaderboard';
import Header from './assets/components/Header';

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <header className="App-header">
            <Header />
          </header>
          <Paper elevation={1} sx={{
            height: '100%',
            padding: '10%',
          }}>
            <body>
              <Leaderboard />
            </body>
          </Paper>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
