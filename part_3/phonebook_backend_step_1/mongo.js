const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password as argument');
    process.exit(1)
   
}

const password = process.argv[2]

const url = `mongodb+srv://m_jamal:${password}@cluster0-fbyyl.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const contactsSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Contact = mongoose.model('Contact', contactsSchema)


const newContact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
})


newContact.save().then((res)=>{
console.log(`added ${newContact.name} number ${newContact.number} to phonebook`);

})

Contact.find({}).then(res =>{
    res.forEach(cont =>{
        console.log(cont);
    })
    mongoose.connection.close()
})