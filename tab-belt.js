var max_number_of_tabs = 10;

function handleActivated(activeInfo) {
  console.log("Tab " + activeInfo.tabId + " was activated");
  browser.tabs.move(activeInfo.tabId, {index: -1});

  browser.tabs.query({
    pinned: false, windowId: activeInfo.windowId
  }).then(function(tabs) {
    tabs.sort(function (a, b) { return b.index - a.index; });
    while (tabs.length > max_number_of_tabs) {
      var tab_to_remove = tabs.pop();
      browser.tabs.remove(tab_to_remove.id);
    }
  });
}

browser.tabs.onActivated.addListener(handleActivated);