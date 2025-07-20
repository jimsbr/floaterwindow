// Test script for API endpoints
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000'; // Change this to your Vercel URL when deployed

async function testCreatePaymentIntent() {
    console.log('🧪 Testing create-payment-intent endpoint...');
    
    try {
        const response = await fetch(`${BASE_URL}/api/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com'
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Payment intent created successfully');
            console.log('Client Secret:', data.clientSecret ? 'Present' : 'Missing');
            console.log('Payment Intent ID:', data.paymentIntentId);
            return data.paymentIntentId;
        } else {
            const error = await response.text();
            console.log('❌ Failed to create payment intent:', error);
            return null;
        }
    } catch (error) {
        console.log('❌ Error testing create-payment-intent:', error.message);
        return null;
    }
}

async function testConfirmPayment(paymentIntentId) {
    if (!paymentIntentId) {
        console.log('⏭️ Skipping confirm-payment test (no payment intent ID)');
        return null;
    }

    console.log('🧪 Testing confirm-payment endpoint...');
    
    try {
        const response = await fetch(`${BASE_URL}/api/confirm-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentIntentId: paymentIntentId
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Payment confirmed successfully');
            console.log('Download Token:', data.downloadToken ? 'Present' : 'Missing');
            console.log('Expires At:', data.expiresAt);
            return data.downloadToken;
        } else {
            const error = await response.text();
            console.log('❌ Failed to confirm payment:', error);
            return null;
        }
    } catch (error) {
        console.log('❌ Error testing confirm-payment:', error.message);
        return null;
    }
}

async function testDownload(downloadToken) {
    if (!downloadToken) {
        console.log('⏭️ Skipping download test (no download token)');
        return;
    }

    console.log('🧪 Testing download endpoint...');
    
    try {
        const response = await fetch(`${BASE_URL}/api/download?token=${downloadToken}`);

        if (response.ok) {
            console.log('✅ Download endpoint working');
            console.log('Status:', response.status);
            console.log('Headers:', Object.fromEntries(response.headers.entries()));
        } else {
            const error = await response.text();
            console.log('❌ Download failed:', error);
        }
    } catch (error) {
        console.log('❌ Error testing download:', error.message);
    }
}

async function runTests() {
    console.log('🚀 Starting API tests...\n');

    const paymentIntentId = await testCreatePaymentIntent();
    console.log('');
    
    const downloadToken = await testConfirmPayment(paymentIntentId);
    console.log('');
    
    await testDownload(downloadToken);
    console.log('');
    
    console.log('🏁 Tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { testCreatePaymentIntent, testConfirmPayment, testDownload }; 