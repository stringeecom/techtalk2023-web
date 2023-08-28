import {createStore} from 'vuex'
import {CALL_OUT} from "@src/constants/call_direction";

const store = createStore({
    state() {
        return {
            count: 0,
            isAuthenticated: false,
            user: "",
            // for chat
            conversation: null,
            conversations_list: [],

            is_searching: false,
            messages: [],

            // edit message
            editing: -1,
            message_edit: {},

            // call
            call: {
                call_id: "",
                conversation: {},
                direction: CALL_OUT,
                text: "Connecting ..."
            },
            call_timer: false

        }

    },
    mutations: {

        // call
        increment(state) {
            state.count++
        },
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isAuthenticated = false
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    getters: {
        getCount: state => state.count,
        isLoggedIn: state => {
            console.log("state.isAuthenticated: " + state.isAuthenticated)
            return state.isAuthenticated
        },
        getUser: state => state.user,
        getAccountName: (state) => {
            try {
                let uVar = state.user;
                if (uVar === undefined || uVar === null || uVar.length === 0) {
                    uVar = localStorage.getItem("user");
                }
                let u = JSON.parse(uVar);
                return u.full_name + " (" + u.email + ")";
            } catch (e) {
                console.error(e)
                return "Unknown"
            }
        }
    }
})

export default store
