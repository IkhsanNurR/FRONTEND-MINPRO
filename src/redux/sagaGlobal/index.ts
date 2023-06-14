import { all, takeEvery } from 'redux-saga/effects'
import AuthActionTypes from '../usersSchema/auth/action/actionType'
import { handleLogin } from '../usersSchema/auth/saga'
import UserProfileActionType from '../usersSchema/profile/action/actionType'
import { handleAddEmail, handleAddPhone, handleDeleteEmail, handleDeletePhone, handleEditEmail, handleEditPhone, handleGetByNameOrEmail, handleUpdateProfile } from '../usersSchema/profile/saga'
import pontyCodeActionType from '../usersSchema/pontycode/action/actionType'
import { handleGetPontycode } from '../usersSchema/pontycode/saga'

function* watchAll() {
    yield all([
        takeEvery(AuthActionTypes.LOGIN, handleLogin),

        takeEvery(UserProfileActionType.GETBYNAMEOREMAIL, handleGetByNameOrEmail),
        takeEvery(UserProfileActionType.UPDATEPROFILE, handleUpdateProfile),

        takeEvery(pontyCodeActionType.GETPONTYCODE, handleGetPontycode),

        takeEvery(UserProfileActionType.ADDEMAIL, handleAddEmail),
        takeEvery(UserProfileActionType.EDITEMAIL, handleEditEmail),
        takeEvery(UserProfileActionType.DELETEEMAIL, handleDeleteEmail),

        takeEvery(UserProfileActionType.ADDPHONE, handleAddPhone),
        takeEvery(UserProfileActionType.EDITPHONE, handleEditPhone),
        takeEvery(UserProfileActionType.DELETEPHONE, handleDeletePhone)
    ])
}

export default watchAll