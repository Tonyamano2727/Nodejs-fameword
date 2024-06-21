const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Post', postSchema);
