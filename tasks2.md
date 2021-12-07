> **_NOTE:_** EVERYTHING is useing antd and primary and secondary collors mafeesh faty fe el UI 5od el 7aga gahza men antd.


1. create nav bar always there 
* should have a favorited page where all of my favorited flights are stored
2. create a card for a flight containg all ifo of a flight and expands to show everything this will save us a lot as it will be used in both the choosen flights and the normal flights 
* has a heart to favorite a flight :: this acts as the whole choosen flights see in the requirements
* flight number
* depar. time
* arrival time 
* trip duration
* cabin class
* baggage allowance 
* price


3. create search card at the top that will have 
* from to 
* price 
* departure time date
* arrival time date 
* duration = programaticalyy departure time - arrival time
* also a view seats that will open a list of booked seats and an input place to choose a seat by writing it's number
* a button that will be named book return flights that will simply switch from <-> to and will put departure time as the next day after arrival time .... no need for complicated logic i think 

4. favorited page where all of our flights are with a reserve button that shows a pop up screen to confirm
* 

5. A your flights page 
* has all reserved flights with a cancel button gives pop up bardo we keda

--- back end
6. send mail to specific email confirming their cancelation
7. update funciton that will update the values of a user 
8. search method with criteria tha will take an object like this 

```js
querry = {
    deparutre_time: new Date(year, month, day, hours, minutes, seconds, milliseconds);
    arrival_time: new Date(year, month, day, hours, minutes, seconds, milliseconds);
    trip_duration: number // in hours
    price: number // in dollars 
    from: string // location name
    to: string // location name
}
```
* if any of the fields is null then the object should assume anything is accepted like if departure_time = null and price = 150 then all flights less than 150 are shown

9. backend to keep user logged in like so that we can always access user objet with all of his details

10. new collection favorited_list where key is user_id and info is all the ID of the favorited flights
* backend get request to give a user id and get all flights favorited info not just the ID
11. new collection reserved_list where key is user_id and info is all the ID of the reserved flights
* backend get request to give a user id and get all flights reserved info not just the ID

12. post request to edit a flight given 
```js
querry = {
    id: //ID of flights from monggose,
    [any parameter like seat_number] : new_value
}
```

13. all flights should have availble seats and taken seats 
* all flights have a seat number from 1 to seat_number when a flight is created so flight with 20 seats has availible_Seats={1, 2, 3 ... 20} and reserved_seats = {}
* post method that given 
```js
querry={
    id: //id flight from moongoose
    seat: int // seat number
    reserve: true
}
```
takes this seat and removes it from availiable to reserved or if reserved is false then serverd-> availible in case someone cancells

