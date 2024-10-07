const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // '/api'로 시작하는 모든 요청을 ''으로 프록시
  app.use(
    "/api",
    createProxyMiddleware({
      target: "/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // /api로 시작하는 경로에서 '/api'를 제거
      },
    })
  );

  // '/oauth2'로 시작하는 모든 요청을 'http://34.47.107.213:9000'으로 프록시
  app.use(
    "/oauth2",
    createProxyMiddleware({
      target: "http://34.47.107.213:9000/",
      changeOrigin: true,
    })
  );
};
