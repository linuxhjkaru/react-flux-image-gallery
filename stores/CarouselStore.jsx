var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var CarouselConstants = require('../constants/CarouselConstants.jsx');
var ImageStore = require('../stores/ImageStore.jsx');
var assign = require('object-assign');

var _current = 4, _count = 0, _animating = false, _isSlide = false,
  _interval = 2000, _isShowBullet = true;

function loadImageData(data){
  _count = data.length;
}

function handleNextImage() {
  if (_animating) return;
  var next = _current + 1;
  if (next >=  _count) next = 0;
  selectImage(next);
}

function handlePrevImage() {
  if (_animating) return;
  var next = _current - 1;
  if (next < 0) next = _count - 1;
  selectImage(next);
}

function handleAddImage() {
  var length = ImageStore.getImage().length;
  if (_count < length) {
    _count = length;
    selectImage(_count - 1);
  }
}
function handleSelectImage(index) {
  selectImage(index);
}

function selectImage(index) {
  if (_animating) return;
  _animating = true;
  _current = index;
  setTimeout(function() {
    _animating = false;
  }.bind(this), 300);
}

function showBullet() {
  _isShowBullet = !_isShowBullet;
}

function playSlide(data) {
  _interval = data;
  _isSlide = true;
}

function stopSlide() {
  _isSlide = false;
}

var CarouselStore = assign({}, EventEmitter.prototype, {
  getState: function() {
    return {
      current: _current,
      count: _count,
      isSlide: _isSlide,
      interval: _interval,
      isShowBullet: _isShowBullet
    }
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case CarouselConstants.NEXT_IMAGE:
      handleNextImage();
      break;

    case CarouselConstants.PREV_IMAGE:
      handlePrevImage();
      break;

    case CarouselConstants.SEL_IMAGE:
      handleSelectImage(action.data);
      break;

    case CarouselConstants.SHOW_BULLET:
      showBullet();
      break;

    case CarouselConstants.PLAY_SLIDE:
      playSlide(action.data);
      break;

    case CarouselConstants.STOP_SLIDE:
      stopSlide();
      break;

    case CarouselConstants.ADD_IMAGE:
      AppDispatcher.waitFor([ImageStore.dispatchToken])
      handleAddImage();
      break;

    case CarouselConstants.RECEIVE_DATA:
      loadImageData(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  CarouselStore.emitChange();

  return true;

});

module.exports = CarouselStore;