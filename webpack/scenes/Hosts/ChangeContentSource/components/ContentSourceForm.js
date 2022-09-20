import React from 'react';
import {
  ActionGroup,
  Button,
  Form,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import { translate as __ } from 'foremanReact/common/I18n';
import PropTypes from 'prop-types';

import FormField from './FormField';

const ContentSourceForm = ({
  handleSubmit,
  environments,
  handleEnvironment,
  environmentId,
  contentViews,
  handleContentView,
  contentViewId,
  capsules,
  handleCapsule,
  capsuleId,
  hosts,
  isLoading,
}) => {
  const formIsValid = () => (!!environmentId &&
    !!contentViewId &&
    !!capsuleId &&
    hosts.length !== 0);

  const capsulesIsDisabled = isLoading || capsules.length === 0 || hosts.length === 0;
  const environmentIsDisabled = isLoading || environments.length === 0 || capsuleId === '';
  const viewIsDisabled = isLoading || contentViews.length === 0 || capsuleId === '' || environmentId === '';

  return (
    <Form
      onSubmit={e => handleSubmit(e)}
      className="content_source_form"
      isHorizontal
    >
      <Grid hasGutter className="margin-top-16">
        <FormField label={__('Content Source')} id="change_cs_content_source" value={capsuleId} items={capsules} onChange={handleCapsule} isDisabled={capsulesIsDisabled} />
        <FormField label={__('Environment')} id="change_cs_environment" value={environmentId} items={environments} onChange={handleEnvironment} isDisabled={environmentIsDisabled} />
        <FormField label={__('Content View')} id="change_cs_content_view" value={contentViewId} items={contentViews} onChange={handleContentView} isDisabled={viewIsDisabled} />

        <GridItem>
          <ActionGroup>
            <Button
              variant="primary"
              id="generate_btn"
              onClick={e => handleSubmit(e)}
              isDisabled={isLoading || !formIsValid()}
              isLoading={isLoading}
            >
              {__('Change content source')}
            </Button>
          </ActionGroup>
        </GridItem>
      </Grid>
    </Form>);
};

ContentSourceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  environments: PropTypes.arrayOf(PropTypes.shape({})),
  handleEnvironment: PropTypes.func.isRequired,
  environmentId: PropTypes.string,
  contentViews: PropTypes.arrayOf(PropTypes.shape({})),
  handleContentView: PropTypes.func.isRequired,
  contentViewId: PropTypes.string,
  capsules: PropTypes.arrayOf(PropTypes.shape({})),
  handleCapsule: PropTypes.func.isRequired,
  capsuleId: PropTypes.string,
  hosts: PropTypes.arrayOf(PropTypes.number),
  isLoading: PropTypes.bool,
};

ContentSourceForm.defaultProps = {
  environments: [],
  environmentId: '',
  contentViews: [],
  contentViewId: '',
  capsules: [],
  capsuleId: '',
  hosts: [],
  isLoading: false,
};

export default ContentSourceForm;
