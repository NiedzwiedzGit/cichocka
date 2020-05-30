import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.ADD_INGREDIENT: return addIngridient(state, action);
        // case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        // 
        default: return state;
    }
};

export default reducer;