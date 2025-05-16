const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect with Database
const mongoDbConn = mongoose.connect('mongodb://localhost:27017/mongoose-library')
    .then(() => console.log('Connected with MongoDB'))
    .catch(console.log);

// Schema 
const timeStampsSchema = new Schema({
    name: 'String',
    description: 'String'
}, {
    timestamps: true // to add createdAt and updateAt automatically 
});

// Model 
const TimeStamp = mongoose.model('TimeStamp', timeStampsSchema);

const run = async () => {
    // Delete Previous Data if any 
    await TimeStamp.deleteMany({});

    // Insert Data
    const timeStamp = new TimeStamp({ 
        name: 'TimeStamp',
        description: 'This is sample timestamp for adding description.' 
    });

    await timeStamp.save();

    const ts = await TimeStamp.findOne({});
    console.log('CreatedAt:', ts.createdAt);
    console.log('updatedAt:', ts.updatedAt);
}

run();
