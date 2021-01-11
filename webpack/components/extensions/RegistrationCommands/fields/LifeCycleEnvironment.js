import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  FormGroup,
  FormSelectOption, FormSelect,
  Popover,
} from '@patternfly/react-core';
import { HelpIcon } from '@patternfly/react-icons';

import { sprintf, translate as __ } from 'foremanReact/common/I18n';
import { noop } from 'foremanReact/common/helpers';

const LifeCycleEnvironment = ({
  organizationId, pluginValues, onChange, isLoading,
  hostGroupEnvironment, lifeCycleEnvironments,
}) => {
  useEffect(() => {
    onChange({ lifeCycleEnvironmentId: '' });
  }, [organizationId]);

  return (
    <FormGroup
      label={__('Lifecycle enviroment')}
      fieldId="reg_lce"
      helperText={hostGroupEnvironment && sprintf('From host group: %s', hostGroupEnvironment)}
      labelIcon={
        <Popover
          bodyContent="TODO"
        >
          <button
            className="pf-c-form__group-label-help"
            onClick={e => e.preventDefault()}
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      <FormSelect
        value={pluginValues?.lifeCycleEnvironmentId}
        onChange={v => onChange({ lifeCycleEnvironmentId: v })}
        className="without_select2"
        id="reg_lce"
        isDisabled={isLoading || lifeCycleEnvironments.length === 0}
      >
        <FormSelectOption
          value=""
          label={lifeCycleEnvironments.length === 0 ? __('No LCE to select') : ''}
        />
        {lifeCycleEnvironments.map(lce => (
          <FormSelectOption key={lce.id} value={lce.id} label={lce.name} />
        ))}
      </FormSelect>
    </FormGroup>);
};

LifeCycleEnvironment.propTypes = {
  organizationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pluginValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func,
  hostGroupEnvironment: PropTypes.string,
  lifeCycleEnvironments: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  isLoading: PropTypes.bool,
};


LifeCycleEnvironment.defaultProps = {
  onChange: noop,
  isLoading: false,
  hostGroupEnvironment: '',
  lifeCycleEnvironments: [],
  organizationId: '',
  pluginValues: {},

};

export default LifeCycleEnvironment;
