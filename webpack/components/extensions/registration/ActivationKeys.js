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

const ActivationKeys = ({ isLoading, pluginData, pluginValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activationKeys, setActivationKeys] = useState(pluginData?.activationKeys || []);
  const selectedKeys = pluginValues?.activationKeys || [];

  const onToggle = () => {setIsOpen(!isOpen)}

  const onSelect = (_e, value) => {
    if(selectedKeys.find((key => key === value))){
      const newKeys = selectedKeys.filter(sk => sk !== value);
      onChange({activationKeys: newKeys})
    }else{
      onChange({activationKeys: [...selectedKeys, value]})
    }
  }

  const onCreateOption = newValue => {
    setActivationKeys([...activationKeys, { value: newValue}])
    onChange({activationKeys: [...selectedKeys, newValue]})
  };

  const onClear = () => {  onChange({activationKeys: []})   }

  return (
    <FormGroup
      label={__('Activation Keys')}
      fieldId='reg_ak'
      labelIcon={
        <Popover bodyContent={<div>TODO</div>}>
          <button
            className='pf-c-form__group-label-help'
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