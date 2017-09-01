# Macsis
![Macsis logo](https://user-images.githubusercontent.com/1752365/29924942-5fbd3a74-8e67-11e7-9459-349854707141.png?raw=true)

A configurable small web server / proxy for performing simple access control
based on the user's Google account domain. Content can be served both from
local paths as well as remote URLs. Once the user has logged in via `/login`,
they will be served the path or url specified in `config.js`.

One concrete use case would be eg. serving two versions of a static website
– one for logged-in users and another one for other visitors.

## Usage

1. Add `config.js` with your custom configs
2. Define environment variables (via `.env` or something else)
2. `npm start`

## Provided routes

* `/login` will forward user to Google login, and after a successful login,
  will redirect user back to the root route `/`
* `/logout` will close the logged-in session, and redirect user back to the 
  root route `/`
* `/*` all other routes will be served based on the configuration

## Configuration

Configuration is defined by an array of configuration objects. Each object has the following attributes:

* `domain` – Domain of an associated Google login
* `path` or `url`
    * `path` means local file system path, that will be used for serving content
    * `url` means a remote URL, that is used to proxy requests from

Let's take an example. In `config.js`:
```javascript
module.exports = {
    paths: [
        {
            domain: "goodguys.com",
            path: "private",
        },
        {
            domain: "badguys.com",
            url: "http://lmgtfy.com/?q=how+to+be+good",
        },
        {
            domain: /.*/,
            path: "public",
        },
    ],
}
```

...means that

* User `mike@goodguys.com` will be served content from "private" directory
* User `john@badguys.com` will get proxied content from lmgtfy
* All other users, eg. non-logged in ones, will be served content from "public" directory

## Required environment variables

```
PORT=8080
GOOGLE_CLIENT_ID=yourclientid
GOOGLE_CLIENT_SECRET=yourclientsecret
SESSION_SECRET=randomgarbleyoujustcameupwith
URL=https://my-hosting-domain.com               # default: localhost
```

If `.env` exists in the filesystem, these values will be automatically read from it.
