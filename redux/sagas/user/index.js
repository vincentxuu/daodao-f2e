import { put, call, all, take, takeEvery, select } from 'redux-saga/effects';
import * as localforage from 'localforage';

function* checkUserStatus() {
  try {
    const userData = yield localforage.getItem('userData');
    const { displayName, email, photoURL } = userData.user;
    yield put({
      type: 'CHECK_USER_ACCOUNT_SUCCESS',
      payload: {
        name: displayName,
        email,
        photoURL,
      },
    });
  } catch (error) {
    yield put({ type: 'CHECK_USER_ACCOUNT_FAILURE', error });
  }
}

function* googleLogin() {
  const URL = `http://localhost:4000/auth/google`;
  try {
    yield window.open(URL, '_self');
  } catch (error) {
    yield put({ type: 'USER_LOGIN_FAILURE', error });
  }
}

function* userLogin() {
  const userURL = `http://localhost:4000/user/current_user`;
  try {
    const userData = yield fetch(userURL, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((res) => res.json());
    console.log(userData);
    const { name, email, photoURL } = userData.user;
    yield put({
      type: 'USER_LOGIN_SUCCESS',
      payload: {
        name,
        email,
        photoURL,
      },
    });
  } catch (error) {
    yield put({ type: 'USER_LOGIN_FAILURE', error });
  }
}

function* userLogout() {
  // const URL = `http://localhost:3000/user/logout`;
  try {
    // yield fetch(URL, {
    //   method: 'GET',
    // }).then((res) => res.json());
    yield put({
      type: 'USER_LOGOUT_SUCCESS',
    });
  } catch (error) {
    yield put({ type: 'USER_LOGOUT_FAILURE', error });
  }
}

function* userUpdate(action) {
  const URL = `http://localhost:4000/user/update`;
  const { body } = action.payload;
  console.log('body:', body);
  try {
    const result = yield fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((res) => res.json());
    console.log('result:', result);
    yield put({
      type: 'USER_UPDATE_SUCCESS',
      payload: result,
    });
  } catch (error) {
    yield put({ type: 'USER_UPDATE_FAILURE', error });
  }
}

function* userSaga() {
  yield takeEvery('CHECK_USER_ACCOUNT', checkUserStatus);
  yield takeEvery('GOOGLE_LOGIN', googleLogin);
  yield takeEvery('USER_LOGIN', userLogin);
  yield takeEvery('USER_LOGOUT', userLogout);
  yield takeEvery('USER_UPDATE', userUpdate);
}

export default userSaga;
