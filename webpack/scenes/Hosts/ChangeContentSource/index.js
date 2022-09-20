import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Alert, Grid, GridItem } from '@patternfly/react-core';

import { translate as __ } from 'foremanReact/common/I18n';
import { STATUS } from 'foremanReact/constants';

import { selectApiDataStatus,
  selectApiContentViewStatus,
  selectApiChangeContentStatus,
  selectHosts,
  selectIgnoredHosts,
  selectEnvironments,
  selectCapsules,
  selectJobInvocationPath,
  selectContentViews,
  selectTemplate } from './selectors';

import { getHostIds, formIsLoading } from './helpers';
import {
  getFormData,
  getCapsule,
  changeContentSource,
  getContentViews,
} from './actions';
import ContentSourceForm from './components/ContentSourceForm';
import ContentSourceTemplate from './components/ContentSourceTemplate';
import Hosts from './components/Hosts';
import './styles.scss';

const ChangeContentSourcePage = () => {
  const dispatch = useDispatch();

  const apiDataStatus = useSelector(selectApiDataStatus);
  const apiContentViewStatus = useSelector(selectApiContentViewStatus);
  const apiChangeStatus = useSelector(selectApiChangeContentStatus);

  const isLoading = formIsLoading(apiDataStatus, apiContentViewStatus, apiChangeStatus);

  const hosts = useSelector(selectHosts);
  const ignoredHosts = useSelector(selectIgnoredHosts);
  const environments = useSelector(selectEnvironments);
  const capsules = useSelector(selectCapsules);
  const jobInvocationPath = useSelector(selectJobInvocationPath);

  const template = useSelector(selectTemplate);
  const contentViews = useSelector(selectContentViews);

  const [capsuleId, setCapsuleId] = useState('');
  const [environmentId, setEnvironmentId] = useState('');
  const [contentViewId, setContentViewId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(changeContentSource(environmentId, contentViewId, capsuleId, hosts.map(h => h.id)));
  };

  const handleCapsule = (id) => {
    setCapsuleId(id);
    setEnvironmentId('');
    setContentViewId('');

    if (id) {
      dispatch(getCapsule(id));
    }
  };

  const handleEnvironment = (envId) => {
    setEnvironmentId(envId);
    setContentViewId('');

    if (envId) {
      dispatch(getContentViews(envId));
    }
  };
  useEffect(() => {
    dispatch(getFormData());
  }, [dispatch]);

  if (getHostIds().length === 0) {
    return (
      <Grid className="margin-40">
        <GridItem span={7}>
          <Alert
            variant="danger"
            title={__('No hosts with content source found!')}
          />
        </GridItem>
      </Grid>);
  }

  return (
    <Grid className="margin-40">
      <GridItem span={7}>
        <h1>{__('Change host content source')}</h1>
      </GridItem>
      <Hosts
        hosts={hosts}
        ignoredHosts={ignoredHosts}
      />

      <ContentSourceForm
        handleSubmit={handleSubmit}
        environments={environments}
        handleEnvironment={handleEnvironment}
        environmentId={environmentId}
        contentViews={contentViews}
        handleContentView={setContentViewId}
        contentViewId={contentViewId}
        capsules={capsules}
        capsuleId={capsuleId}
        handleCapsule={handleCapsule}
        hosts={hosts}
        ignoredHosts={ignoredHosts}
        isLoading={isLoading}
      />
      { apiChangeStatus === STATUS.RESOLVED &&
      <ContentSourceTemplate template={template} jobInvocationPath={jobInvocationPath} /> }
    </Grid>
  );
};

export default ChangeContentSourcePage;
