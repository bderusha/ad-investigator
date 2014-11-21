/*jshint browser:true*/
/*global chrome */
'use strict';

setTimeout(go, 1000);

function go() {
  console.log('GOOOOO!!!!!');

  var parseDXURI = function(uri) {
    var result = {},
      query = uri.substring(uri.indexOf('?') + 1),
      params = query.split('&');

    if (!query) return result;

    result.query = query;
    if (!params) return result;

    result.params = {};
    result.parsed_params = {};

    for (var ii = 0; ii < params.length; ii++) {
      var nameval = params[ii].split('=');
      if (nameval.length != 2) continue;
      var paramname = nameval[0],
        paramval = nameval[1];
      console.log('found param: ' + paramname + '=' + paramval);
      result.params[paramname] = paramval;
      if (paramparsers[paramname]) {
        result.parsed_params[paramname] = paramparsers[paramname](paramval);
      }
    }

    return result;
  };

  var searchitems = {
    'activity_trackers': [{
      'name': 'DoubleClick (activity)',
      'pattern': 'doubleclick\\.net\\/activity',
      'vendor': 'DoubleClick'
    }, {
      'name': 'DoubleClick (activity tracker)',
      'pattern': 'doubleclick\\.net\\/activity',
      'vendor': 'DoubleClick'
    }, {
      'name': 'Demdex (activity tracker)',
      'pattern': 'demdex\\.com\\/event',
      'vendor': 'DemDex'
    }, {
      'name': 'Turn (activity tracker)',
      'pattern': 'r\\.turn\\.com\\/event',
      'vendor': 'Turn'
    }],
    click_trackers: [{
      'name': 'DoubleClick (click tracker)',
      'pattern': 'adclick\\.g\\.doubleclick\\.net\\/aclk',
      'vendor': 'DoubleClick'
    }, {
      'name': 'DataXu (click tracker)',
      'pattern': 'i\\.w55c\\.net\\/cl',
      'vendor': 'DataXu'
    }, {
      'name': 'PointRoll (click tracker)',
      'pattern': 'clk\\.pointroll\\.com',
      'vendor': 'PointRoll'
    }],
    ad_servers: [{
      'name': 'DoubleClick',
      'pattern': 'ad\\.doubleclick\\.net\\/N',
      'vendor': 'DoubleClick'
    }, {
      'name': 'DoubleClick (ad)',
      'pattern': 'doubleclick\\.net\\/ad.*?/',
      'vendor': 'DoubleClick'
    }, {
      'name': 'DataXu Ad Server (Display)',
      'pattern': 'ads\\.w55c\\.net/t/d',
      'vendor': 'DataXu'
    }, {
      'name': 'DataXu Ad Server (Video)',
      'pattern': 'ads\\.w55c\\.net\\/t\\/v',
      'vendor': 'DataXu'
    }, {
      'name': 'DataXu Ad (insecure)',
      'pattern': 'cdn\\.w55c\\.net\\/i\\/0R',
      'parser': parseDXURI,
      'vendor': 'DataXu'
    }, {
      'name': 'DataXu Ad (secure)',
      'pattern': 'https:\\/\\/cdn\\.w55c\\.net\\/i\\/\\/s_0R',
      'parser': parseDXURI,
      'vendor': 'DataXu'
    }, {
      'name': 'DataXu Ad Server (Display)',
      'pattern': 'ads\\.w55c\\.net/t/d',
      'vendor': 'DataXu'
    }, {
      'name': 'PointRoll (ad server)',
      'pattern': 'ad\\.pointroll\\.com',
      'vendor': 'PointRoll'
    }, {
      'name': 'LiveRail',
      'pattern': 'ad\\d\\.liverail\\.com',
      'vendor': 'LiveRail'
    }, {
      'name': 'DataXu (DX4GM)',
      'pattern': 'tags\\.w55c\\.net\\/pi\\/trs998',
      'vendor': 'DataXu'
    }],
    impression_trackers: [{
      'name': 'DoubleClick (impression tracker)',
      'pattern': 'doubleclick\\.net\\/imp',
      'vendor': 'DoubleClick'
    }, {
      'name': 'DataXu',
      'pattern': 'i\\.w55c\\.net\\/a.gif',
      'parser': parseDXURI,
      'vendor': 'DataXu'
    }, {
      'name': 'PointRoll (impression tracker)',
      'pattern': 't\\.pointroll\\.com',
      'vendor': 'PointRoll'
    }],
    cookie_matchers: [{
      'name': 'DataXu',
      'pattern': 'cti\\.w55c\\.net\\/ct\\/cms-2c\\.html',
      'vendor': 'DataXu'
    }, {
      'name': 'Rubicon (impression cookie matcher)',
      'pattern': 'cti\\.w55c\\.net\\/ct\\/rubicon-cms-2.?\\.html',
      'vendor': 'Rubicon'
    },
  
  
  
    {
      vendor: 'google',
      name: 'google',
      pattern: 'cm\\.g\\.doubleclick\\.net\\/pixel'
    }, {
      vendor: 'fbx',
      name: 'fbx',
      pattern: 'www\\.facebook\\.com\\/fr\\/u\\.php'
    }, {
      vendor: 'appnexus',
      name: 'appnexus',
      pattern: 'ib\\.adnxs\\.com\\/setuid?entity=17'
    }, {
      vendor: 'rubicon',
      name: 'rubicon',
      pattern: 'pixel\\.rubiconproject\\.com\\/tap\\.php?v=4210&nid=1523'
    }, {
      vendor: 'improvedigital',
      name: 'improvedigital',
      pattern: 'ad\\.360yield\\.com\\/match'
    }, {
      vendor: 'pubmatic',
      name: 'pubmatic',
      pattern: 'image2\\.pubmatic\\.com\\/AdServer\\/Pug'
    }, {
      vendor: 'bluekai',
      name: 'bluekai',
      pattern: 'tags\\.bluekai\\.com\\/site\\/2964'
    }, {
      vendor: 'casale',
      name: 'casale',
      pattern: 'dsum\\.casalemedia\\.com\\/rum?cm_dsp_id=47'
    }, {
      vendor: 'dlx',
      name: 'dlx',
      pattern: 'e\\.nexac\\.com\\/e\\/dataxu_sync\\.xgi'
    }, {
      vendor: 'openx',
      name: 'openx',
      pattern: 'us-u\\.openx\\.net\\/w\\/1\\.0\\/sd?id=537072979'
    }, {
      vendor: 'twitter',
      name: 'twitter',
      pattern: 'analytics\\.twitter\\.com\\/i\\/adsct.*&p_id=87453'
    }, {
      vendor: 'adscale',
      name: 'adscale',
      pattern: 'ih\\.adscale\\.de\\/adscale-ih\\/tpui?tpid=51.*&cburl=http%3A\\/\\/i\\.w55c\\.net\\/ping_match%3Fuid%3D__ADSCALE_USER_ID__'
    }, {
      vendor: 'demdex',
      name: 'demdex',
      pattern: 'dpm\\.demdex\\.net\\/ibs:dpid=359'
    }, {
      vendor: 'yahoo',
      name: 'yahoo',
      pattern: 'ad\\.yieldmanager\\.com\\/cms\\/v1?esig=1~d1b7a0970db7c0b314d942e728461f2b03f1f713&nwid=10000343293&sigv=1'
    }, {
      vendor: 'spotx',
      name: 'spotx',
      pattern: 'sync\\.search\\.spotxchange\\.com\\/partner?adv_id=6465'
    }, {
      vendor: 'adaptv',
      name: 'adaptv',
      pattern: 'sync\\.adap\\.tv\\/sync?type=TYPE&key=dataxu'
    }, {
      vendor: 'tremor',
      name: 'tremor',
      pattern: 'partners\\.tremorhub\\.com\\/sync'
    }, {
      vendor: 'acxiom',
      name: 'acxiom',
      pattern: 'p\\.acxiom-online\\.com\\/pixel\\/smt?pid=3022&t=3022&ot=pixel'
    }, {
      vendor: 'contextweb',
      name: 'contextweb',
      pattern: 'bh\\.contextweb\\.com\\/bh\\/rtset?do=add&pid=535039'
    }, {
      vendor: 'exelate',
      name: 'exelate',
      pattern: 'loadus\\.exelator\\.com\\/load\\/?p=204&g=111&j=0'
    }, {
      vendor: 'liveramp',
      name: 'liveramp',
      pattern: 'idsync\\.rlcdn\\.com\\/360787\\.gif'
    }, {
      vendor: 'tapad',
      name: 'tapad',
      pattern: 'pixel\\.tapad\\.com\\/idsync\\/ex\\/receive?partner_id=1011'
    }, {
      vendor: 'targus',
      name: 'targus',
      pattern: 'adadvisor\\.net\\/adscores\\/g\\.pixel?sid=9232829800'
    }, {
      vendor: 'accuen',
      name: 'accuen',
      pattern: 'd\\.p-td\\.com\\/r\\/du\\/id\\/L21rdC80L21waWQvMzU5ODk3MA\\/mpuid'
    }, {
      vendor: 'xaxis',
      name: 'xaxis',
      pattern: 't\\.mookie1\\.com\\/t\\/v1\\/event\\?migClientId=6040'
    }, {
      vendor: 'addthis',
      name: 'addthis',
      pattern: 'su\\.addthis\\.com\\/red\\/usync'
    }, {
      vendor: 'krux',
      name: 'krux',
      pattern: 'beacon\\.krxd\\.net\\/usermatch\\.gif'
    }
    
    
    
  
  ],
    misc_trackers: [{
      'name': 'DataXu ',
      'pattern': 'rtb.*?dataxu\\.net\\/x',
      'parser': parseDXURI,
      'vendor': 'DataXu'
    }, {
      'name': 'DataXu',
      'pattern': 'i\\.w55c\\.net\\/ping_match',
      'parser': parseDXURI,
      'vendor': 'DataXu'
    }, {
      'name': 'DataXu (retargeting)',
      'pattern': 'tags\\.w55c\\.net\\/rs',
      'vendor': 'DataXu'
    }, {
      'name': 'PointRoll (performance tracker)',
      'pattern': '[speed|spd]\\.pointroll\\.com',
      'vendor': 'PointRoll'
    }, {
      'name': 'AdapTV (retargeting)',
      'pattern': 'segments\\.adaptv\\.com',
      'vendor': 'AdapTV'
    }, {
      'name': 'OBA',
      'pattern': 'surly\\.com',
      'vendor': 'Ghostery'
    }]
  };


  var matcher = function(m, i) {
    if (m && m.length > (i - 1)) {
      return m[i];
    }
  };

  var paramparsers = {
    'btid': function(btid) {
      console.log('Parsing BTID: ' + btid);
      var res = {};
      if (!btid) return;
      for (var kk = 0; kk < 4; kk++) {
        try {
          var q = atob(btid);
          var parsedBtid = q.split('|');
          // requestID|responseID|timestamp|slotID|flightUID|creativeUID|internalUserID|maxBid|cogsMicroCPM|marginPercentage|addOnCostsMicroCPM|handlingFee|currency
          res.requestID = parsedBtid[0];
          res.responseID = parsedBtid[1];
          res.timestamp = parsedBtid[2];
          res.slotID = parsedBtid[3];
          res.flightUID = parsedBtid[4];
          res.creativeUID = parsedBtid[5];
          res.internalUserID = parsedBtid[6];
          res.maxBid = parsedBtid[7];
          res.cogsMicroCPM = parsedBtid[8];
          res.marginPercentage = parsedBtid[9];
          res.addOnCostsMicroCPM = parsedBtid[10];
          res.handlingFee = parsedBtid[11];
          res.currency = parsedBtid[12];
          return res;
        } catch (e) {
          btid += '=';
        }
      }
      console.log('Could not decode BTID: ' + btid);
      return;

    },
    'tpc': function(tpc) {
      // parse click through url
    },
    'tpce': function(tpce) {
      // parse click through url escaped
    },
    'ei': function(ei) {
      return {
        'exchange': ei
      };
    }
  };

  var parseBtid = function(btid) {
    console.log('Parsing BTID: ' + btid);
    var res = {};
    if (!btid) return;
    for (var kk = 0; kk < 4; kk++) {
      try {
        var q = atob(btid);
        var parsedBtid = q.split('|');
        // requestID|responseID|timestamp|slotID|flightUID|creativeUID|internalUserID|maxBid|cogsMicroCPM|marginPercentage|addOnCostsMicroCPM|handlingFee|currency
        res.requestID = parsedBtid[0];
        res.responseID = parsedBtid[1];
        res.timestamp = parsedBtid[2];
        res.slotID = parsedBtid[3];
        res.flightUID = parsedBtid[4];
        res.creativeUID = parsedBtid[5];
        if (parsedBtid.length >= 6)
          res.internalUserID = parsedBtid[6];
        if (parsedBtid.length >= 7)
          res.maxBid = parsedBtid[7];
        if (parsedBtid.length >= 8)
          res.cogsMicroCPM = parsedBtid[8];
        if (parsedBtid.length >= 9)
          res.marginPercentage = parsedBtid[9];
        if (parsedBtid.length >= 10)
          res.addOnCostsMicroCPM = parsedBtid[10];
        if (parsedBtid.length >= 11)
          res.handlingFee = parsedBtid[11];
        if (parsedBtid.length >= 12)
          res.currency = parsedBtid[12];
        return res;
      } catch (e) {
        btid += '=';
      }
    }
    console.log('Could not decode BTID: ' + btid);
    return;
  };

  var matchPattern = function(uri, patterns) {
    var res = [];
    var numFound = 0;
    for (var jj = 0; jj < patterns.length; jj++) {
      var pat = patterns[jj];
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

  function parseTags(tagname, attrname) {
    var elements = document.querySelectorAll(tagname),
      results = [];
    console.log('Found ' + elements.length + ' ' + tagname + '\'s');
    for (var jj = 0; jj < elements.length; jj++) {
      var element = elements[jj],
        attr = element.getAttribute(attrname);
      if (!attr) continue;
      console.log('searching ' + tagname + ' ' + attr);
      for (var type in searchitems) {
        console.log('searching ' + tagname + ' "' + attr + '" for ' + type);
        for (var ii = 0; ii < searchitems[type].length; ii++) {
          var item = searchitems[type][ii];
          if (attr.match(item.pattern)) {
            var res = item;
            res.uri = attr;
            res.tagname = tagname;
            res.type = type;
            if (item.parser) {
              res.details = item.parser(res.uri);
            }
            console.log('Found ' + type + ' in ' + tagname + ' in ' + attrname + ': "' + attr + '"');
            console.dir(res);
            results.push(res);
          }
        }
      }
    }
    return results;
  }

  function parseIframes() {
    return parseTags('iframe', 'src');
  }

  function parseAnchors() {
    return parseTags('a', 'href');
  }

  function parseImages() {
    return parseTags('img', 'src');
  }

  function parseFlash() {
    var embeds = parseTags('embed', 'src'),
      objs = parseTags('object', 'src');
    for (var ii; ii < objs.length; ii++) {
      embeds.push(objs[ii]);
    }
    return embeds;
  }

  function parse() {
    var results = [];
    results = parseIframes();
    results = results.concat(parseImages());
    results = results.concat(parseFlash());
    results = results.concat(parseAnchors());
    return results;
  }

  var results = parse();

  console.log('Results of searching:');
  console.dir(results);

  var msg = {};
  msg.click_trackers = [];
  msg.impression_trackers = [];
  msg.activity_trackers = [];
  msg.cookie_matchers = [];
  msg.type = 'ad'; // right now we only are doing ad type
  msg.vendors = [];
  var filled = false;

  for (var ii = 0; ii < results.length; ii++) {

    var info = results[ii];
    console.log('Info:');
    console.dir(info);

    if (info.details && info.details.parsed_params) {
      if (info.details.parsed_params.btid) {
        var bidinfo = info.details.parsed_params.btid;
        msg.creative_uid = bidinfo.creativeUID;
        msg.flight_uid = bidinfo.flightUID;
        msg.currency = bidinfo.currency;
        msg.bid = bidinfo.maxBid || null;
        msg.slotID = bidinfo.slotID || null;
        filled = true;
      }
      if (info.details.parsed_params.ei) {
        msg.exchange = info.details.parsed_params.ei.exchange;
        filled = true;
      }

    }
    msg.vendors.push(info.vendor);
    if (info.type == 'ad_servers') {
      msg.type = 'ad';
      filled = true;

      if (info.vendor == 'DataXu') {
        console.log('Found DataXu Ad');
        //parseHref(info.uri);
        // msg.creative_uid = creative_uid;
        // msg.flight_uid = flight_uid;
        //msg.exchange = exchange;
      } else {
        msg.ad_server = info.vendor;
      }
    } else if (info.type == 'impression_trackers') {
      var imp = {};
      imp.name = info.vendor;
      imp.url = info.uri;
      imp.is_secure = (info.uri.indexOf('https') === 0);
      msg.impression_trackers.push(imp);
      filled = true;

    } else if (info.type == 'activity_trackers') {
      console.log('got activity trackers');
      
      var act = {};
      act.name = info.vendor;
      act.url = info.uri;
      act.is_secure = (info.uri.indexOf('https') === 0);
      msg.activity_trackers.push(act);
      filled = true;

    } else if (info.type == 'click_trackers') {
      console.log('got click trackers');
      
      var click = {};
      click.name = info.vendor;
      if (info.uri) {
        click.url = info.uri;
        click.is_secure = (info.uri.indexOf('https') === 0);
      }
      msg.click_trackers.push(click);
      filled = true;
    } else if (info.type === 'cookie_matchers') {
      console.log('got cookie matcher');
      var cm = {};
      cm.name = info.vendor;
      cm.url = info.uri;
      cm.is_secure = (info.uri.indexOf('https') === 0);
      msg.cookie_matchers.push(cm);
      filled = true;
    }
  }
  if (filled) {
    console.log('Sending message:');
    console.dir(msg);

    chrome.extension.sendMessage(msg, function(resp) {
      console.log('Received callback: ' + resp);
    });
  } else {
    console.log('no ads found');
  }
}
