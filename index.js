const URL = 'http://tv.arrownetsylhet.com/';

const axios = require('axios').default;
const cheerio = require('cheerio');

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);

    const buttons = $('div.mt-4.flex.flex-wrap > button');

    const links = [];

    buttons.each((i, button) => {
      const link = $(button).attr('value');
      links.push({
        link,
        name: link.split('/')[3],
      });
    });

    res.render('index', { title: 'Hey', message: 'Hello there!', links });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
