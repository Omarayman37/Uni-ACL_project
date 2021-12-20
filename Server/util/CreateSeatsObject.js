const CreateSeatsObject = (
  number_of_eco_seats,
  number_of_buisness_seats,
  number_of_first_class_seats
) => {
  console.log(
    `${number_of_eco_seats}:ECO, ${number_of_buisness_seats}:Bui, ${number_of_first_class_seats}:First number of seats`
  );
  let seats = {};
  let eco = {};

  for (let index = 1; index <= number_of_eco_seats; index++) {
    eco[`E${index}`] = 'free'
  }
  let bus = {};

  for (let index = 1; index <= number_of_buisness_seats; index++) {
    bus[`B${index}`] = "free";
  }
  let first = {};

  for (let index = 1; index <= number_of_first_class_seats; index++) {
    first[`F${index}`] = "free";
  }

  seats = {
    EconomySeats: eco,
    BusinessSeats: bus,
    FirstClassSeats: first,
  };

  console.log(`create seats object: ${seats}`)
  return seats
};

export default CreateSeatsObject;