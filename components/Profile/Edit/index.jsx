import React, { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import Script from 'next/script';
import {
  Box,
  Typography,
  Button,
  Skeleton,
  TextField,
  Divider,
  Switch,
  TextareaAutosize,
  MenuItem,
  Select,
} from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { userUpdate } from '../../../redux/actions/user';
import SEOConfig from '../../../shared/components/SEO';
import Navigation from '../../../shared/components/Navigation_v2';
import Footer from '../../../shared/components/Footer_v2';
import {
  GENDER,
  ROLE,
  EDUCATION_STAGE,
  WANT_TO_DO_WITH_PARTNER,
  CATEGORIES,
} from '../../../constants/member';
import COUNTIES from '../../../constants/countries.json';

const HomePageWrapper = styled.div`
  --section-height: calc(100vh - 80px);
  --section-height-offset: 80px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 16px;
  margin: 0 auto;
  padding: 40px 10px;
  width: 672px;
  @media (max-width: 767px) {
    width: 80%;
    .title {
      text-overflow: ellipsis;
      width: 100%;
    }
  }
`;

function EditPage() {
  const router = useRouter();
  const auth = getAuth();
  // const [user, isLoading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [birthDay, setBirthDay] = useState(dayjs());
  const [gender, setGender] = useState('');
  const [roleList, setRoleList] = useState([]);
  const [wantToDoList, setWantToDoList] = useState([]);
  // const [interestList, setInterestList] = useState([]);
  const [educationStage, setEducationStage] = useState('-1');
  const [location, setLocation] = useState('tw');
  const [contactInformationList, setContactInformationList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selfIntroduction, setSelfIntroduction] = useState('');
  const [share, setShare] = useState('');
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log('user', user);
  useEffect(() => {
    setContactInformationList(user?.contactInformationList || []);
    setName(user?.name || '');
    setPhotoURL(user?.photoURL || '');
    setBirthDay(dayjs(user?.birthDay) || dayjs());
    setGender(user?.gender || '');
    setRoleList(user?.roleList || []);
    setWantToDoList(user?.wantToDoList || []);
    // setInterestList(user?.interestList || []);
    setEducationStage(user?.educationStage);
    setLocation(user?.location || '');
    setSelfIntroduction(user?.selfIntroduction || '');
    setShare(user?.share || '');
    setIsOpenLocation(user?.isOpenLocation || false);
    setIsOpenProfile(user?.isOpenProfile || false);
    setTagList(user?.tagList || []);
  }, [user]);

  const onUpdateUser = (successCallback) => {
    const payload = {
      contactInformationList,
      email: user.email,
      name,
      photoURL,
      birthDay: birthDay.toISOString(),
      gender,
      roleList,
      wantToDoList,
      educationStage,
      location,
      tagList,
      selfIntroduction,
      share,
      isOpenLocation,
      isOpenProfile,
      lastUpdateDate: dayjs().toISOString(),
    };

    setIsLoadingSubmit(true);
    dispatch(userUpdate(payload));
    setIsLoadingSubmit(false);
    successCallback();
  };

  const SEOData = useMemo(
    () => ({
      title: '編輯我的島島資料｜島島阿學',
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

  return (
    <HomePageWrapper>
      <SEOConfig data={SEOData} />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        sx={{
          background: 'linear-gradient(0deg, #f3fcfc, #f3fcfc), #f7f8fa',
        }}
      >
        <Box sx={{ minHeight: '100vh' }}>
          <ContentWrapper>
            <Box
              sx={{
                bgcolor: '#ffffff',
                padding: '5%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderRadius: '16px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '22px',
                  lineHeight: '140%',
                  textAlign: 'center',
                  color: '#536166',
                }}
              >
                編輯個人頁面
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '140%',
                  textAlign: 'center',
                  color: '#536166',
                  marginTop: '8px',
                }}
              >
                填寫完整資訊可以幫助其他夥伴更了解你哦！
              </Typography>
              <LazyLoadImage
                alt="login"
                src={photoURL || ''}
                // "https://imgur.com/EADd1UD.png"
                height={128}
                width={128}
                effect="opacity"
                style={{
                  marginTop: '24px',
                  borderRadius: '100%',
                  background: 'rgba(240, 240, 240, .8)',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  minWidth: '128px',
                  minHeight: '128px',
                }}
                placeholder={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Skeleton
                    sx={{
                      height: '128px',
                      width: '128px',
                      background: 'rgba(240, 240, 240, .8)',
                      marginTop: '4px',
                    }}
                    variant="circular"
                    animation="wave"
                  />
                }
              />

              <Box sx={{ marginTop: '24px', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginTop: '20px',
                  }}
                >
                  <Typography>名稱 *</Typography>
                  <TextField
                    sx={{ width: '100%' }}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginTop: '20px',
                  }}
                >
                  <Typography>生日 *</Typography>
                  <MobileDatePicker
                    label="birthDay"
                    inputFormat="YYYY/MM/DD"
                    value={birthDay}
                    onChange={(date) => setBirthDay(date)}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ width: '100%' }} label="" />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginTop: '20px',
                  }}
                >
                  <Typography>性別 *</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    {GENDER.map(({ label, value }) => (
                      <Box
                        key={label}
                        onClick={() => {
                          setGender(value);
                        }}
                        sx={{
                          border: '1px solid #DBDBDB',
                          borderRadius: '8px',
                          padding: '10px',
                          width: 'calc(calc(100% - 16px) / 3)',
                          display: 'flex',
                          justifyItems: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          ...(gender === value
                            ? {
                                backgroundColor: '#DEF5F5',
                                border: '1px solid #16B9B3',
                              }
                            : {}),
                        }}
                      >
                        <Typography sx={{ margin: 'auto' }}>{label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginTop: '20px',
                  }}
                >
                  <Typography>身份 *</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      marginTop: '10px',
                      '@media (maxWidth: 767px)': {
                        flexDirection: 'column',
                      },
                    }}
                  >
                    {ROLE.slice(0, 3).map(({ label, value }) => (
                      <Box
                        key={label}
                        onClick={() => {
                          if (roleList.includes(value)) {
                            setRoleList((state) =>
                              state.filter((data) => data !== value),
                            );
                          } else {
                            setRoleList((state) => [...state, value]);
                          }
                        }}
                        sx={{
                          border: '1px solid #DBDBDB',
                          borderRadius: '8px',
                          padding: '10px',
                          width: 'calc(calc(100% - 16px) / 3)',
                          display: 'flex',
                          justifyItems: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          ...(roleList.includes(value)
                            ? {
                                backgroundColor: '#DEF5F5',
                                border: '1px solid #16B9B3',
                              }
                            : {}),
                          '@media (maxWidth: 767px)': {
                            width: '100%',
                            margin: '10px',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            margin: 'auto',
                            ...(roleList.includes(value)
                              ? {
                                  fontWeight: 700,
                                }
                              : {}),
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      marginTop: '10px',
                      '@media (maxWidth: 767px)': {
                        flexDirection: 'column',
                      },
                    }}
                  >
                    {ROLE.slice(3).map(({ label, value }) => (
                      <Box
                        key={label}
                        onClick={() => {
                          if (roleList.includes(value)) {
                            setRoleList((state) =>
                              state.filter((data) => data !== value),
                            );
                          } else {
                            setRoleList((state) => [...state, value]);
                          }
                        }}
                        sx={{
                          border: '1px solid #DBDBDB',
                          borderRadius: '8px',
                          padding: '10px',
                          width: 'calc(calc(100% - 16px) / 3)',
                          display: 'flex',
                          justifyItems: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                          ...(roleList.includes(value)
                            ? {
                                backgroundColor: '#DEF5F5',
                                border: '1px solid #16B9B3',
                              }
                            : {}),
                          '@media (maxWidth: 767px)': {
                            width: '100%',
                            margin: '10px',
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            margin: 'auto',
                            ...(roleList.includes(value)
                              ? {
                                  fontWeight: 700,
                                }
                              : {}),
                          }}
                        >
                          {label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: '#ffffff',
                padding: '40px',
                mt: '16px',
                width: '100%',
                borderRadius: '16px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>教育階段</Typography>
                <Select
                  labelId="education-stage"
                  id="education-stage"
                  value={educationStage}
                  onChange={(event) => {
                    setEducationStage(event.target.value);
                  }}
                  // placeholder="請選擇您或孩子目前的教育階段"
                  sx={{ width: '100%' }}
                >
                  <MenuItem disabled value="-1">
                    <em>請選擇您或孩子目前的教育階段</em>
                  </MenuItem>
                  {EDUCATION_STAGE.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>居住地</Typography>
                <Select
                  labelId="location"
                  id="location"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  // placeholder="請選擇您或孩子目前的教育階段"
                  sx={{ width: '100%' }}
                >
                  <MenuItem disabled value="-1">
                    <em>請選擇居住地</em>
                  </MenuItem>
                  {COUNTIES.map(({ country, alpha2 }) => (
                    <MenuItem key={alpha2} value={alpha2}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                {/* <TextField
                  sx={{ width: '100%' }}
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                /> */}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>想和夥伴一起</Typography>
                <Box sx={{ width: '100%', marginTop: '12px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    {WANT_TO_DO_WITH_PARTNER.slice(0, 3).map(
                      ({ label, value }) => (
                        <Box
                          key={label}
                          onClick={() => {
                            if (wantToDoList.includes(value)) {
                              setWantToDoList((state) =>
                                state.filter((data) => data !== value),
                              );
                            } else {
                              setWantToDoList((state) => [...state, value]);
                            }
                          }}
                          sx={{
                            border: '1px solid #DBDBDB',
                            borderRadius: '8px',
                            padding: '10px',
                            width: 'calc(calc(100% - 16px) / 3)',
                            display: 'flex',
                            justifyItems: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            ...(wantToDoList.includes(value)
                              ? {
                                  backgroundColor: '#DEF5F5',
                                  border: '1px solid #16B9B3',
                                }
                              : {}),
                          }}
                        >
                          <Typography sx={{ margin: 'auto' }}>
                            {label}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      marginTop: '12px',
                    }}
                  >
                    {WANT_TO_DO_WITH_PARTNER.slice(3).map(
                      ({ label, value }) => (
                        <Box
                          key={label}
                          onClick={() => {
                            if (wantToDoList.includes(value)) {
                              setWantToDoList((state) =>
                                state.filter((data) => data !== value),
                              );
                            } else {
                              setWantToDoList((state) => [...state, value]);
                            }
                          }}
                          sx={{
                            border: '1px solid #DBDBDB',
                            borderRadius: '8px',
                            padding: '10px',
                            width: 'calc(calc(100% - 16px) / 3)',
                            display: 'flex',
                            justifyItems: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            ...(wantToDoList.includes(value)
                              ? {
                                  backgroundColor: '#DEF5F5',
                                  border: '1px solid #16B9B3',
                                }
                              : {}),
                          }}
                        >
                          <Typography sx={{ margin: 'auto' }}>
                            {label}
                          </Typography>
                        </Box>
                      ),
                    )}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>可以和夥伴分享的事物</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder="ex.  自學申請、學習方法、學習資源，或各種學習領域的知識"
                  value={share}
                  onChange={(event) => {
                    setShare(event.target.value);
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>標籤</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder="搜尋或新增標籤"
                  value={tagList}
                  onChange={(event) => {
                    setTagList(event.target.value);
                  }}
                />
                <Typography
                  sx={{ color: '#92989A', fontWeight: 400, fontSize: '14px' }}
                >
                  可以是學習領域、興趣等等的標籤，例如：音樂創作、程式語言、電繪、社會議題。
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>社群軟體</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder="https://"
                  value={contactInformationList}
                  onChange={(event) => {
                    setContactInformationList(event.target.value);
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: '20px',
                }}
              >
                <Typography>個人簡介</Typography>
                <TextareaAutosize
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '10px',
                    borderRadius: '8px ',
                    border: '1px solid #DBDBDB',
                  }}
                  placeholder="寫下關於你的資訊，讓其他島民更認識你！也可以多描述想和夥伴一起做的事喔！"
                  value={selfIntroduction}
                  onChange={(event) => {
                    setSelfIntroduction(event.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: '#ffffff',
                padding: '40px',
                mt: '16px',
                width: '100%',
                borderRadius: '16px',
              }}
            >
              <Box
                sx={{
                  border: '1px solid #DBDBDB',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  padding: '13px 16px',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#293A3D',
                  }}
                >
                  公開顯示居住地
                </Typography>
                <Switch
                  checked={isOpenLocation}
                  onChange={(_, value) => {
                    setIsOpenLocation(value);
                  }}
                />
              </Box>
              <Box
                sx={{
                  border: '1px solid #DBDBDB',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '13px 16px',
                  marginTop: '16px',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#293A3D',
                  }}
                >
                  公開個人頁面尋找夥伴
                </Typography>
                <Switch
                  checked={isOpenProfile}
                  onChange={(_, value) => {
                    setIsOpenProfile(value);
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: '24px',
                width: '100%',
                display: 'flex',
              }}
            >
              <Button
                sx={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '20px',
                  color: '#ffff',
                  bgcolor: '#16B9B3',
                  mr: '8px',
                }}
                variant="contained"
                onClick={() => {
                  router.push('/profile/myprofile');
                }}
              >
                查看我的頁面
              </Button>
              <Button
                sx={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '20px',
                  ml: '8px',
                }}
                variant="outlined"
                disabled={isLoadingSubmit}
                onClick={() => {
                  onUpdateUser(() => router.push('/profile'));
                }}
              >
                儲存資料
              </Button>
            </Box>
          </ContentWrapper>
        </Box>
      </LocalizationProvider>
    </HomePageWrapper>
  );
}

export default EditPage;
