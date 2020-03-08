import React from 'react';
import { NavLink } from 'react-router-dom';
import { useMessage } from '../hooks/message';
import ClipboardJS from 'clipboard';

const clipboard = new ClipboardJS('.copy-link');

const MemCard = ({ mem }: any) => {

  const copyToClipboard = () => {
    message('ссылка скопирована в буфер');
  };

  const errorClipboardHandler = () => {
    message('не удалось скопировать ссылку');
  };

  const message = useMessage();

  const getFile = (mem: any) => {
    if (mem.mimeType && (mem.mimeType === 'video/mpd' || mem.mimeType === 'video/webm')) {
      return (
        <video>
          <source src={`http://localhost:${process.env.PORT}/${mem.memesImage}`} />
        </video>
      );
    }

    return <img src={`http://localhost:${process.env.PORT}/${mem.memesImage}`} alt='' />;
  };

  const getMemesTags = () => {
    return mem.tags.split(',').map((item: string) => `#${item.trim()} `);
  };

  clipboard.on('success', copyToClipboard);
  clipboard.on('error', errorClipboardHandler);

  return (
    <div className='row'>
    <div className='col s12'>
      <div className='card'>
        <div className='card-image'>
          {getFile(mem)}
          <span className='card-title' style={{
            background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .3) 70%,  rgba(0, 0, 0, .4)100%)',
            width: '100%',
          }}>{mem.memesName}</span>
        </div>
        <div className='card-content'>
          {mem.tags !== '' ? <p>{getMemesTags()}</p> : null}
        </div>
        <div className='card-action'>
          <NavLink to={`/detail/${mem._id}`}>Подробнее</NavLink>
          <a className={'copy-link'}
             data-clipboard-text={`${window.location.origin}/detail/${mem._id}`}>Скопировать ссылку</a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MemCard;
