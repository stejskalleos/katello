import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  FormGroup,
  Select, SelectOption, SelectVariant,
  Popover,
} from '@patternfly/react-core';

import { HelpIcon } from '@patternfly/react-icons';
import { sprintf, translate as __ } from 'foremanReact/common/I18n';
import { selectActivationKeys, selectHostGroupActivationKeys } from './RegistrationCommandsPageSelectors';

const ActivationKeys = ({
  organizationId, pluginValues, onChange, isLoading,
}) => {
  const activationKeys = useSelector(selectActivationKeys);
  const hostGroupActivationKeys = useSelector(selectHostGroupActivationKeys);

  const [isOpen, setIsOpen] = useState(false);
  const selectedKeys = (pluginValues?.activationKeys || '').split(',').filter(ak => ak);
  const help = (<div>
    { __('Activation key(s) for Subscription Manager.')}
                </div>);

  const updatePluginValues = (keys) => {
    onChange({ activationKeys: keys.join(',') });
  };
  const onSelect = (_e, value) => {
    if (selectedKeys.find((key => key === value))) {
      updatePluginValues(selectedKeys.filter(sk => sk !== value));
    } else {
      updatePluginValues([...selectedKeys, value]);
    }
  };

  const onClear = () => { updatePluginValues([]); };
  const onToggle = () => { setIsOpen(!isOpen); };

  // Delete all selected & created keys when organization is changed
  useEffect(() => {
    onChange({ activationKeys: '' });
  }, [organizationId]);

  return (
    <FormGroup
      label={__('Activation Keys')}
      fieldId="reg_ak"
      helperText={hostGroupActivationKeys && sprintf('From host group: %s', hostGroupActivationKeys)}
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
      isHelperTextBeforeField
    >
      <Select
        variant={SelectVariant.typeaheadMulti}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={onClear}
        selections={selectedKeys}
        isOpen={isOpen}
        isDisabled={isLoading}
      >
        {activationKeys.map((ack) => (
          <SelectOption
            value={ack.name}
            description={(ack?.lce ? ack.lce : __('No environment'))}
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
