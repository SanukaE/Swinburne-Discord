import mongoose from 'mongoose';
import 'dotenv/config';

export default async function mongoConnect() {
  try {
    if (process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL, { dbName: 'Swinburne' });
      console.log('Connected to the database!');
    } else throw new Error('Missing mongo connection url.');
  } catch (error) {
    console.log(error || 'Failed to connect to DB');
  }

  const handleDisconnect = async () => {
    await mongoose.disconnect();
    console.log('Disconnected from the database!');
  };

  process.on('SIGINT', handleDisconnect);
  process.on('SIGTERM', handleDisconnect);
}
