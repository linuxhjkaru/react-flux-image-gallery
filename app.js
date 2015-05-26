var React = require("react");
var Application = require("./components/ImageGallery.jsx");
var ImageGalleryActions = require("./actions/ImageGalleryActions.jsx");

var images = ["images/cat1.jpg", "images/cat2.jpg", "images/cat3.jpg",
  "images/cat4.jpg", "images/cat5.jpg", "images/cat6.jpg", "images/cat7.jpg", "images/cat8.jpg"];

ImageGalleryActions.receiveData(images);

React.render(
  <Application />,
  document.getElementById("container")
);