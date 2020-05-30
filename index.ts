import axios from 'axios';
const FormData = require('form-data');

const ASR_PROTOCOL = "http";
const ASR_HOST = "asr.vietspeech.com";
const ASR_PORT = "7070";
const ASR_PATH = "/v1/speech";
const urlHostService = `${ASR_PROTOCOL}://${ASR_HOST}:${ASR_PORT}${ASR_PATH}`;
const DEFAULT_MAX_SIZE = 51200; // 50 Mb
const DEFAULT_TIMEOUT = 10000;
const DEFAULT_SAMPLE_RATE = 16000;

enum AudioEncoding {
    AMR = "AMR",
    AMR_WB = "AMR_WB",
    ENCODING_UNSPECIFIED = "ENCODING_UNSPECIFIED",
    FLAC = "FLAC",
    LINEAR16 = "LINEAR16",
    MULAW = "MULAW",
    OGG_OPUS = "OGG_OPUS",
    SPEEX_WITH_HEADER_BYTE = "SPEEX_WITH_HEADER_BYTE",
    UNRECOGNIZE = "UNRECOGNIZE"
}

class Configuration {
    token: string;
    encoding: AudioEncoding;
    sampleRateHearts: number;
    timeout: number;
    maxSize: number;

    constructor(token: string, encoding?: AudioEncoding, sampleRateHearts?: number, timeout?: number, maxSize?: number) {
        this.token = token;
        this.encoding = AudioEncoding.AMR;
        this.sampleRateHearts = sampleRateHearts;
        this.timeout = timeout;
        this.maxSize = maxSize;
    }
}

class ViSpeech {
    constructor(config: any | Configuration) {
        this.config = config;
    }

    config: Configuration;

    call(audio: any): Promise<any> {
        const encoding = this.config.encoding ? this.config.encoding : AudioEncoding.AMR;
        const sampleRateHearts = this.config.sampleRateHearts ? this.config.sampleRateHearts : DEFAULT_SAMPLE_RATE;
        const maxSize = this.config.maxSize ? this.config.maxSize : DEFAULT_MAX_SIZE;
        const timeout = this.config.timeout ? this.config.timeout : DEFAULT_TIMEOUT;
        const formData = new FormData()
        formData.append('voice', audio)
        formData.append('encoding', encoding)
        formData.append('sampleRateHearts', sampleRateHearts)
        formData.append('maxSize', maxSize)
        formData.append('timeout', timeout)

        return axios.post(urlHostService, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${this.config.token}`,
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>"
            },
        }).then(response => {
            return response.data
        });
    }
}

module.exports = ViSpeech;