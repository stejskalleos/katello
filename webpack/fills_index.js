import React from 'react';
import { addGlobalFill } from 'foremanReact/components/common/Fill/GlobalFill';
import { registerReducer } from 'foremanReact/common/MountingService';

import SystemStatuses from './components/extensions/about';
import ActivationKeys from './components/extensions/registration/ActivationKeys';
import Force from './components/extensions/registration/Force';

import extendReducer from './components/extensions/reducers';

registerReducer('katelloExtends', extendReducer);

addGlobalFill('aboutFooterSlot', '[katello]AboutSystemStatuses', <SystemStatuses key="katello-system-statuses" />, 100);
addGlobalFill('registrationAdvanced', '[katello]ActivationKeys', <ActivationKeys key="katello-reg-activation-keys" />, 100);
addGlobalFill('registrationAdvanced', '[katello]Force', <Force key="katello-reg-force" />, 100);
