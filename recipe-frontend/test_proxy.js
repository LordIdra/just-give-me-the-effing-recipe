// Simple test for the proxy server
const fetch = require('node-fetch');

async function testProxy() {
    console.log('🧪 Testing proxy server...\n');
    
    try {
        // Test 1: Health check
        console.log('1. Testing health endpoint...');
        try {
            const healthResponse = await fetch('http://localhost:3001/health');
            if (healthResponse.ok) {
                const healthData = await healthResponse.json();
                console.log('   ✅ Health check passed:', healthData.status);
            } else {
                console.log('   ❌ Health check failed:', healthResponse.status);
            }
        } catch (error) {
            console.log('   ❌ Health check error:', error.message);
        }
        
        // Test 2: Proxy authentication (should fail without auth)
        console.log('\n2. Testing proxy authentication...');
        try {
            const noAuthResponse = await fetch('http://localhost:3001/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: { match_all: {} } })
            });
            
            if (noAuthResponse.status === 401) {
                console.log('   ✅ Proxy correctly requires authentication');
            } else {
                console.log('   ⚠️ Proxy authentication status:', noAuthResponse.status);
            }
        } catch (error) {
            console.log('   ❌ Proxy authentication test error:', error.message);
        }
        
        // Test 3: Proxy with authentication
        console.log('\n3. Testing proxy with authentication...');
        try {
            const authResponse = await fetch('http://localhost:3001/api/search', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from('proxy:change-this-in-production').toString('base64')
                },
                body: JSON.stringify({ query: { match_all: {} } })
            });
            
            console.log('   🔒 Proxy auth status:', authResponse.status);
            
            if (authResponse.ok) {
                const data = await authResponse.json();
                console.log('   ✅ Proxy authentication successful');
                console.log('   📊 Response:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
            } else {
                const errorText = await authResponse.text();
                console.log('   ❌ Proxy error:', errorText.substring(0, 100));
            }
        } catch (error) {
            console.log('   ❌ Proxy with auth error:', error.message);
        }
        
    } catch (error) {
        console.error('💥 Test failed:', error);
    }
    
    console.log('\n🎯 Proxy test completed');
}

// Run the test
testProxy();