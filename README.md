### Github Battle

This is a simple application that make use of [GitHub API](https://developer.github.com/v3/) written in [Typescript](https://www.typescriptlang.org/) and [ReactJS](https://reactjs.org/).

### How to use it?

GitHub settings:

  - Click on your avatar > settings > developer settings > New OAuth App
  - Give a name, Home URL* and Authorization callback URL*
  - Click on `Register application`, grab your secrets and put it in your `.env` file

*It could be localhost

```bash
# Clone the repo
$ git clone https://github.com/gustavocd/github-battle

# Install dependencies
$ cd github-battle && npm install

# Run the app (your browser should open automatically)
$ npm start

# If not visit your localhost:3000
$ http://localhost:3000
```