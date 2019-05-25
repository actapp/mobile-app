import { StackActions, NavigationActions } from 'react-navigation';

import { Roles } from '../../../core/account/AccountInteractor'

import HomeScreen from '../home/HomeScreen'
import AdminHomeScreen from '../home/AdminHomeScreen'

import AssociateToMinistryScreen from '../welcome/sharer/AssociateToMinistryScreen'
import CreateMinistryScreen from '../welcome/admin/CreateMinistryScreen'

export function goToMinistryAssociationByRole(role) {
    if (role == Roles.SHARER) {
        return resetAction(AssociateToMinistryScreen.KEY)
    } else if (role == Roles.LEADER) {
        return resetAction(CreateMinistryScreen.KEY)
    }
}

export function goToDashboardByRole(role) {
    if (role == Roles.SHARER) {
        return resetAction(HomeScreen.KEY)
    } else if (role == Roles.LEADER) {
        return resetAction(AdminHomeScreen.KEY)
    } else {
        throw new Error('Unknown role: ' + role)
    }
}

function resetAction(screenKey) {
    return StackActions.reset({
        index: 0,
        key: screenKey
    })
}