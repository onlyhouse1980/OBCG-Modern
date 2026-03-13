'use client';

import styles from "../../../../../styles/pdfs.module.css";
import React, { useState } from "react";

export const App = () => {
  const [embedURL] = useState(
    "https://drive.google.com/file/d/1ECVM9j3E-v3mfQxkC9TKWpWYga68ekvI/preview"
  );
  return (
    <div className="container">
      <h5>1982 Special Meeting</h5>
      <iframe
        className={styles.iframPDFBL}
        src={embedURL}
        width="100%"
        height="530"
      ></iframe>
    </div>
  );
};

export default App;
