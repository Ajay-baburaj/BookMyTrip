export const handleError = (values, setState) => {
    const {
      name,
      email,
      hotelDesc,
      phone,
      city,
      landmark,
      street,
      pincode,
    } = values;
    if (name === "") {
      setState({
        ["nameError"]: "name is required",
      });
      return false;
    }
    if (email === "") {
      setState({
        ["emailError"]: "email is required",
      });
      return false;
    }
    if (phone === "" || phone.length < 10 || phone.length > 10) {
      setState({
        ["phoneError"]: "enter valid phone",
      });
      return false;
    }
    if (street === "") {
      setState({
        ["streetNameError"]: "enter proper street",
      });
      return false;
    }
    if (landmark === "") {
      setState({
        ["landmarkError"]: "enter proper landmark",
      });
      return false;
    }
    if (city === "") {
      setState({
        ["cityError"]: "enter valid city",
      });
      return false;
    }
    if (pincode === "") { 
      setState({
        ["pincodeError"]: "pincode required",
      });
      return false;
    }
    if (pincode.length < 6) {
      setState({
        ["pincodeError"]: "enter valid pincode",
      });
      return false;
    }
    if (hotelDesc === "") {
      setState({
        ["hotelDescError"]: "Need more details",
      });
      return false;
    }
   
  
    return true;
  };
  

  