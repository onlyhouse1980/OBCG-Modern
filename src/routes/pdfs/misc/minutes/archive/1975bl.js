'use client';

import React, { useState } from "react";
import styles from "../../../../../styles/pdfs.module.css";

export const App = () => {
  const [embedURL] = useState(
    "https://drive.google.com/file/d/1JxH1PVhX_HSedCFJ_HH7KTmn_53MekV0/preview"
  );
  return (
    <div className="container">
      <h5>1975 Bylaws</h5>
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
