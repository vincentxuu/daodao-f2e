import React, { useMemo, useState, useLayoutEffect, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CATEGORIES } from '../../constants/member';
import { mapToTable } from '../../utils/helper';
import UserCard from './UserCard';
import UserTabs from './UserTabs';
import SEOConfig from '../../shared/components/SEO';
import ContactModal from './Contact';

const BottonBack = {
  color: '#536166',
  fontSize: '14px',
  position: 'absolute',
  left: '-10px',
  top: '-50px',
  boxShadow: 'unset',
  '&:hover': {
    color: '#16B9B3',
  },
  '@media (max-width: 767px)': {
    position: 'unset',
  },
};

const UserPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  console.log('params', params);
  console.log('pathname', pathname);

  const userId = pathname?.split('/')[2];
  const data = { id: userId };
  const auth = getAuth();
  // const [user, isLoadingUser] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [wantToLearnList, setWantToLearnList] = useState([]);
  const [interestAreaList, setInterestAreaList] = useState([]);
  // const [isLoading, setIsLoading] = useState(isLoadingUser);
  const [open, setOpen] = useState(false);

  const [list, setList] = useState([]);
  console.log(list);
  console.log(list?.date);
  const userURL = `http://localhost:4000/user/one_User`;
  const fetchData = async () => {
    try {
      const response = await fetch(userURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data),
      });

      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setList(jsonResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  // useLayoutEffect(() => {
  //   const db = getFirestore();
  //   if (!isLoadingUser && user?.uid) {
  //     const docRef = doc(db, 'partnerlist', user?.uid || '');
  //     getDoc(docRef).then((docSnap) => {
  //       const data = docSnap.data();
  //       console.log('data', data);
  //       setUserName(data?.userName || '');
  //       setPhotoURL(data?.photoURL || '');
  //       setDescription(data?.description || '');
  //       setWantToLearnList(data?.wantToLearnList || []);
  //       setInterestAreaList(data?.interestAreaList || []);
  //       setLocation(data?.location || '');
  //       setIsLoading(false);
  //     });
  //   }
  //   console.log(description);
  // }, [user, isLoadingUser]);

  const SEOData = useMemo(
    () => ({
      title: `${userName}的小島｜島島阿學`,
      description:
        '「島島阿學」盼能透過建立多元的學習資源網絡，讓自主學習者能找到合適的成長方法，進一步成為自己想成為的人，從中培養共好精神。目前正積極打造「可共編的學習資源平台」。',
      keywords: '島島阿學',
      author: '島島阿學',
      copyright: '島島阿學',
      imgLink: 'https://www.daoedu.tw/preview.webp',
      link: `${process.env.HOSTNAME}${router?.asPath}`,
    }),
    [router?.asPath],
  );

  // const tagList = interestAreaList.map((item) => mapToTable(CATEGORIES)[item]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(0deg, #f3fcfc, #f3fcfc), #f7f8fa',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <ContactModal
        open={open}
        // isLoadingSubmit={isLoadingSubmit}
        onClose={() => {
          setOpen(false);
          // router.push('/');
          // router.push('/partner');
        }}
        onOk={() => {
          setOpen(false);
          // router.push('/profile');
          // router.push('/profile/edit');
        }}
      />
      <SEOConfig data={SEOData} />
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Button
          variant="text"
          sx={BottonBack}
          onClick={() => {
            router.push('/partner');
          }}
        >
          <ChevronLeftIcon />
          返回
        </Button>
        <UserCard
          id={list?._id}
          date={list?.date}
          photoURL={list?.photoURL}
          name={list?.name}
          roleList={list?.roleList}
          location={list?.location}
          tagList={list?.tagList}
          share={list?.share}
          wantToDoList={list?.wantToDoList}
          educationStage={list?.educationStage}
        />
      </Box>
      <UserTabs
        contactInformationList={list?.contactInformationList}
        selfIntroduction={list?.selfIntroduction}
        share={list?.share}
        wantToDoList={list?.wantToDoList}
      />
    </Box>
  );
};

export default UserPage;
