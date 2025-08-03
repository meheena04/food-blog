const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Change this to your MongoDB URI

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB server
        await client.connect();

        console.log('Connected to the MongoDB server');

        // Get the database and collection
        const db = client.db('mydatabase');
        const collection = db.collection('mycollection');

        // Insert a document
        const result = await collection.insertOne({ name: 'John Doe' });
        console.log(`Inserted 1 document`);

        // Query documents
        const documents = await collection.find({}).toArray();
        console.log('Documents:', documents);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from the MongoDB server');
    }
}
