import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        // in a real env calculations should be done on the server so that they cannot be manipulated
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Customer One',
                address: {
                    street: 'Street One',
                    zipCode: '1234',
                    country: 'Bulgaria'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        };

        // axios.post('/orders.json1', order)
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                console.log('RESPONSE:', response);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log('ERROR:', error);
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code" />
                <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;