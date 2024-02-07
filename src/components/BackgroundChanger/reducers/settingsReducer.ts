const defaultState = {
    background_color_theme: 'menu-content-leaves',
    site_theme: 'dark',
};

export const settingsReducer = (state = defaultState, action: any) => {
    switch(action.type) {
    case 'SET_BACKGROUND_COLOR_THEME': 
        return { ...state, background_color_theme: action.payload };
    case 'SET_SITE_THEME': 
        return { ...state, site_theme: action.payload };
    default:
        return state;
    }
};