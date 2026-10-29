# @p.aleks/myshows-api

#### Forked from [@asznee7/myshows-api](https://github.com/asznee7/myshows-api)

[![GitHub license](https://img.shields.io/github/license/dotaxe/myshows-api.svg)](https://github.com/dotaxe/myshows-api/blob/master/LICENSE)

## Overview
Simple API wrapper for logging into and interacting with [MyShows](https://myshows.me/) website. Rewritten to Typescript.

#### Supported versions
* [MyShows.me API v2.0](https://api.myshows.me/shared/doc/) - based on JSON-RPC 2.0 with OAuth 2.0 as authorization. In order to use this module you need to obtain OAuth AppID. If you don't have one you can request in here api@myshows.me.

## Getting started

To install run

```
$ yarn add @p.aleks/myshows-api
// or
$ npm install @p.aleks/myshows-api
```

Simple example of using generic method: 

```javascript
import { MyShows } from '@p.aleks/myshows-api';

const credentials = {
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
  username: 'your_username',
  password: 'your_password',
}

async function example() {
  const myshows = new MyShows(credentials)

  const user = await myshows.generic('profile.Get', {
    login: 'Aikenov',
  }) // profile.Get API method does not require logging in

  await myshows.login() // after logging in you can use API methods that require authorization

  const list = await myshows.generic('lists.Shows', {
    list: 'favorites',
  }) // lists.Shows API method does require logging in

  console.log(user)
  console.log(list)
}

example()

```

## Sessions and error handling

`login()` stores the access token, its expiry, and the refresh token. Use
`isTokenExpired()` and `refresh()` to keep long-running sessions alive:

```javascript
if (myshows.isTokenExpired()) {
  await myshows.refresh()
}
```

Every method resolves to either a response with a `result` field or an error
of the shape `{ error: { code, message } }` — network and HTTP failures are
normalized into the same shape:

```javascript
const response = await myshows.listsShows()

if (response.error) {
  console.error(response.error.code, response.error.message)
} else {
  console.log(response.result) // typed as ShowSummary[]
}
```

A falsy `result` (`false`, `0`, `''`) is a valid response, not an error.

## Custom axios options

Pass an [axios request config](https://axios-http.com/docs/req_config) as the
second constructor argument to set a proxy, custom timeout, or HTTP agent:

```javascript
const myshows = new MyShows(credentials, { timeout: 30_000 })
```

## API Documentation

See the [MyShows.me API](https://api.myshows.me/) page to start exploring documentation.
