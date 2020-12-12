const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        UserName: {
            type: String,
            unique: true,
            required: 'You must enter a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'You must enter a valid email!',
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email']
        },
        thoughts: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;