function buildDOM(creatives)  {
  console.log(creatives);
  for(var i=0; i < creatives.length; i++){
    var root = document.getElementById('template').cloneNode(true);
    root.id = 'container_'+i;
    root.setAttribute('data-secure', creatives[i].is_secure);
    addFlightLink(creatives[i].flight_uid, root);
    addCreativeLink(creatives[i].creative_uid, root);
    document.getElementsByTagName('body')[0].appendChild(root);
  }
}

function addFlightLink(fuid, root){
  var a = document.createElement('a');
  if( fuid ){
    var url = 'https://advertisers.dataxu.com/flights/'+fuid;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  root.getElementsByClassName('flight')[0].appendChild(a);
}

function addCreativeLink(cuid, root){
  var a = document.createElement('a');
  if( cuid ){
    var url = 'https://advertisers.dataxu.com/search?utf8=✓&q='+cuid+'#tab_Creative';
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  root.getElementsByClassName('creative')[0].appendChild(a);
}

function addClickTrackers(trackers, root){
  var ul = root.getElementsByClassName('click-trackers')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < trackers.length; i++){
    var li = document.createElement('li');
    li.innerHTML = trackers[i].name;
    li.setAttribute('title', trackers[i].url);
    if( root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure ){
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}

function addImpressionTrackers(trackers, root){
  var ul = root.getElementsByClassName('impression-trackers')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < trackers.length; i++){
    var li = document.createElement('li');
    li.innerHTML = trackers[i].name;
    li.setAttribute('title', trackers[i].url);
    if( root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure ){
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}

function addCookieMatcher(matchers, root){
  var ul = root.getElementsByClassName('cookie-matchers')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < matchers.length; i++){
    var li = document.createElement('li');
    li.innerHTML = matchers[i].name;
    if( root.getAttribute('data-secure') == 'true' && !matchers[i].is_secure ){
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}


function addVendors(vendors, root){
  var ul = root.getElementsByClassName('vendors')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < vendors.length; i++){
    var li = document.createElement('li');
    li.innerHTML = vendors[i];
    ul.appendChild(li);
  }
}

function addMacros(macros, root){
  var ul = root.getElementsByClassName('macros')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < macros.length; i++){
    var li = document.createElement('li');
    li.innerHTML = macros[i];
    ul.appendChild(li);
  }
}

function addCdn(cdn, root){
  var a = document.createElement('a');
  if( cdn ){
    var url = cdn;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  root.getElementsByClassName('cdn-link')[0].appendChild(a);
}

function addLandingPage(page, root){
  var a = document.createElement('a');
  if( page ){
    var url = page;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  root.getElementsByClassName('landing-page')[0].appendChild(a);
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
