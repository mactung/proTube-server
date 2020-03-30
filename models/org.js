const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  contactInfo: {
    email : String,
    sdt: String,
    fbLink: String
  },

  category: [String],

  description: String,
  logo: String,
  thongtintuyensinh: {
    jobDescrition: String,
    deadline: String,
    linkDon: String,
  }
});

module.exports = mongoose.model('Org', orgSchema);