const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orgSchema = new Schema({
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
        deadline: Date,
        linkDon: String,
    }
})

module.exports = mongoose.model('Org', orgSchema);