import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';

import paths from '~/routes/paths';
import {login} from '~/ducks/auth';
import {AuthLayout} from '~/layouts';
import {reduxForm} from '~/helpers';
import {HelmetLayout} from '~/layouts';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = async ({username, password}) => {
    await dispatch(login(username, password));
    history.push(paths.homepage);
  };

  return (
    <HelmetLayout
      title="Login"
      metaDescription="Authenticate to access asdtesthrant website.">
      <AuthLayout
        formName="login"
        submitButtonTitle="Log In"
        onFormSubmit={loginHandler}
        fields={reduxForm.loginFields}
        validateFunc={reduxForm.validateLoginForm}
      />
    </HelmetLayout>
  );
};

export default LoginContainer;
