/** @jsx React.DOM */
var React = require("react");
var mui = require("material-ui");
var ThemeManager = new mui.Styles.ThemeManager();
var ImageGallery = require("./ImageGallery.jsx");
var AutoSlide = require("./AutoSlide.jsx");

var App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    return (
      <div>
        <ImageGallery />
        <AutoSlide />
      </div>
    )
  }
});

module.exports = App;