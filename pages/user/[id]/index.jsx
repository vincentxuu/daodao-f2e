import React from 'react';
import styled from '@emotion/styled';
import Navigation from '../../../shared/components/Navigation_v2';
import Footer from '../../../shared/components/Footer_v2';
import UserPage from '../../../components/UserPage';

const HomePageWrapper = styled.div`
  --section-height: calc(100vh - 80px);
  --section-height-offset: 80px;
`;

const User = () => {
  return (
    <HomePageWrapper>
      <Navigation />
      <UserPage />
      <Footer />
    </HomePageWrapper>
  );
};

export default User;
