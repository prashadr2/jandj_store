import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default class Paypal extends Component {
    constructor(props){
        super(props);
        console.log("total:" + this.props.total);
    }

    //WE DO NOT NEED TO PASS A PARAMETER INTO THIS
    //REMOVE THE PARAMETER TEST FOR PRODUCTION
    //THE PARAMETER JUST GETS A CONSOLE.LOG TO WORK ON COMPONENTDIDMOUNT FOR DEBUGGING!!
    cartToItemList = (total) => {
        let rval = [];
        this.props.incartkeys.map(key => (
            rval.push({
                "name": this.props.incart[key].product.name,
                "description": this.props.incart[key].specialinstruction,
                "unit_amount": {"currency_code": "USD", "value": this.props.incart[key].product.price},
                "quantity": this.props.incart[key].amount,
                "category": "PHYSICAL_GOODS"
            })
        ));
        return rval;
    };

    componentDidMount(){
        console.log("mountedlist: " + this.cartToItemList(this.props.total));
    } 

    render(){
        return (
            <PayPalButton
              //amount={this.props.total}
              createOrder={(data,actions) =>{
                  return actions.order.create({
                    "purchase_units": [{
                        "reference_id": 1234,
                        "description": "Attempt n.1 for Quote ID 1234",
                        "amount": {
                            "currency_code": "USD",
                            "value": this.props.total,
                            "breakdown": {"item_total": {"currency_code": "USD", "value": this.props.total,}}
                        }
                    }],
                    "items": this.cartToItemList(this.props.total),
                    "payment_instruction": "testingHEREEEE"
                    //items looks like [{item1},{item2}]
                    //desc could be the special instructions
                    //{item1} = {name: "name", desc: "desc", unit_amount: {currency_code: "USD", value: "price for single product"}, quantity: "num"}
                  });
              }}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                this.props.checkout();
                alert("Transaction completed by " + details.payer.name.given_name + ". Please check your email for confirmation!");
                console.log(details);
                // OPTIONAL: Call your server to save the transaction
            //     return fetch("/paypal-transaction-complete", {
            //       method: "post",
            //       body: JSON.stringify({
            //         orderID: data.orderID
            //       })
            //     });
              }}
              options={{
                  clientId: "sb"
                }}
            />
          );
    }

}