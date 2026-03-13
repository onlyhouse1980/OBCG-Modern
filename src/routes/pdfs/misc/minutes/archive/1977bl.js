'use client';

import React, { useState } from "react";
import styles from "../../../../../styles/pdfs.module.css";

export const App = () => {
  const [embedURL] = useState(
    "https://drive.google.com/file/d/1iQcwxumeWtDaRFfXR3k6yHPENSfUAZeR/preview"
  );
  return (
    <div className="container">
      <h5>1977 Bylaws</h5>
      <iframe
        className={styles.iframPDFBL}
        src={embedURL}
        width="100%"
        height="500"
      ></iframe>
    </div>
  );
};

export default App;
