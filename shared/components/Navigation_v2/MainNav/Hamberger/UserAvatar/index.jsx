import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Group } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useFirebase from '../../../../../../hooks/useFirebase';

const UserAvatar = ({ onCloseMenu }) => {
  const { push } = useRouter();
  // const { auth, user, signInWithFacebook, signOutWithFacebook } = useFirebase();
  const [isOpenMenu, setIsOpenMenu] = useState(null);
  const user = useSelector((state) => state.user);

  if (user?.email) {
    return (
      <IconButton
        sx={{
          margin: '0 10px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        onClick={() => {
          onCloseMenu();
          push('/profile');
        }}
      >
        <Avatar
          alt={user?.name ?? ''}
          src={user?.photoURL ?? ''}
          // onClick={(event) => setIsOpenMenu(event.currentTarget)}
        />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        sx={{ margin: '0 10px', fontSize: '16px', color: 'white' }}
        onClick={() => {
          onCloseMenu();
          push('/login');
        }}
      >
        <Group sx={{ fontSize: '30px' }} />
      </IconButton>
    );
  }
};

export default UserAvatar;
