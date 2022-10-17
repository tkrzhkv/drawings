import React from "react";
import {Link} from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Cart empty<span>😕</span>
            </h2>
            <p>You still not order any paintings<br/>For order paintings go back to home page
            </p>
            <img
            src="/img/empty-cart.png"
            alt="Empty cart"/>
                <Link className="button button--black"
                   to="/">
                    <span>Back</span>
                </Link>
        </div>
    )
}

export default CartEmpty;