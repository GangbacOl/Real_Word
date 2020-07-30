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
        const span = document.createElement('span');
        const div = document.createElement('div');
        const input = document.createElement('input');
        const saveButton = document.createElement('input');
        const cancelButton = document.createElement('input');
        saveButton.setAttribute('type', 'button');
        cancelButton.setAttribute('type', 'button');
        saveButton.setAttribute('value', 'Save');
        cancelButton.setAttribute('value', 'Cancel');
        div.append(input, saveButton, cancelButton);
        div.style.display = 'none';
        span.innerText = translatedWords[item];
        li.innerText = storageData.words[item] + ': ';
        li.append(span, div);
        document.querySelector('body > div.main > div').append(li);

        span.onclick = () => {
            span.style.display = 'none';
            div.style.display = 'inline-block';
        };
    }
});

// const spans = document.getElementsByTagName('span');
// console.log(spans);
