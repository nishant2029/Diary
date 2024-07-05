// models/AboutContent.ts
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
  content: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;
