import React, { useEffect } from 'react';
import ky from 'ky';

const Consent = () => {
  useEffect(() => {
    const consent = async () => {
      const { redirectTo } = await ky.post('/api/sign-in/consent').json();
      window.location.href = redirectTo;
    };

    void consent();
  }, []);

  return <div>Auto performing consent...</div>;
};

export default Consent;
