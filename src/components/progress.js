import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme.js'
import '../App.css'

export default class Progress extends React.Component {
  LinearProgressWithLabel = props => {
    return (
      <Box 
        display="flex" 
        alignItems="center" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0
        }} 
      >
        <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" {...props} >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  render() {
    return (
      <div className="progress">
        <MuiThemeProvider theme={theme} >
          <CircularProgress 
            style={{
              position: 'absolute',
              top: '45%',
            }} 
            color="secondary"
          />
          <this.LinearProgressWithLabel
            value={this.props.progress} 
            color="secondary"
          />
        </MuiThemeProvider>
      </div>
    )
  }
}