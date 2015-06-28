var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  NEXT_IMAGE: "NEXT_IMAGE",
  PREV_IMAGE: "PREV_IMAGE",
  SEL_IMAGE:  "SEL_IMAGE",
  ADD_IMAGE:  "ADD_IMAGE",
  RECEIVE_DATA: "RECEIVE_DATA",
  SHOW_BULLET: "SHOW_BULLET",
  PLAY_SLIDE: "PLAY_SLIDE",
  STOP_SLIDE: "STOP_SLIDE"
});