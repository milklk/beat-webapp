module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/bs/app": {
        // target: 'http://192.168.0.106:8080/',
        // target: "http://192.168.0.113:8081",
        target: "http://120.24.153.253:8080/",
        // target: 'http://192.168.0.143:8081/',
        changeOrigin: true
      },
      "/bs": {
        // target: 'http://192.168.0.106:8080/',
        // target: "http://192.168.0.113:8081",
        target: "http://120.24.153.253:8080/",
        // target: 'http://192.168.0.143:8081/',
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "././" : "/"
};
