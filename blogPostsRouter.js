const express = require("express");
const router = express.Router();

const { BlogPosts } = require("./models");

function lorem() {
  return (
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
    "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
    "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
}


///title, content, author needed

BlogPosts.create("20 UK Rappers to Listen To in 2018", lorem(), "John Right");
BlogPosts.create("20 California Rappers Who are Broke in 2018", lorem(), "Meghan Wrong");

router.get("/", (req, res) => {
	res.json(BlogPosts.get());
});


//router makes a request to the endpoint
///gets all the blogposts created and returns the response as JSON object
//to the endpoint 

router.post("/", (req, res) => {
	const requiredFields = ["title", "content", "author"]; /// required fields needed to post 
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) { // if field in request body is false
			const message = `Missing \`${field}\` in request body`;
			console.error(message); 
			return res.status(400).send(message);
		}
	}

	// if request succeeds, a json object is created with title content and author

	const item = BlogPosts.create(
		req.body.title, 
		req.body.content, 
		req.body.author
		);
		res.status(201).json(item); //// status is 201 good and item is passed and coverted to json 
	});

router.put("/:id", (req, res) => {
	const requiredFields = ["title", "author", "content"];
	for (let i = 0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field) in req.body) {
			const message = `Missing \`${field}\` in request body`;
			console.log.error(message);
			return res.status(400).send(message);
		}
	}

	// two conditionals for put - must have all the fields and must have the
	// correct id

	if (req.params.id !== req.body.id) {
		const message = `Request path id (${req.params.id}) and request body id and (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);

   	}

   	console.log(`Updating blog post id: \`${req.params.id}\``); /// BACK TICKS 

   	const blogPostEntry = BlogPosts.update({
   		id: req.params.id,
   		title: req.body.title,
   		content: req.body.content,
   		author: req.body.title,
   		publishDate: req.body.publishDate
   	});
   	console.log("hello");
   	res.status(200).send(blogPostEntry);
});

router.delete("/:id", (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted blog post with id \`${req.params.id}\``);
	res.status(204).end();
});

module.exports = router;
