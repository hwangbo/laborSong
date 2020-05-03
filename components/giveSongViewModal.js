const axios = require('axios');
const qs = require('qs');

const songs = require('../models/song');

const giveSongViewModal = (trigger_id, token, genre) => {
    songs.find({genre: genre.toString()}, {_id: false, genre: false}, async function (error, songs) {

        function shuffle(songList) {
            var j, x, i;
            for (i = songList.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = songList[i - 1];
                songList[i - 1] = songList[j];
                songList[j] = x;
            }
        }

        shuffle(songs);

        const modal = {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "노래추천",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": songs[0].review.toString()
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Click Me"
                        },
                        "url": songs[0].link.toString()
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": songs[1].review.toString()
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Click Me"
                        },
                        "url": songs[1].link.toString()
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": songs[2].review.toString()
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Click Me"
                        },
                        "url": songs[2].link.toString()
                    }
                }
            ],
            "clear_on_close": true
        };

        const args = {
            token: token,
            trigger_id: trigger_id,
            view: JSON.stringify(modal)
        };

        const result = await axios.post(`https://slack.com/api/views.push`, qs.stringify(args));

        console.log(result.data);
        console.log(result.data.response_metadata);
    });
};

module.exports = giveSongViewModal;
