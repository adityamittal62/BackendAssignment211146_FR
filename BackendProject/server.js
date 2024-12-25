
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());


const dataDir = path.resolve('./data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}


const usersFile = path.join(dataDir, 'users.json');
const ridesFile = path.join(dataDir, 'rides.json');

if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]');
if (!fs.existsSync(ridesFile)) fs.writeFileSync(ridesFile, JSON.stringify([
    {
        "id": "1",
        "distance": "10 km",
        "fare": "$15",
        "details": "Ride from Point A to Point B."
    },
    {
        "id": "2",
        "distance": "25 km",
        "fare": "$40",
        "details": "Ride from Point C to Point D."
    }
], null, 2));


function readData(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const users = readData(usersFile);
    
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists.' });
    }

    users.push({ username, password });
    writeData(usersFile, users);

    res.status(201).json({ message: 'User registered successfully.' });
});


app.get('/rides', (req, res) => {
    const rides = readData(ridesFile);
    res.status(200).json(rides.map(({ id, distance, fare }) => ({ id, distance, fare })));
});


app.get('/rides/:id', (req, res) => {
    const { id } = req.params;
    const rides = readData(ridesFile);
    const ride = rides.find(ride => ride.id === id);

    if (!ride) {
        return res.status(404).json({ message: 'Ride not found.' });
    }

    res.status(200).json(ride);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Instructions for Running
// 1. Ensure you have Node.js installed on your system.
// 2. Clone the project repository or copy the code into a file named `server.js`.
// 3. Navigate to the project directory and run `npm install express body-parser` to install dependencies.
// 4. Create a folder named `data` in the project root if it doesn't already exist.
// 5. Run the server using the command: `node server.js`.
// 6. Use a tool like Postman to test the endpoints:
//    - Register User: POST http://localhost:3000/register with JSON body { "username": "test", "password": "test123" }.
//    - List Rides: GET http://localhost:3000/rides
//    - Ride Details: GET http://localhost:3000/rides/1
