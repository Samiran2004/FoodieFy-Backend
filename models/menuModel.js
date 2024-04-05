const mongoose = require('mongoose');

const menueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["breakfast", "lunch", "dinner"]
    },
    image: {
        type: String,
        required: true
    }
});

const Menu = mongoose.model("Menu", menueSchema);

module.exports = Menu;