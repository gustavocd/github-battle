import React, { Component, Fragment } from 'react';
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

interface IPopularProps {};

interface IPopularState {
  selectedLanguage: string;
  repos: [Repo] | null;
};

class Popular extends Component<IPopularProps, IPopularState> {
  constructor(props: IPopularProps) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    const { selectedLanguage } = this.state;
    this.updateLanguage(selectedLanguage);
  }

  updateLanguage(lang: string) {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null,
    }));

    api
      .fetchPopularRepos(lang)
      .then(repos => this.setState({ repos }))
      .catch(error => console.error(error));
  }

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <Fragment>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {!repos
          ? <Loading />
          : <RepoGrid repos={repos} />
        }
      </Fragment>
    );
  }
}

export default Popular;
