const serverConfig = {
  mine: {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    ico: "",
  },
  port: 3000,
  option: {
    postgres: {
      user: "postgres",
      password: "postgres",
      host: "localhost",
      port: "5432",
      database: "postgres",
    },
  },
};

const clientConfig = {
  sample: "sample",
};

module.exports = {
  serverConfig,
  clientConfig,
};
