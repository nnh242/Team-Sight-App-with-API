const mongoose = require('mongoose');
const memberSchema = mongoose.Schema ({
    name: {type: String, required:true},
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
});

memberSchema.methods.apiRepr = function (member) {
    return {
        id: this._id,
        name: this.name,
        accountId: this.accountId,
        tasks: this.tasks
    }
};

const Member = mongoose.model('Member', memberSchema);
module.exports={Member};