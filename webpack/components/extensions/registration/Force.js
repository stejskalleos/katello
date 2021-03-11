import React from 'react';

import { FormGroup, Checkbox, Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';
import { translate as __ } from 'foremanReact/common/I18n';

const Force = ({ isLoading, pluginValues, onChange }) => {
  const force = pluginValues?.force === undefined ? false : pluginValues?.force;
  const help = <div>{ __('Remove any `katello-ca-consumer` rpms before registration and run subscription-manager with `--force` argument.')}</div>;

  return (
    <FormGroup fieldId="reg_katello_force">
      <Checkbox
        label={
          <span>
            {__('Force')}{' '}
            <Popover
              bodyContent={help}
            >
              <button
                className="pf-c-form__group-label-help"
                onClick={e => e.preventDefault()}
              >
                <HelpIcon noVerticalAlign />
              </button>
            </Popover>
          </span>
      }
        id="reg_katello_force_input"
        onChange={() => onChange({ force: !force })}
        isDisabled={isLoading}
        isChecked={force}
      />
    </FormGroup>
  );
};

export default Force;
