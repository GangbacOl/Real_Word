var menuItem = {
    id: 'addSelectionWord',
    title: 'Add This Word',
    contexts: ['selection'],
};

const checkDayPass = (day) => {
    const today = new Date().format('dd');
    // 하루가 지남
    if (today !== day.date.slice(8, 10)) return true;
    // 하루가 안 지남
    else false;
};

chrome.contextMenus.create(menuItem);
chrome.storage.sync.set({
    wordsList: [
        {
            date: new Date().format('yyyy-MM-dd(KS)'),
            words: [],
        },
    ],
});

chrome.contextMenus.onClicked.addListener(function (clickData) {
    var selectionValue = clickData.selectionText;
    chrome.storage.sync.get(['wordsList'], function (storageData) {
        if (checkDayPass(storageData.wordsList[0])) {
            storageData.wordsList.unshift({
                date: new Date().format('yyyy-MM-dd(KS)'),
                words: [],
            });
        }
        var currentValue = storageData;
        currentValue.wordsList[0].words.push(selectionValue);
        chrome.storage.sync.set({ wordsList: currentValue.wordsList });
    });
});
