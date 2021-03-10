import {
  REGISTRATION_COMMANDS_DATA,
} from './RegistrationCommandsPageConstants';

import {
  selectAPIResponse,
} from 'foremanReact/redux/API/APISelectors';

export const selectActivationKeys = state =>
  selectAPIResponse(state, REGISTRATION_COMMANDS_DATA).pluginData?.activationKeys || [];

