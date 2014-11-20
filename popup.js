function onElementFound(link)  {
  var anchor = document.createElement('a');
  anchor.setAttribute('href', link.href);
  anchor.setAttribute('target', '_blank');
  anchor.innerHTML = link.text;
  document.getElementById('linker').appendChild(anchor);
}


document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.getBackgroundPage(
    function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This injects
        // content.js into the current tab's HTML
        eventPage.findElement(onElementFound);
    }
  );
});
