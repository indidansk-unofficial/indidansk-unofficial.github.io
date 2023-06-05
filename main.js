const fs = require("fs");

const express = require("express");
const useragent = require("express-useragent");

const app = express();


app.use(useragent.express());

app.use(express.static("files"));

app.get("/", (req, res) => {
	res.sendFile("main.html", {root: __dirname});
});

app.get("/:page", (req, res) => {
	let path = `./html/${req.params["page"]}.html`;
	let mobilePath = `./html_mobile/${req.params["page"]}.html`;
	
	if (req.useragent.isMobile && fs.existsSync(mobilePath)) {
		res.sendFile(mobilePath, {root: __dirname});
	} else if (fs.existsSync(path)) {
		res.sendFile(path, {root: __dirname});
	} else {
		res.sendStatus(404);
	}
});


app.listen(process.env.PORT ? process.env.PORT : 80, e => {
	if (e) {
		console.log(e);
	} else {
		console.log("Up and running!");
	}
});