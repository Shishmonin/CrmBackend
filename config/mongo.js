var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// const dbURI = 'mongodb://username:password@lockalhost/mydatabase';
const dbURI = 'mongodb+srv://piter9:314666wowo@cluster0.jad7v.mongodb.net/piter9?retryWrites=true&w=majority';

var dbOptions = {
    user: 'piter9',
    pass: '314666wowo',
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(dbURI, dbOptions);

mongoose.connection.on('connected', function (){
    console.info('MOngoose connected to:' + dbURI)
})

mongoose.connection.on('error', function (){
    console.info('MOngoose connected error:' + dbURI)
})

module.exports = mongoose;