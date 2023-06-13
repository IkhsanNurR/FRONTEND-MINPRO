import { all, takeEvery } from 'redux-saga/effects'
import AuthActionTypes from '../usersSchema/auth/action/actionType'
import { handleLogin } from '../usersSchema/auth/saga'
import UserProfileActionType from '../usersSchema/profile/action/actionType'
import { handleAddEmail, handleDeleteEmail, handleEditEmail, handleGetByNameOrEmail, handleUpdateProfile } from '../usersSchema/profile/saga'

function* watchAll() {
    yield all([
        takeEvery(AuthActionTypes.LOGIN, handleLogin),

        takeEvery(UserProfileActionType.GETBYNAMEOREMAIL, handleGetByNameOrEmail),
        takeEvery(UserProfileActionType.UPDATEPROFILE, handleUpdateProfile),
        takeEvery(UserProfileActionType.ADDEMAIL, handleAddEmail),
        takeEvery(UserProfileActionType.EDITEMAIL, handleEditEmail),
        takeEvery(UserProfileActionType.DELETEEMAIL, handleDeleteEmail)
    ])
}

export default watchAll