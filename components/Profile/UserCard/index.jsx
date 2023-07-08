import { Box, Button, Chip, Skeleton, Typography } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LOCATION from '../../../constants/countries.json';
import { EDUCATION_STAGE, ROLE } from '../../../constants/member';

const BottonEdit = {
  color: '#536166',
  fontSize: '14px',
  position: 'absolute',
  right: '30px',
  top: '30px',
  boxShadow: 'unset',
  borderRadius: '20px',
  '&:hover': {
    color: '#16B9B3',
  },
  '@media (max-width: 767px)': {
    position: 'absolute',
    right: '25%',
    top: '252%',
    width: '160px',
  },
};

function Tag({ label }) {
  return (
    <Chip
      label={label}
      value={label}
      sx={{
        backgroundColor: '#fff',
        opacity: '80%',
        cursor: 'pointer',
        margin: '5px',
        whiteSpace: 'nowrap',
        fontWeight: 500,
        fontSize: '16px',
        bgcolor: 'rgb(219, 237, 219)',
        '&:hover': {
          opacity: '100%',
          backgroundColor: '#fff',
          transition: 'transform 0.4s',
        },
      }}
    />
  );
}
function UserCard({
  isLoading,
  tagList,
  educationStepLabel,
  photoURL,
  userName,
  location,
}) {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '720px',
          padding: '40px 30px ',
          bgcolor: '#fff',
          borderRadius: '20px',
          '@media (max-width: 767px)': {
            width: '316px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Skeleton
            sx={{
              height: '80px',
              width: '80px',
              background: 'rgba(240, 240, 240, .8)',
              marginTop: '4px',
            }}
            variant="circular"
            animation="wave"
          />
          <Button variant="outlined" sx={BottonEdit}>
            <EditOutlinedIcon />
            編輯
          </Button>
          <Box sx={{ marginLeft: '12px' }}>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
            <Typography
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '12px',
              }}
            >
              <LocationOnOutlinedIcon sx={{ marginRight: '10px' }} />{' '}
              <Skeleton variant="text" width={200} />
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: '24px' }}>
          <Skeleton variant="text" width={200} />
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        width: '720px',
        padding: '40px 30px ',
        bgcolor: '#fff',
        borderRadius: '20px',
        '@media (max-width: 767px)': {
          width: '316px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <LazyLoadImage
          alt="login"
          src={user.photoURL || ''}
          height={80}
          width={80}
          effect="opacity"
          style={{
            borderRadius: '100%',
            background: 'rgba(240, 240, 240, .8)',
            objectFit: 'cover',
            objectPosition: 'center',
            minHeight: '80px',
            minWidth: '80px',
          }}
          placeholder={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Skeleton
              sx={{
                height: '80px',
                width: '80px',
                background: 'rgba(240, 240, 240, .8)',
                marginTop: '4px',
              }}
              variant="circular"
              animation="wave"
            />
          }
        />
        <Button
          variant="outlined"
          sx={BottonEdit}
          onClick={() => {
            router.push('/profile');
          }}
        >
          <EditOutlinedIcon />
          編輯
        </Button>
        <Box sx={{ marginLeft: '12px' }}>
          <Typography
            sx={{
              color: '#536166',
              fontSize: '18px',
              margin: '10px 8px 0px 0px ',
            }}
          >
            {user.name || '-'}
          </Typography>
          <Button
            variant="contained"
            disabled
            size="small"
            sx={{
              height: '24px',
              fontSize: '14px',
              margin: '0px 0px 5px 8px ',
            }}
          >
            {EDUCATION_STAGE.find((item) => item.value === user.educationStage)
              ?.label || '-'}
          </Button>
          <Typography component="p" sx={{ color: '#92989A' }}>
            {ROLE.find((item) => item.value === user.roleList[0])?.label || '-'}
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
              (item) =>
                item.alpha2 === user.location || item.alpha3 === user.location,
            )?.country || '-'}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          '@media (max-width: 767px)': { flexDirection: 'column' },
        }}
      >
        <Box
          sx={{
            '@media (max-width: 767px)': { display: 'flex', flexFlow: 'wrap' },
          }}
        >
          {user.tagList.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Box>
        <Typography
          component="p"
          sx={{ fontSize: '12px', color: '#92989A', marginTop: '5px' }}
        >
          {moment(new Date() - 500 * 60 * 60).fromNow()}
          {/* {user.date} */}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserCard;
