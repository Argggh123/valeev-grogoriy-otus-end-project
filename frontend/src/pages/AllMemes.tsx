import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http';
import { AuthContext } from '../context/Auth';
import MemCard from '../components/MemCard';

const AllMemes = () => {
  const { request } = useHttp();
  const [memes, setMemes] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchMemes = useCallback(async () => {
    const { memesArr } = await request(`/api/memes/all`, 'GET', null, {
      Authorization: `Bearer ${token}`,
    });
    console.log(memesArr);
    setMemes(memesArr);
  }, [token, request]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  const getAllMemes = () => {
    if (!memes) {
      return null;
    }

    return memes.map((item: any, key: any) => {
      return <MemCard mem={item} key={`memCard-${key}`} />;
    });
  };

  return (
    <div>
      <h1>All Memes</h1>
      {getAllMemes()}
  </div>
  );
};

export default AllMemes;
