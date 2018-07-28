const rp = require('request-promise');
const cheerio = require('cheerio');

let keyword = "huilohuilo";

let URL = `https://www.instagram.com/explore/tags/${keyword}/`;

rp(URL)
    .then((html) => {
        let hashtags = scrapeHashtags(html);
        hashtags = removeDuplicates(hashtags);
        hashtags = hashtags.map(ele => "#" + ele);
        console.log(hashtags);
    })
    .catch((err) => {
        console.log(err);
    });

const scrapeHashtags = (html) => {
    let regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    let matches = [];
    let match;

    while ((match = regex.exec(html))) {
        matches.push(match[1]);
    }
    return matches;
};

const removeDuplicates = (arr) => {
    let newArr = [];
    arr.map(ele => {
        if (newArr.indexOf(ele) == -1){
            newArr.push(ele)
        }

    });
    return newArr;
};
