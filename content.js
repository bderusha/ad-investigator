// var patterns = [
//   {
//     "pattern":"doubleclick\\.net\\/activity",
//     "name":"DoubleClick",
//     "type":"activity"
//   },
//   {
//     "pattern":"i\\.w55c\\.net\\/cl",
//     "name":"DataXu",
//     "type":"click"
//   },
//   {
//     "pattern":"i\\.w55c\\.net\\/ping_match",
//     "name":"DataXu",
//     "type":"cookiematch"
//   },
//   {
//     "pattern":"tags\\.w55c\\.net\\/rs",
//     "name":"DataXu",
//     "type":"retargetingpixel"
//   },
//   {
//     "pattern":"i\\.w55c\\.net\\/a.gif",
//     "name":"DataXu",
//     "type":"unknown"
//   },
//   {
//     "pattern":"cti\\.w55c\\.net\\/cms-2.?\\.html",
//     "name":"DataXu Cookie Match launcher",
//     "type":"cookiematch"
//   },
//   {
//     "pattern":"cti\\.w55c\\.net\\/rubicon-cms-2.?\\.html",
//     "name":"Rubicon Impression Cookie Match launcher",
//     "type":"cookiematch"
//   }
// ];

//var href = "http://i.w55c.net/cl?t=1&btid=NTQ2RTAwOEYwMDA2N0M2RDBBMEMwNTEzMTkwMDMzRjR8R0ZuN1JheWtGRnwxNDE2NDk1MjQ3NTM4fDF8MEZwV0FCdE1kTnwwUjRZRXF4VmVnfDZjMDk5MzhlLTI1MmUtNDZmNC04Mjk2LTY0YjI0ODZiZTUwNXw3MDAwMDAwfHx8fDEyLjBQfFVTRA&ei=GOOGLE&tpc=http://adclick.g.doubleclick.net/aclk%3Fsa%3Dl%26ai%3DCBpDYjwBuVO34GZOKMPTngMgBzdzg3AW14_T3uAHAjbcBEAEgAGDJhu2IhKTsD4IBF2NhLXB1Yi0yOTU4OTI4NDg1NTk4OTYxoAGxtNXsA8gBCeACAKgDAaoEjQFP0AdWaMorOI0etWO-Hvnv_W18O-x1aKo8ukGvqQoGvHjmk6ihfrmAFhdordUvMiNNyWkpVk0dO3cfw45JLiz1tVyoWx0enL_rtPEU08VSUAGXM9p3KzGYKU4efksm4tJ1V1edXPOdHV-z-GWXVe_b-uL29SwhaotoftL6KEciTCahDOYqRJwgjI2s4_bgBAGABonzw8fe_MGs9gGgBiE%26num%3D1%26sig%3DAOD64_3Y_j4wUD6ZCaQ0nJAJ9e32hQskaA%26client%3Dca-pub-2958928485598961%26adurl%3D&rurl=https://dataxu.atlassian.net/wiki/pages/viewpage.action?spaceKey=Innovation&title=Innovation+Day+9+-+November+20th%252C+2014";
var matcher = function(m, i){
  if(m && m.length>(i-1)){
    return m[i];
  }
};

var parseHref = function(href){
  var btid = matcher(href.match(/btid=(.*?)&/), 1);
  var tcp = matcher(href.match(/tcp=(.*?)&/), 1);
  exchange = matcher(href.match(/ei=(.*?)&/), 1);

  parseBtid(btid);
};

var parseBtid = function(btid){
  var q = atob(btid);
  var parsedBtid = q.split('|');
  flight_uid = parsedBtid[4];
  creative_uid = parsedBtid[5];
};


var creative_uid, flight_uid, exchange, click_trackers, pixel_fires, cookie_matchers, vendors, macros, cdn_url, landing_page_url, href;
var links = document.getElementsByTagName('a');
var found = false;

for(i = links.length; i--;){
  if( links[i].getAttribute('href') && links[i].getAttribute('href').match(/i\.w55c\.net/) ){
    href = links[i].getAttribute('href');
    found = true;
  }
}

if(found){
  parseHref(href);

  chrome.extension.sendMessage(
    {
      type: 'ad',
      creative_uid: creative_uid,
      flight_uid: flight_uid,
      click_trackers: click_trackers,
      pixel_fires: pixel_fires,
      cookie_matchers: cookie_matchers,
      vendors: vendors,
      macros: macros,
      cdn_url: cdn_url,
      landing_page_url: landing_page_url
    },
    function(){}
  );
}
