var ghpages = require("gh-pages");

ghpages.publish("public", function (err) {
  if (err) {
    console.error("Error deploying: ", err);
  } else {
    console.log("Successfully deployed to gh-pages branch.");
  }
});
