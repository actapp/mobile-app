import React, { Component } from 'react'

import { connect } from 'react-redux'
import { ShareActions } from '../../redux/Share'
import { ContactsActions } from '../../redux/Contacts'

import { renderLoadingSteps, renderStepContent, renderTipButton, renderUpButton } from './ShareComponents'

import { confirm } from '../../alerts/Alerts'

import { trackStepCompleted, trackSessionCompleted } from '../../../core/analytics/AnalyticsInteractor'

import handleError, { UPDATE_CONTACT_ERROR, GET_STEPS_ERROR } from '../../../utils/GlobalErrorHandler'

class ShareScreen extends Component {
    static KEY = 'ShareScreen'

    static navigationOptions = ({ navigation }) => {
        const stepTip = navigation.getParam('stepTip', null)
        let headerRight = null
        if (stepTip) {
            headerRight = renderTipButton(stepTip)
        }

        const onUpPressed = () => { navigation.goBack() }

        return {
            title: navigation.getParam('stepTitle', ''),
            headerRight: headerRight,
            headerLeft: renderUpButton(onUpPressed)
        }
    }

    componentDidMount() {
        this.updateTitle()
    }

    componentDidUpdate() {
        this.updateTitle()

        // Okay to only do this in update (not mount) since contact should be in sync w/ share step index when component first starts
        this.syncContact()

        const error = this.props.error

        if (error !== null) {
            // TODO - alert user?
            handleError(GET_STEPS_ERROR, error)
        }
    }

    /**
     * If getting steps, loading indicator,
     * If can go back, enable back button
     * If can go forward, enable forward button
     * Show step content
     */
    render() {
        const { step } = this.props

        if (step) {
            return renderStepContent(step, this.goToPrevious, this.goToNext, this)
        }

        return renderLoadingSteps(this)
    }

    updateTitle = () => {
        const { stepTitle, stepTip } = this.getTitleInfo()

        if (this.props.navigation.getParam('stepTitle', '') == stepTitle
            && this.props.navigation.getParam('stepTip', null) == stepTip) {
            return
        }

        this.props.navigation.replace(ShareScreen.KEY, {
            stepTitle: stepTitle,
            stepTip: stepTip
        })
    }

    syncContact = () => {
        const { contact, step, stepIndex, uid } = this.props

        if (contact == null) {
            return
        }

        // If there is a new step index / step description, make sure contact stays in sync
        // If contact is already being updated, ignore for now (will updated on next component update)
        if (contact.currentStepIndex !== stepIndex) {
            this.props.updateContact({ ...contact, currentStepIndex: stepIndex, currentStepDesc: step.desc }, uid)
                .then(() => {})
                .catch(error => {
                    // TODO - show user error?
                    handleError(UPDATE_CONTACT_ERROR, error)
                })
        }
    }

    getTitleInfo = () => {
        const { step } = this.props

        let stepTitle = ''
        let stepTip = null
        if (step) {
            stepTitle = step.title
            stepTip = step.comments
        }

        return { stepTitle: stepTitle, stepTip: stepTip }
    }

    goToNext = () => {
        const { uid, contact, step, canGoForward } = this.props

        if (canGoForward) {
            this.props.next()
            trackStepCompleted(uid, contact.id, step.key)
        } else {
            this.endSession()
        }
    }

    goToPrevious = () => {
        const { canGoBack } = this.props

        if (canGoBack) {
            this.props.previous()
        } else {
            this.props.navigation.goBack()
        }
    }

    endSession = () => {
        const { uid, contact } = this.props

        const goHome = this.props.navigation.goBack

        confirm('Complete', `Did ${contact.name} accept Christ?`, () => {
            // Yes
            goHome()
            trackSessionCompleted(uid, contact.id, true)
        }, () => {
            // No
            goHome()
            trackSessionCompleted(uid, contact.id, false)
        }, () => {
            // Cancel
        })
    }
}

const mapStateToProps = state => {
    const { session, steps, gettingSteps, error } = state.share
    const { uid } = state.logIn
    const { contacts } = state.contacts

    const mappedState = {
        uid: null,
        contact: null,
        step: null,
        stepIndex: null,
        canGoBack: false,
        canGoForward: false,
        gettingSteps: gettingSteps,
        error: error
    }

    if (session == null && !gettingSteps) {
        return {
            ...mappedState,
            error: new Error('Session not initialized')
        }
    } else if (gettingSteps) {
        return mappedState
    }

    const { contactId, currentStepIndex, canGoBack, canGoForward } = session
    const step = steps[currentStepIndex]
    const contact = contacts.find(element => element.id == contactId)

    const newState = {
        ...mappedState,
        uid: uid,
        contact: contact,
        step: step,
        stepIndex: currentStepIndex,
        canGoBack: canGoBack,
        canGoForward: canGoForward
    }

    return newState
}

const mapDispatchToProps = dispatch => ({
    next: () => dispatch(ShareActions.nextStep()),
    previous: () => dispatch(ShareActions.previousStep()),
    updateContact: (contact, uid) => dispatch(ContactsActions.updateContact(contact, uid))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareScreen)