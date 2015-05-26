var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var CarouselConstants = require('../constants/CarouselConstants.jsx');
var assign = require('object-assign');

var _images = [], _selected = null;

function loadImageData(data) {
  _images = data;
  _selected = 0;
}

function setSeletedImages(index) {
  _selected = index;
}

function addImage(url) {
  if(typeof(url) == "undefined") {alert("URL PLEASE"); return;}
  if (_images.indexOf(url) > -1) return;
  var parts = url.split(".");
  if (["png", "jpg", "jpeg", "gif"].indexOf(parts[parts.length - 1]) > -1) {
    _images.push(url);
  } else {
    alert("IMAGE URL PLEASE");
  }
}
var ImageStore = assign({}, EventEmitter.prototype, {
  getImage: function() {
    return _images;
  },

  getSelected: function(){
    return _selected;
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

  switch(action.actionType) {
    case CarouselConstants.RECEIVE_DATA:
      loadImageData(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ImageStore.emitChange();

  return true;

});

ImageStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case CarouselConstants.ADD_IMAGE:
      addImage(action.data);
      break;

    default:
      return true;
  }
  return true;
});

module.exports = ImageStore;