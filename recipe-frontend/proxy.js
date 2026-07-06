const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic Auth for the proxy itself (optional but recommended)
app.use(basicAuth({
    users: { 'proxy': process.env.PROXY_PASSWORD || 'change-this-in-production' },
    challenge: true,
    realm: 'Recipe Proxy'
}));

// Proxy to ElasticSearch with Basic Auth
app.use('/api/search', createProxyMiddleware({
    target: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    changeOrigin: true,
    pathRewrite: { '^/api/search': '/recipes/_search' },
    auth: `${process.env.ELASTICSEARCH_USER}:${process.env.ELASTICSEARCH_PASSWORD}`,
    onProxyReq: (proxyReq, req, res) => {
        // You can add additional headers here if needed
        // proxyReq.setHeader('X-Custom-Header', 'value');
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error' });
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