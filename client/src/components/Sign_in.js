import React from 'react';
import { Link } from 'react-router-dom';
import './Sign_in.css';

const SignIn = (props) => {
  return (
      <div className="signInBlock">
      <form className="signInForm" onSubmit={props.handleSignInListen}>
        <fieldset>
          <legend> SING IN </legend>
          <lable>Name: </lable>
          <input
            style={{ borderRadius: '5px' }}
            type="text"
            name="name"
            value={props.nameSignInValue}
            placeholder="name"
            onChange={props.handleSignInNameListen}
          />
          <br />
          <lable>Password: </lable>
          <input
            style={{ marginLeft: '15px', borderRadius: '5px' }}
            type="text"
            name="password"
            value={props.passSignInValue}
            placeholder="password"
            onChange={props.handleSignInPassListen}
          />
          <br />
         <input id="signButton" style={{ display: 'inline-block', width: '150px', height: '50px' }} type="submit" value="Submit" />
        </fieldset>
      </form>
    </div>

    );
};

export default SignIn;

