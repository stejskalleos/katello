import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Select, SelectOption, SelectVariant,
  Popover,
} from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';
import { sprintf, translate as __ } from 'foremanReact/common/I18n';

import { validateAKField, hasValidValue } from '../RegistrationCommandsPageHelpers';

const ActivationKeys = ({
  activationKeys,
  selectedKeys,
  hostGroupActivationKeys,
  organizationId,
  hostGroupId,
  pluginValues,
  onChange,
  isLoading,
  handleInvalidField,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updatePluginValues = (keys) => {
    onChange({ activationKeys: keys });
    handleInvalidField('Activation Keys', hasValidValue(hostGroupId, pluginValues?.activationKeys, hostGroupActivationKeys));
  };

  const onSelect = (_e, value) => {
    if (selectedKeys.find((key => key === value))) {
      updatePluginValues(selectedKeys.filter(sk => sk !== value));
    } else {
      updatePluginValues([...selectedKeys, value]);
    }
  };

  // Validate field when hostgroup is changed (host group may have some keys)
  useEffect(() => {
    handleInvalidField('Activation Keys', hasValidValue(hostGroupId, pluginValues?.activationKeys, hostGroupActivationKeys));
  }, [hostGroupId, hostGroupActivationKeys, pluginValues]);

  return (
    <FormGroup
      label={__('Activation Keys')}
      fieldId="reg_ak"
      helperText={hostGroupActivationKeys && sprintf('From host group: %s', hostGroupActivationKeys)}
      helperTextInvalid="HG no keys, VERY BAD."
      validated={validateAKField(hostGroupId, pluginValues?.activationKeys, hostGroupActivationKeys)}
      labelIcon={
        <Popover
          bodyContent={__('Activation key(s) for Subscription Manager.')}
        >
          <button
            className="pf-c-form__group-label-help"
            onClick={e => e.preventDefault()}
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
      isRequired
    >
      <Select
        variant={SelectVariant.typeaheadMulti}
        onToggle={() => setIsOpen(!isOpen)}
        onSelect={onSelect}
        onClear={() => updatePluginValues([])}
        selections={selectedKeys}
        isOpen={isOpen}
        isDisabled={isLoading || activationKeys?.length === 0}
        placeholderText={activationKeys?.length === 0 ? __('No Activation keys to select') : ''}
      >
        {activationKeys && activationKeys.map(ack => (
          <SelectOption
            key={ack.name}
            value={ack.name}
            description={(ack?.lce ? ack.lce : __('No environment'))}
          />
        ))}
      </Select>
    </FormGroup>);
};


ActivationKeys.propTypes = {
  activationKeys: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  hostGroupActivationKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // eslint-disable-line react/forbid-prop-types
  organizationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hostGroupId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pluginValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func.isRequired,
  handleInvalidField: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

ActivationKeys.defaultProps = {
  activationKeys: undefined,
  hostGroupActivationKeys: undefined,
  organizationId: undefined,
  hostGroupId: undefined,
  pluginValues: {},
  isLoading: false,
};

export default ActivationKeys;
