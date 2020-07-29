const express = require('express');
const axios = require('axios');
const cors = require('cors');
const config = require('./config');
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const translateWords = (words) => {
    return Promise.all(
        words.map((word) => {
            return axios
                .post(
                    'https://openapi.naver.com/v1/papago/n2mt',
                    {
                        source: 'en',
                        target: 'ko',
                        text: word,
                    },
                    { headers: { 'X-Naver-Client-Id': config.clientId, 'X-Naver-Client-Secret': config.clientSecret } }
                )
                .then((res) => res.data.message.result.translatedText)
                .catch((err) => console.log(err));
        })
    );
};

app.post('/translate', async (req, res) => {
    const { text } = req.body;
    console.log(text);
    const result = await translateWords(text);
    res.status(200).json({ translatedText: result });
});

app.listen(3000, function () {
    console.log('http://localhost:3000/ app listening on port 3000!');
});
