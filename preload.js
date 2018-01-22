/*
* Preload.js
* by Zack Waxler
*/

var Preload = function(images) {
  if (typeof Promise === "undefined") {
    console.error("Error: Preload.js requires browser promise support.");
    return;
  }

  var preload = new Promise(function(resolve, reject) {
    var imageObjects = {};

    for (var i in images) {
      imageObjects[i] = new Image();
      imageObjects[i].src = images[i];
      imageObjects[i].loaded = false;
      imageObjects[i].onload = function() {
        this.loaded = true;
      }
    }

    var preloadInterval = setInterval(function() {
      var unloadedImage = false;

      for (var i in imageObjects) {
        if (imageObjects[i].loaded === false) {
          unloadedImage = true;
        }
      }

      if (unloadedImage === false) {
        clearInterval(preloadInterval);
        resolve(imageObjects);
      }
    }, 50);
  });


  return preload;
}
