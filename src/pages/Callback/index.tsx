import React, { useEffect, useState } from 'react';
import qs from 'query-string';
import ky from 'ky';

const Callback = () => {
  const [error, setError] = useState<string>();

  useEffect(() => {
    const { code } = qs.parse(location.search);
    const verifier = localStorage.getItem('verifier');
    const run = async () => {
      if (typeof code !== 'string') {
        setError("code doesn't show up in url");
        return;
      }

      if (typeof verifier !== 'string') {
        setError("verifier doesn't show up in localStorage");
        return;
      }

      // For `application/x-www-form-urlencoded`
      const body = new URLSearchParams();
      body.set('redirect_uri', 'http://localhost:3000/callback');
      body.set('code', code);
      body.set('grant_type', 'authorization_code');
      body.set('client_id', 'foo');
      body.set('code_verifier', verifier);

      try {
        const json = await ky.post('http://localhost:3001/oidc/token', { body }).json();

        localStorage.setItem('auth', JSON.stringify(json));
        localStorage.removeItem('verifier');
        window.location.href = '/';
      } catch (error: unknown) {
        setError(String(error));
        console.error(error);
      }
    };

    void run();
  }, []);

  return <div style={{ textAlign: 'center' }}>{error ?? 'Fetching token'}</div>;
};

export default Callback;
