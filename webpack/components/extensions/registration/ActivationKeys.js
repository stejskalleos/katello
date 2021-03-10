import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  FormGroup,
  Select, SelectOption, SelectVariant,
  Popover,
} from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';
import { translate as __ } from 'foremanReact/common/I18n';
import { selectActivationKeys } from './RegistrationCommandsPageSelectors';

const ActivationKeys = ({ isLoading, pluginValues, onChange }) => {
  const activationKeys = useSelector(selectActivationKeys);
  const [isOpen, setIsOpen] = useState(false);
  const selectedKeys = (pluginValues?.activationKeys || '').split(',').filter(ak => ak);
  const help = (<div>
    { __('Activation key(s) for Subscription Manager.')}
                </div>);

  const updatePluginValues = (activationKeys) => {
    onChange({ activationKeys: activationKeys.join(',') });
  };
  const onSelect = (_e, value) => {
    if (selectedKeys.find((key => key === value))) {
      updatePluginValues(selectedKeys.filter(sk => sk !== value));
    } else {
      updatePluginValues([...selectedKeys, value]);
    }
  };

  const onCreateOption = (newValue) => {
    updatePluginValues([...selectedKeys, newValue]);
  };

  const onClear = () => { updatePluginValues([]); };
  const onToggle = () => { setIsOpen(!isOpen); };

  return (
    <FormGroup
      label={__('Activation Keys')}
      fieldId="reg_ak"
      labelIcon={
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
      }
    >
      <Select
        variant={SelectVariant.typeaheadMulti}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={onClear}
        selections={selectedKeys}
        isOpen={isOpen}
        onCreateOption={onCreateOption}
        isDisabled={isLoading}
        isCreatable
      >
        {activationKeys.map((ack, i) => (
          <SelectOption
            key={i}
            value={ack.name}
          />
        ))}
      </Select>
    </FormGroup>);
};

// RegistrationActivationKey.propTypes = {
//   isLoading: PropTypes.bool,
//   onChange: PropTypes.func,
// };

// RegistrationActivationKey.defaultProps = {
//   isLoading: false,
//   onChange: undefined,
// };

export default ActivationKeys;
