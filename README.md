# [Speech to text: Node.js Client](https://github.com/trankhanhlinh/vispeech-asr)

[![release level](https://img.shields.io/badge/release%20level-general%20availability%20%28GA%29-brightgreen.svg?style=flat)]()
[![npm version](https://img.shields.io/npm/v/@google-cloud/speech.svg)](https://www.npmjs.org/package/vispeech-asr)




ASR VietSpeech Library for Node.js


* [ASR VietSpeech Library API Reference][client-docs]
* [ASR VietSpeech Library Documentation][product-docs]
* [https://github.com/trankhanhlinh/vispeech-asr](https://github.com/trankhanhlinh/vispeech-asr)
[client-docs]: http://asr.vietspeech.com:3200/docs
[product-docs]: http://asr.vietspeech.com:3200/guidline
**Table of contents:**


* [Quickstart](#quickstart)
  * [Before you begin](#before-you-begin)
  * [Installing the client library](#installing-the-client-library)
  * [Using the client library](#using-the-client-library)
* [Samples](#samples)
* [Versioning](#versioning)
* [License](#license)

## Quickstart

### Before you begin

1.  [Register a account in ASR system][projects].
1.  [Use API key free or buyer a new one][enable_api].

[projects]: http://asr.vietspeech.com:3200/register
[enable_api]: http://asr.vietspeech.com:3200/customer
### Installing the client library

```bash
npm install asr-vietspeech
```


### Using the client library

```javascript
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
    token: process.env.API_KEY, // set api key get from asr system 
    encoding: 'LINEAR16', // set encoding
    sampleRateHertz: 16000, // set rate Hz
    timeout: 10000, // 10 seconds
    maxSize: 51200 // 50 Mb
};
const asrViSpeech = new ViSpeech(config);

asrViSpeech.call(file).then(result => {
    console.info(`Response ${JSON.stringify(result)}`)
    res.status(200).send(result.text);
}).catch(err => {
    console.error('Api key invalid', err);
    res.status(401).send(err.message);
})
```



## Samples

Samples are in the [`samples/`](https://github.com/googleapis/nodejs-speech/tree/master/samples) directory. The samples' `README.md`
has instructions for running the samples.


The [ASR Vispeech Node.js Client API Reference][client-docs] documentation
also contains samples.

## Supported Node.js Versions

Our client libraries follow the [Node.js release schedule](https://nodejs.org/en/about/releases/).
Libraries are compatible with all current _active_ and _maintenance_ versions of
Node.js.

Client libraries targetting some end-of-life versions of Node.js are available, and
can be installed via npm [dist-tags](https://docs.npmjs.com/cli/dist-tag).
The dist-tags follow the naming convention `legacy-(version)`.

_Legacy Node.js versions are supported as a best effort:_

* Legacy versions will not be tested in continuous integration.
* Some security patches may not be able to be backported.
* Dependencies will not be kept up-to-date, and features will not be backported.

## Versioning

This library follows [Semantic Versioning](http://semver.org/).


This library is considered to be **General Availability (GA)**. This means it
is stable; the code surface will not change in backwards-incompatible ways
unless absolutely necessary (e.g. because of critical security issues) or with
an extensive deprecation period. Issues and requests against **GA** libraries
are addressed with the highest priority.