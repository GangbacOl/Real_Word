const sendWords = (words) => {
    return fetch(`http://localhost:3000/translate`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            text: words,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            return response.translatedText;
        })
        .catch((err) => console.log(err));
};

chrome.storage.sync.get(['words'], async (storageData) => {
    const translatedWords = await sendWords(storageData.words);
    for (var item in storageData.words) {
        const li = document.createElement('li');
        li.innerText = storageData.words[item] + ': ' + translatedWords[item];
        document.querySelector('body > div.main > div').append(li);
    }
});
