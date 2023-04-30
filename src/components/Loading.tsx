import React from 'react';
import '../styling/loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-con">
      <div className="loading-spin"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
