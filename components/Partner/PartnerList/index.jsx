import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Typography, Divider, Skeleton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PartnerCard from './PartnerCard';

const LIST = [
  {
    name: '許浪手',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    subTitle: '實驗教育老師',
    canShare: '心智圖法',
    canTogether: '學習交流、教學相長',
    tags: ['實驗教育'],
    location: '台北市松山區',
  },
  {
    name: '許浪手2',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    subTitle: '實驗教育老師',
    canShare: '心智圖法',
    canTogether: '學習交流、教學相長',
    tags: ['實驗教育'],
    location: '台北市松山區',
  },
  {
    name: '許浪手3',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    subTitle: '實驗教育老師',
    canShare: '心智圖法',
    canTogether: '學習交流、教學相長',
    tags: ['實驗教育'],
    location: '台北市松山區',
  },
  {
    name: '許浪手4',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VyZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    subTitle: '實驗教育老師',
    canShare: '心智圖法',
    canTogether: '學習交流、教學相長',
    tags: ['實驗教育'],
    location: '台北市松山區',
  },
];



function PartnerList() {
  const [list, setList] = useState([]);

  const userURL = `http://localhost:3000/user/all_User`;

  const fetchData = () => {
    fetch(userURL, {
      method: 'GET',
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }
    })
      .then((res) => res.json())
      .then(response => {
        console.log(response);
        setList(response)
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Box sx={{ minHeight: '100vh', padding: '5%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {list.map(
          ({
            _id,
            name,
            photoURL,
            roleList,
            location,
            tagList,
            share,
            wantToDoList
          }) => (
            <PartnerCard
              key={`${_id}-${name}`}
              id={_id}
              image={photoURL}
              name={name}
              roleList={roleList}
              location={location}
              tagList={tagList}
              share={share}
              wantToDoList={wantToDoList}
            />
          ),
        )}
      </Box>
    </Box>
  );
}

export default PartnerList;
