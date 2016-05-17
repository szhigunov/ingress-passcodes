chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    file: './async.min.js'
  });
  chrome.tabs.executeScript({
    file: './list.js'
  });
  chrome.tabs.executeScript({
    file: './passcodes.js'
  });
});
