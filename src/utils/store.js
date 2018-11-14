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


//export const SCROLLING = 'SCROLLING';
//export const scrollingHandler = isScrolling => ({
//    type: SCROLLING,
//    state: isScrolling
//});
//const isScrolling = (state = true, {type, state: isScrolling}) =>
//    type === SCROLLING ? !!isScrolling : state;


export const HEADER_VISIBILITY = 'HEADER_VISIBILITY';
export const headerVisibilityHandler = isHidden => ({
    type: HEADER_VISIBILITY,
    state: isHidden
})
const headerVisibility = (state = false, {type, state: isHidden}) =>
    type === HEADER_VISIBILITY ? !!isHidden : state;


const reducer = combineReducers({
    desktopMenuVisibility,
    mobileMenuVisibility,
    headerVisibility,

    //isScrolling,
});


export default createStore(reducer)
