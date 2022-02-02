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
const http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    args = require("args-parser")(process.argv),
    port = args.port || 8888;

const fastify = require('fastify')()
const fastifyStatic = require('fastify-static')
const fastifyCompress = require('fastify-compress');


fastify.get('/', async (request, res) => {
  return res.sendFile('index.html');
})

fastify
	.register(fastifyCompress, {threshold:0})
	.register(fastifyStatic, {
		root: path.join(process.cwd(), 'public')
	})

// this will work with fastify-static and send ./static/index.html
fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html');
});

//
