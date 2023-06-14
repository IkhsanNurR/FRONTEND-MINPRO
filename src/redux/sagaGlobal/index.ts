import { all, takeEvery } from 'redux-saga/effects'
import AuthActionTypes from '../usersSchema/auth/action/actionType'
import { handleLogin } from '../usersSchema/auth/saga'
import UserProfileActionType from '../usersSchema/profile/action/actionType'
import { handleAddAddress, handleAddEmail, handleAddPhone, handleDeleteAddress, handleDeleteEmail, handleDeletePhone, handleEditAddress, handleEditEmail, handleEditPhone, handleGetByNameOrEmail, handleUpdateProfile } from '../usersSchema/profile/saga'
import pontyCodeActionType from '../usersSchema/pontycode/action/actionType'
import { handleGetPontycode } from '../usersSchema/pontycode/saga'
import cityActionType from '../masterSchema/city/action/actionType'
import { handleGetCity } from '../masterSchema/city/saga'
import addreetypeActionType from '../masterSchema/addresstype/action/actionType'
import { handleGetAddressType } from '../masterSchema/addresstype/saga'

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
        takeEvery(UserProfileActionType.DELETEPHONE, handleDeletePhone),

        takeEvery(UserProfileActionType.ADDADDRESS, handleAddAddress),
        takeEvery(UserProfileActionType.EDITADDRESS, handleEditAddress),
        takeEvery(UserProfileActionType.DELETEADDRESS, handleDeleteAddress),

        //MASTER
        takeEvery(cityActionType.GET_CITY, handleGetCity),
        takeEvery(addreetypeActionType.GET_ADDRESSTYPE, handleGetAddressType)
    ])
}

export default watchAll