<template>
  <div id="userCap">
    <div id="userImg">
      <img :src="item.img" />
    </div>
    <div id="userNameQuit">
      <div id="userName">{{ item.name }}</div>
      <button
        @click="userConnect"
        v-if="!userActive"
        class="userCQ"
        id="userConnect"
      >
        Connect
      </button>
      <button @click="userQuit" v-else class="userCQ" id="userQuit">
        Quit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      userActive:
        JSON.parse(localStorage.getItem("userActive")) == this.item.userId,
    };
  },
  methods: {
    userConnect() {
      localStorage.setItem("userActive", this.item.userId);
      this.$router.go("CommentPage");
    },
    userQuit() {
      localStorage.removeItem("userActive");
      this.$router.go("CommentPage");
    },
  },
};
</script>
