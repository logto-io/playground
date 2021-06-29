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

    window.location.href = 'http://localhost:3001/oidc/auth?' + parameters;
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Logto Playground</div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Home;
