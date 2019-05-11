const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    timeStamp: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true },
    organizationID: { type: String, required: true },
    unitID: { type: String, required: true },
    serviceID: { type: String, required: true },
    resourceID: { type: String, required: true },
    savedResourceName:{type: String},
    _startEventID: { type: Schema.Types.ObjectId, ref: 'Event' }
})

mongoose.model('events', eventSchema)
