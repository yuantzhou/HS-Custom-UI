const hubspot = require('@hubspot/api-client');


exports.main = async (context = {}) => {
    const hubspotClient = new hubspot.Client({
        accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN']
    });
 
const email = context.parameters.context.user.email;
const after = undefined;
const limit = 100;
const archived = false;
let owners={}

try {
    // apicall 2= for owner
 
  const apiResponse2= await hubspotClient.crm.owners.ownersApi.getPage(email, after, limit, archived);

owners.AppointmentBooker= apiResponse2.results[0].id
  return owners
  
} catch (e) {
  e.message === 'HTTP request failed'
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
}
}