function buildDOM(creatives)  {
  console.log(creatives);
  for(var i=0; i < creatives.length; i++){
    console.log(i);
    var root = document.getElementById('template').cloneNode(true);
    console.log(i);
    root.id = 'container_'+i;
    console.log(i);
    root.getElementsByClassName('flight')[0].appendChild(flightLink(creatives[i].flight_uid));
    console.log(root);
    document.getElementsByTagName('body')[0].appendChild(root);
  }
}

function flightLink(fuid){
  var a = document.createElement('a');
  if( fuid ){
    var url = 'https://advertisers.dataxu.com/flights/'+fuid;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  return a;
}


document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.getBackgroundPage(
    function(eventPage) {
        // Call the getPageInfo function in the event page, passing in
        // our onPageDetailsReceived function as the callback. This injects
        // content.js into the current tab's HTML
        eventPage.getCreatives(buildDOM);
    }
  );
});
