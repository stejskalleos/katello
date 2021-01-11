import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'foremanReact/common/helpers';

import { FormGroup, Checkbox, Popover } from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';
import { translate as __ } from 'foremanReact/common/I18n';

const Force = ({ value, onChange, isLoading }) => (
  <FormGroup fieldId="reg_katello_force">
    <Checkbox
      label={
        <span>
          {__('Force')}{' '}
          <Popover
            bodyContent={__('Remove any `katello-ca-consumer` rpms before registration and run subscription-manager with `--force` argument.')}
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
      onChange={() => onChange({ force: !value })}
      isDisabled={isLoading}
      isChecked={value}
    />
  </FormGroup>
);

Force.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

Force.defaultProps = {
  value: false,
  onChange: noop,
  isLoading: false,
};

export default Force;
