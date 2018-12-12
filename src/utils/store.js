import {combineReducers, createStore} from 'redux'


export const DESKTOP_MENU_VISIBILITY = 'DESKTOP_MENU_VISIBILITY';
export const desktopMenuVisibilityHandler = isVisible => ({
    type: DESKTOP_MENU_VISIBILITY,
    state: isVisible
});
const desktopMenuVisibility = (state = true, {type, state: isVisible}) =>
    type === DESKTOP_MENU_VISIBILITY ? !!isVisible : state;


export const MOBILE_MENU_VISIBILITY = 'MOBILE_MENU_VISIBILITY';
export const mobileMenuVisibilityHandler = isVisible => ({
    type: MOBILE_MENU_VISIBILITY,
    state: isVisible
});
const mobileMenuVisibility = (state = false, {type, state: isVisible}) =>
    type === MOBILE_MENU_VISIBILITY ? !!isVisible : state;


const reducer = combineReducers({
    desktopMenuVisibility,
    mobileMenuVisibility
});


export default createStore(reducer)
