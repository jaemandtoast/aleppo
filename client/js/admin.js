window.addEventListener('load', onLoad, false);

var bkg = chrome.extension.getBackgroundPage();

function onLoad(e) {
  $('send').addEventListener('click', onSend, false);
}

function onSend(e) {
  var text = $('broadcast').value;
  var protocol = $('protocol').value;
  bkg.sendRequest(protocol, text);
}
