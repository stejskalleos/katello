import React from 'react';
import { addGlobalFill } from 'foremanReact/components/common/Fill/GlobalFill';
import { registerReducer } from 'foremanReact/common/MountingService';

import SystemStatuses from './components/extensions/about';
import RegistrationActivationKey from './components/extensions/registration/ActivationKey'
import extendReducer from './components/extensions/reducers';

registerReducer('katelloExtends', extendReducer);

addGlobalFill('aboutFooterSlot', '[katello]AboutSystemStatuses', <SystemStatuses key="katello-system-statuses" />, 100);
addGlobalFill('host-registration-form-advanced-fields', '[katello]activationKeys', <RegistrationActivationKey key="katello-activation-key" />, 100);
