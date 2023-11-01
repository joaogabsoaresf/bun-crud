import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html'
import { GameDatabase } from './src/db/db';

new Elysia()
    .use(html())
    .decorate('db', new GameDatabase())
    .get("/", () => Bun.file("./templates/index.html").text())
    .get("/script.js", () => Bun.file("./js/script.js").text())
    .get('/games', ({ db }) => db.getGames())
    .post(
      '/games',
      async ({db, body}) => {
        console.log(body)
        const id = (await db.addGame(body)).id
        console.log(id)
        return { success: true, id };
      },
      {
        body: t.Object({
          name: t.String(),
          gender: t.String()
          }),
        },
    )
    .put(
      '/games/:id',
      ({ db, params, body }) => {
        try {
          db.updateGame(parseInt(params.id), body) 
          return { success: true };
        } catch (e) {
          return { success: false };
        }
      },
      {
        body: t.Object({
          name: t.String(),
          gender: t.String()
          }),
        },
    )
    .delete(
      '/games/:id',
      ({ db, params }) => {
        try {
          db.deleteGame(parseInt(params.id)) 
          return { success: true };
        } catch (e) {
          return { success: false };
        }
      }
    )
    .listen(3000);
