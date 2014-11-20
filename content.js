/*jshint browser:true*/
/*global chrome */
'use strict';
var patterns = [{
  'name': 'DoubleClick (activity)',
  'pattern': 'doubleclick\\.net\\/activity',
  'type': 'activity',
  'vendor': 'DoubleClick'
}, {
  'name': 'DoubleClick',
  'pattern': 'ad\\.doubleclick\\.net\\/N',
  'type': 'ad',
  'vendor': 'DoubleClick'
}, {
  'name': 'DoubleClick (click tracker)',
  'pattern': 'adclick\\.g\\.doubleclick\\.net\\/aclk',
  'type': 'click',
  'vendor': 'DoubleClick'
}, {
  'name': 'DoubleClick (impression tracker)',
  'pattern': 'doubleclick\\.net\\/imp',
  'type': 'impression',
  'vendor': 'DoubleClick'
}, {
  'name': 'DoubleClick (ad)',
  'pattern': 'doubleclick\\.net\\/ad.*?/',
  'type': 'ad',
  'vendor': 'DoubleClick'
}, {
  'name': 'DoubleClick (activity tracker)',
  'pattern': 'doubleclick\\.net\\/activity',
  'type': 'activity',
  'vendor': 'DoubleClick'
}, {
  'name': 'DataXu (click tracker)',
  'pattern': 'i\\.w55c\\.net\\/cl',
  'type': 'click',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu',
  'pattern': 'i\\.w55c\\.net\\/ping_match',
  'type': 'cookiematch',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu (retargeting)',
  'pattern': 'tags\\.w55c\\.net\\/rs',
  'type': 'retarget',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu',
  'pattern': 'i\\.w55c\\.net\\/a.gif',
  'type': 'unknown',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu (cookie matcher)',
  'pattern': 'cti\\.w55c\\.net\\/cms-2.?\\.html',
  'type': 'cookiematch',
  'vendor': 'DataXu'
}, {
  'name': 'Rubicon (impression cookie matcher)',
  'pattern': 'cti\\.w55c\\.net\\/rubicon-cms-2.?\\.html',
  'type': 'cookiematch',
  'vendor': 'Rubicon'
}, {
  'name': 'DataXu Ad Server (Display)',
  'pattern': 'ads\\.w55c\\.net/t/d',
  'type': 'ad',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu Ad Server (Video)',
  'pattern': 'ads\\.w55c\\.net\\/t\\/v',
  'type': 'ad',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu Ad (insecure)',
  'pattern': 'cdn\\.w55c\\.net\\/i\\/0R',
  'type': 'ad',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu Ad (secure)',
  'pattern': 'https:\\/\\/cdn\\.w55c\\.net\\/i\\/\\/s_0R',
  'type': 'ad',
  'vendor': 'DataXu'
}, {
  'name': 'DataXu Ad Server (Display)',
  'pattern': 'ads\\.w55c\\.net/t/d',
  'type': 'ad',
  'vendor': 'DataXu'
}, {
  'name': 'PointRoll (impression tracker)',
  'pattern': 't\\.pointroll\\.com',
  'type': 'impression',
  'vendor': 'PointRoll'
}, {
  'name': 'PointRoll (click tracker)',
  'pattern': 'clk\\.pointroll\\.com',
  'type': 'click',
  'vendor': 'PointRoll'
}, {
  'name': 'PointRoll (ad server)',
  'pattern': 'ad\\.pointroll\\.com',
  'type': 'ad',
  'vendor': 'PointRoll'
}, {
  'name': 'PointRoll (performance tracker)',
  'pattern': '[speed|spd]\\.pointroll\\.com',
  'type': 'tracker',
  'vendor': 'PointRoll'
}, {
  'name': 'Demdex (activity tracker)',
  'pattern': 'demdex\\.com\\/event',
  'type': 'activity',
  'vendor': 'DemDex'
}, {
  'name': 'Turn (activity tracker)',
  'pattern': 'r\\.turn\\.com\\/event',
  'type': 'activity',
  'vendor': 'Turn'
}, {
  'name': 'AdapTV (retargeting)',
  'pattern': 'segments\\.adaptv\\.com',
  'type': 'retarget',
  'vendor': 'AdapTV'
}, {
  'name': 'LiveRail',
  'pattern': 'ad\\d\\.liverail\\.com',
  'type': '',
  'vendor': 'LiveRail'
}, {
  'name': 'OBA',
  'pattern': 'surly\\.com',
  'type': 'oba',
  'vendor': 'Ghostery'
}];

//var href = 'http://i.w55c.net/cl?t=1&btid=NTQ2RTAwOEYwMDA2N0M2RDBBMEMwNTEzMTkwMDMzRjR8R0ZuN1JheWtGRnwxNDE2NDk1MjQ3NTM4fDF8MEZwV0FCdE1kTnwwUjRZRXF4VmVnfDZjMDk5MzhlLTI1MmUtNDZmNC04Mjk2LTY0YjI0ODZiZTUwNXw3MDAwMDAwfHx8fDEyLjBQfFVTRA&ei=GOOGLE&tpc=http://adclick.g.doubleclick.net/aclk%3Fsa%3Dl%26ai%3DCBpDYjwBuVO34GZOKMPTngMgBzdzg3AW14_T3uAHAjbcBEAEgAGDJhu2IhKTsD4IBF2NhLXB1Yi0yOTU4OTI4NDg1NTk4OTYxoAGxtNXsA8gBCeACAKgDAaoEjQFP0AdWaMorOI0etWO-Hvnv_W18O-x1aKo8ukGvqQoGvHjmk6ihfrmAFhdordUvMiNNyWkpVk0dO3cfw45JLiz1tVyoWx0enL_rtPEU08VSUAGXM9p3KzGYKU4efksm4tJ1V1edXPOdHV-z-GWXVe_b-uL29SwhaotoftL6KEciTCahDOYqRJwgjI2s4_bgBAGABonzw8fe_MGs9gGgBiE%26num%3D1%26sig%3DAOD64_3Y_j4wUD6ZCaQ0nJAJ9e32hQskaA%26client%3Dca-pub-2958928485598961%26adurl%3D&rurl=https://dataxu.atlassian.net/wiki/pages/viewpage.action?spaceKey=Innovation&title=Innovation+Day+9+-+November+20th%252C+2014';
var matcher = function(m, i) {
  if (m && m.length > (i - 1)) {
    return m[i];
  }
};
var btid, exchange;
var parseHref = function(href) {
  btid = matcher(href.match(/btid=(.*?)&/), 1);
  var tcp = matcher(href.match(/tcp=(.*?)&/), 1);
  exchange = matcher(href.match(/ei=(.*?)&/), 1);

  parseBtid(btid);
};

var parseBtid = function(btid) {
  console.log('Parsing BTID: ' + btid);
  if (!btid) return;
  for (ii = 0; ii < 4; ii++) {
    try {
      var q = atob(btid);
      var parsedBtid = q.split('|');
      flight_uid = parsedBtid[4];
      creative_uid = parsedBtid[5];
      return;
    } catch (e) {
      btid += '=';
    }
  }
  console.log('Could not decode BTID: ' + btid);
  return;
};

var matchPattern = function(uri) {
  var res = [];
  var numFound = 0;
  for (var ii = 0; ii < patterns.length; ii++) {
    var pat = patterns[ii];
    //    console.log('Trying pattern: ' + pat.pattern);
    if (uri.match(pat.pattern)) {
      numFound++;
      console.log('Matched pattern "' + pat.name + '" type: ' + pat.type);
      return pat;
    }
    // TODO: don't stop on first match
  }
  console.log('Could not find matching pattern for:  "' + uri + '"');
  return;
};

var creative_uid, flight_uid, exchange, click_trackers, pixel_fires, cookie_matchers, vendors, macros, cdn_url, landing_page_url, href;
var iframes = document.querySelectorAll('iframe');
var links = document.querySelectorAll('a');
var imgs = document.querySelectorAll('img');

var results = [];
var found = false;

for (var ii = iframes.length; ii--;) {
  var el = iframes[ii],
    uri = el.getAttribute('src');
  if (uri) {
    console.log('Found iframe link: ' + uri);
    var res = matchPattern(uri);
    if (res) {
      res.uri = uri;
      console.dir(res);
      results.push(res);
      found = true;
    }
  }
}


for (var ii = links.length; ii--;) {
  var el = links[ii],
    uri = el.getAttribute('src');
  if (uri) {
    console.log('Found anchor link: ' + uri);
    var res = matchPattern(uri);
    if (res) {
      res.uri = uri;
      console.dir(res);
      results.push(res);
      found = true;
    }
  }
}
var msg = {};
msg.click_trackers = [];
msg.impression_trackers = [];
msg.activity_trackers = [];

for (var ii = 0; ii < results.length; ii++) {
  var info = results[ii],
    filled = false;
  console.log('Info:');
  console.dir(info);
  if (info.type == 'ad') {
    msg.type = 'ad';
    filled = true;
    if (info.vendor == 'DataXu') {
      console.log('Found DataXu Ad');
      parseHref(info.uri);
      msg.creative_uid = creative_uid;
      msg.flight_uid = flight_uid;
      msg.exchange = exchange;
    } else {
      msg.ad_server = info.vendor;
    }
  } else if (info.type == 'impression') {
    var imp = {};
    imp.name = info.vendor;
    imp.url = info.uri;
    imp.is_secure = (info.uri.indexOf('https') === 0);
    msg.impression_trackers.push(imp);
    filled = true;

  } else if (info.type == 'activity') {
    var act = {};
    act.name = info.vendor;
    act.url = info.uri;
    act.is_secure = (info.uri.indexOf('https') === 0);
    msg.activity_trackers.push(act);
    filled = true;

  } else if (info.type == 'click') {
    var click = {};
    click.name = info.vendor;
    click.url = info.uri;
    click.is_secure = (info.uri.indexOf('https') === 0);
    msg.click_trackers.push(click);
    filled = true;
  }
}
if (filled) {
  console.log('Sending message:');
  console.dir(msg);

  chrome.extension.sendMessage(msg, function() {});
} else {
  console.log('no ads found');
}
