// Activation Keys helpers

export const validateAKField = (hostGroupId, userKeys, hgKeys) => {
  if (hostGroupId === '') {
    return (userKeys?.length > 0 ? 'success' : 'error');
  }

  if (userKeys === undefined && hgKeys === undefined) {
    return ('default');
  }

  return((userKeys?.length > 0 || hgKeys?.length > 0) ? 'success' : 'error');
};


export const hasValidValue = (hostGroupId, userKeys, hgKeys) => {
  if (hostGroupId === '') {
    return (userKeys?.length > 0);
  }

  if (hgKeys === undefined && userKeys === undefined) {
    return (true);
  }
  return (hgKeys?.length > 0 || userKeys?.length > 0);
};
