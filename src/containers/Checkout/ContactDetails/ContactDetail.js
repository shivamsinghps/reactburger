  import React, { Component } from 'react'
  import Button from '../../../components/UI/Button/Button'
  import classes from './ContactDetail.module.css'
  import axios from '../../../axios-order'
  import Spinner from '../../../components/UI/Spinner/Spinner'
  import Input from '../../../components/UI/Input/Input';
  import {connect} from 'react-redux'
  import withErrorHandler from '../../withErrorHandle/withErrorHandle'
  import * as orderaction from '../../../store/actions'

  class ContactDetail extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler=(e)=>{
      e.preventDefault()

      this.setState({loading:true})
      const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
      const order ={
        ingredients:this.props.ingredients,
        price:this.props.totalPrice,
        orderData: formData,
		userId:this.props.userId
      }

	  this.props.onOrderBurger(order,this.props.token)
		
    }

    inputChangedHandler = (event, inputIdentifier) => {
            const updatedOrderForm = {
                ...this.state.orderForm
            };
            const updatedFormElement = {
                ...updatedOrderForm[inputIdentifier]
            };
            updatedFormElement.value = event.target.value;
            updatedOrderForm[inputIdentifier] = updatedFormElement;
            this.setState({orderForm: updatedOrderForm});
        }


    render() {
const formElementsArray = [];
for (let key in this.state.orderForm) {
formElementsArray.push({
id: key,
config: this.state.orderForm[key]
});
}

      let form = (
    <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success">ORDER</Button>
    </form>
);
if ( this.props.loading ) {
    form = <Spinner />;
}
      return (
        <div className={classes.ContactDetail}>
          <h5>Enter Your Details</h5>
          {form}
        </div>
      )
    }
  }

  const mapStateToProps = state =>{

	return {
		ingredients:state.burger.ingredients,
		totalPrice:state.burger.totalPrice,
		loading:state.order.loading,
		token:state.auth.token,
		userId:state.auth.userId
		
	}
} 
  const mapDispatchtoProps = dispatch =>{
  return{
	onOrderBurger:(orderData,token)=>{dispatch(orderaction.purchaseburgerinit(orderData,token))}
  }}



  export default connect(mapStateToProps,mapDispatchtoProps)(withErrorHandler(ContactDetail,axios))
