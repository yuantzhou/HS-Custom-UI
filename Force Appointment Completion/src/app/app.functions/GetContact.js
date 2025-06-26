const axios = require('axios');

exports.main = async (context = {}) => {
 const params = new URLSearchParams();
params.append('properties', 'member_number_text');
params.append('properties', 'firstname');
params.append('properties', 'lastname');
params.append('archived', 'false');

const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/2-37739766/${context.parameters.AppointmentID}`, {
  params: {
    'associations': 'contacts',
    'archived': 'false'
  },
  headers: {
    'authorization': `Bearer ${process.env['PRIVATE_APP_ACCESS_TOKEN']}`
  }
});
console.log(response.data.associations.contacts.results[0].id)
const response2 = await axios.get(`https://api.hubapi.com/crm/v3/objects/contacts/${response.data.associations.contacts.results[0].id}`, {
  params: params,
  headers: {
    'authorization': `Bearer ${process.env['PRIVATE_APP_ACCESS_TOKEN']}`
  }
});

console.log(response2.data)
return response2.data
}