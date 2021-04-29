const cors = require('cors');
const express = require('express');
const app = express();



const enableCors = () => {
    return cors({
        origin: ['http://localhost:3000'],
        allowedHeaders: ['Content-Type', 'Authorization']
    });
}

module.exports = enableCors;
