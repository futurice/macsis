# Macsis

Performs simple access control based on the user's Google account domain.
You can use both local paths and urls. Once the user has logged in via /login,
they served the path or url specified in `config.js`.

## Configuration

In `config.js`:
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

In `.env`:
```
PORT=8080
GOOGLE_CLIENT_ID=yourclientid
GOOGLE_CLIENT_SECRET=yourclientsecret
SESSION_SECRET=randomgarbleyoujustcameupwith
```

## Usage

Do the configuration and run `npm start`.
