var AppDispatcher = require('../dispatcher/AppDispatcher.jsx');
var ImageGalleryConstants = require("../constants/CarouselConstants.jsx");

var ImageGalleryActions = {
  nextImage: function() {
    AppDispatcher.handleAction({
      actionType: ImageGalleryConstants.NEXT_IMAGE
    })
  },

  prevImage: function() {
    AppDispatcher.handleAction({
      actionType: ImageGalleryConstants.PREV_IMAGE
    })
  },

  selectImage: function(data) {
    AppDispatcher.handleAction({
      actionType: ImageGalleryConstants.SEL_IMAGE,
      data: data
    })
  },

  addImage: function(data) {
    AppDispatcher.handleAction({
      actionType: ImageGalleryConstants.ADD_IMAGE,
      data: data
    })
  },

  receiveData: function(data) {
    AppDispatcher.handleAction({
      actionType: ImageGalleryConstants.RECEIVE_DATA,
      data: data
    })
  },
}

module.exports = ImageGalleryActions;