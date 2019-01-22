import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

interface IPlayerInputProps {
  id: string;
  onSubmit: (id: string, username: string) => void;
  label: string;
};

interface IPlayerInputState {
  username: string;
};

class PlayerInput extends Component<IPlayerInputProps, IPlayerInputState> {
  constructor(props: IPlayerInputProps) {
    super(props);
    this.state = {
      username: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    this.setState({ username: value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { username } = this.state;
    const { onSubmit, id } = this.props;
    onSubmit(id, username);
  }

  render() {
    const { label } = this.props;
    const { username } = this.state;
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>{label}</label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          value={username}
          autoComplete='off'
          onChange={this.handleChange}
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

class Battle extends Component<IBattleProps, IBattleState> {
  constructor(props: IBattleProps) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }
  }

  handleSubmit = (id: string, username: string): void => {
    this.setState({
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`,
    });
  }

  handleReset = (id: string): void => {
    this.setState({
      [id + 'Name']: '',
      [id + 'Image']: null,
    });
  }

  render() {
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button className='reset' onClick={this.handleReset.bind(this, 'playerOne')}>Reset</button>
            </PlayerPreview>}
          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}
            {playerTwoImage !== null &&
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}
              >
                <button className='reset' onClick={this.handleReset.bind(this, 'playerTwo')}>Reset</button>
              </PlayerPreview>}
        </div>
        {playerOneImage && playerTwoImage &&
          <Link className='button' to={{
            pathname: `${match.url}/results`,
            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
          }}>Battle</Link>}
      </div>
    )
  }
}

export default Battle;