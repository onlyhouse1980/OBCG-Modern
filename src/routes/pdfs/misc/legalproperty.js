'use client';

import React, { useState } from "react";
export const App = () => {
  const [embedURL] = useState(
    
  "https://drive.google.com/file/d/1Fb6X0HouClhsyBJIgUEiruO9_DlX2UlF/preview"
  );
  return (
    <div className="container">
      <h5>Legal Property</h5>
      <iframe src={embedURL} width="100%" height="500"></iframe>
    </div>
  );
};

export default App;
