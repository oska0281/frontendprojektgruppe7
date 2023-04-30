import React , { useEffect , useState } from 'react';
import "../styling/Levering.css";

export function Levering () {
    const [ isChecked , setIsChecked ] = useState ( false );
    const [ isFormFilled , setIsFormFilled ] = useState ( false );
    const [ showMessage , setShowMessage ] = useState ( false );
    const [ isCheckedMessage , setIsCheckedMessage ] = useState ( false );
    const [ zipCodeError , setZipCodeError ] = useState ( false );
    const [ isZipCodeValid , setIsZipCodeValid ] = useState ( false );
    const [ city , setCity ] = useState ( '' );
    const [ deliveryAddress , setDeliveryAddress ] = useState ( {
        country : 'Denmark' ,
        zipCode : '' ,
        city : '' ,
        addressLine1 : '' ,
        addressLine2 : '' ,
        name : '' ,
        phone : '' ,
        email : '' ,
        companyName : '' ,
        companyVATNumber : '' ,
    } );

    const handleCheck = () => {
        setIsChecked ( !isChecked );
        setIsCheckedMessage ( false );
    };


    const handleFormChange = async () => {
  const formFields = document.querySelectorAll('input[type="text"]');
  const filledFields = Array.from(formFields).filter(
    (field) => (field as HTMLInputElement).value !== ''
  );
  setIsFormFilled(filledFields.length === formFields.length);
  if (deliveryAddress.zipCode) {
    const isValidZipCode = await validateZipCode(deliveryAddress.zipCode);
    setZipCodeError(!isValidZipCode);
    setIsZipCodeValid(isValidZipCode);
    if (isValidZipCode) {
      setDeliveryAddress((prevState) => ({
        ...prevState,
        city: city,
      }));
    }
  }
};

    const handleButtonClick = async () => {
  if (isFormFilled && isChecked && isZipCodeValid) {
    window.location.href = "/betaling";
  } else {
    setShowMessage(!isFormFilled);
    setIsCheckedMessage(!isChecked);
    if (!isZipCodeValid) {
      setZipCodeError(true);
    }
  }
};



    const validateZipCode = async ( zipCode : string ) : Promise<boolean> => {
        if ( !zipCode ) {
            return false;
        }

        const response = await fetch ( `https://api.dataforsyningen.dk/postnumre/${ zipCode }` );
        const data = await response.json ();

        if ( response.ok && data && data.nr === zipCode ) {
            setCity ( data.navn );
            return true;
        } else {
            setCity ( '' );
            return false;
        }
    };

   useEffect(() => {
  setDeliveryAddress((prevState) => ({ ...prevState, city: city }));
}, [city, setDeliveryAddress]);

    const handleZipCodeChange = async ( e : React.ChangeEvent<HTMLInputElement> ) => {
        setDeliveryAddress ( ( prevState ) => ( { ... prevState , zipCode : e.target.value } ) );

        const isValidZipCode = await validateZipCode ( e.target.value );
        setZipCodeError ( !isValidZipCode );
        setIsZipCodeValid ( isValidZipCode );

    };
     return (
    <form onChange={handleFormChange} onSubmit={(event) => event.preventDefault()}>
      <h1 className="titel">Levering</h1>
      <div>
        <label>Navn:</label>
        <input className="inputfelt" type="text" required />
      </div>

      <div>
        <label>Email:</label>
        <input className="inputfelt" type="text" required />
      </div>

      <div>
        <label>Telefonnummer:</label>
        <input className="inputfelt" type="text" required />
      </div>

      <div>
        <label>Adresse:</label>
        <input className="inputfelt" type="text" required />
      </div>
      <div>
        <label>Postnummer:</label>
        <input id="zipcode" className="inputfelt" type="text" name="zipcode" required
                           onChange={ handleZipCodeChange }/>
      </div>
{ zipCodeError && <span className="error">Ugyldigt postnummer</span> }
      <div>
                <label>By:</label>
                <input className="inputfelt" type="text" value={ city } readOnly/>
            </div>

      <div>
        <label>Land:</label>
        <input className="inputfelt" type="text" required />
      </div>

      {showMessage && <div className="message">Udfyld venligst alle felterne</div>}

      <div>
        <input className="inputbox" type="checkbox" onChange={handleCheck} />
        <text>Jeg bekræfter at have læst og accepteret købsbetingelserne</text>
      </div>

      { isCheckedMessage && (
                <div className="message">Accepter venligst købsbetingelserne</div>
            ) }
      <div>
        <input className="inputbox" type="checkbox" />
        <text>Jeg ønsker at modtage fremtidige mails med tilbud</text>
      </div>

      <button className="til-betaling-btn" disabled={!isFormFilled && !isZipCodeValid} onClick={handleButtonClick}>
        Til Betaling
      </button>
    </form>
  );
}

