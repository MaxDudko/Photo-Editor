import React from 'react';
import styles from './App.module.scss';

import Download from "./Download/Download";
import NewImage from "./NewImage/NewImage";
import Edit from "./Edit/Edit";
import {FaReact} from "react-icons/all";

const App: React.FC = () => {
  return (
      <div className={styles.app}>
          <div className={styles.navbar}>
              <span className={styles.icon}>
                  <FaReact />
              </span>
              <Download />
          </div>
          <div className={styles.wrapper}>
              <Edit />
              <NewImage />
          </div>
      </div>
  );
};

export default App;
