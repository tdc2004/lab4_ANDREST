const mongoose = require('mongoose');
const distributorSchema = new mongoose.Schema({
    name: {
        type: String
    }

}, {
    timestamps: true
})
module.exports = mongoose.model("Distributor",distributorSchema);