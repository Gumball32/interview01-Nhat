import React, { Fragment, useState } from "react";

const BasicForm = props => {
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
    const [enteredAccessCode, setEnteredAccessCode] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [validate, setValidate] = useState(false);
    const [showSecondForm, setShowSecondForm] = useState(false);

    const phoneNumberHandler = event => {
        setEnteredPhoneNumber(event.target.value);
    }

    const accessCodeHandler = event => {
        setEnteredAccessCode(event.target.value);
    }

    const phoneNumberSubmitHandler = event => {
        event.preventDefault();

        if (enteredPhoneNumber == '') {
            return;
        }

        const accessNumbers = CreateNewAccessCode(enteredPhoneNumber);
        const contact = {
            phoneNumber: enteredPhoneNumber,
            code: accessNumbers
        };
        addContactHandler(contact);
        setAccessCode(accessNumbers);
        setValidate(false);
        setShowSecondForm(true);
    }

    const accessCodeSubmitHandler = event => {
        event.preventDefault();
        if (accessCode == enteredAccessCode) {
            setValidate(true);
            setEnteredAccessCode('')
            return true;
        }
        return false;
    }

    function CreateNewAccessCode(number) {
        const digits = Math.floor(Math.random() * 900000) + 100000;
        fetch(`http://localhost:4000/send-phone?accessCode=${digits}&phonenumber=${number}`)
        .catch(err => console.log('error'))
        return digits;
    }

    async function addContactHandler(contact) {
        const response = await fetch('https://project010132-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json', {
          method: 'POST',
          body: JSON.stringify(contact),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
      }

    return (
        <Fragment>
            <form onSubmit={phoneNumberSubmitHandler}>
                <div className="control-group">
                    <div className='input-group'>
                        <label htmlFor="phone">Enter phone number</label>
                        <input type='text' id='phone' onChange={phoneNumberHandler}></input>
                    </div>
                </div>
                <button>Submit Phone Number</button>
            </form>
            {showSecondForm &&
            <form onSubmit={accessCodeSubmitHandler}>
                <div className="control-group">
                        <div className='input-group'>
                            <label htmlFor="otp">OTP</label>
                            <input type='text' id='otp' onChange={accessCodeHandler} value={enteredAccessCode}></input>
                            {validate ? <p>Correct!</p> : <p>Enter the correct code</p>}
                        </div>
                        <button>Check OTP</button>
                </div>
            </form>
            }
            
        </Fragment>
    )
}

export default BasicForm;