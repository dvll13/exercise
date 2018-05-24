import React, {Component} from 'react';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log('res.data:', res.data);
                
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    })
                }
                console.log('fetchedOrders:', fetchedOrders);
                
                this.setState({
                    orders: fetchedOrders,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                {console.log(this.state.orders)}
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);