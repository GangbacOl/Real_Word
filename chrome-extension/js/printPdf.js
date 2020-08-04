document.querySelector('body > div.header > div.menus > span:nth-child(2)').onclick = () => {
    const liContainer = document.querySelector('body > div.main > div');
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    const thWord = document.createElement('th');
    const thMeaning = document.createElement('th');
    const thPractice = document.createElement('th');
    thWord.innerText = 'Word';
    thMeaning.innerText = 'Meaning';
    thPractice.innerText = 'Practice';
    tr.append(thWord, thMeaning, thPractice);
    table.append(tr);
    console.log(liContainer);

    for (let i = 1; i < liContainer.childNodes.length; i++) {
        let tr = document.createElement('tr');
        const tdEng = document.createElement('td');
        const tdKor = document.createElement('td');
        const td = document.createElement('td');
        tdEng.innerText = liContainer.childNodes[i].firstChild.innerText;
        tdKor.innerText = liContainer.childNodes[i].lastChild.innerText;

        tr.append(tdEng, tdKor, td);
        table.append(tr);
    }
    const objWin = window.open('');
    objWin.document.open();
    objWin.document.write('<html><head><link rel="stylesheet" href="../css/pdf-style.css"/></head><body>');
    objWin.document.write(table.outerHTML);
    objWin.document.write('</body></html>');
    setTimeout(function () {
        objWin.print();
        objWin.close();
    }, 100);
};
