import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoginForm from './Login/Login';
import SignupForm from './Signup/Signup';
import store from '../../redux/store';
import { refreshErrorMessage } from '../../redux/auth/auth.actions';
import CustomLinkButton from '../../shared/components/Button/CustomLinkButton/CustomLinkButton';
import {
  Container,
  Left,
  Right,
  Headings,
  Logo,
  FormContainer,
  MainHeading,
  SubHeading,
  Options,
  Image,
  Bottom,
} from './Landing.style';
import WelcomePage from '../Welcome/Welcome';

const Landing = ({ errorMessage, isAuthenticated, checkUserCredentials }) => {
  const [isActive, setisActive] = useState('login');

  if (isAuthenticated && checkUserCredentials) {
    return <WelcomePage />;
  }

  return (
    <Container>
      <Left>
        <FormContainer>
          <Logo>
          <img src="/favicon.png" alt="Logo" />
            <span>Protasker</span>
          </Logo>
          {isActive !== 'signup' ? <LoginForm /> : <SignupForm />}
        </FormContainer>
        <Options>
          <CustomLinkButton
            iconType="user"
            to="/log"
            text="Log in"
            className={isActive === 'login' ? 'active' : ''}
            onClick={() => {
              setisActive('login');
              if (errorMessage) store.dispatch(refreshErrorMessage());
            }}
          />
          <CustomLinkButton
            iconType="unlock"
            to="/log"
            text="Sign up"
            className={isActive === 'signup' ? 'active' : ''}
            onClick={() => {
              setisActive('signup');
              if (errorMessage) store.dispatch(refreshErrorMessage());
            }}
          />
        </Options>
      </Left>
      <Right>
        <Image />
        <Bottom>
          <Headings>
            <MainHeading>
              Powerful and Easy to Use
              <br />
              Project Management Tool
            </MainHeading>
            <SubHeading>
              {' '}
              See how you can simplify your project management.
            </SubHeading>
          </Headings>
        </Bottom>
      </Right>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  checkUserCredentials: state.auth.checkUserCredentials,
  errorMessage: state.auth.errorMessage,
});

export default connect(mapStateToProps)(Landing);
