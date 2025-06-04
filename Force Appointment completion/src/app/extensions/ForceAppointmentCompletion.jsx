import React, { useState } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Flex,
  hubspot,
} from "@hubspot/ui-extensions";

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
    openIframe={actions.openIframeModal}
  />
));

// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = async ({ context, runServerless, sendAlert, openIframe }) => {
  const [text, setText] = useState("");
  const [Owner, setOwner] = useState("");
  const [Incomplete, setIncomplete] = useState(false);
  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  await runServerless({ name: 'GetOwner', parameters: { context: context } }).then(
    (serverlessResponse) => {
      console.log(serverlessResponse)
      setOwner(serverlessResponse.response.AppointmentBooker)
      runServerless({ name: 'checkIncompletedAppointments', parameters: { Owner: serverlessResponse.response.AppointmentBooker } }).then(
        (serverlessResponse) => {
          console.log(serverlessResponse)
          if (serverlessResponse.response.total > 0) {
            console.log("hit the switch")
            setIncomplete(true)
          }
        }
      )
    }
  )

  const handleIframe = async () => {
    console.log(Incomplete)
    let completed = false
    await runServerless({ name: 'GetOwner', parameters: { context: context } }).then(
      async (serverlessResponse) => {
        console.log(serverlessResponse)
        setOwner(serverlessResponse.response.AppointmentBooker)
        await runServerless({ name: 'checkIncompletedAppointments', parameters: { Owner: serverlessResponse.response.AppointmentBooker } }).then(
          (serverlessResponse) => {
            console.log(serverlessResponse)
            if (serverlessResponse.response.total > 0) {
              console.log("hit the switch")
              openIframe(
                {
                  uri: `https://share.hsforms.com/2ViPHHuS3TXq9nzxeL82B9wqvfxw?unique_appointment_name=${serverlessResponse.response.results[0].properties.unique_appointment_name}&appointment_name=${serverlessResponse.response.results[0].properties.appointment_name}`, // this is a relative link. Some links will be blocked since they don't allow iframing
                  height: 1000,
                  width: 1000,
                  title: 'Incompleted appointment',
                  flush: true,
                },
                async () => {
                  await runServerless({ name: 'GetOwner', parameters: { context: context } }).then(
                    async (serverlessResponse) => {
                      console.log(serverlessResponse)
                      setOwner(serverlessResponse.response.AppointmentBooker)
                      await runServerless({ name: 'checkIncompletedAppointments', parameters: { Owner: serverlessResponse.response.AppointmentBooker } }).then(
                        (serverlessResponse) => {
                          console.log(serverlessResponse)
                          if (serverlessResponse.response.total > 0) {
                            while (completed == false) {
                              openIframe(
                                {
                                  uri: `https://share.hsforms.com/2ViPHHuS3TXq9nzxeL82B9wqvfxw?unique_appointment_name=${serverlessResponse.response.results[0].properties.unique_appointment_name}&appointment_name=${serverlessResponse.response.results[0].properties.appointment_name}`, // this is a relative link. Some links will be blocked since they don't allow iframing
                                  height: 1000,
                                  width: 1000,
                                  title: 'Wikipedia in an iframe',
                                  flush: true,
                                },
                              )
                            }
                          } else {
                            completed = true
                          }
                        })
                    })


                }



              );
            } else {
              return <></>
            }
          }
        )
      }
    )

  }
  handleIframe()
  return (

    <Text>
      something here

    </Text>

  );
};
