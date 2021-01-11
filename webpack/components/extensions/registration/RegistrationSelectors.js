import { REGISTRATION_FORM_DATA } from './RegistrationConstants'

import {
  selectAPIResponse,
} from 'foremanReact/redux/API/APISelectors';

export const selectAckOptions = state =>
selectAPIResponse(state, REGISTRATION_FORM_DATA).activationKeys || [];

const selectRegistration = state => state.registration;

export const selectActivationKey = state =>
  selectRegistration(state).activationKey;