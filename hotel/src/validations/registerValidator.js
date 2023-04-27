export const handleError = (values, setState) => {
    const {
      name,
      email,
      password,
      phone,
      city,
      landmark,
      streetName,
      confirmPassword,
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
    if (streetName === "") {
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
    if (password === "") {
      setState({
        ["passwordError"]: "password is required",
      });
      return false;
    }
    if (confirmPassword === "" || confirmPassword !== password) { 
      setState({
        ["confirmPasswordError"]: "password and confirm password must be same",
      });
      return false;
    }
  
    return true;
  };
  
  export const emailValidation = (email, setState) => {
    if (email === "") {
      setState({
        ["emailError"]: "email is required",
      });
      return false;
    }
    return true;
  };
  