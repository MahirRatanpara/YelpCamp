const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');

//connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * (arr.length))];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const index = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 25) + 15;
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[index].city}, ${cities[index].state}`,
      price: price,
      author: '60a90b11e0dd9727e8ed4666',
      geometry:{
        type:"Point",
        coordinates:[
          cities[index].longitude,
          cities[index].latitude
        ]
      },
      images: [{
          url: 'https://res.cloudinary.com/mahir1301/image/upload/v1622038973/YelpCamp/sit7bsmrdjs1m9bkncrl.jpg',
          filename: 'YelpCamp/ouofghoj5ymtg16umrol'
        },
        {
          url: 'https://res.cloudinary.com/mahir1301/image/upload/v1622038792/YelpCamp/rccg565lfiictj48awcl.jpg',
          filename: 'YelpCamp/jcwwsmvbobmubvmuni0b'
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, minima mollitia commodi ut qui maxime accusamus quos atque, earum hic incidunt ipsum beatae eaque sequi illo fuga aut ratione minus.'
    });
    await camp.save();
  }
  
};

seedDB().then(() => {
  mongoose.connection.close();
});