const mongoose = require('mongoose');
const memberSchema = mongoose.Schema ({
    name: {type: String, required:true},
    task:{
        taskName : [{type:String}],
        estimateTime: [{type:Number}],
        actualTime: [{type:Number}]
    },
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'}
});

memberSchema.methods.apiRepr = function (member) {
    return {
        id: this._id,
        name: this.name,
        task: this.task,
        accountId: this.accountId
    }
};

const Member = mongoose.model('Member', memberSchema);
module.exports={Member};