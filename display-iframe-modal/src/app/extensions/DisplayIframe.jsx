import { Link, Button, Text, Box, Flex, hubspot, Input } from "@hubspot/ui-extensions";
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject
} from '@syncfusion/ej2-react-schedule';
import { CrmActionButton } from '@hubspot/ui-extensions/crm';

// Define the extension to be run within the Hubspot CRM
hubspot.extend((
  { actions } // serverless function is not required for simply displaying an iframe
) => <Extension openIframe={actions.openIframeModal} />);
// hubspot.extend(({ actions }) => (
//   <HelloWorld fetchProperties={actions.fetchCrmObjectProperties} />
// ));

// Define the Extension component, taking in openIframe as a prop
const Extension = ({ openIframe}) => {
  const handleClick = () => {
    openIframe({
      uri: "https://meetings.hubspot.com/yzhou1", // this is a relative link. Some links will be blocked since they don't allow iframing
      height: 1000,
      width: 1000,
      title: 'Wikipedia in an Iframe',
      flush: true,
    });
  };
  
  return (
    <>
      <Flex direction="column" align="start" gap="medium">
        {/* <Text>
          Clicking the button will open a modal dialog with an iframe that
          displays the content at the provided URL. Get more info on how to do this {" "}.
          <Link href="https://developers.hubspot.com/docs/platform/create-ui-extensions#open-an-iframe-in-a-modal">
            here
          </Link> */}
        {/* </Text> */}
        <Text>
         A field to put something 
        </Text> 
          
        <Input>
        </Input>
        <CrmActionButton
          actionType="PREVIEW_OBJECT"
          actionContext={{
          objectTypeId: '0-3',
          objectId: 29551142045,
          }}
        variant="secondary"
        >
          Preview deal
        </CrmActionButton>
        <Box>
          <Button type="submit" onClick={handleClick}>
            Click me
          </Button>
        </Box>
        
      </Flex>
    </>
  );
};

