<template>
  <div class="chat">
    <div v-if="isOpen" class="chat-container">
      <div id="chat-window" ref="chatWindow" class="chat-window">
        <div
          v-for="(message, messageIndex) of chatList"
          :key="`message-${messageIndex}`"
          class="message"
          :class="{ sender: message.sender }"
        >
          <div class="message-content" :class="{ sender: message.sender }">
            {{ message.content }}
          </div>
        </div>
      </div>
      <input
        v-model="messageToSend"
        class="message-to-send"
        type="text"
        @keypress.enter="sendMessage"
      />
    </div>
    <div class="button" @click="isOpen = !isOpen">
      <img src="https://img.icons8.com/ios-filled/452/chat--v1.png" alt="Chat Logo" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      messageToSend: '',
      isOpen: false,
    }
  },
  watch: {
    // whatch the list, once changed:
    '$store.state.messages'() {
      if (this.$refs.chatWindow) {
        // if is defined the ref chatWindow
        // then scroll to the last element child of the window
        this.$refs.chatWindow.lastElementChild.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        })
        // then do it again when receive the response about 500 ms later in the worst case
        setTimeout(() => {
          this.$refs.chatWindow.lastElementChild.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          })
        }, 500)
      }
    },
  },
  methods: {
    sendMessage() {
      const { WebSocketEventBus } = require('mmcc/WebSocketEventBus')
      this.$store.commit('addMessage', {
        sender: false,
        content: this.messageToSend,
      })
      const packet = {
        message: { type: 'data', payload: { data: this.messageToSend } },
        configurationId: process.env.configurationId,
      }
      WebSocketEventBus.$emit('send', packet)
      this.messageToSend = ''
    },
  },
}
</script>

<style scoped>
.button {
  height: 60px;
  width: 60px;
  border: 1px solid black;
  border-radius: 100%;
  padding: 10px;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: orange;
  z-index: 1000002;
}
.button img {
  width: 100%;
}
.chat-container {
  background-image: linear-gradient(180deg, #f7f8fc 0%, #e9e9f4 100%);
  position: fixed;
  border: 1px solid black;
  border-radius: 4px;
  height: 500px;
  width: 300px;
  bottom: 80px;
  right: 0px;
  z-index: 1000002;
}
.chat-window {
  overflow-y: scroll;
  height: calc(100% - 50px);
}
.message {
  width: calc(100% - 8px);
  display: flex;
  justify-content: flex-end;
}
.message.sender {
  justify-content: flex-start;
}
.message-content {
  padding: 5px 10px;
  margin: 4px;
  width: auto;
  background: #f3f3f3;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
}
.message-to-send {
  margin: 0.5rem;
  width: 90%;
  border-radius: 17rem;
  padding: 0.5rem;
  bottom: 0;
}
.message-content.sender {
  background: black;
  color: white;
  border: 1px solid black;
}
input {
  width: 100%;
  position: absolute;
  z-index: 20;
}
</style>
