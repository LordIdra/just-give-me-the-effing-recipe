const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Simple .env loading - no external dependencies
const fs = require('fs');
if (fs.existsSync('.env')) {
    const envConfig = require('dotenv').config().parsed;
    for (const key in envConfig) {
        process.env[key] = envConfig[key];
    }
}

console.log('Proxy starting...');
console.log('ElasticSearch URL:', process.env.ELASTICSEARCH_URL || 'http://localhost:9200');

// Enable CORS for development
app.use(cors({
    origin: '*', // Restrict this in production
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Proxy to ElasticSearch with Basic Auth
app.use('/api/search', createProxyMiddleware({
    target: process.env.ELASTICSEARCH_URL || 'https://localhost:9200',
    changeOrigin: true,
    pathRewrite: { '^/api/search': '/recipes/_search' },
    auth: `${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASSWORD}`,
    secure: false, // Allow self-signed certificates
    rejectUnauthorized: false, // Disable SSL verification for self-signed certs
    onProxyReq: (proxyReq, req, res) => {
        // You can add additional headers here if needed
        // proxyReq.setHeader('X-Custom-Header', 'value');
        console.log(process.env.ELASTICSEARCH_USER)
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ 
            error: 'ElasticSearch connection failed',
            details: err.message,
            hint: 'Check if ElasticSearch is running and accessible'
        });
    }
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy server running on port ${PORT}`);
    console.log(`🔒 Proxying to ElasticSearch with Basic Auth`);
    console.log(`📡 Forwarding /api/search to ElasticSearch /recipes/_search`);
});
