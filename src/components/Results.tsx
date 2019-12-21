import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import { AxiosError } from 'axios';

import PlayerPreview from './PlayerPreview';

import Loading from './Loading';
import api from '../utils/api';

interface IProfileInfo {
  login: string;
  avatar_url: string;
  name: string;
  location: string;
  company: string;
  followers: string;
  following: string;
  public_repos: number;
  blog: string;
};

interface IProfileProps {
  info: IProfileInfo;
}

function Profile(props: IProfileProps) {
  const { info: {
    company,
    login,
    name,
    avatar_url,
    location,
    blog,
    public_repos,
    followers,
    following,
  } } = props;

  return (
    <PlayerPreview username={login} avatar={avatar_url}>
      <ul className='space-list-items'>
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && <li><a href={blog}>{blog}</a></li>}
      </ul>
    </PlayerPreview>
  );
}

interface IPlayer {
  label: string;
  score: number;
  profile: IProfileInfo;
};

function Player(props: IPlayer) {
  const { label, score, profile } = props;
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
}

interface IResultsProps {
  location: {
    search: string;
  }
};

interface Player {
  score: number;
  profile: IProfileInfo;
}

function Results(props: IResultsProps) {
  const [winner, setWinner] = useState<Player | null>(null);
  const [loser, setLoser] = useState<Player | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const players = queryString.parse(props.location.search);
    const { playerOneName, playerTwoName } = players;
    api
      .battle([
        playerOneName,
        playerTwoName,
      ])
      .then((response: any) => {
        if (response === null) {
          setError('looks like there was a problem, check that both users exist on GitHub');
          setLoading(false);
          return;
        }

        setError('');
        setWinner(response[0]);
        setLoser(response[1]);
        setLoading(false);
      })
      .catch((error: AxiosError) => console.log(error));
  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to='/battle'>Reset</Link>
      </div>
    )
  }

  return (
    <div className='row'>
      <Player
        label='Winner'
        score={winner!.score}
        profile={winner!.profile}
      />
      <Player
        label='Loser'
        score={loser!.score}
        profile={loser!.profile}
      />
    </div>
  );
}

export default Results;
