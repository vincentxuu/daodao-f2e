export function googleLogin() {
  return {
    type: 'GOOGLE_LOGIN',
  };
}
export function userLogin() {
  return {
    type: 'USER_LOGIN',
  };
}
export function userLogout() {
  return {
    type: 'USER_LOGOUT',
  };
}

export function checkUserAccount() {
  return {
    type: 'CHECK_USER_ACCOUNT',
  };
}

export function userUpdate(body) {
  return {
    type: 'USER_UPDATE',
    payload: {
      body,
    },
  };
}

export function addResourceToCollection(resourceId) {
  return {
    type: 'ADD_RESOURCE_TO_COLLECTION',
    payload: {
      resourceId,
    },
  };
}

export function removeResourceFromCollection(resourceId) {
  return {
    type: 'REMOVE_RESOURCE_FROM_COLLECTION',
    payload: {
      resourceId,
    },
  };
}
