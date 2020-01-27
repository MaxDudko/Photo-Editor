import React from 'react';
import styles from './App.module.scss';

import Download from "./Download/Download";
import NewImage from "./NewImage/NewImage";
import Edit from "./Edit/Edit";

const App: React.FC = () => {
  return (
      <div className={styles.app}>
          <div className={styles.navbar}>
              <h1>Photo Editor</h1>
              <Download />
          </div>
          <div className={styles.wrapper}>
              <NewImage />
              <Edit />
          </div>
      </div>
  );
};

export default App;
