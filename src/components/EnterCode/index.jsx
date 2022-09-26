import React, {useState, useContext} from 'react';
import Header from '../Header/Header';
import SideBar from '../SideBar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { SocketContext } from '../Context/SocketContext';
import './styles.css';

const EnterCode = () => {

  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();
  const buttonHandler = (event) => {
    event.preventDefault();
    const pool = {
      id: document.getElementById('codeField').value,
      password: document.getElementById('password').value,
    };

    if (pool.id === '') {
      console.log('vazio');
      return;
    }

    const url = `https://server-surveycapybara.dudeful.com/pools?id=${pool.id}&password=${pool.password}`;
    //const url = `http://localhost:5000/pools?id=${pool.id}&password=${pool.password}`

    try {
      fetch(url)
        .then((response) => {
          response.json();
        })
        .then((data) => data);
      
      navigate(`/pool/${pool.id}`, {
        state: { id: pool.id, password: pool.password },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header profile = {user.username}/>
      <div className="page">
        <SideBar />
        <form className="box-form-code centrilize">
          <h2> Surveycabybara</h2>
          <fieldset className="box-fieldset-code">
            <input
              id="codeField"
              className="input-code-enter"
              type="text"
              placeholder="Enter code"
            />
            <input
              id="password"
              className="input-code-password"
              type="password"
              placeholder="Enter password"
            />
            <input className="input-code-btn" type="button" value="Enter" onClick={buttonHandler} />
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default EnterCode;
