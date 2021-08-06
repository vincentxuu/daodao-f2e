import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import PageContainer from '../shared/containers/Page';
import Navigation from '../shared/components/navigation';
import Footer from '../shared/components/footer';
import SEO from '../shared/components/seo';
import CardList from '../components/home/CardList';
import Banner from '../components/home/Banner';

const BodyWrapper = styled.div`
  background-color: #f5f5f5;
`;

const list = [
  {
    title: '語言與文學',
    link: '/category/learn/langlit',
    image: '/assets/images/cat1.jpeg',
  },
  {
    title: '數學與邏輯',
    link: '/category/learn/mathlog',
    image: '/assets/images/cat2.jpeg',
  },
  {
    title: '電腦科學',
    link: '/category/learn/infoeng',
    image: '/assets/images/cat3.jpeg',
  },
  {
    title: '自然科學',
    link: '/category/learn/natusci',
    image: '/assets/images/cat4.jpeg',
  },
  {
    title: '人文社會',
    link: '/category/learn/hum',
    image: '/assets/images/cat5.jpeg',
  },
  {
    title: '藝術',
    link: '/category/learn/art',
    image: '/assets/images/cat6.jpeg',
  },
  {
    title: '教育',
    link: '/category/learn/edu',
    image: '/assets/images/cat7.jpeg',
  },
  {
    title: '生活',
    link: '/category/learn/life',
    image: '/assets/images/cat8.jpeg',
  },
  {
    title: '運動/心理/醫學',
    link: '/category/learn/health',
    image: '/assets/images/cat9.jpeg',
  },
  {
    title: '商業與社會創新',
    link: '/category/learn/businv',
    image: '/assets/images/cat10.jpeg',
  },
  {
    title: '綜合型學習資源',
    link: '/category/learn/multires',
    image: '/assets/images/cat11.jpeg',
  },
];
const Home = ({ SEOConfig }) => {
  return (
    <BodyWrapper>
      <Head>
        <SEO config={SEOConfig} />
        {/* https://resources.daoedu.tw/media/2021/02/118222653_116618533489352_6821261858468995250_o.jpg */}
      </Head>
      <Navigation />
      <PageContainer>
        <Banner />
        <CardList list={list} />
      </PageContainer>
      <Footer />
    </BodyWrapper>
  );
};

export default Home;
