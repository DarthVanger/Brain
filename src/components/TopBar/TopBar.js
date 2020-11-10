import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LogoutButtonContainer } from 'components/LogoutButton/LogoutButtonContainer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TopBarWrapper = styled.div`
  display: flex;
  height: 5rem;
`;

export function TopBar() {
  const classes = useStyles();

  return (
    <TopBarWrapper>
      <AppBar style={{ background: '#272727' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography
            style={{ color: '#BB86FC' }}
            variant="h6"
            className={classes.title}>
            Neural Notes
          </Typography>
          <LogoutButtonContainer />

          <IconButton>
            <CloudUploadIcon
              style={{ color: '#BB86FC', 'margin-right': '10px' }}
            />
          </IconButton>
          <Link to="search">
            <IconButton>
              <SearchIcon style={{ color: '#BB86FC' }} />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </TopBarWrapper>
  );
}
