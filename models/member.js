const mongoose = require('mongoose');
const memberSchema = mongoose.Schema ({
    name: {type: String, required:true},
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'}
});

memberSchema.methods.apiRepr = function (member) {
    return {
        id: this._id,
        name: this.name,
        accountId: this.accountId
    }
};

const Member = mongoose.model('Member', memberSchema);
module.exports={Member};