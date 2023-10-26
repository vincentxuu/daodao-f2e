import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Typography, Button } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useRouter } from 'next/router';
import PartnerList from './PartnerList';
import SearchField from './SearchField';
import Banner from './Banner';

const PartnerWrapper = styled.div`
  min-height: 100vh;
  background-color: transparent;
  z-index: 100;
  margin-top: -150px;
  position: relative;
`;

function Partner() {
  const [seclectOptions, setSelectOptions] = useState({
    user: '',
    age: 18,
  });
  const [partnerList, setPartnerList] = useState([]);

  const baseUrl = `http://localhost:4000/user/all_User`;

  const fetchData = () => {
    const url = `${baseUrl}?`;
    // http://localhost:4000/user/all_User?user=''&age=18;

    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setPartnerList(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [seclectOptions]);

  return (
    <>
      <Banner />
      <PartnerWrapper>
        <Box
          sx={{
            padding: '0 10%',
          }}
        >
          <Box
            sx={{
              marginTop: '24px',
              borderRadius: '20px',
              boxShadow: '0px 4px 6px rgba(196, 194, 193, 0.2)',
              padding: '40px',
              zIndex: 2,
              background: '#fff',
            }}
          >
            <SearchField />
          </Box>
          <Box
            sx={{
              marginTop: '24px',
              borderRadius: '20px',
              boxShadow: '0px 4px 6px rgba(196, 194, 193, 0.2)',
              background: '#fff',
            }}
          >
            <PartnerList list={partnerList} setPartnerList={setPartnerList} />
          </Box>
        </Box>
      </PartnerWrapper>
    </>
  );
}

export default Partner;
