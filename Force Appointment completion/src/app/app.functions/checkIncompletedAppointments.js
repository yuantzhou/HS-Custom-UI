const hubspot = require('@hubspot/api-client');
exports.main = async (context = {}) => {
 

const hubspotClient = new hubspot.Client({accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN']});
console.log(context)
const PublicObjectSearchRequest = {  limit: 100,properties:["fbc_tax_term","meeting_ouctome","unique_appointment_name","appointment_name","appointment_deadline_date_time"], filterGroups: [{"filters":[
    {"propertyName":"appointment_deadline_date_time","value":new Date().toISOString(),"operator":"LT"}, 
    {"propertyName":"meeting_ouctome","value":`COMPLETED`,"operator":"NEQ"}, 
    {"propertyName":"hubspot_owner_id","value":context.parameters.Owner,"operator":"EQ"}  
                                                                                                        ]}] };
const objectType = "2-37739766";

try {
const apiResponse = await hubspotClient.crm.objects.searchApi.doSearch(objectType, PublicObjectSearchRequest);

return apiResponse
} catch (e) {
e.message === 'HTTP request failed'
? console.error(JSON.stringify(e.response, null, 2))
: console.error(e)
}

}
