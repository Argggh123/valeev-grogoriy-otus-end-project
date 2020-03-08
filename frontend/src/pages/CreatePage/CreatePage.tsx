import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import MemesUploader from '../../components/MemesUploader/MemesUploader';
import { useHttp } from '../../hooks/http';
import { AuthContext } from '../../context/Auth';
import { useHistory } from 'react-router';

const CreatePage = () => {
  const auth = useContext(AuthContext);
  const [memesForm, setMemesForm] = useState({
    memesName: '',
    memesImage: null,
    tags: '',
  });
  const { request } = useHttp();
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  });

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('changeName', event.target.value);
    setMemesForm({
      ...memesForm,
      memesName: event.target.value,
    });
  };
  const changeTags = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('changeTags', event);
    setMemesForm({
      ...memesForm,
      tags: event.target.value,
    });
  };
  const changeImage = (event: ChangeEvent<HTMLInputElement> | File[]) => {
    if ((typeof event === 'object')) {
      setMemesForm({
        ...memesForm,
        memesImage: event[0],
      });

      return;
    }

    setMemesForm({
      ...memesForm,
      memesImage: event.target.value,
    });
  };

  const save = async () => {
    console.log(memesForm);
    const formData = new FormData();
    for (const i in memesForm) {
      formData.append(i, memesForm[i]);
    }
    try {
      const { mem } = await request(
        `/api/memes/create`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        },
      );
      console.log(mem);
      history.replace(`/detail/${mem._id}`);
    } catch (e) {}
  };
  return (
    <div style={{ paddingTop: 40 }}>
      <MemesUploader changeName={changeName} changeImage={changeImage} changeTag={changeTags}
                     save={save} />
  </div>
  );
};

export default CreatePage;
