import React, { Component, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

interface IPlayerInputProps {
  id: string;
  onSubmit: (id: string, username: string) => void;
  label: string;
};

function PlayerInput(props: IPlayerInputProps) {
  const { label } = props;
  const [username, setUsername] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { onSubmit, id } = props;
    onSubmit(id, username);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);
  }

  return (
    <form className='column' onSubmit={handleSubmit}>
      <label className='header' htmlFor='username'>{label}</label>
      <input
        id='username'
        placeholder='github username'
        type='text'
        value={username}
        autoComplete='off'
        onChange={handleChange}
      />
      <button
        className='button'
        type='submit'
        disabled={!username}>
          Submit
      </button>
    </form>
  );
}

interface IBattleProps {
  match: { url: string };
};

interface IBattleState {
  playerOneName: string;
  playerTwoName: string;
  playerOneImage: string | null;
  playerTwoImage: string | null;
  [propName: string]: any;
};

function Battle(props: IBattleProps) {
  const [playerOneName, setPlayerOneName] = useState('');
  const [playerTwoName, setPlayerTwoName] = useState('');
  const [playerOneImage, setPlayerOneImage] = useState('');
  const [playerTwoImage, setPlayerTwoImage] = useState('');

  const handleSubmit = (id: string, username: string): void => {
    if (id === 'playerOne') {
      setPlayerOneName(username);
      setPlayerOneImage(`https://github.com/${username}.png?size=200`);
    } else {
      setPlayerTwoName(username);
      setPlayerTwoImage(`https://github.com/${username}.png?size=200`);
    }
  }

  const handleReset = (player: string) => {
    if (player === 'playerOne') {
      setPlayerOneName('');
      setPlayerOneImage('');
    } else {
      setPlayerTwoName('');
      setPlayerTwoImage('');
    }
  }

  return (
    <div>
      <div className='row'>
        {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={handleSubmit}
          />}
        {playerOneImage !== '' &&
          <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}
          >
            <button className='reset' onClick={() => handleReset('playerOne')}>Reset</button>
          </PlayerPreview>}
        {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={handleSubmit}
          />}
          {playerTwoImage !== '' &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
            >
              <button className='reset' onClick={() => handleReset('playerTwo')}>Reset</button>
          </PlayerPreview>}
      </div>
      {playerOneImage && playerTwoImage &&
        <Link className='button' to={{
          pathname: `${props.match.url}/results`,
          search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
        }}>Battle</Link>}
    </div>
  );
}

export default Battle;