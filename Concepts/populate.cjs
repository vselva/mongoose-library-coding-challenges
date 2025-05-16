const mongoose = require('mongoose');
const { Schema } = mongoose;

const run = async () => {
    // connect to database
    try {
        await mongoose.connect('mongodb://localhost:27017/mongoose-library');
        console.log('Connected with MongoDB');
    } catch (err) {
        console.error('Connection error:', err);
        return;
    }

    // create Schema 
    const userSchema = new Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },
            relative: {
                type: Schema.Types.ObjectId,
                ref: 'User', // Self reference to User model
            },
        },
        { timestamps: true }
    );

    // creat Model 
    const User = mongoose.model('User', userSchema);

    // Clear old users
    await User.deleteMany({});

    // Create new users
    const [selva, diana, narumugai, aadhi] = await User.create([
        { name: 'Selva', email: 'selva@example.com' },
        { name: 'Diana', email: 'diana@example.com' },
        { name: 'Narumugai', email: 'narumugai@example.com' },
        { name: 'Aadhi', email: 'aadhi@example.com' },
    ]);

    // Update relative field for some users (e.g., Diana's relative is Selva)
    diana.relative = selva._id;
    await diana.save();

    narumugai.relative = selva._id;
    await narumugai.save();

    // Find users and populate their relative info
    const users = await User.find({})
        .sort({ name: 1 })
        .select({ name: 1, email: 1, relative: 1, _id: 0 })
        .populate('relative', { name: 1, email: 1, _id: 0 })
        .lean();

    console.log(users);

    await mongoose.disconnect();
};

run();
