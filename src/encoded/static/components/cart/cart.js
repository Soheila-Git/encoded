// Components for rendering the /carts/ page.
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Panel, PanelBody } from '../../libs/bootstrap/panel';
import CartSave from './cart_save';
import { FetchedData, Param } from '../fetched';
import { contentViews, itemClass, encodedURIComponent } from '../globals';
import { ResultTableList } from '../search';


// Called from <FetcheData> to render search results for all items in the current cart.
const CartSearchResults = ({ results }) => (
    <Panel>
        <PanelBody addClasses="cart__result-table">
            <ResultTableList results={results['@graph']} columns={results.columns} />
        </PanelBody>
    </Panel>
);

CartSearchResults.propTypes = {
    results: PropTypes.object, // encode search results
};

CartSearchResults.defaultProps = {
    results: null,
};


// Renders the cart search results page.
const CartComponent = ({ context, cart, session }) => {
    // Combine in-memory and DB carts. We can have in-memory carts with different contents from
    // the DB cart, so have to consider both.
    if ((context.items && context.items.length > 0) || cart.length > 0) {
        const combinedCarts = _.uniq(cart.concat(context.items || []));
        const cartQueryString = combinedCarts.map(cartItem => `${encodedURIComponent('@id')}=${encodedURIComponent(cartItem)}`).join('&');
        const loggedIn = !!(session && session['auth.userid']);

        return (
            <div className={itemClass(context, 'view-item')}>
                <header className="row">
                    <div className="col-sm-12">
                        <h2>Cart</h2>
                    </div>
                </header>
                {loggedIn ? <CartSave /> : null}
                <FetchedData>
                    <Param name="results" url={`/search/?type=Experiment&${cartQueryString}`} />
                    <CartSearchResults />
                </FetchedData>
            </div>
        );
    }
    return null;
};

CartComponent.propTypes = {
    context: PropTypes.object.isRequired, // Cart object to display
    cart: PropTypes.array.isRequired, // In-memory cart contents
    session: PropTypes.object, // App session object
};

CartComponent.defaultProps = {
    session: null,
};

const mapStateToProps = (state, ownProps) => ({
    cart: state.cart,
    session: ownProps.session,
});
const CartInternal = connect(mapStateToProps)(CartComponent);


// Called when a "Cart" object is requested to be rendered. This is a standard React component
// that's sort of a wrapper around <CartInternal> which is a Redux component. This lets us pass the
// encoded context properties as regular props to <CartIntenral>. Passing React context directly to
// a Redux component doesn't seem very reliable.
const Cart = (props, reactContext) => (
    <CartInternal context={props.context} session={reactContext.session} />
);

Cart.propTypes = {
    context: PropTypes.object.isRequired, // Cart object to render
};

Cart.contextTypes = {
    session: PropTypes.object,
};

// Respond to both the 'carts' object for /carts/ URI, and 'Cart' for /carts/<uuid> URI.
contentViews.register(Cart, 'carts');
contentViews.register(Cart, 'Cart');
