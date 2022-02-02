/* Scala Pool - UI
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
const args = require("args-parser")(process.argv);
const numForks = args.threads || 1;
const cluster = require('cluster');

if(!cluster.isWorker) {
  for(let i =0;i < numForks; i++) cluster.fork();
    return;
}

const http = require("http"), path = require("path"), port = args.port || 8888;

const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
const fastifyCompress = require('fastify-compress');


fastify
  .register(fastifyCompress, {threshold:0})
  .register(fastifyStatic, {
    root: path.join(process.cwd(), 'public')
});

fastify.get('/', (request, res) =>  res.sendFile('index.html'));

fastify.setNotFoundHandler((req, res) => res.sendFile('index.html'));

// Run the server!
(async () => {
  try {
    await fastify.listen(port, "0.0.0.0");
  } catch (err) {
      console.log(err)
      process.exit(1)
  }

  console.log(`server listening on ${port}`)
})();