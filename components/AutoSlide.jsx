/** @jsx React.DOM */
var React = require("react");
var ImageGalleryActions = require('../actions/ImageGalleryActions.jsx');
var CarouselStore = require('../stores/CarouselStore.jsx');
var mui = require("material-ui");
var AppBar = mui.AppBar;
var FlatButton = mui.FlatButton;
var TextField = mui.TextField;
var Toggle = mui.Toggle;

function getCarouselState() {
  return {carousel: CarouselStore.getState()}
}

var AutoSlide = React.createClass({

  getInitialState: function() {
    return getCarouselState()
  },
  componentDidMount: function() {
    CarouselStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CarouselStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getCarouselState());
  },

  showBullet: function(){
    ImageGalleryActions.showBullet();
  },

  playSlide: function(){
    var interval = parseInt($("#interval-value").val());
    if(interval == NaN){
      alert("Interval should be number")
    }
    else {
      ImageGalleryActions.playSlide(interval);
    }
  },

  stopSlide: function(){
    ImageGalleryActions.stopSlide();
  },

  render: function() {
    return (
      <section className="application-container">
        <AppBar title='Auto Slide' iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <div className="slide-option">
          <div>
            Set Inteval Value:
            <TextField id="interval-value"
              defaultValue={this.state.carousel.interval}
              style={{marginRight: "20px", marginLeft: "5px"}} />
            <FlatButton label="Play" secondary={true} onClick={this.playSlide}/>
            <FlatButton label="Pause" primary={true} onClick={this.stopSlide}/>
          </div>
          <div>
            <Toggle
              name="Show Buller"
              defaultToggled={this.state.carousel.isShowBullet}
              label="Show Bullets: "
              onToggle={this.showBullet}/>
          </div>
        </div>
      </section>
    )
  }
});

module.exports = AutoSlide;