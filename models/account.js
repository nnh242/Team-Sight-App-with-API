const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');

const accountSchema = mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    teamname: {type: String, required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}]
});

accountSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        username: this.username,
        password: this.password,
        teamname: this.teamname,
        members: this.members
    }
  };
//password hashing using bcryptjs
accountSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};
accountSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 6);
};

const Account = mongoose.model('Account',accountSchema);

module.exports = {Account};