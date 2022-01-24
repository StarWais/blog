import type { NextPage } from 'next';
import TopContent from '../components/pages/Home/TopContent';

const Home: NextPage = () => {
  return (
    <TopContent
      title="Make better coffee"
      description="why learn how to blog?"
      imageLink="/mainpage-top.svg"
    />
  );
};

export default Home;
