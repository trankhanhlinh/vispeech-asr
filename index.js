const FormData = require('form-data')
const fetch = require('cross-fetch')

const speechToText = request => {
    const { audio, config, token } = request
    if (!audio || !config || !token) {
        return Promise.reject("Invalid request.")
    }
    if (!audio.content) {
        return Promise.reject("Missing audio content.")
    }
    if (!config.encoding || !config.sampleRateHertz) {
        return Promise.reject("Missing encoding or sampleRateHertz in your config.")
    }
    const formData = new FormData()
    formData.append('voice', audio.content)

    return fetch("http://thanhtinh.cf:7070/v1/speech", {
        method: 'POST',
        body: formData,
        headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${token}`,
        },
    }).then(response => {
        status = response.status
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err.message;
    })
}

module.exports = speechToText