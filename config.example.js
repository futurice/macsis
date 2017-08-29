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
