// for HubSpot API calls
const hubspot = require('@hubspot/api-client');

// Initialize HubSpot API client

exports.main = async (context = {}) => {
  const hubspotClient = new hubspot.Client({
    accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN']
  });
  console.log(context)
  const objectType = "2-34986264";
  const { hs_object_id } = context.propertiesToSend;
  const properties = null;
  const propertiesWithHistory = null;
  const associations = [
    "0-1"
  ];
  const archived = false;
  const idProperty = undefined;
  const apiResponse = await hubspotClient.crm.objects.basicApi.getById(objectType, hs_object_id, properties, propertiesWithHistory, associations, archived, idProperty);
    
    return apiResponse;
};
