export function getAuthToken(storeContainer) {
  return config => {
    let store = storeContainer.getState();
    config.headers['Authorization'] = store.user.accessToken;
    return config;
  };
}
