// This function is called onload in the popup code
function findElement(callback) {
    // Inject the content script into the current page
    chrome.tabs.executeScript(null, { file: 'content.js', allFrames: true });
    // Perform the callback when a message is received from the content script
    chrome.runtime.onMessage.addListener(function(message)  {
      // Call the callback function
      callback(message);
    });
}

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
