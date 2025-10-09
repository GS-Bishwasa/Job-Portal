import mongoose from 'mongoose';
import 'dotenv/config';

const fixIndexes = async () => {
    try {
        // Connect to database
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
        console.log('Connected to MongoDB');

        // Get the JobApplication collection
        const collection = mongoose.connection.collection('jobapplications');

        // Get all indexes
        const indexes = await collection.indexes();
        console.log('Current indexes:', indexes);

        // Drop the email_1 index if it exists
        try {
            await collection.dropIndex('email_1');
            console.log('Successfully dropped email_1 index');
        } catch (error) {
            if (error.code === 27) {
                console.log('email_1 index does not exist (already removed)');
            } else {
                throw error;
            }
        }

        // Verify indexes after dropping
        const newIndexes = await collection.indexes();
        console.log('Indexes after fix:', newIndexes);

        console.log('✅ Database indexes fixed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error fixing indexes:', error);
        process.exit(1);
    }
};

fixIndexes();