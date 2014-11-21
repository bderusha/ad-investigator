/*jshint browser:true*/
/*global chrome */

'use strict';
var listenerCount = 0;
var creatives = [];

function getCreatives(callback){
  console.log('Sending creatives to pop:');
  console.dir(creatives);
  callback(creatives);
}


chrome.extension.onMessage.addListener(function(message, tab, cb)  {
  console.log('Received message ' + listenerCount++);
  console.dir(message);
  if(message.type == 'ad'){
    creatives.push(message);
  }
  console.dir(cb);
  if (cb) {
    cb('Heard you loud and clear');
  }
});

// function linkListener (whatever, message, cb)  {
//   console.log('Received message 2' + listenerCount++);
//   if(message.type == 'link'){
//     var opt = {
//       type: 'basic',
//       title: 'Link found!',
//       message: message.href,
//       iconUrl: 'dx_icon_48.png'
//     };
//   }
//   if (cb) {
//     cb('Roger, 5x5');
//   }
//
// }
//
// chrome.extension.onMessage.addListener(linkListener);