const express = require("express");
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const favicon = require('serve-favicon');

const app = express();

app.use(cors()); //Allow request from any IP
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true })); //Middleware
app.use(favicon(path.join(__dirname, 'favicon.ico')));

app.get('/api', (req, res) => {
    return res.end('API is running');
});
app.get('/favicon.ico', (req, res) => {
    res.status(204);
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});
app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'shop.html'));
});
app.get('/product.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'product.json'));
});


//CONTACT US
//Route to handle CONTACT from submission
app.post('/api/contact', (req, res) => {
    const { contact, email, phone } = req.body;
    
    console.log(req.body);
    res.json({ message: 'Contact received*-*' });
    
    const contactPath = path.join(__dirname, 'contacts.json');
    //Create a contact object
    const newContact = { contact, email, phone };
    //Read existing data
    fs.readFile(contactPath, 'utf8', (err, data) => {
        let contacts = [];
        //If contacts.json file doesn't exist
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('contacts.json file not found. It will be created');
            } else {
                console.error('Error reading contacts.json:', err);
                return res.status(500).json({ message: 'Error reading contact' });
            }
        } else {
            contacts = JSON.parse(data);
        }
        //Check for duplicate
        const isDuplicate = contacts.some(contactItem => {
            return (
                contactItem.contact === contact &&
                contactItem.email === email &&
                contactItem.phone === phone
            );
        });
        if (isDuplicate) {
            // console.log('Welcome back!');
            return res.status(409).json({ message: 'Contact already exists!'});
        }

        //Add new contact to array
        contacts.push(newContact);

        //Save updated contacts back to the file
        fs.writeFile(contactPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(200).json({ message: 'Error saving contact' });
            }
        });
    });
});



async function uploadFile() {
const client = new ftp.Client();
client.ftp.verbose = true; //Enable logs

try {
        await client.access({
                host: "premium79.web-hosting.com", //FTP server address
                user: "bee@flamestees.com", //FTP username
                password: "r2K}O;iRc=%0", //FTP password
                secure: true, //true if server supports FTPS
            });
            console.log("Connected to FTP server");
        } catch (error) {
                console.log("FTP upload error", error);
            }
        uploadFile();
        }        


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
