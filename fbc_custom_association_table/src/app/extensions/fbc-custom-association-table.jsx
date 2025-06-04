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
import { CrmAssociationTable,CrmCardActions,CrmActionButton } from '@hubspot/ui-extensions/crm';
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
  

  // Call serverless function to execute with parameters.
  // The `myFunc` function name is configured inside `serverless.json`
  console.log(context)

  return (
    <>
      <CrmAssociationTable
      objectTypeId="0-5"
      propertyColumns={['subject', 'hubspot_owner_id', 'hs_pipeline_stage','fbc_ticket_member_number','fbc_ticket_linked_entity','fbc_ticket_linked_contact']}
      quickFilterProperties={['hubspot_owner_id', 'createdate', 'hs_pipeline_stage','hs_lastactivitydate']}
      pageSize={10}
      searchable={true}
      pagination={true}
    />
    
    <CrmCardActions
  actionConfigs={[
    {
      type: 'action-library-button',
      label: '+ Add',
      actionType: 'OPEN_RECORD_ASSOCIATION_FORM',
      actionContext: {
        objectTypeId: "0-5",
        association: {
          objectTypeId: context.crm.objectTypeId,
          objectId: context.crm.objectId,
        },
      },
      tooltipText: 'Add a Ticket to This Account',
    }
  ]}
    />

    </>
  );
};
