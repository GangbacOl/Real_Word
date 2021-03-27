const sendWords = async (words) => {
    return new Promise(async (resolve, reject) => {
        fetch('http://localhost:5000/translate', {
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
                resolve(response.translatedText);
            })
            .catch((err) => reject(err));
    });
};

if (navigator.onLine) {
    chrome.storage.sync.get(['wordsList'], (storageData) => {
        const main = document.querySelector('body > .main');
        console.log(storageData);
        storageData.wordsList.map(async (wordsItem) => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const translatedWords = await sendWords(wordsItem.words);

            div.setAttribute('class', 'main-child');
            h2.innerText = wordsItem.date;
            div.append(h2);

            wordsItem.words.map((word, index) => {
                const li = document.createElement('li');
                const span_en = document.createElement('span');
                const span_ko = document.createElement('span');
                span_en.setAttribute('class', 'span-eng');
                span_ko.setAttribute('class', 'span-kor');
                span_en.innerText = word;
                span_ko.innerText = translatedWords[index];
                li.append(span_en, ': ', span_ko);
                div.append(li);
                span_ko.onclick = () => {
                    // 네이버 영어사전 페이지
                    window.open(`https://en.dict.naver.com/#/search?query=${li.innerText.split(':')[0]}`);
                };
            });
            main.append(div);
        });
    });
} else {
    document.querySelector('body').innerText = '인터넷 연결상태를 확인해주세요.';
}
