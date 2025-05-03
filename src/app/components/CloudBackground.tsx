import React from 'react';

const CloudBackground: React.FC = () => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden"
      style={{ transform: 'translateY(50%)' }}
    >
      <div className="w-full h-full bg-white rounded-[50%/100%] rounded-b-none"></div>
      <div
        className="absolute bottom-1 left-[10%] w-[30%] h-12 bg-white rounded-[50%/100%] rounded-b-none"
        style={{ transform: 'translateY(40%)' }}
      ></div>
      <div
        className="absolute bottom-2 left-[30%] w-[25%] h-10 bg-white rounded-[50%/100%] rounded-b-none"
        style={{ transform: 'translateY(30%)' }}
      ></div>
      <div
        className="absolute bottom-0 left-[50%] w-[40%] h-14 bg-white rounded-[50%/100%] rounded-b-none"
        style={{ transform: 'translateY(35%)' }}
      ></div>
      <div
        className="absolute bottom-1 left-[80%] w-[30%] h-12 bg-white rounded-[50%/100%] rounded-b-none"
        style={{ transform: 'translateY(40%)' }}
      ></div>
    </div>
  );
};

export default CloudBackground;
