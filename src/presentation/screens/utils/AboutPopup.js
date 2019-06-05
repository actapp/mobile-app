import { alert } from '../../alerts/Alerts'
import { VERSION } from '../../../utils/AppInfo'

export default function showAbout() {
    alert(
        'About',
        'Version: ' + VERSION
    )
}