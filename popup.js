function buildDOM(creatives)  {
  console.log(creatives);
  for(var i=0; i < creatives.length; i++){
    var root = document.getElementById('template').cloneNode(true);
    root.id = 'container_'+i;
    root.setAttribute('data-secure', creatives[i].is_secure);
    if(creatives[i].flight_uid)
      addFlightLink(creatives[i].flight_uid, root);
    if(creatives[i].creative_uid)
      addCreativeLink(creatives[i].creative_uid, root);
    if(creatives[i].ad_server)
      addAdServer(creatives[i].ad_server, root);
    if(creatives[i].exchange)
      addExchange(creatives[i].exchange, root);
    if(creatives[i].click_trackers)
      addClickTrackers(creatives[i].click_trackers, root);
    if(creatives[i].impression_trackers)
      addImpressionTrackers(creatives[i].impression_trackers, root);
    if(creatives[i].activity_trackers)
      addActivityTrackers(creatives[i].activity_trackers, root);
    if(creatives[i].cookie_matchers)
      addCookieMatcher(creatives[i].cookie_matchers, root);
    if(creatives[i].vendors)
      addVendors(creatives[i].vendors, root);
    if(creatives[i].macros)
      addMacros(creatives[i].macros, root);
    if(creatives[i].cdn_url)
      addCdn(creatives[i].cdn_url, root);
    if(creatives[i].landing_page_url)
    addLandingPage(creatives[i].landing_page_url, root);

    document.getElementsByTagName('body')[0].appendChild(root);
  }
}

function createLink(url, text){
  var a = document.createElement('a');
  if( url ){
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = text || url;
  }
  return a;
}

function addFlightLink(fuid, root){
  var url;
  if( fuid ){
    url = 'https://advertisers.dataxu.com/flights/'+fuid;
  }
  var a = createLink(url, 'Flight');
  root.getElementsByClassName('flight')[0].appendChild(a);
}

function addCreativeLink(cuid, root){
  var url;
  if( cuid ){
    url = 'https://advertisers.dataxu.com/search?utf8=✓&q='+cuid+'#tab_Creative';
  }
  var a = createLink(url, "Creative");
  root.getElementsByClassName('creative')[0].appendChild(a);
}

function addExchange(exchange, root){
  var span = document.createElement('span');
  if( exchange ){
    span.innerHTML = exchange;
  }
  root.getElementsByClassName('exchange')[0].appendChild(span);
}

function addAdServer(adServer, root){
  var span = document.createElement('span');
  if( adServer ){
    span.innerHTML = adServer;
  }
  root.getElementsByClassName('ad-server')[0].appendChild(span);
}

function addClickTrackers(trackers, root){
  var ul = root.getElementsByClassName('click-trackers')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < trackers.length; i++){
    var li = document.createElement('li');
    li.innerHTML = trackers[i].name + " " + trackers[i].url;
    li.setAttribute('title', trackers[i].url  + " is insecure!");
    li.className = 'truncate';

    if( root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure ){
      li.className = 'warning truncate';
    }
    ul.appendChild(li);
  }
}

function addImpressionTrackers(trackers, root){
  var ul = root.getElementsByClassName('impression-trackers')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < trackers.length; i++){
    var li = document.createElement('li');
    li.innerHTML = trackers[i].name + " " + trackers[i].url;
    li.setAttribute('title', trackers[i].url + " is insecure!");
    li.className = 'truncate';

    if( root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure ){
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}

function addActivityTrackers(trackers, root){
  var ul = root.getElementsByClassName('activity-trackers')[0].getElementsByTagName('ul')[0];
  for(var i=0; i < trackers.length; i++){
    var li = document.createElement('li');
    li.innerHTML = trackers[i].name + " " + trackers[i].url;
    li.setAttribute('title', trackers[i].url  + " is insecure!");
    li.className = 'truncate';

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
    li.className = 'warning';
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
