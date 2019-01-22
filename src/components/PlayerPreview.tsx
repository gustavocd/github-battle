import React, { ReactNode } from 'react';

interface IProps {
  username: string;
  avatar: string;
  children: ReactNode;
};

function PlayerPreview(props: IProps) {
  const { username, avatar, children } = props;

  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={avatar}
          alt={'Avatar for ' + username}
        />
        <h2 className='username'>@{username}</h2>
      </div>
      {children}
    </div>
  );
}

export default PlayerPreview;
