const http = require('http');
const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const Router = require('koa-router');
const PostsGenerator = require('./js/PostsGenerator');

const app = new Koa();

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

const dirPublic = path.join(__dirname, '/public');
app.use(koaStatic(dirPublic));

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

const postGenerator = new PostsGenerator();
postGenerator.generate();

router.get('/posts/latest', async (ctx) => {
  const response = {
    status: 'ok',
    data: postGenerator.posts,
  };

  ctx.response.body = JSON.stringify(response);
});

router.get('/posts/:id/comments/latest', async (ctx) => {
  const { id } = ctx.params;

  const response = {
    status: 'ok',
    data: postGenerator.comments.get(id),
  };

  ctx.response.body = JSON.stringify(response);
});

router.get('/posts/refresh', async (ctx) => {
  postGenerator.generate();

  const response = {
    status: 'ok',
    data: 'Созданы новые сообщения.',
  };

  ctx.response.body = JSON.stringify(response);
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
// eslint-disable-next-line no-console
server.listen(port, () => console.log('Server started'));
