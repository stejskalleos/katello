import {
  selectAPIStatus,
  selectAPIResponse,
  selectAPIError,
} from 'foremanReact/redux/API/APISelectors';

import { CHANGE_CONTENT_SOURCE_DATA, CHANGE_CONTENT_SOURCE_CAPSULE, CHANGE_CONTENT_SOURCE, CHANGE_CONTENT_SOURCE_VIEWS } from './constants';

// API statuses
export const selectApiDataStatus = state =>
  selectAPIStatus(state, CHANGE_CONTENT_SOURCE_DATA);

export const selectApiContentViewStatus = state =>
  selectAPIStatus(state, CHANGE_CONTENT_SOURCE_VIEWS);

export const selectApiChangeContentStatus = state =>
  selectAPIStatus(state, CHANGE_CONTENT_SOURCE);

export const selectError = state => selectAPIError(state, CHANGE_CONTENT_SOURCE);

// Selectors
export const selectHosts = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE_DATA).hosts || [];

export const selectIgnoredHosts = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE_DATA).ignored_hosts || [];

export const selectEnvironments = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE_CAPSULE).lifecycle_environments || [];

export const selectCapsules = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE_DATA).capsules || [];

export const selectJobInvocationPath = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE_DATA).job_invocation_path;

export const selectContentViews = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE_VIEWS).results || [];

export const selectTemplate = state =>
  selectAPIResponse(state, CHANGE_CONTENT_SOURCE) || '';

