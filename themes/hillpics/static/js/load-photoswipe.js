import Photoswipe from './photoswipe.esm.js';
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.js';

/*
Put this file in /static/js/load-photoswipe.js
Documentation and licence at https://github.com/liwenyip/hugo-easy-gallery/
edited for photoswipe v5
*/

const lightbox = new PhotoSwipeLightbox({
  gallery: 'body',
  children: 'figure',
  thumbSelector: 'figure',
  pswpModule: Photoswipe,
  //bgOpacity: 0.6
});
lightbox.init();


lightbox.addFilter('domItemData', (itemData, element, linkEl) => {

  if(linkEl.dataset.isVideo == "true"){
    var videoElement = element.querySelector("video");

    let caption = element.querySelector(".hidden-caption-content");
    //Photoswipe is expecting an <img> to read the `alt` attribute off of to create a caption.
    //we need to provide our own caption so photoswipe doesn't try to read the `alt` of a video and crash
    console.log(caption)
    if(!caption){
        let dummycaption = document.createElement("div");
        dummycaption.className = "hidden-caption-content";
        element.appendChild(dummycaption);
        dummycaption.innerHTML = linkEl.dataset.alt;
    }

    itemData.w = videoElement.videoWidth;
    itemData.h = videoElement.videoHeight;
    itemData.src = linkEl.href;
    itemData.type = "video"; //notify contentLoad() below
  }

  else if (linkEl) {

    let link = linkEl.href;
    //itemData.msrc = linkEl.dataset.thumbSrc;
  }

    //console.log(itemData, element, linkEl)

  return itemData
});

lightbox.on('uiRegister', function() {
  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'root',
    html: 'Caption text',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content');
          if (hiddenCaption) {
            // get caption from element with class hidden-caption-content
            captionHTML = hiddenCaption.innerHTML;
          } else {
            // get caption from alt attribute
            captionHTML = currSlideElement.querySelector('img').getAttribute('alt');
          }
        }
        el.innerHTML = captionHTML || '';
      });
    }
  });
});




lightbox.on('contentLoad', (e) => {
    const { content } = e;
    if (content.type === 'video') {
      // prevent the deafult behavior
      e.preventDefault();

      // Create a container for iframe
      // and assign it to the `content.element` property
      content.element = document.createElement('video');
      content.element.innerHTML = "Couldn't display video :("
      content.element.src = content.data.src;
      content.element.autoplay = true;
      content.element.playsinline = true;
      content.element.controls = true;
    }
});


lightbox.init();
