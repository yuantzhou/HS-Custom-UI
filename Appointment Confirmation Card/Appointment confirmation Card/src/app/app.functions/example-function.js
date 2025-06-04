const hubspot = require('@hubspot/api-client');
exports.main = async (context = {}) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN']
});
console.log(context.parameters.context.crm)

let objectId= context.parameters.context.crm.objectId

const objectType = "0-1";
const properties = [];
const propertiesWithHistory = undefined;
const associations = [
"2-37739766"
];
const archived = false;
const idProperty = undefined;

try {
  const apiResponse = await hubspotClient.crm.objects.basicApi.getById(objectType, objectId, properties, propertiesWithHistory, associations, archived, idProperty);
  let response = apiResponse.associations.p45137012_fbc_appointments.results
  console.log(response)
 return response
}catch (e) {
    e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
}

};
