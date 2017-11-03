import React from 'react';
import { Link } from 'react-router-dom';
import './Login_form.css';

const Login = (props) => {
  return (
    <div className="formBlock">
      <form className="form" onSubmit={props.handleLoginListen}>
        <fieldset>
          <legend> REGISTRATION FORM </legend>
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
            style={{borderRadius: '5px' }}
            type="password"
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
            <input id="button" style={{ display: 'inline-block', width: '150px' }} type="submit" value="Submit" />
          <br />
          <p className="LoginLink">Already registered, use <Link to="/sign_in">LOGIN</Link></p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
