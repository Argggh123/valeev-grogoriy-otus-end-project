import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHttp } from '../hooks/http';
import { AuthContext } from '../context/Auth';
import Loader from '../components/Loader';
import MemCard from '../components/MemCard';

const DetailsPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [mem, setMem] = useState(null);
  const { id } = useParams();

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/memes/${id}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setMem(data);
    } catch (e) {

    }
  }, [token, id, request]);

  useEffect(() => {
    getLink()
  }, [getLink]);

  if(loading) {
    return <Loader/>
  }

  return (
    <div>
      {!loading && mem ? <MemCard mem={mem}/>: null}
  </div>
  );
};

export default DetailsPage;
