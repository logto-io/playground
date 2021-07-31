import React, { useEffect } from 'react';
import ky from 'ky';

type Response = {
  redirectTo: string;
};

/**
 * @deprecated Implemented in logto/packages/ui
 */
const Consent = () => {
  useEffect(() => {
    const consent = async () => {
      const { redirectTo } = await ky.post('/api/sign-in/consent').json<Response>();
      window.location.href = redirectTo;
    };

    void consent();
  }, []);

  return <div>Auto performing consent...</div>;
};

export default Consent;
