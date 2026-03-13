'use client';

import styles from "../../styles/pdfs.module.css";
import React, { useState } from "react";
export const App = () => {
  const [embedURL] = useState(
    "https://drive.google.com/file/d/1E6QSZxqgehmMSoql4ZiTtE78fiq2FKiu/preview"
  );
  return (
    <div className="container">
      <h5>2024 Annual Meeting Minutes</h5>
      <iframe
        className={styles.iframe}
        src={embedURL}
        width="100%"
        height="500"
      ></iframe>
    </div>
  );
};

export default App;
