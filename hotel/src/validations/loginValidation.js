export  const handleError = (values,setState) => {
    const { email, password } = values

    if (email === "") {
        setState({
        ["emailError"]: "email is required"
      })
      return false;
    }
    if (password === "") {
        setState({
        ["passwordError"]: "password is required"
      })
      return false;
    }
    return true;
  }


 export  const emailValidation = (email,setState) => {
    if (email === "") {
        setState({
        ["emailError"]: "email is required"
      })
      return false;
    }
    return true;
  }