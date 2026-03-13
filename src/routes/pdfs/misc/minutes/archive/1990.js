'use client';

import styles from "../../../../../styles/pdfs.module.css";
import React, { useState } from "react";

export const App = () => {
  const [embedURL] = useState(
    "https://drive.google.com/file/d/1ua4AU3yOrPa1elbOXm1SySKsdN2ki6Fy/preview"
  );
  return (
    <div className="container">
      <iframe
        className={styles.iframPDF}
        src={embedURL}
        width="100%"
        height="530"
      ></iframe>
    </div>
  );
};

export default App;
