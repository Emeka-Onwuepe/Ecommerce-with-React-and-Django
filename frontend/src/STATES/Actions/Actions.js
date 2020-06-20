import axios from 'axios';
import {
    createContext,
    useReducer
} from 'react/cjs/react.development';
import React, {
    useEffect
} from 'react';


//Action Types
export const GET_STORE = "GET_STORE";
export const GET_ORDERED_PRODUCTS = "GET_ORDERED_PRODUCTS"
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const ADD_ERROR = "ADD_ERROR";
export const ADD_SEARCH = "ADD_SEARCH";
export const DELETE_SEARCH = "DELETE_SEARCH";
export const GET_CATEGORY = "GET_CATEGORY";
export const GET_BRAND = "GET_BRAND";
export const REGISTERUSER = "REGISTERUSER";
export const GET_ALL = "GET_ALL";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const PROCESS_ORDER = "PROCESS_ORDER";
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const DELETE_USER = "DELETE_USER";
export const DELETE_MESSAGES = "DELETE_MESSAGES";
export const SEND_MAIL = "SEND_MAIL";
export const SET_SCREEN_SIZE = "SET_SCREEN_SIZE"


//Capitalise first word
const sentenceCase = (data) => {
    let firstWord = data.slice(0, 1).toUpperCase()
    let rest = data.slice(1).toLowerCase()
    return `${firstWord}${rest}`
}

//stort func
const sort = (data) => {
        const stored = []
        let presort = {}
        data.categories.forEach(x => {
            presort.id = x.id
            presort.name = sentenceCase(x.name)
            const product = data.products.filter((y) => {
                return x.id == y.category
            })
            presort.products = product
            if (presort.products.length > 0) {
                stored.push(presort)
            }
            presort = {}
        })
        return stored
    }
    //Actions dispatchers
export const getstore = () => {
    return axios.get('/api/products').then(res => {
        let data = sort(res.data)
        return {
            type: GET_STORE,
            data: data,
            prices: res.data.prices
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: err.response.data,
            status: err.response.status
        }
    })
}
export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        data: data
    }
}
export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}
export const UpdateCart = (data) => {
    return {
        type: UPDATE_CART,
        data: data
    }
}
export const addSearch = (data) => {
    return {
        type: ADD_SEARCH,
        data: data
    }
}

export const getCategory = (data, type) => {
    return axios.post('/api/products', data).then(res => {

        return {
            type: type,
            data: res.data,
            prices: res.data.prices,
            messages: "Logged In Successfully"
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: err.response.data,
            status: err.response.status
        }

    })
}
export const RegisterUser = (data, config) => {
    return axios.post('/api/register', data, config).then(res => {
        return {
            type: REGISTERUSER,
            data: res.data,
            messages: "Registered Successfully",
            check: true
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: {
                "regError": err.response.data
            },
            status: err.response.status
        }

    })
}
export const processOrder = (data, config) => {
    return axios.post('/api/orderview', data, config).then(res => {
        return {
            type: PROCESS_ORDER,
            data: res.data,
            messages: "Order Placed Successfully",
            success: true,
            cart: [],
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: err.response.data,
            status: err.response.status
        }

    })
}

export const load = (type) => {
    return {
        type: type
    }
}

export const LoginUser = (data, config) => {
    return axios.post('/api/login', data, config).then(res => {

        return {
            type: LOGIN,
            data: res.data,
            messages: "Logged In Successfully"
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: err.response.data,
            status: err.response.status,
        }
    })
}

export const LogOut = (data, config) => {
    return axios.post('/api/logout', null, config).then(res => {

        return {
            type: LOGOUT,
            messages: "Logged Out"
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: err.response.data,
            status: err.response.status
        }

    })
}

export const sendMail = (data, config) => {
    return axios.post('/api/ContactUS', data, config).then(res => {

        return {
            type: SEND_MAIL,
            messages: res.data.message
        }
    }).catch(err => {
        return {
            type: ADD_ERROR,
            data: err.response.data,
            status: err.response.status,
        }
    })
}


//Reducer
const storeReducer = (state, action) => {
    switch (action.type) {
        case GET_STORE:
            return {
                ...state,
                store: action.data,
                prices: action.prices,
                loading: false,
            }
        case PROCESS_ORDER:
            return {
                ...state,
                Ordered: [...state.Ordered, action.data.Ordered],
                messages: action.messages,
                success: action.success,
                cart: action.cart,
                loading: false,
            }
        case CLEAR_SUCCESS:
            return {
                ...state,
                success: false,
                loading: false,
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.data],
                loading: false,
            }
        case UPDATE_CART:
            return {
                ...state,
                cart: [...action.data],
                loading: false,
            }
        case GET_CATEGORY:
            return {
                ...state,
                category: action.data,
                prices: action.prices,
                loading: false,
            }
        case GET_BRAND:
            return {
                ...state,
                brand: action.data,
                prices: action.prices,
                loading: false,
            }
        case GET_ORDERED_PRODUCTS:
            return {
                ...state,
                OrderedProduct: action.data,
                loading: false,
            }
        case GET_ALL:
            return {
                ...state,
                searchstore: action.data,
                prices: action.prices,
                loading: false,
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case LOADED:
            return {
                ...state,
                loading: false,
            }
        case ADD_SEARCH:
            return {
                ...state,
                searchResult: action.data,
                loading: false,
            }
        case DELETE_SEARCH:
            return {
                ...state,
                searchResult: '',
                loading: false,
            }
        case REGISTERUSER:
            return {
                ...state,
                User: action.data,
                messages: action.messages,
                check: action.check,
                loading: false,
            }

        case LOGIN:
            return {
                ...state,
                User: {
                    user: action.data.user,
                    token: action.data.token,
                },
                messages: action.messages,
                Ordered: action.data.ordered,
                loading: false,

            }
        case LOGOUT:
        case DELETE_USER:
            return {
                ...state,
                User: "",
                messages: "",
                stores: "",
                Ordered: "",
                OrderedProduct: "",
                loading: false,
            }
        case ADD_ERROR:
            return {
                ...state,
                message: action.data,
                status: action.status,
                loading: false,
            }
        case DELETE_MESSAGES:
            return {
                ...state,
                message: "",
                status: "",
                messages: ""
            }
        case SEND_MAIL:
            return {
                ...state,
                messages: action.messages,
                loading: false,
            }
        case SET_SCREEN_SIZE:
            return {
                ...state,
                screenWidth: action.width,
                scrow: action.scrow,
            }

        default:
            return {
                ...state
            }
    }
}


//build stateProvider

export const storeContext = createContext()
const initialState = {
    cart: []
}

const StoreContextProvider = (props) => {
        const [storestate, storedispatch] = useReducer(storeReducer, initialState,
            () => {
                const localdata = localStorage.getItem("storestate");
                let finaldata = ""
                if (localdata) {
                    const jsonify = JSON.parse(localdata)
                    finaldata = {
                        User: "",
                        Ordered: [],
                        OrderedProduct: [],
                        loading: true,
                        cart: [],
                        scrow: window.pageYOffset,
                        width: window.innerWidth,
                        prices: [],
                        store: [],
                        ...jsonify,
                        message: "",
                        status: "",
                        messages: "",
                        check: "",
                    }
                } else {
                    finaldata = {
                        User: "",
                        Ordered: [],
                        OrderedProduct: [],
                        loading: true,
                        cart: [],
                        scrow: window.pageYOffset,
                        width: window.innerWidth,
                        prices: [],
                        store: [],
                        message: "",
                        status: "",
                        messages: "",
                        check: "",
                    }
                }
                return finaldata
            }
        )
        useEffect(() => {
            localStorage.setItem("storestate", JSON.stringify(storestate))
        }, [storestate]);

        useEffect(() => {
            const onresizer = () => {
                storedispatch({
                    type: SET_SCREEN_SIZE,
                    width: window.innerWidth,
                    scrow: window.pageYOffset
                })
            }
            window.addEventListener('resize', onresizer)
            window.addEventListener('scroll', onresizer)

            return () => {

            };
        }, [])

        return ( < storeContext.Provider value = {
                {
                    storestate,
                    storedispatch
                }
            } > {
                props.children
            } < /storeContext.Provider>);
        }


        export default StoreContextProvider;