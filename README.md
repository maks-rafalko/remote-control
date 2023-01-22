# RSSchool NodeJS websocket task template

## Installation

```bash
# clone the repo and open development branch
git clone git@github.com:maks-rafalko/remote-control.git

git checkout feature/ws-remote-control

# install dependencies
npm ci


```
(!) Make sure to copy `.env.example` to `.env` and update the port value if needed.

```bash
cp .env.example .env
```

## Usage

By default, WebSocket server is up on `8080` port and Frontend application will automatically connect to it.

Application writes logs with the detailed information about the server's work to the console. Make sure to analyze them to understand what's going on.

Screenshot functionality **does not use** files, all the work is done in memory.

### Development

```bash
npm run start:dev
```

* App served at http://localhost:8181 with `nodemon` for convenient development.

### Production

```bash
npm run start
```

* App served at http://localhost:8181 without `nodemon`, using a `webpack` bundle, compiled in `production` environment.

## Other

There are some useful commands in the `package.json` file.

* `npm run lint` - run `eslint`
* `npm run lint:fix` - run `eslint` and fix errors.

There are no tests in this project, as it's not required for this task.
