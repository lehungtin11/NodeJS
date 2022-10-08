
const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect('mongodb+srv://lehungtin11:1234@cluster0.37hj6ra.mongodb.net/educations'); 
        console.log('Connect successfully')  
    } catch (error) {
        console.log('ERROR!!!')
    }
}

module.exports = {connect}