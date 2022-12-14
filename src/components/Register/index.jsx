import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Header from '../Header/Header';
import IconProfile from '../../img/icon_profile.png';
import IconProfilePlus from '../../img/icon_profile_plus.png';
import IconEmail from '../../img/icon_email.png';
import IconPassword from '../../img/icon_password.png';
import { API_URL } from '../Env';

import './style.css';

const Register = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [labelemail, setEmailLabel] = useState('');
  const [labelusername, setUsernameLabel] = useState('');
  const [labelpass, setPassLabel] = useState('');
  const [label, setLabel] =  useState('');

  const registerHandler = async () => {
    // const email = document.getElementById('register_email').value;
    // const password = document.getElementById('register_password').value;

    setEmailLabel('');
    setUsernameLabel('');
    setPassLabel('');
    setLabel(''); 

    const user = { email, password, username };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
      credentials: 'include',
    };

    const response = await fetch(`${API_URL}/users/register`, options);
    const data = await response.json();

    console.log(data)
    switch (data.error) {
      case 'the email provided is not valid!':
        setEmailLabel('Email inválido');
        break;

      case 'the username provided is not valid!':
        setUsernameLabel('o Campo usuário inválido');
        break;

      case 'the password provided is not valid!':
        setPassLabel(
          'A senha deve conter no mínimo 1 letra maiscúla, 1 minúscula, 1 número, 1 caractere especial e tamanho 8'
        );
      case  'This email or username is already in use':
          setLabel("Já existe um cadastro")
        break;

      default:
    }

    if (data.isAuthenticated) {
      setUser(data.user);
      //navigate(`/pool/${pool_id}`);
      navigate(`/code`);
      //navigate(-1);
    }
  };

  const handleStatus = (e) => {
    setStatus(true);
    navigate(`/login`);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Header profile={user.username} />
      <form id="register" className="box-form-register">
        <fieldset className="box-fieldset-register">
          <legend className="box-modal">
            <div className="box-modal-l-login" value={status} onClick={handleStatus}>
              <img src={IconProfile} alt="" />
              <input className="input-btn-login" type="button" value="ENTRAR" />
            </div>

            <div className="box-modal-r-register">
              <img src={IconProfilePlus} alt="" />
              <input className="input-btn-register" type="button" value="REGISTRAR" />
            </div>
          </legend>
          <div className="input-box-username">
            <img src={IconProfile} alt="" />
            <input
              className="input-username"
              placeholder="Seu nome de Usuário"
              type="text"
              id="register_username"
              value={username}
              onChange={handleUsername}
            />
          </div>
          <p className="text-[11px]">
            {labelusername !== '' ? (
              <label className="error" htmlFor={'register_username'}>
                {labelusername}
              </label>
            ) : (
              <></>
            )}
          </p>
          <div className="input-box-email">
            <img src={IconEmail} alt="" />
            <input
              className="input-email"
              placeholder="Seu email"
              type="email"
              id="register_email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <p className="text-[11px]">
            {labelemail !== '' ? (
              <label className="error" htmlFor={'register_email'}>
                {labelemail}
              </label>
            ) : (
              <></>
            )}
          </p>
          <div className="input-box-password">
            <img src={IconPassword} alt="" />
            <input
              className="input-password"
              placeholder="Sua Senha"
              type="password"
              id="register_password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <p className="text-[11px]">
            {labelpass !== '' ? (
              <label className="error" htmlFor={'register_password'}>
                {labelpass}
              </label>
            ) : (
              <></>
            )}
          </p>
          <p className="text-[11px]">
            {label !== '' ? (
              <label className="error" htmlFor={'register_eamil'}>
                {label}
              </label>
            ) : (
              <></>
            )}
          </p>

          <button
            type="button"
            className="btn-register"
            id="register_button"
            onClick={registerHandler}
          >
            <h3>REGISTER</h3>
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Register;
