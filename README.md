# Learning microsite backend

Performs simple authentication based on the user's Google account domain.

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
