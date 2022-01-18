// import React, { createContext } from "react";
// export const UserContext = createContext({})
// export const UserLoggedInContext = createContext(false); // These will say weather the user is authorized and authenticated o not uya 3asal
// function Contexts({ children }) {
//   return (
//     <UserContext.Provider>
//       <UserLoggedInContext.Provider value={false}>
//         {children}
//       </UserLoggedInContext.Provider>
//     </UserContext.Provider>
//   );
// }

import React, { Component, createContext } from 'react'
export const Context = createContext({})
export class Contexts extends Component {
    state = {
        user:{},
        setUser:(new_user)=>{
            this.setState({user:new_user})
        },
        userLoggedIn:false,
        setUserLoggedIn:(bool)=>{
            this.setState({userLoggedIn:bool})
        }
    }
    render() {
        return (
            <Context.Provider value={{...this.state}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Contexts


