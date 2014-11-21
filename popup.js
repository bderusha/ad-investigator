/*jshint browser:true*/
/*global chrome */
'use strict';
var vendors = {};

function buildDOM(creatives) {
  console.log('in buildDOM with ' + creatives.length + '  creatives');
  var containerID = 'container_0',
    root = document.getElementById(containerID);
  if (!root) {
    console.log('Creating new container element: ' + containerID);
    root = document.getElementById('template').cloneNode(true);
    root.id = containerID;
    document.getElementsByTagName('body')[0].appendChild(root);
    // bail on the idea of having multiple creatives, so we'll just merge all info into one display
    //    root.id = 'container_'+i;
  }
  console.dir(creatives);

  for (var i = 0; i < creatives.length; i++) {

    root.setAttribute('data-secure', creatives[i].is_secure);
    if (creatives[i].flight_uid)
      addFlightLink(creatives[i].flight_uid, root);
    if (creatives[i].creative_uid)
      addCreativeLink(creatives[i].creative_uid, root);
    if (creatives[i].ad_server)
      addAdServer(creatives[i].ad_server, root);
    if (creatives[i].exchange)
      addExchange(creatives[i].exchange, root);
    if (creatives[i].click_trackers)
      addClickTrackers(creatives[i].click_trackers, root);
    if (creatives[i].impression_trackers)
      addImpressionTrackers(creatives[i].impression_trackers, root);
    if (creatives[i].activity_trackers)
      addActivityTrackers(creatives[i].activity_trackers, root);
    if (creatives[i].cookie_matchers)
      addCookieMatcher(creatives[i].cookie_matchers, root);
    if (creatives[i].vendors) {
      try {
      for (var ii = 0; ii < creatives[i].vendors.length; ii++) {

        var v = creatives[i].vendors[ii];
        if (!vendors[v]) {
          console.log('found new vendor: ' + v);
          vendors[v] = 1;
        } else {
          vendors[v]++;
        }
      }
      var vendorlist = [];
      for (var vendname in vendors) {
        vendorlist.push(vendname);
      }
      addVendors(vendorlist, root);
    } catch (e) {
      console.log('Exception: '+ e);
    }

    }
    if (creatives[i].macros)
      addMacros(creatives[i].macros, root);
    // if (creatives[i].cdn_url)
    //   addCdn(creatives[i].cdn_url, root);
    // if (creatives[i].landing_page_url)
    //   addLandingPage(creatives[i].landing_page_url, root);

  }
}

function createLink(url, text) {
  var a = document.createElement('a');
  if (url) {
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = text || url;
  }
  return a;
}

function addFlightLink(fuid, root) {
  var url;
  if (fuid) {
    url = 'https://advertisers.dataxu.com/flights/' + fuid;
  }
  var a = createLink(url, 'Flight');
  root.getElementsByClassName('flight')[0].appendChild(a);
}

function addCreativeLink(cuid, root) {
  var url;
  if (cuid) {
    url = 'https://advertisers.dataxu.com/search?q=' + cuid + '#tab_Creative';
  }
  var a = createLink(url, 'Creative');
  root.getElementsByClassName('creative')[0].appendChild(a);
}

function addExchange(exchange, root) {
  var span = document.createElement('span');
  if (exchange) {
    span.innerHTML = exchange;
  }
  root.getElementsByClassName('exchange')[0].appendChild(span);
}

function addAdServer(adServer, root) {
  var span = document.createElement('span');
  if (adServer) {
    span.innerHTML = adServer;
  }
  root.getElementsByClassName('ad-server')[0].appendChild(span);
}

function addClickTrackers(trackers, root) {
  console.log('adding ' + trackers.length + ' click trackers to ' + root.id);
  console.dir(trackers);
  var trackersRoot = root.getElementsByClassName('click-trackers')[0];
  var ul = trackersRoot.getElementsByTagName('ul')[0];
  for (var i = 0; i < trackers.length; i++) {
    console.log('Adding tracker: ' + trackers[i].name + ' at ' + trackers[i].url);

    var li = document.createElement('li');
    li.innerHTML = trackers[i].name + ' ' + trackers[i].url;
    li.setAttribute('title', trackers[i].url + ' is insecure!');
    li.className = 'truncate';

    if (root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure) {
      li.className = 'warning truncate';
    }
    ul.appendChild(li);
  }
}

function addImpressionTrackers(trackers, root) {
  console.log('adding ' + trackers.length + ' impression trackers to ' + root.id);
  console.dir(trackers);

  var ul = root.getElementsByClassName('impression-trackers')[0].getElementsByTagName('ul')[0];
  for (var i = 0; i < trackers.length; i++) {
    console.log('Adding tracker: ' + trackers[i].name + ' at ' + trackers[i].url);
    var li = document.createElement('li');
    li.innerHTML = trackers[i].name + ' ' + trackers[i].url;
    li.setAttribute('title', trackers[i].url + ' is insecure!');
    li.className = 'truncate';

    if (root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure) {
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}

function addActivityTrackers(trackers, root) {
  console.log('adding ' + trackers.length + ' activity trackers to ' + root.id);
  console.dir(trackers);

  var ul = root.getElementsByClassName('activity-trackers')[0].getElementsByTagName('ul')[0];
  for (var i = 0; i < trackers.length; i++) {
    console.log('Adding tracker: ' + trackers[i].name + ' at ' + trackers[i].url);

    var li = document.createElement('li');
    li.innerHTML = trackers[i].name + ' ' + trackers[i].url;
    li.setAttribute('title', trackers[i].url + ' is insecure!');
    li.className = 'truncate';

    if (root.getAttribute('data-secure') == 'true' && !trackers[i].is_secure) {
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}

function addCookieMatcher(matchers, root) {
  var ul = root.getElementsByClassName('cookie-matchers')[0].getElementsByTagName('ul')[0];
  for (var i = 0; i < matchers.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = matchers[i].name;
    if (root.getAttribute('data-secure') == 'true' && !matchers[i].is_secure) {
      li.className = 'warning';
    }
    ul.appendChild(li);
  }
}


function addVendors(vendors, root) {
  var ul = root.getElementsByClassName('vendors')[0].getElementsByTagName('ul')[0];
  ul.innerHTML = ''; // ahem
  for (var i = 0; i < vendors.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = vendors[i];
    ul.appendChild(li);
  }
}

function addMacros(macros, root) {
  var macroEl = root.getElementsByClassName('macros')[0];
  var ul = macroEl.getElementsByTagName('ul')[0];
  // TODO:  add filled in macros and bare macros, then remove hide class
  for (var i = 0; i < macros.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = macros[i];
    li.className = 'warning';
    ul.appendChild(li);
  }
}

function addCdn(cdn, root) {
  var a = document.createElement('a');
  if (cdn) {
    var url = cdn;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  root.getElementsByClassName('cdn-link')[0].appendChild(a);
}

function addLandingPage(page, root) {
  var a = document.createElement('a');
  if (page) {
    var url = page;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.innerHTML = url;
  }
  root.getElementsByClassName('landing-page')[0].appendChild(a);
}


document.addEventListener('DOMContentLoaded', function() {
  chrome.runtime.getBackgroundPage(
    function(eventPage) {
      // Call the getPageInfo function in the event page, passing in
      // our onPageDetailsReceived function as the callback. This injects
      // content.js into the current tab's HTML
      eventPage.getCreatives(buildDOM);
    }
  );
});
