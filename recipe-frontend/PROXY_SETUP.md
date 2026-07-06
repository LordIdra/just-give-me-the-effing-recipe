# Proxy Setup for ElasticSearch Basic Auth

## The Problem

ElasticSearch requires Basic Auth, but we can't put credentials in frontend JavaScript (they'd be exposed to users).

## The Solution

A simple Node.js proxy server that:
1. Runs on your server (not exposed to clients)
2. Handles ElasticSearch authentication securely
3. Forwards requests from the frontend
4. Returns clean responses

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your ElasticSearch credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Proxy Configuration
PORT=3001

# ElasticSearch Configuration  
ELASTICSEARCH_URL=http://your-elasticsearch-server:9200
ELASTICSEARCH_USER=your-elasticsearch-username
ELASTICSEARCH_PASSWORD=your-elasticsearch-password

# Optional: Proxy Basic Auth (recommended for production)
PROXY_PASSWORD=strong-password-here
```

### 3. Start the proxy

```bash
npm run proxy
```

The proxy will start on port 3001 by default.

### 4. Configure your frontend

The frontend is already configured to use `/api/search` which will be proxied to ElasticSearch.

### 5. Update your web server configuration

Configure your web server (Nginx, Apache, etc.) to:
- Serve the frontend static files from `/dist`
- Proxy `/api/search` to `http://localhost:3001/api/search`

## Example Nginx Configuration

```nginx
server {
    listen 80;
    server_name recipes.yourdomain.com;

    # Frontend static files
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Security Considerations

### ✅ Secure
- ElasticSearch credentials never leave your server
- Credentials stored in environment variables (not in code)
- Optional Basic Auth on the proxy itself

### ⚠️ Recommendations
1. **Use HTTPS**: Always use HTTPS in production
2. **Rate Limiting**: Consider adding rate limiting to the proxy
3. **IP Whitelisting**: Restrict access to your ElasticSearch server
4. **Monitor**: Log and monitor proxy requests
5. **Rotate Credentials**: Change ElasticSearch passwords regularly

## Development

For local development, you can run both the proxy and frontend:

```bash
npm run dev:full
```

This starts:
- Proxy server on port 3001
- Frontend dev server on port 8080

## Production Deployment

### Using PM2 (recommended)

```bash
npm install -g pm2
pm2 start proxy.js --name recipe-proxy
pm2 save
pm2 startup
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "proxy.js"]
```

Build and run:

```bash
docker build -t recipe-proxy .
docker run -p 3001:3001 --env-file .env recipe-proxy
```

## Troubleshooting

### Proxy returns 401 errors
- Check your ElasticSearch credentials in `.env`
- Verify ElasticSearch is running and accessible
- Check ElasticSearch user permissions

### CORS errors
- Ensure your web server is properly proxying `/api/` requests
- Verify the proxy is running and accessible

### Slow responses
- Check network connectivity to ElasticSearch
- Monitor ElasticSearch performance
- Consider adding caching to the proxy

## Alternative: API Gateway

For more complex setups, consider using:
- AWS API Gateway with Lambda
- Cloudflare Workers
- NGINX with Lua scripting

But for most cases, this simple proxy is sufficient and much easier to maintain.