/** @jsx React.DOM */
var React = require("react");
var ImageGalleryActions = require('../actions/ImageGalleryActions.jsx');
var mui = require("material-ui");
var LinearProgress = mui.LinearProgress;
var _intervalId = undefined;

var Carousel = React.createClass({
  propTypes: {
    images: React.PropTypes.array.isRequired,
    selected: React.PropTypes.number.isRequired,
    onClickLeft: React.PropTypes.func.isRequired,
    onClickRight: React.PropTypes.func.isRequired,
    onSelectImage: React.PropTypes.func.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.isSlide) {
      this.stopSlide();
      this.playSlide();}
    else {
      this.stopSlide();
    }
  },

  playSlide: function() {
    if(_intervalId == undefined) {
      _intervalId = window.setInterval(function() {
        $("#arrow-right").click();
      }.bind(this), this.props.interval);
    }
  },

  stopSlide: function() {
    if(_intervalId != undefined) {
      window.clearInterval(_intervalId);
      _intervalId = undefined;
    }
  },

  render: function() {
    var left = this.props.selected * 500 * -1,
        ulStyle = {
          width: this.props.images.length * 500,
          "msTransform": "translate(" + left + "px,0px)",
          "WebkitTransform": "translate(" + left + "px,0px)",
          transform: "translate(" + left + "px,0px)"
        };

    var showBullet = [];

    if(this.props.isShowBullet) {
      showBullet.push(
        <ul className="dots">
          {this.props.images.map(function(image, i) {
            var activeClass = i === this.props.selected ? "active" : "";
            return <li key={i}
            className={"circle " + activeClass}
            onClick={this._onClickDot.bind(this, i)}></li>;
          }.bind(this))}
        </ul>
      )
    }

    var linearValue = this.props.selected / this.props.images.length * 100

    return (
      <div>
        <LinearProgress id="linear-top" mode="determinate" value={linearValue}
          style={{marginTop: "10px", width: "500px", marginLeft: "135px"}} />
        <span className="arrow left"
              onClick={this.props.onClickLeft}>&#x25C4;</span>
        <div className="carousel-stage">
          <ul style={ulStyle} className="carousel-list">
            {this.props.images.map(function(image, i) {
              return <li key={i}><img src={image} /></li>;
            })}
          </ul>
          {showBullet}
        </div>
        <span className="arrow right" id="arrow-right"
          onClick={this.props.onClickRight}>&#x25BA;</span>
        <LinearProgress id="linear-bottom" mode="determinate" value={linearValue}
          style={{marginBottom: "10px", width: "500px", marginLeft: "135px"}} />
      </div>
    )
  },

  _onClickDot: function(index) {
    this.props.onSelectImage(index);
  }
});

module.exports = Carousel;