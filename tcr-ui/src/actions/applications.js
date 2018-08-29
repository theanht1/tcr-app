import { getPastEvents, getListing } from '../web3/web3';
import { _APPLICATION } from '../events';

export const REGISTER_APPLICATION = 'REGISTER_APPLICATION';
export const GET_INITIAL_APPLICATIONS = 'GET_INITIAL_APPLICATIONS';
export const REMOVE_APPLICATION = 'REMOVE_APPLICATION';

export function handleGetInitialApplications() {
  return (dispatch) => {
    getPastEvents(_APPLICATION, (applications) => {
      applications.forEach((app) => {
        getAllApplicationData(app, (result) => {
          if (result.owner !== "0x0000000000000000000000000000000000000000") dispatch(registerApplication(result))
        });
      })
    })
  }
}

// function getInitialApplications(applications) {
//   return {
//     type: GET_INITIAL_APPLICATIONS,
//     applications
//   };
// }

export function registerApplication(application) {
  return {
    type: REGISTER_APPLICATION,
    application: application,
  }
}

export function removeApplication(listingHash) {
  return {
    type: REMOVE_APPLICATION,
    listingHash
  }
}

// Combine information from the _Application event
// and the listings mapping into one object.
export function getAllApplicationData(application, callback) {
  getListing(application, (listing) => {
    const eventReturnedValues = application.args;

    let dataJSON = eventReturnedValues.data;
    try {
      dataJSON = JSON.parse(dataJSON)
    } catch(exception) {

    }

    callback({
      ...eventReturnedValues,
      ...listing,
      data: dataJSON,
      appEndDate: eventReturnedValues.appEndDate.toString(),
      deposit: eventReturnedValues.deposit.toString()
    });
  });
}
