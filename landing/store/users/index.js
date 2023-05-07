import Cookie from 'js-cookie';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// import {auth} from "@/services/firebase";

export const state = () => ({
  user: null,
  snackbar: {
    toggle: false,
    message: ''
  }
});

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account;
  },
  SET_SNACKBAR: (state, render) => {
    state.snackbar = render;
  }
};

export const actions = {
  async login({commit}, account) {
    // await this.$fire.authReady();

    // Login the user
    await this.$fire.auth.signInWithEmailAndPassword(account.email, account.password)
      .then(() => {
        const fireAuth = this.$fire.auth;
        // Get JWT from Firebase
        fireAuth.currentUser.getIdToken().then((token) => {
          const {email, uid} = fireAuth.currentUser;
          // Set JWT to the cookie
          Cookie.set('access_token', token);

          // Set the user locally
          commit('SET_USER', {
            email,
            uid,
          });
        });
      })
      .catch((error) => {
        throw error;
      });
  },

  setSnackbar(context, payload) {
    context.commit('SET_SNACKBAR', payload);
  }
};
