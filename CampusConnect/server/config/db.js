const mongoose = require("mongoose");
const dns = require("node:dns");

// Set DNS servers to resolve MongoDB Atlas SRV records correctly
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully 🚀");
    } catch (error) {
        console.error("MongoDB Connection Failed ❌", error.message);
        console.log("⚠️ Server is starting without MongoDB connection. Please ensure your IP is whitelisted on MongoDB Atlas.");
        // process.exit(1);
    }
};

module.exports = connectDB;