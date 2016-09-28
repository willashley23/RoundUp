chrome.browserAction.onClicked.addListener(function(activeTab){
  chrome.storage.sync.get(function(items) {
    Object.keys(items).forEach( (key) => {
      chrome.tabs.create({url: items[key]})
    });
  });
});