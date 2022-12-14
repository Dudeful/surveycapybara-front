/* eslint-disable */
import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { API_URL } from '../Env';
//import ReactTooltip from 'react-tooltip';
import './styles.css';

const EnterCode = () => {
  const [user, setUser] = useContext(UserContext);
  const [label, setLabel] = useState('');
  const [email, setEmail] = useState(false);
  const [text, setText] = useState('Mostrar minhas Pesquisas');

  const navigate = useNavigate();
  const buttonHandler = async (event) => {
    event.preventDefault();
    const pool = {
      id: document.getElementById('codeField').value.replace(/\s/g, ''),
      //password: document.getElementById('password').value,
    };
    const re = /[0-9A-Fa-f]{8}/g;

    if (!re.test(pool.id)) {
      setLabel('Código inválido!');
      return;
    }

    //const url = `${API_URL}/pools?id=${pool.id}&password=${pool.password}`;

    const url = `${API_URL}/pools?id=${pool.id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.error);
      if (data.error) {
        setLabel('Código inválido!');
        return;
      }

      navigate(`/pool/${pool.id}`, {
        //state: { id: pool.id, password: pool.password },
        state: { id: pool.id },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const poolHandler = (event) => {
    event.preventDefault();
    setEmail(!email);
    if (email) {
      setText('Todas  Pesquisas');
    } else {
      setText('Minhas Pesquisas');
    }
  };
  return (
    <>
      <Header profile={user.username} />
      <div className="page">
        {email ? <SideBar email={user.email} /> : <SideBar />}
        <form className="box-form-code centrilize">
          <fieldset className="box-fieldset-enter-code">
            <h2 className="field-title">Digite um código</h2>
            <input id="codeField" className={'input-code-enter'} type="text" placeholder="000000" />
            <p className="text-[11px]">
              {label !== '' ? (
                <label className="error" htmlFor={codeField}>
                  {label}
                </label>
              ) : (
                <></>
              )}
            </p>
            <div className="code-btns">
              {user.username !== 'anonymous' && user.username !== undefined ? (
                <button className="input-code-btn" onClick={poolHandler}>
                  {text}
                </button>
              ) : (
                <></>
              )}
              <input
                className="input-code-btn"
                type="button"
                value="Enter"
                onClick={buttonHandler}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default EnterCode;
