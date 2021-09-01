const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true
}).then(db => console.log('database online'))
.catch(err => console.log(err)); 