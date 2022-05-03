exports.config = {
    url: "https://parking.hokkaido-airports.co.jp/cts/",
    screenShot: {
        enable: false,
        path: ".",
        extension: "jpg",
        quality: 50
    },
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'cts_parking',
        connectionLimit: 10,
    }
};