const fs = require('fs')
const axios = require("axios");
const request = require('request');
const path = require('path')

module.exports = {
    downloadFile: (uri, filename, callback) => {
        const saveLocaly = (fullName) => {
            return fs.createWriteStream(path.join(__dirname, "assets", fullName))
        }
        request.head(uri, function (err, res, body) {
            if (err) {
                console.log(err)
            } else {
                const ext = res.headers['content-type'].split('/')[1]
                const fullName = `${filename}.${ext}`
                request(uri).pipe(saveLocaly(fullName)).on('close', () => callback(filename + '.' + ext));
            }
        });
    },
    proof: (callback) => {
        setTimeout(() => {
            callback('proof')
        }, 1000);
    },
    extraction: (callback) => {
        setTimeout(() => {
            callback("extraction")
        }, 1000);
    },
    classificate: (callback) => {
        setTimeout(() => {
            callback('classificate')
        }, 1000);
    },
    preProcess: (callback) => {
        setTimeout(() => {
            callback('preProcess')
        }, 1000);
    },
    logEvent: async ({ type, organizationID, unitID, serviceID, resourceID, _startEventID = null }) => {
        console.log(`start Log '${type}' to dockenigma/Events `)
        const id = await axios.post('http://logger:5001/log', {
            type,
            organizationID,
            unitID,
            serviceID,
            resourceID,
            _startEventID
        })
            .then(res => {
                console.log(`${type}-Log done with related mongoID ${res.data}`)
                return res.data
            })
            .catch(err => console.log(err))
        return id
    }
}