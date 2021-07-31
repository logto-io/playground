import ky from 'ky';
import React, { FormEventHandler, MouseEventHandler, useState } from 'react';
import styles from './index.module.scss';

type Response = {
  redirectTo: string;
};

/**
 * @deprecated Implemented in logto/packages/ui
 */
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn: FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const { redirectTo } = await ky
        .post('/api/sign-in', {
          json: {
            id: username,
            password,
          },
        })
        .json<Response>();
      window.location.href = redirectTo;
    } catch (error: unknown) {
      setError(String(error));
    }
  };

  const abort: MouseEventHandler = async () => {
    try {
      const { redirectTo } = await ky.post('/api/sign-in/abort').json<Response>();
      window.location.href = redirectTo;
    } catch (error: unknown) {
      setError(String(error));
    }
  };

  return (
    <div className={styles.signIn}>
      <form onSubmit={signIn}>
        <div>Username</div>
        <input
          value={username}
          onChange={({ target: { value } }) => {
            setUsername(value);
          }}
        />
        <div>Password</div>
        <input
          type="password"
          value={password}
          onChange={({ target: { value } }) => {
            setPassword(value);
          }}
        />
        <button type="submit">sign in</button>
      </form>
      <button type="button" onClick={abort}>
        abort
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default SignIn;
