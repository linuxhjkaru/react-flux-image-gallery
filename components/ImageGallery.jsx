var React = require('react');
var CarouselStore = require('../stores/CarouselStore.jsx');
var ImageStore = require('../stores/ImageStore.jsx');
var Carousel = require('./Carousel.jsx');
var Images = require('./Images.jsx');
var ImageGalleryActions = require('../actions/ImageGalleryActions.jsx');
var mui = require("material-ui");
var AppBar = mui.AppBar;

function getCarouselImageState() {
  return {
    images: ImageStore.getImage(),
    carousel: CarouselStore.getState()
  }
}

var Application = React.createClass({
  getInitialState: function() {
    return getCarouselImageState();
  },

  componentDidMount: function() {
    ImageStore.addChangeListener(this._onChange);
    CarouselStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ImageStore.removeChangeListener(this._onChange);
    CarouselStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <section className="application-container">
        <AppBar title='Gallery' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <Carousel images={this.state.images}
                  selected={this.state.carousel.current}
                  isShowBullet={this.state.carousel.isShowBullet}
                  isSlide={this.state.carousel.isSlide}
                  interval={this.state.carousel.interval}
                  onClickLeft={this.onClickLeft}
                  onClickRight={this.onClickRight}
                  onSelectImage={this.onSelectImage} />
        <Images onAddUrl={this.onAddUrl} />
      </section>
    );
  },

  _onChange: function() {
    this.setState(getCarouselImageState());
  },

  onClickLeft: function() {
    ImageGalleryActions.prevImage();
  },

  onClickRight: function() {
    ImageGalleryActions.nextImage();
  },

  onSelectImage: function(i) {
    ImageGalleryActions.selectImage(i);
  },

  onAddUrl: function(url) {
    ImageGalleryActions.addImage(url);
  }
});

module.exports = Application;