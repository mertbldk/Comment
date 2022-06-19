<template>
  <div id="CommentPageContainer">
    <div id="Users">
      <User v-for="(item, index) in users" :key="index" :item="item" />
    </div>
    <div id="MakeGeneralComment">
      <div id="MGCTexarea">
        <textarea @keyup.enter="MGCButton" id="MGCTexareaText"></textarea>
      </div>
      <button @click="MGCButton" id="MGCButton">To Comment</button>
    </div>
    <div id="AllComments">
      <div v-if="comments == ''" id="noComment">No comment!</div>
      <Comment
        v-for="(item, index) in comments"
        :key="index"
        :item="item"
        :index="index"
        :TheRestComStore="TheRestComStore"
      />
      <button @click="TheRestCom" v-if="comments.length > 5" id="TheRestCom">
        {{ TheRestComLength }}
      </button>
    </div>
  </div>
</template>

<script>
import User from "../components/User.vue";
import Comment from "../components/Comment.vue";
import axios from "axios";

export default {
  components: {
    User,
    Comment,
  },
  data() {
    return {
      localhost: "http://localhost:3000",
      users: "",
      comments: "",
      userActive: localStorage.getItem("userActive"),
      TheRestComStore: 5,
    };
  },
  methods: {
    MGCButton() {
      let MGCTexareaText = document.getElementById("MGCTexareaText");

      if (this.userActive == "" || this.userActive == null)
        alert("You need to login.");
      else {
        if (MGCTexareaText.value != "") {
          axios
            .post(`${this.localhost}/comments`, {
              userId: this.userActive,
              comment: document.querySelector("textarea").value,
              date: new Date(),
              like: [],
              disklike: [],
              CommentToComment: [],
            })
            .then(() => this.$router.go("CommentPage"));
        } else alert("Please enter value.");
      }
    },
    TheRestCom() {
      this.TheRestComStore =
        this.TheRestComStore >= this.comments.length
          ? 5
          : this.TheRestComStore + 5;
    },
  },
  computed: {
    TheRestComLength() {
      return this.comments.length - this.TheRestComStore <= 0
        ? "Turn off all comments"
        : `see the remaining ${
            this.comments.length - this.TheRestComStore
          } comments`;
    },
  },
  created() {
    axios.get(`${this.localhost}/user`).then((response) => {
      this.users = response.data;
    });

    axios.get(`${this.localhost}/comments`).then((response) => {
      this.comments = response.data.reverse();
    });
  },
};
</script>
