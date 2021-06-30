import Vue from 'vue'

export const state = () => {
  return {
    messages: [],
    contactFormFocus: false,
  }
}

export const mutations = {
  addMessage(state, message) {
    const messages = state.messages
    messages.push(message)
    Vue.set(state, 'messages', messages)
  },
  focus(state, popup) {
    Vue.set(state, 'contactFormFocus', popup)
  },
}
