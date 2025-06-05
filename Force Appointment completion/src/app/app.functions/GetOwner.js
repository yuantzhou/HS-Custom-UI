const axios = require('axios');

exports.main = async (context = {}) => {
  const email = context.parameters?.context?.user?.email;
  
  try {
    const response = await axios.get('https://api.hubapi.com/crm/v3/owners', {
      headers: {
        'Authorization': `Bearer ${process.env['PRIVATE_APP_ACCESS_TOKEN']}`,
        'Content-Type': 'application/json'
      },
      params: {
        limit: 100,
        archived: false
      }
    });
    
    // Find owner by email
    const owner = response.data.results.find(owner => owner.email === email);
    
    return {
      statusCode: 200,
      body: {
        AppointmentBooker: owner ? owner.id : null
      }
    };
    
  } catch (error) {
    console.error('Error fetching owners:', error.message);
    return {
      statusCode: 500,
      body: { error: error.message }
    };
  }
}