import React from 'react';

if (typeof React.createFactory !== 'function') {
  Object.defineProperty(React, 'createFactory', {
    value: (type) => React.createElement.bind(null, type),
    configurable: true,
    writable: true,
  });
}
