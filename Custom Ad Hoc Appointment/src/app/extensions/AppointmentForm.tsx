import React, { useEffect, useState } from 'react';
import {
  hubspot,
  DescriptionList,
  DescriptionListItem,
  Heading,
  Divider,
  Tile,
  Flex,
  Select,
  Text,
  Button,
  Input,
} from '@hubspot/ui-extensions';

import { CrmStageTracker, CrmPropertyList, CrmAssociationPropertyList } from '@hubspot/ui-extensions/crm';

hubspot.extend<'crm.record.tab'>(({ actions, runServerlessFunction }) => (
  <Extension actions={actions} runServerlessFunction={runServerlessFunction} />
));

const Extension = ({ actions, runServerlessFunction }) => {
  const {
    fetchCrmObjectProperties,
    onCrmPropertiesUpdate,
    refreshObjectProperties,
  } = actions;
  const [properties, setProperties] = useState<Record<string, string>>({});
  const [AssociatedContact, setAssociatedContact] = useState<{ options } | null>(
    null
  );
  const[updatedLifCycleStage, setUpdatedLifecycleStage] = useState<{ options } | null>(
    null
  );
  const [updatedFirstName, setUpdatedFirstName] = useState<string>('');
  const [updatedLastName, setUpdatedLastName] = useState<string>('');

  useEffect(() => {
    fetchCrmObjectProperties("*").then((properties) => {
      console.log(Object.keys(properties));
    });
  }, []);


  // onCrmPropertiesUpdate(['firstname', 'lastname'], (properties) => {
  //   setProperties(properties);
  // });
 useEffect(() => {
  runServerlessFunction({ name: 'getAssociatedContact', propertiesToSend: ['hs_object_id'], }).then(
    (serverlessResponse) => {
      if (serverlessResponse.status == 'SUCCESS') {
        setAssociatedContact(serverlessResponse.response.associations.contacts.results);
      }
    } 
  );
  }, []);
  // useEffect(() => {
  //   runServerlessFunction({ name: 'getLifecycleStage' }).then(
  //     (serverlessResponse) => {
  //       if (serverlessResponse.status == 'SUCCESS') {
  //         setLifecycleStage(serverlessResponse.response);
  //       }
  //     }
  //   );
  // }, []);
  const monitorChange = (property, e)=>{
    if(property=="firstname"){
     setUpdatedFirstName(e) 
    }
    if (property=="lastname"){
      setUpdatedLastName(e)
    }
  }
  const saveChanges = () => {
    // console.log(updatedLifCycleStage);
    // runServerlessFunction({
    //   name: 'updateLifecycleStage',
    //   parameters: updatedLifCycleStage,
    //   somethingElse:"",
    //   propertiesToSend: ['hs_object_id'],
    // }).then(() => {
    //   refreshObjectProperties();
    // });
    
    console.log(AssociatedContact)
    // runServerlessFunction({
    //   name: 'updateMutiProperties',
    //   parameters: {
    //     "firstname":updatedFirstName,
    //     "lastname" : updatedLastName
    //   },
    //   somethingElse:"",
    //   propertiesToSend: ['hs_object_id'],
    // }).then(() => {
    //   refreshObjectProperties();
    // });
  };
  const dataComponents = () => {
    console.log()
  }

  return (
    <>
    
      <Tile>
        <Flex direction="column" gap="sm">
          <Heading>
            Ad Hoc Meeting
          </Heading>
          <Text variant="microcopy">
           Please fillout the below form information to set a meeting with the primary contact of the account 
          </Text>
          <DescriptionList direction="row">
            {Object.entries(properties).map(([key, value]) => (
              <DescriptionListItem label={key}>
                <Input label={''} value={value} name={key} onChange={(e) =>monitorChange(key, e)}></Input>
              </DescriptionListItem>
            ))}
          </DescriptionList>
          <Select
            options={AssociatedContact && AssociatedContact.options}
            label="Associated Contact"
            placeholder="Primary contact"
          />
          <Button type="submit" onClick={saveChanges}>
            Create a Meeting 
          </Button>
          <CrmAssociationPropertyList
      objectTypeId="0-1"
      properties={['firstname', 'email', 'fbc_contact_type', 'state']}
    />
    <CrmAssociationPropertyList 
      objectTypeId="0-421"
      properties={['hs_appointment_start', 'appointment_deadline', 'hubspot_owner_id']}
    />
     {/* <CrmPropertyList
     objectTypeId="0-1"
      properties={[
        'lastname',
        'email',
        'createdate',
        'address',
        'city',
        'state',
        'zip',
      ]}
      direction="row"
    /> */}
   
        </Flex>
      </Tile>
    </>
  );
};
