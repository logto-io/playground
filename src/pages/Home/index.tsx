import React from 'react';
import styles from './index.module.scss';

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Logto Playground</div>
      <button>Login</button>
    </div>
  );
};

export default Home;
