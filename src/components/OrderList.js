import React from 'react'

const OrderList = ({ store, summary, addItem, removeItem, deleteItem }) => {
    return (
        <div className="order-list">
            <div className="title">Order Summary</div>
            <div className="list-container">
                <div className="list-container-head">
                    <div>{ `Items (${summary.totalItems})` }</div>
                    <div>Qty</div>
                    <div>Price</div>
                </div>
                <div className="list-container-body">
                    {
                        store.map(item => (
                            <div key={item.id} className="list-item">
                                <div>
                                    <img src={item.img_url} alt="Placeholder" />
                                    <p>{ item.name }</p>
                                    <button onClick={() => deleteItem(item.id)}>x</button>
                                </div>
                                <div>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        disabled={item.amount === 1}
                                    >-</button>
                                    <div>{ item.amount }</div>
                                    <button onClick={() => addItem(item.id)}>+</button>
                                </div>
                                <div>${ item.price }</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderList