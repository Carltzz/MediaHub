import React, { useEffect } from 'react'
import { useAppContext } from '../ApplicationContext';
import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  const { setAppState } = useAppContext();
  useEffect(() => {
    setAppState(prevState => ({
      ...prevState,
      menuBarHidden: false
    }));
  }, [setAppState]);

  return (
    <div className="home-screen">
      <SearchBar style={{}}/>
    </div>
  );
};

export default Home;
