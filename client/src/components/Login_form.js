import React from 'react';
import './Login_form.css';
import { Link } from 'react-router-dom';

const Login = (props) => {
  return (
    <div className="formBlock">
      <form className="form" onSubmit={props.handleLoginListen}>
        <fieldset>
          <legend> LOGIN FORM </legend>
          <lable>Name: </lable>
          <input
            style={{ borderRadius: '5px' }}
            type="text"
            name="name"
            value={props.nameValue}
            placeholder="name"
            onChange={props.handleNameListen}
          />
          <br />
          <lable>Password: </lable>
          <input
            style={{ marginLeft: '15px', borderRadius: '5px' }}
            type="text"
            name="password"
            value={props.passValue}
            placeholder="password"
            onChange={props.handlePassListen}
          />
          <br />
          <lable>Email: </lable>
          <input
            style={{ borderRadius: '5px' }}
            type="text"
            name="email"
            value={props.emailValue}
            placeholder="email"
            onChange={props.handlEmailListen}
          />
          <br />
          <input id="button" style={{ display: 'inline-block', width: '150px', height: '150%' }} type="submit" value="Submit" />
          <br />
          <p className="LoginLink">If you already registered use <Link to="/sign_in">LOGIN</Link></p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;