const mongoose = require('mongoose');

// Step 1: Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongoose-library', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err));

// Step 2: Define base schema with discriminator key
const options = { discriminatorKey: 'kind', collection: 'animals' };

const animalSchema = new mongoose.Schema({
  name: String,
}, options);

// Step 3: Create base model
const Animal = mongoose.model('Animal', animalSchema);

// Step 4: Define discriminator schemas
const dogSchema = new mongoose.Schema({ breed: String });
const catSchema = new mongoose.Schema({ color: String });

const Dog = Animal.discriminator('Dog', dogSchema);
const Cat = Animal.discriminator('Cat', catSchema);

// Step 5: Insert data
async function run() {
  await Animal.deleteMany(); // clean old data

  const dog = new Dog({ name: 'Max', breed: 'Golden Retriever' });
  const cat = new Cat({ name: 'Mittens', color: 'Gray' });

  await dog.save();
  await cat.save();

  console.log('Data saved successfully');

  const animals = await Animal.find();
  console.log('All animals:', animals);

  mongoose.connection.close();
}

run();
