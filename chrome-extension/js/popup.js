// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelector('body > div.footer > input[type=button]').addEventListener('click', function () {
//         chrome.tabs.create({ url: 'html/options.html' });
//     });
// });

chrome.storage.sync.get(['words'], (storageData) => {
    if (!storageData.words[0]) {
        const li = document.createElement('span');
        li.innerText = '저장한 단어가 없음.';
        document.querySelector('body > div.main > div').append(li);
    }
    for (let i = storageData.words.length - 1; i > storageData.words.length - 4; i--) {
        if (!storageData.words[i]) break;
        const li = document.createElement('li');
        li.innerText = storageData.words[i];
        document.querySelector('body > div.main > div').append(li);
    }
});
