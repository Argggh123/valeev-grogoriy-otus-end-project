import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';
import { AuthContext } from '../context/Auth';

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const headers = { 'Content-type': 'application/json' };
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const register = async () => {
    try {
      const data = await request(
        `http://localhost:${process.env.PORT}/api/auth/register`,
        'POST',
        { ...form },
        headers,
      );
      message(data.message);
    } catch (e) {

    }
  };
  const login = async () => {
    try {
      const data = await request(
        `http://localhost:${process.env.PORT}/api/auth/login`,
        'POST',
        { ...form },
        headers,
      );
      console.log('data', data);
      // @ts-ignore
      auth.login(data.token, data.userId);
    } catch (e) {

    }
  };

  return (
    <div className={'row'}>
      <div className={'col s6 offset-s3'}>
        <h1>Memes Vault</h1>
        <div className='card blue darken-1'>
        <div className='card-content white-text'>
          <span className='card-title'>Авторизация</span>
          <div>
            <form>
            <div className='input-field'>
              <input placeholder='Введите Email'
                     id='email'
                     type='email'
                     name='email'
                     onChange={change}
              />
              <label htmlFor='email' className='white-text'>Email </label>
            </div>
            <div className='input-field'>
              <input placeholder='Введите пароль'
                     id='password'
                     type='password'
                     name='password'
                     className='yellow-input'
                     onChange={change}
              />
              <label htmlFor='password' className='white-text'>Password </label>
            </div>
            </form>
          </div>
        </div>
        <div className='card-action'>
          <button className='btn yellow darken-4'
                  style={{ marginRight: 10 }}
                  disabled={loading}
                  onClick={login}
          >
            Вход
          </button>
          <button className='btn grey lighten-1 black-text'
                  onClick={register}
                  disabled={loading}
          >Регисрация</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
