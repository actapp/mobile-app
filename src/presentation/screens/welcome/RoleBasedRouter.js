import { Roles } from '../../../core/account/AccountInteractor'
import { buildResetToRouteAction } from '../../../AppNavigator'
import HomeScreen from '../home/HomeScreen';
import AdminHomeScreen from '../home/AdminHomeScreen';
import AssociateToMinistryScreen from './sharer/AssociateToMinistryScreen';
import CreateMinistryScreen from './leader/CreateMinistryScreen';

export function resetToDashboardAction(accountRole) {
    if(accountRole == Roles.SHARER) {
        return buildResetToRouteAction(HomeScreen.KEY)
    } else if (accountRole == Roles.LEADER) {
        return buildResetToRouteAction(AdminHomeScreen.KEY)
    }

    invalidRole(accountRole)
}

export function resetToAssociateAction(accountRole) {
    if(accountRole == Roles.SHARER) {
        return buildResetToRouteAction(AssociateToMinistryScreen.KEY)
    } else if (accountRole == Roles.LEADER) {
        return buildResetToRouteAction(CreateMinistryScreen.KEY)
    }

    invalidRole(accountRole)
}

function invalidRole(role) {
    throw new Error('Invalid account role: ' + role)
}