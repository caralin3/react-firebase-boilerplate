import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { PasswordForgetLink } from './PasswordForget';
import { SignUpLink } from './SignUp';

const SignInComponent: React.SFC = ({history}: any) => (
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

export const SignInPage = withRouter(SignInComponent);

interface ISignInFormProps {
  history: any
}

interface ISignInFormState {
  email: string,
  error: any,
  password: string,
}

export class SignInForm extends React.Component<ISignInFormProps, ISignInFormState> {
  public readonly state: ISignInFormState = {
    email: '',
    error: null,
    password: ''
  }

  public render() {
    const { email, error, password } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={(e) => this.onChange(e, 'email')}
          type='text'
          placeholder='Email Address' 
        />
        <input
          value={password}
          onChange={(e) => this.onChange(e, 'password')}
          type='password'
          placeholder='Password' 
        />
        <button type='submit' disabled={isInvalid}>Sign In</button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }

  private byPropKey = (propertyName: string, value: string): object => {
    return {[propertyName]: value}
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>, propertyName: string) => {
    this.setState(this.byPropKey(propertyName, event.target.value));
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = this.state;
    auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({
        email: '',
        error: null,
        password: ''
      });
      this.props.history.push(routes.HOME);
    })
    .catch((error: any) => {
      this.setState(this.byPropKey('error', error));
    });
    event.preventDefault();
  }
}
