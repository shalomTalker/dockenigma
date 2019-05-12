const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const uuid = require('uuid/v3');
const controller = require('./routesController')
const requireResource = require('./requireResource')
const { downloadFile, logEvent } = controller;

app.use(bodyParser.json())
app.use(requireResource)

app.get('/:serviceID', (req, res) => {
    const S3url = req.headers['enigma-redirect-url'];
    const asyncFlag = (req.headers['enigma-async-completion'] !== undefined);
    const { serviceID } = req.params
    const organizationID = req.subdomains[0] || 'organization-id';
    const unitID = 'unit-id';
    const resourceID = uuid(S3url, uuid.URL);

    downloadFile(S3url, resourceID, async (savedResourceName) => {
        console.log('download complete saved in assets/ as: ', savedResourceName)
        const _refID = await logEvent({
            type: 'start',
            organizationID,
            unitID,
            serviceID,
            resourceID
        }).then(res => {
            console.log(res)
            return res
        })
        controller[serviceID]((msg) => {
            console.log(msg + " complete")
            logEvent({
                type: 'end',
                organizationID,
                unitID,
                serviceID,
                resourceID,
                savedResourceName,
                _startEventID:_refID
            })
            if (asyncFlag) {
                // make api post request to redirct-url 
            } else {
                res.status(200).send('sync process complete');
            }
        })
        if (asyncFlag) {
            res.status(201).send("async pending")
        }
    })
})

app.listen('5000', () => {
    console.log(`Started server on => http://localhost:5000 for Process Id ${process.pid} `)
})


