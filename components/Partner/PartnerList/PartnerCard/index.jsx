import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Box, Typography, Divider, Skeleton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  WANT_TO_DO_WITH_PARTNER,
  CATEGORIES, ROLE
} from '../../../../constants/member';
import { mapToTable } from '../../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';


const WANT_TO_DO_WITH_PARTNER_TABLE = mapToTable(WANT_TO_DO_WITH_PARTNER);
function PartnerCard({
  id,
  image,
  name,
  subTitle,
  canShare = [],
  canTogether = [],
}) {
  const user = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        background: '#FFFFFF',
        flexBasis: 'calc(50% - 24px)',
        margin: '12px',
        '@media (max-width: 767px)': {
          height: '100% auto',
          width: 'calc(100% - 24px)',
          flexBasis: 'calc(100% - 24px)',
        },
      }}
    >
      <Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <LazyLoadImage
              alt="login"
              src={user.photoURL}
              height={50}
              width={50}
              effect="opacity"
              style={{
                borderRadius: '100%',
                background: 'rgba(240, 240, 240, .8)',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              placeholder={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Skeleton
                  sx={{
                    height: '50px',
                    width: '50px',
                    background: 'rgba(240, 240, 240, .8)',
                    marginTop: '4px',
                  }}
                  variant="circular"
                  animation="wave"
                />
              }
            />

            <Box
              sx={{
                marginLeft: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'space-between',
                height: '100%',
              }}
            >
              <Typography
                component="a"
                href="/"
                // href={`/partner/${id}`}
                sx={{ color: '#536166', fontSize: '16px', fontWeight: 500 }}
              >
                {user.name}
              </Typography>
              <Typography
                component="p"
                sx={{ color: '#92989A', fontWeight: 400, fontSize: '14px' }}
              >
                {ROLE.find(
                  (item) => item.value === user.roleList[0]
                )?.label || '-'}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: '12px',
                }}
              >
                <LocationOnOutlinedIcon sx={{ marginRight: '10px' }} />{' '}
                {LOCATION.find(
                  (item) => item.alpha2 === user.location || item.alpha3 === location,
                )?.name || '-'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: '24px' }}>
            {user.tagList.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </Box>
        </Box>
        <Box sx={{ marginTop: '8px' }}>
          <Box>
            <Typography sx={{ color: '#293A3D', fontWeight: 500 }}>
              可分享
            </Typography>
            <Typography sx={{ marginLeft: '12px', color: '#536166' }}>
              {user.share || '-'}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: '#293A3D', fontWeight: 500 }}>
              想一起
            </Typography>
            <Typography sx={{ marginLeft: '12px', color: '#536166' }}>
              {user.wantToDoList
                .map((item) => mapToTable(WANT_TO_DO_WITH_PARTNER)[item])
                .join(', ') || '-'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PartnerCard;
