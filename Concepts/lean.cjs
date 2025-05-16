const mongoose = require('mongoose');
const { Schema } = mongoose;

// Connect to database
const run = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mongoose-library');
        console.log('Connected with MongoDB');
    } catch (err) {
        console.log('Connnected with Mongodb: ' + err);
    }

    const userSchema = new Schema(
        {
            name: {
                type: String,
                required: true, 
                trim: true,
                unique: true
            }
        },
        {
            timestamps: true
        }
    );

    const User = mongoose.model('User', userSchema);

    // delete old entries
    await User.deleteMany({});
    const newUser = await User.create([
        {name: 'Selva'},
        {name: 'Diana'},
        {name: 'Narumugai'},
        {name: 'Aadhi'}
    ]);

    //newUser.save();

     // .lean() for faster read-only access
    const user = await User.find({})
        .sort({ name: 1 })
        .select({ name: 1, _id: 0 })
        .maxTimeMS(1000)
        .explain()
        .lean();

    console.log(user);

}

run();
