const link = document.querySelector('.footer a');
link.href = `chrome-extension://${chrome.runtime.id}/html/options.html`;

chrome.storage.sync.get(['wordsList'], (storageData) => {
    if (!storageData.wordsList[0].words[0]) {
        const li = document.createElement('span');
        li.innerText = '저장한 단어가 없음.';
        document.querySelector('body > div.main > div').append(li);
    }
    for (
        let i = storageData.wordsList[0].words.length - 1;
        i > storageData.wordsList[0].words.length - 4;
        i--
    ) {
        if (!storageData.wordsList[0].words[i]) break;
        const li = document.createElement('li');
        li.innerText = storageData.wordsList[0].words[i];
        document.querySelector('body > div.main > div').append(li);
    }
});
