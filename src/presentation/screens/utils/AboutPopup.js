import { alert } from '../../alerts/Alerts'
import { VERSION } from '../../../utils/AppInfo'

export function showAbout() {
    alert(
        'About',
        'Version: ' + VERSION
    )
}