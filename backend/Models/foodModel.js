import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  id:{
    type:Number,
required:true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const foodModel = mongoose.model('Food', foodSchema);

export default foodModel;
