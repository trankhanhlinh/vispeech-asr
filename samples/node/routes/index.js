const express = require('express');
const router = express.Router();
const ViSpeech = require('asr-vietspeech');
const fs = require('fs');

// The name of the audio file to trascript
const fileName = __dirname + '\\files\\audio.wav';
console.info(`Filename ${fileName}`);

// Reads a local audio file and converts it to base64
const file = fs.createReadStream(fileName);
file.setEncoding('utf8')

// The audio file's encoding, sample rate in hertz, timeout, maxSize, token
const config = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjNDExOWMwLWExYzEtMTFlYS1iOTdjLTFiOTdlMzMzNTc2NCIsImlhdCI6MTU5MDc2Nzg2Mn0.mE647oZlALOdf6WSloLNBzAvg1pluV9dyxDjtpVUZTM',
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    timeout: 10000, // 10 seconds
    maxSize: 51200 // 50 Mb
};
const asrViSpeech = new ViSpeech(config);

/* Call Asr VietSpeech NodeJs library */
router.post('/asr', function (req, res, next) {
    asrViSpeech.call(file).then(result => {
        console.info(`Response ${JSON.stringify(result)}`)
        res.status(200).send(result.text);
    }).catch(err => {
        console.error('Api key invalid', err);
        res.status(401).send(err.message);
    })
    // Detects speech in the audio file
});

module.exports = router;
