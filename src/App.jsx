import './App.css'
import Main from './components/Main';
import Header from './components/Header';
import { Paper } from '@mui/material';
import {Switch} from '@mui/material';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState(false)
  const [colorLight, setColorLight] = useState(false)
  const [colorDark, setColorDark] = useState(false)
  function modeSet(){
    setMode(prevMode => !prevMode)
    setColorLight(prevMode => !prevMode)
    setColorDark(prevMode => !prevMode)
  }
  const theme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      colorLight: colorLight ? 'text-white' : 'text-[#333]',
      colorDark: colorDark ? 'text-[#333]' : 'text-white',
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{minHeight: '100vh'}} sx={{height: '100%'}}>
        <div className='animate'>
          <Header/>
          <Switch className='switch float-right mt-2 mr-2 opacity-0'
          checked={mode}
          onChange={modeSet}
          />
          <div className={`absolute right-2 -z-10 ${mode ? 'bg-[url(./images/sun.png)]' : 'bg-[url(./images/moon.png)]'} bg-white bg-center bg-no-repeat bg-cover rounded-xl mt-2 mr-2 w-[40px] h-[40px] inline-block border border-slate-200 opacity-70`}></div>
          <Main/>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default App;