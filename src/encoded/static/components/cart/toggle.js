// Components and functions to modify the cart.
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from './actions';


// Button to add the current object to the cart, or to remove it.
const CartToggleComponent = ({ cart, savedItems, current, onAddToCartClick, onRemoveFromCartClick }) => {
    const checked = cart.indexOf(current) > -1;
    const saved = savedItems.indexOf(current) > -1;
    const onChange = checked ? onRemoveFromCartClick : onAddToCartClick;

    return (
        <div className="cart__toggle">
            <div className="cart__checkbox">
                <input id={current} type="checkbox" checked={checked} onChange={onChange} title={`${checked ? 'Remove item from' : 'Add item to'} cart`} />
                <label htmlFor={current}>
                    <span className="sr-only">{checked ? `Remove ${current} from cart` : `Add ${current} to cart`}</span>
                </label>
            </div>
            {checked !== saved ?
                <div className="cart__saved-status">
                    <i className="icon icon-circle cart__saved-status-icon" title="Unsaved cart item" />
                </div>
            : null}
        </div>
    );
};

CartToggleComponent.propTypes = {
    cart: PropTypes.array, // Current contents of cart
    savedItems: PropTypes.array, // Items already saved to user cart
    current: PropTypes.string.isRequired, // @id of current object being added
    onAddToCartClick: PropTypes.func.isRequired, // Function to call when Add to Cart clicked
    onRemoveFromCartClick: PropTypes.func.isRequired, // Function to call when Remove from Cart clicked
};

CartToggleComponent.defaultProps = {
    cart: [],
    savedItems: [],
};

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart,
    savedItems: state.savedCartObj.items || [],
    current: ownProps.current['@id'],
});

const mapDispatchToProps = (dispatch, ownProps) => (
    {
        onAddToCartClick: () => dispatch(addToCart(ownProps.current['@id'])),
        onRemoveFromCartClick: () => dispatch(removeFromCart(ownProps.current['@id'])),
    }
);

const CartToggle = connect(mapStateToProps, mapDispatchToProps)(CartToggleComponent);

export default CartToggle;
