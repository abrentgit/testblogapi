const express = require("express");
const morgan = require("morgan");

const blogPostsRouter = require("./blogPostsRouter");

const app = express();

app.use(morgan("common")); //import morgan for logging
app.use(express.json()); // import express

// app.use("/blog-posts", blogPostsRouter); // routing requests

let server;

function runServer() {
	const port = process.env.PORT || 8080;
	return new Promise((resolve, reject) => {
		server = app
		   .listen(port, () => {
		   	console.log(`Your app is listening on port ${port}`);
		   	resolve(server);
		   })
		   .on("error", err => {
		   	 reject(err);
		   });
	});
}

function closeServer() {
	return Promise((resolve, reject) => {
		console.log("Closing server");
		server.close(err => {
			if (err) {
			  reject(err);
			  return;
			}
			resolve();
		});
	});
}

if (require.main === module) {
	runServer().catch(err => console.log(err));
}

module.exports = { app, runServer, closeServer };

