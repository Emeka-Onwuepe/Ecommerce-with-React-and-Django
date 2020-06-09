import React, { useEffect, Fragment, useContext } from 'react';
import { useAlert } from 'react-alert'
import { storeContext, DELETE_MESSAGES, deleteUser, DELETE_USER } from "../STATES/Actions/Actions";



const Alerts = () => {
    const alert = useAlert()
    const { storestate, storedispatch } = useContext(storeContext);
    const { message, messages, status } = storestate
    const style = { color: "white", wordSpacing: 4, letterSpacing: 0.5, fontSize: "16px", textAlign: "center" }
    useEffect(() => {
        if (message != '' && message != undefined) {
            if (message.detail == "Invalid token.") {
                storedispatch(deleteUser())
            }
            for (let key in message) {
                if (key == 'non_field_errors') {
                    alert.error(<div style={style}>{message[key].join("")}</div>)
                }
                if (key == "passwordError") {
                    alert.error(<div style={style}>{message[key]}</div>)
                }
                if (key == "regError") {
                    for (let index in message[key]) {
                        if (index == "email") {
                            alert.error(<div style={style}>{message[key][index].join("")}</div>)
                        } else {
                            alert.error(<div style={style}>{`${index}: ${message[key][index].join("")}`}</div>)
                        }
                    }
                }
            }
            storedispatch({ type: DELETE_MESSAGES })
        }
        if (messages != "" && messages != undefined) {
            alert.success(<div style={style}>{messages}</div>)
            storedispatch({ type: DELETE_MESSAGES })
        }
    }, [storestate]);


    return (
        <Fragment>
        </Fragment>
    );
}


export default Alerts;


 // if (status != "") {
        //     alert.error(message.detail)
        //     for (let key in message) {
        //         // alert.error(message)
        //         console.log(message)
        //         if (key == 'detail') {
        //             alert.error(message[key])
        //         } else {
        //             // console.log(message)
        //             alert.error(message[key].join(""))
        //             //alert.error(message[key])
        //         }
        //     }
        // }
        // if (messages != "" && messages != undefined) {
        //     // console.log(messages)
        //     //alert.success(messages)
        //     storedispatch({ type: DELETE_MESSAGES })
        // }
