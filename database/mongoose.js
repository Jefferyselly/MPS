let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Finalyear_project', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)
module.exports = {mongoose};

