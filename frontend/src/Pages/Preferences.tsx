import Sidebar from "../Components/Sidebar"
import { PreferencesSelection } from '../Components/PreferencesSelection';
import { OnlySideBar } from '../Components/OnlySideBar';
// import "./Preferences.css";

export function Preferences() {
    return (
        <div id="preferences-main">
            {/* <OnlySideBar/> */}
            <PreferencesSelection/>
        </div>
    )
}