
export const handleError = (values, setState) => {
 const {roomType,roomDesc,numberOfRooms,price,amenities} = values;
 if (roomType === "") {
    setState({
      ["roomTypeError"]: "Room Type is required",
    });
    return false;
  }
  if (roomDesc === "") {
    setState({
      ["roomDescError"]: "Room Description is required",
    });
    return false;
  }
  if (numberOfRooms ==="") {
    setState({
      ["numberOfRoomsError"]: "Enter Number of Rooms available",
    });
    return false;
  }
  if (price === "") {
    setState({
      ["priceError"]: "Price required"
    });
    return false;
  }
  if(amenities === ""){
    setState({
        ["AmenitiesError"]:"Amenities required"
    })
    return false;
    }
 
  return true;

}

