var links = document.getElementsByTagName('a');
var found = false;
var link, href;

for(i = links.length; i--;){
  if(links[i].getAttribute('href') == 'http://vimeo.com/dataxu'){
    found = true;
    link = links[i].innerHTML;
    href = links[i].getAttribute('href');
  }
}

if(found){
  chrome.extension.sendMessage({type: 'link', text: link, href: href},function(){});
}
