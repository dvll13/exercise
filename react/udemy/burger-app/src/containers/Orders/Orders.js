import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        //     axios.get('/orders.json')
        //         .then(res => {
        //             console.log('res.data:', res.data);

        //             const fetchedOrders = [];
        //             for (let key in res.data) {
        //                 fetchedOrders.push({
        //                     id: key,
        //                     ...res.data[key]
        //                 })
        //             }
        //             console.log('fetchedOrders:', fetchedOrders);

        //             this.setState({
        //                 orders: fetchedOrders,
        //                 loading: false
        //             });
        //         })
        //         .catch(error => {
        //             this.setState({loading: false});
        //         })

        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            console.log(this.props.orders);
            orders = this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    )
            );
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));