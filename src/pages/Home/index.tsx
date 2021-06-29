import React, { useCallback } from 'react';
import { fromUint8Array } from 'js-base64';
import styles from './index.module.scss';

function base64URLEncode(array: Uint8Array) {
  return fromUint8Array(array).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

const Home = () => {
  const login = useCallback(async () => {
    const verifier = base64URLEncode(crypto.getRandomValues(new Uint8Array(32)));
    const encoded = new TextEncoder().encode(verifier);
    const challenge = base64URLEncode(
      new Uint8Array(await crypto.subtle.digest('SHA-256', encoded))
    );
    localStorage.setItem('verifier', verifier);
    const parameters = [
      ['response_type', 'code'],
      ['redirect_uri', 'http://localhost:3000/callback'],
      ['client_id', 'foo'],
      ['scope', 'openid%20offline_access'],
      ['prompt', 'consent'],
      ['code_challenge', challenge],
      ['code_challenge_method', 'S256'],
    ]
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    console.log(challenge, verifier);

    window.location.href = 'http://localhost:3001/oidc/auth?' + parameters;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth');
    window.location.reload();
  }, []);

  const auth = localStorage.getItem('auth');
  const parsed = auth && JSON.parse(auth);
  const isAuthed = Boolean(auth);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Logto Playground</div>
      {!isAuthed && <button onClick={login}>Login</button>}
      {isAuthed && <button onClick={logout}>Logout</button>}
      {isAuthed && parsed && (
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {['access_token', 'expires_in', 'refresh_token', 'id_token', 'scope', 'token_type'].map(
              (key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{parsed[key]}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
