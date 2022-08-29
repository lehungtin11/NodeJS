
const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect('mongodb://localhost:27017/educations'); 
        console.log('Connect successfully')  
    } catch (error) {
        console.log('ERROR!!!')
    }
}

module.exports = {connect}