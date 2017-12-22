const mongoose = require ('mongoose');
const taskSchema = mongoose.Schema ({
    taskName : {type:String},
    estimateTime: {type: Number},
    actualTime: {type: Number},
    accountId: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    memberId: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'}
})

taskSchema.methods.apiRepr = function (task) {
    return {
        id: this._id,
        taskName: this.taskName,
        estimateTime: this.estimateTime,
        actualTime: this.actualTime,
        accountId: this.accountId,
        memberId: this.memberId
    }
};

const Task = mongoose.model('Task', taskSchema);
module.exports ={Task};