chrome.storage.sync.get(['words'], function (result) {
    for (var i = result.words.length - 1; i > result.words.length - 4; i--) {
        if (!result.words[i]) break;
        var li = document.createElement('li');
        li.innerText = result.words[i];
        document.querySelector('body > div.main > div').append(li);
    }
});
