import { setUserInfo } from './account';
import { handleGetInitialApplications } from './applications';
import { handleGetInitialChallenges } from './challenges';

export function handleGetAllData() {
  return (dispatch) => {
    dispatch(handleGetInitialChallenges());
    dispatch(setUserInfo());
    dispatch(handleGetInitialApplications());
  }
}