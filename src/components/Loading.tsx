import React, { useState, useEffect } from 'react'

interface ILoadingProps {
  text?: string;
  speed?: number;
}

function Loading(props: ILoadingProps) {
  let interval: any = null;
  const [speed] = useState(props.speed || 500);
  const [text, setText] = useState(props.text || 'Loading...');

  useEffect(() => {
    const stopper = text + '...';
    interval = setInterval(() => {
      if (text === stopper) {
        setText(text);
        return;
      }
      setText(prevText => prevText + '.');
    }, speed);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <p style={{ textAlign: 'center', fontSize: '35px',}}>
      {text}
    </p>
  );
}

export default Loading;
