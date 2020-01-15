import React from 'react';
import Dropzone from 'react-dropzone';
import classes from './MemesUploader.pcss';

const MemesUploader = (props: any) => {
  return (
    <div className={'row'}>
      <div className={'col s12'}>
        <div className='card blue darken-1'>
        <div className='card-content white-text'>
          <span className='card-title'>Создать мемасик</span>
          <div>
            <form>
            <div className='input-field'>
              <input placeholder='Введите название мемеса'
                     id='memesName'
                     type='text'
                     name='memesName'
                     required
                     onChange={props.changeName}
              />
              <label htmlFor='memesName' className='white-text'>Залоговок мемеса </label>
            </div>
              <Dropzone onDrop={props.changeImage}>
                {({ getRootProps, getInputProps }) => (
                  <section className={classes.MemesUploader}>
                    <div {...getRootProps()} >
                      <input {...getInputProps()}/>
                      <p>Прикрепить файл</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <p style={{
                textAlign: 'center',
                margin: '15px 0'
              }}>или</p>
            <div className='input-field'>
              <input placeholder='Вставте ссылку'
                     id='memesLink'
                     type='text'
                     name='memesLink'
                     className='yellow-input'
                     onChange={props.changeImage}
              />
              <label htmlFor='memesLink' className='white-text'>Ссылка на ресурс</label>
            </div>
              <div className='input-field'>
              <input placeholder='Пишите теги через запятую'
                     id='memesLink'
                     type='text'
                     name='memesLink'
                     className='yellow-input'
                     onChange={props.changeTag}
              />
              <label htmlFor='memesLink' className='white-text'>Теги</label>
            </div>
            </form>
          </div>
        </div>
        <div className='card-action'>
          <button className='btn yellow darken-4'
                  style={{ marginRight: 10 }}
                  onClick={props.save}
          >
            Создать
          </button>
        </div>
        </div>
      </div>
    </div>
  )
    ;
};

export default MemesUploader;
