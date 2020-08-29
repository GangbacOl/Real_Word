const checkDayPass = (day) => {
    const today = new Date().format('dd');
    if (today === day) return false;
    else true;
};

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

if (navigator.onLine) {
    chrome.storage.sync.get(['wordsList'], async (storageData) => {
        const main = document.querySelector('body > .main');
        if (checkDayPass(storageData.wordsList[storageData.wordsList.length - 1])) {
            console.log('good morning');
            storageData.wordsList.unshift({
                wordsList: [
                    {
                        date: new Date().format('yyyy-MM-dd(KS)'),
                        words: [],
                    },
                ],
            });
        }
        storageData.wordsList.map(async (wordsItem) => {
            const div = document.createElement('div');
            div.setAttribute('class', 'main-child');
            const h2 = document.createElement('h2');
            h2.innerText = wordsItem.date;
            div.append(h2);
            const translatedWords = await sendWords(wordsItem.words);
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
