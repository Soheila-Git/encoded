// This file lets other files import this directory to get the cart reducer function and any cart-
// related rendering components.
import _ from 'underscore';
import { ADD_TO_CART, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, REMOVE_MULTIPLE_FROM_CART } from './actions';
import CartAddMultiple from './cart_add_multiple';
import CartControl, { cartAddItems } from './cart_control';
import CartRemoveMultiple from './cart_remove_multiple';
import CartShare from './cart_share';
import CartStatus from './cart_status';
import CartToggle from './cart_toggle';


/**
 * Redux reducer function for the cart module.
 *
 * @param {object} state - Redux store state
 * @param {object} action - Action to perform on the cart store
 */
const cartModule = (state = {}, action = {}) => {
    switch (action.type) {
    case ADD_TO_CART:
        return { cart: state.cart.concat([action.current]) };
    case ADD_MULTIPLE_TO_CART: {
        // Merge the current cart contents with the incoming items while deduping them.
        const items = [...new Set([...state.cart, ...action.items])];
        return { cart: items };
    }
    case REMOVE_FROM_CART: {
        const doomedIndex = state.cart.indexOf(action.current);
        if (doomedIndex !== -1) {
            return {
                cart: state.cart
                    .slice(0, doomedIndex)
                    .concat(state.cart.slice(doomedIndex + 1)),
            };
        }
        return state;
    }
    case REMOVE_MULTIPLE_FROM_CART:
        return { cart: _.difference(state.cart, action.items) };
    default:
        return state;
    }
};


export {
    CartAddMultiple,
    CartRemoveMultiple,
    CartControl,
    CartStatus,
    CartToggle,
    cartAddItems,
    CartShare,
    cartModule as default,
};