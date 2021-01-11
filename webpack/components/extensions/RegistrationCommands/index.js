import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'foremanReact/common/helpers';

import ActivationKeys from './fields/ActivationKeys';
import LifeCycleEnvironment from './fields/LifeCycleEnvironment';
import Force from './fields/Force';

const RegistrationCommands = ({
  organizationId,
  hostGroupId,
  pluginValues,
  pluginData,
  onChange,
  handleInvalidField,
  isLoading,
}) => {
  const activationKeys = pluginData?.activationKeys;
  const hostGroupActivationKeys = pluginData?.hostGroupActivationKeys;
  const lifeCycleEnvironments = pluginData?.lifeCycleEnvironments;
  const hostGroupEnvironment = pluginData?.hostGroupEnvironment;

  return (
    <>
      <ActivationKeys
        activationKeys={activationKeys}
        hostGroupActivationKeys={hostGroupActivationKeys}
        organizationId={organizationId}
        hostGroupId={hostGroupId}
        pluginValues={pluginValues}
        onChange={onChange}
        handleInvalidField={handleInvalidField}
        isLoading={isLoading}
      />
      <LifeCycleEnvironment
        organizationId={organizationId}
        pluginValues={pluginValues}
        lifeCycleEnvironments={lifeCycleEnvironments}
        hostGroupEnvironment={hostGroupEnvironment}
        onChange={onChange}
        isLoading={isLoading}
      />
      <Force
        value={pluginValues?.force}
        pluginValues={pluginValues}
        onChange={onChange}
        isLoading={isLoading}
      />
    </>
  );
};

RegistrationCommands.propTypes = {
  organizationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hostGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pluginValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  pluginData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func,
  handleInvalidField: PropTypes.func,
  isLoading: PropTypes.bool,
};

RegistrationCommands.defaultProps = {
  organizationId: undefined,
  hostGroupId: undefined,
  pluginValues: {},
  pluginData: {},
  isLoading: false,
  onChange: noop,
  handleInvalidField: noop,
};

export default RegistrationCommands;

