// we can do our initial work here
let color ='red';


chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({color});
    // This value can be get inside our other files
})