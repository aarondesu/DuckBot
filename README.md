# DuckBot

![Build Status](https://github.com/Shinudesu/DuckBot/actions/workflows/main.yml/badge.svg?branch=main)

## Foreword

This bot isn't design to be used widely. It was only inteded to be used as a private bot for a single server. Either way this bot can be refractored to be used as a public bot with a few adjustments.

## Requirements

```
Node 14.x LTS - https://nodejs.org/en/
Yarn - npm install -g yarn
Heroku - npm install -g heroku
```

## Environment example

```
DETECTLANGUAGE_API_KEY=
DEVELOPER_TEST_SERVER=
DISCORD_TOKEN=
OWNER_IDS=
RAPID_API_KEY=
PREFIX=%
DATABASE_URL=
REDDIT_SECRET_KEY= <https://www.reddit.com/dev/api/>
REDDIT_CLIENT_ID=
REDDIT_REFRESH_TOKEN=
REDDIT_ACCESS_TOKEN=
TWITTER_APP_ID= <https://developer.twitter.com/en/portal/dashboard>
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_BEARER_TOKEN=
```

## Formatting

```
yarn lint
yarn format
```

## Installing & Running Locally

```
yarn install
heroku local
```
