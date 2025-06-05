const axios = require('axios');

exports.main = async (context = {}) => {
 console.log(context)
const PublicObjectSearchRequest = {  
    "limit": 100,"properties":["fbc_tax_term","meeting_ouctome","unique_appointment_name","appointment_name","appointment_deadline_date_time","appointment_start","appointment_end","appointment_duration"], "filterGroups": [{"filters":[
    {"propertyName":"appointment_deadline_date_time","value":new Date().toISOString(),"operator":"LT"}, 
    {"propertyName":"completion_status","value":`Completed`,"operator":"NEQ"}, 
    {"propertyName":"hubspot_owner_id","value":context.parameters.Owner,"operator":"EQ"}  
                                                                                                        ]}] };
  try {const response = await axios.post(
  'https://api.hubapi.com/crm/v3/objects/2-37739766/search',JSON.stringify(PublicObjectSearchRequest), {
    headers: {
      'Authorization': `Bearer ${process.env['PRIVATE_APP_ACCESS_TOKEN']}`,
      'content-type': 'application/json'
    }
  })
//   .then((obj)=> {console.log( obj.data) 
//  } )
 console.log(typeof response)
 return  {
      statusCode: 200,
      body: {
        data: response.data
      }
    }}
    catch (error) {
    console.error('Error fetching owners:', error.message);
    return {
      statusCode: 500,
      body: { error: error.message }
    };
  }
//console.log(response)





}
