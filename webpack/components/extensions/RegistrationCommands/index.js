import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'foremanReact/common/helpers';

import ActivationKeys from './fields/ActivationKeys';
import LifeCycleEnvironment from './fields/LifeCycleEnvironment';
import IgnoreSubmanErrors from './fields/IgnoreSubmanErrors';
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
  const selectedKeys = pluginValues?.activationKeys || [];
  const hostGroupActivationKeys = pluginData?.hostGroupActivationKeys;
  const lifeCycleEnvironments = pluginData?.lifeCycleEnvironments;
  const hostGroupEnvironment = pluginData?.hostGroupEnvironment;

  // Delete all selected keys when organization is changed,
  // some of them can be outside of the organization scope
  useEffect(() => {
    onChange({ activationKeys: [] });
  }, [organizationId]);

  return (
    <>
      <ActivationKeys
        organizationId={organizationId}
        activationKeys={pluginData?.activationKeys}
        selectedKeys={(pluginValues?.activationKeys || [])}
        hostGroupActivationKeys={pluginData?.hostGroupActivationKeys}
        hostGroupId={hostGroupId}
        pluginValues={pluginValues}
        onChange={onChange}
        handleInvalidField={handleInvalidField}
        isLoading={isLoading}
      />
      <LifeCycleEnvironment
        organizationId={organizationId}
        pluginValues={pluginValues}
        lifeCycleEnvironments={pluginData?.lifeCycleEnvironments}
        hostGroupEnvironment={pluginData?.hostGroupEnvironment}
        onChange={onChange}
        isLoading={isLoading}
      />
      <IgnoreSubmanErrors
        value={pluginValues?.ignoreSubmanErrors}
        pluginValues={pluginValues}
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

