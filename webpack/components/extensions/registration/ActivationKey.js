import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import FormField from 'foremanReact/components/common/forms/FormField';
import OrderableSelect from 'foremanReact/components/common/forms/OrderableSelect';

import { translate as __ } from 'foremanReact/common/I18n';

import { selectAckOptions, selectActivationKey } from './RegistrationSelectors'

const RegistrationActivationKey = ({ isLoading, onChange, }) => {
  const options = useSelector(selectAckOptions);
  const value = useSelector(selectActivationKey);

  return (
    <FormField
      label={__('ActivationKey')}
      labelHelp={__('Activation key(s) for Subscription Manager')}
    >
    <DndProvider backend={HTML5Backend}>
      <OrderableSelect
      id="activation_key"
      name="activation_key"
      options={options}
      value={value}
      onChange={keys => onChange({key: 'activationKey', value: keys})}
      disabled={isLoading}
    />
    </DndProvider>
    </FormField>
  );
};

RegistrationActivationKey.propTypes = {
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
};

RegistrationActivationKey.defaultProps = {
  isLoading: false,
  onChange: undefined,
};

export default RegistrationActivationKey;