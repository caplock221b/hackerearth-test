import React from 'react'

const OrderTotal = ({ summary }) => {
    return (
        <div className="order-total">
            <p>Total</p>
            <div>
                <span>{ `Items (${ summary.totalItems })` }</span>
                <span>{ `: $${summary.totalAmount}` }</span>
            </div>
            <div>
                <span>Discount</span>
                <span>{ `: - $${summary.discount}` }</span>
            </div>
            <div>
                <span>Type Discount</span>
                <span>{ `: - $${summary.typeDiscount}` }</span>
            </div>
            <div>
                <span>Order Total</span>
                <span>{ `: $${summary.totalAmount - summary.discount - summary.typeDiscount}` }</span>
            </div>
        </div>
    )
}

export default OrderTotal
