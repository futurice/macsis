module.exports = {
    paths: [
        {
            domain: "goodguys.com",
            path: "example.com/nicesite",
        },
        {
            domain: "badguys.com",
            path: "example.com/notsonicesite",
        },
        {
            domain: /.*/,
            path: "example.com/genericsite",
        },
    ],
}
