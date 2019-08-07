import React, { Fragment, useState, useEffect } from 'react';
import Loading from './Loading';
import api from '../utils/api';

interface ISelectLanguage {
  selectedLanguage: string;
  updateLanguage: (lang: string) => void;
};

function SelectLanguage(props: ISelectLanguage) {
  const { selectedLanguage, updateLanguage } = props;
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'Go'];
  return (
    <ul className='languages'>
      {languages.map((lang) => {
        const color = lang === selectedLanguage ? { color: '#d0021b' } : undefined;
        return (
          <li
            style={color}
            key={lang}
            onClick={() => updateLanguage(lang)}>
            { lang }
          </li>
        )
      })}
    </ul>
  );
}

type Repo = {
  name: string;
  owner: { avatar_url: string, login: string };
  html_url: string;
  stargazers_count: string;
}

interface IRepoGrid {
  repos: [Repo]
};

function RepoGrid(props: IRepoGrid) {
  const { repos } = props;
  return (
    <ul className='popular-list'>
      {repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  );
}


function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [repos, setRepos] = useState<[Repo] | null>(null);

  useEffect(() => {
    updateLanguage(selectedLanguage);
  }, []);

  const updateLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setRepos(null);

    api
      .fetchPopularRepos(lang)
      .then(setRepos)
      .catch(error => console.error(error));
  }

  return (
    <Fragment>
      <SelectLanguage
        selectedLanguage={selectedLanguage}
        updateLanguage={updateLanguage}
      />
      {!repos
        ? <Loading />
        : <RepoGrid repos={repos} />
      }
    </Fragment>
  );
}

export default Popular;
