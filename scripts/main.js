var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var DETAIL_FRAME_SELECTOR = "[data-image-role=\"frame\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var ARROW_SELECTOR = "[data-image-role=\"cycle\"]";

function selectDetailFrame() {
  return document.querySelector(DETAIL_FRAME_SELECTOR);
}

function setDetails(imageUrl, titleText, index) {
  "use strict";
  var detailFrame = selectDetailFrame();
  detailFrame.setAttribute("thumb-index", index);

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail, index) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail), index);
}

function addThumbClickHandler(thumb, index) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb, index);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function indexFromDetails() {
  var frame = selectDetailFrame();
  var index = frame.getAttribute("thumb-index");
  return parseInt(index, 10);
}

function valueFromArrow(arrow) {
  "user strict";
  var value = arrow.getAttribute("data-image-cycle-value");
  return parseInt(value, 10);
}

function addArrowClickHandler(arrow) {
  "user strict";
  arrow.addEventListener("click", function(event) {
    event.preventDefault();

    var thumbnails = getThumbnailsArray();
    var numThumbs = thumbnails.length;
    var thumbIndex = indexFromDetails();
    var cycleVal = valueFromArrow(arrow);
    var index = (thumbIndex + (numThumbs + cycleVal)) % numThumbs;
    var thumb = thumbnails[index];
    setDetailsFromThumb(thumb, index);
  });
}

function getArrowsArray() {
  "use strict";
  var arrows = document.querySelectorAll(ARROW_SELECTOR);
  var arrowArray = [].slice.call(arrows);
  return arrowArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  var arrows = getArrowsArray();
  arrows.forEach(addArrowClickHandler);
}

initializeEvents();
