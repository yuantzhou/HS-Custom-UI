import React, { useEffect,useState  } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Flex,
  hubspot,
  Tile,
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert }) => {
  
  const [Appointments, setAppointments] = useState([]);
  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
 
  useEffect(async () => {
    const { response } = await runServerless({ name: "myFunc", parameters:{context:context } });
    console.log(response)
    setAppointments(response.filter(obj=>obj.type=="contact_to_fbc_appointments" ))

  },[])
  const AppointmentButtons=()=> {
    
     return Appointments.map((obj)=><Button >{obj.id}</Button>)
  };

  return (
    <>
      
      <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Send"  />
        <Button type="submit" >
          Click me
        </Button>
        <Tile>
          {AppointmentButtons()}
        </Tile>
      </Flex>
     
     
    </>
  );
};
