const defaultState = {
    background_page_theme: 'page-content-leaves',
    site_theme: 'dark',
};

export const settingsReducer = (state = defaultState, action: { type: string, payload: any}) => {
    switch(action.type) {
    case 'SET_BACKGROUND_PAGE_THEME': 
        return { ...state, background_page_theme: action.payload };
    case 'SET_SITE_THEME': 
        return { ...state, site_theme: action.payload };
    default:
        return state;
    }
};