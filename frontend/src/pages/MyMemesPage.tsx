import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http';
import { AuthContext } from '../context/Auth';
import Loader from '../components/Loader';
import MemCard from '../components/MemCard';

const MyMemesPage = () => {
  const [memes, setMemes] = useState(null);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchMemes = useCallback(async (token) => {
    try {
      const memesArr = await request(
        `/api/memes/`,
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        },
      );
      setMemes(memesArr);
    } catch (e) {
      console.log(e.message);
    }
  }, [request]);
  useEffect(() => {
    fetchMemes(token);
  }, [fetchMemes]);

  const getMemes = (memes: any[]) => {
    if (memes) {
      return memes.map((item, key) => (<MemCard mem={item} key={`memCard-${key}`} />));
    }
    return null;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>My Memes Page</h1>
      {getMemes(memes)}
  </div>
  );
};

export default MyMemesPage;
