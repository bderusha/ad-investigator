// // This function is called onload in the popup code
// function findElement(callback) {
//     // Inject the content script into the current page
//     chrome.tabs.executeScript(null, { file: 'content.js', allFrames: true });
//     // Perform the callback when a message is received from the content script
//     chrome.runtime.onMessage.addListener(function(message)  {
//       // Call the callback function
//       callback(message);
//     });
// }

function getCreatives(callback){
  callback(creatives);
}

var creatives = [
  {
    type: 'ad',
    creative_uid: 'C12345',
    flight_uid: 'F12345',
    exchange: "GOOGLE",
    ad_server: "DataXu",
    click_trackers: [
      {
        name: 'Dataxu', //DFA, Pointroll, etc
        info: "random string of stuff",
        url: "http://i.w55c.net/cl",
        is_secure: false
      }
    ],
    pixel_fires:[
      {
        name: 'Dataxu', //DFA, Pointroll, etc
        info: "random string of stuff",
        url: "https://i.w55c.net/a.gif",
        is_secure: true
      }
    ],
    cookie_matchers:[
      {
        name: 'Dataxu', //DFA, Pointroll, etc
        info: "random string of stuff",
        is_secure: true
      }
    ],
    vendors: [
      "DataXu",
      "DoubleClick"
    ],
    macros: [
      "CACHEBUSTER",
      "TIMESTAMP"
    ],
    cdn_url: "http://cdn.w55c.net/123/123/123",
    is_secure: true,
    landing_page_url: 'http://landing_page_url.com'
  }
];

chrome.runtime.onMessage.addListener(function(message)  {
  if(message.type == 'ad'){
    //creatives.push(message);
  }
});

chrome.runtime.onMessage.addListener(function(message)  {
  if(message.type == 'link'){
    var opt = {
      type: "basic",
      title: "Link found!",
      message: message.href,
      iconUrl: "dx_icon_48.png"
    };

    chrome.notifications.create("id"+Date.now(), opt, function(){});
  }
});
