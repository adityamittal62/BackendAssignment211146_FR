# BackendAssignment211146_feryrides
This is the Assignment for Backend for fery rides which includes registering a user, getting ride details and details of a specific ride.
# Backend Assignment API

This project is a simple backend server built using Node.js and Express.js. It provides three key functionalities:
1. User Registration
2. Listing Available Rides
3. Viewing Ride Details

## Getting Started
Follow the steps below to set up and run the project on your local machine.

### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 12 or later recommended).
- Install [Postman](https://www.postman.com/) or any similar API testing tool (optional).

### Setup
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   Run the following command to install the required npm packages:
   ```bash
   npm install express body-parser
   ```

3. **Prepare the Data Directory**
   Ensure that the project root contains a folder named `data`. If it doesn't exist, create it manually.
   ```bash
   mkdir data
   ```

4. **Run the Server**
   Start the server with the following command:
   ```bash
   node server.js
   ```
   The server will start and listen on `http://localhost:3000`.

## API Endpoints

### 1. **Register User**
   **Endpoint:** `POST /register`

   **Description:** Allows a new user to register by providing a username and password.

   **Request Body:**
   ```json
   {
       "username": "test",
       "password": "test123"
   }
   ```

   **Response:**
   - Success (201):
     ```json
     {
         "message": "User registered successfully."
     }
     ```
   - Error (400):
     ```json
     {
         "message": "Username already exists."
     }
     ```

### 2. **List Rides**
   **Endpoint:** `GET /rides`

   **Description:** Returns a list of available rides with brief details (ID, distance, fare).

   **Response:**
   ```json
   [
       {
           "id": "1",
           "distance": "10 km",
           "fare": "$15"
       },
       {
           "id": "2",
           "distance": "25 km",
           "fare": "$40"
       }
   ]
   ```

### 3. **Ride Details**
   **Endpoint:** `GET /rides/:id`

   **Description:** Returns detailed information for a specific ride, based on its ID.

   **Response:**
   - Success (200):
     ```json
     {
         "id": "1",
         "distance": "10 km",
         "fare": "$15",
         "details": "Ride from Point A to Point B."
     }
     ```
   - Error (404):
     ```json
     {
         "message": "Ride not found."
     }
     ```

## Folder Structure
```
project-folder/
|-- data/              # Directory containing JSON files for mock database
|   |-- users.json     # Stores user information
|   |-- rides.json     # Stores ride information
|-- server.js          # Main server file
```

## How It Works
- The project uses JSON files (`users.json` and `rides.json`) as a mock database to store user and ride data.
- On each request, the server reads data from these files, processes the request, and writes updates back when necessary.
- The `/register` endpoint ensures no duplicate usernames are allowed.
- The `/rides` and `/rides/:id` endpoints provide information about available rides and their details.

## Testing the API
Use Postman or a similar tool to test the endpoints:

### Example Requests
1. **Register a User:**
   - **Method:** POST
   - **URL:** `http://localhost:3000/register`
   - **Body (JSON):**
     ```json
     {
         "username": "exampleUser",
         "password": "examplePassword"
     }
     ```

2. **List Rides:**
   - **Method:** GET
   - **URL:** `http://localhost:3000/rides`

3. **Get Ride Details:**
   - **Method:** GET
   - **URL:** `http://localhost:3000/rides/1`

## Known Issues
- This project is not secured for production use (e.g., no password hashing or authentication mechanisms).
- Data is stored in plain JSON files, which is not suitable for a real-world application.

## Future Improvements
- Add password hashing for secure storage.
- Implement authentication (e.g., using JWT).
- Replace JSON files with a proper database (e.g., MongoDB or MySQL).
- Add error logging and validation middleware.

## Author
- Aditya Mittal


