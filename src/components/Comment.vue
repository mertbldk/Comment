<template>
  <div v-if="index < TheRestComStore" id="commentCap">
    <div id="commentİmgNameDate">
      <div id="commentİmgName">
        <div id="commentİmg">
          <img :src="user.img" />
        </div>
        <div id="commentName">{{ user.name }}</div>
      </div>
      <div id="commentDate">
        {{ date.getDate }}.{{ date.getMonth }}.{{ date.getFullYear }}
      </div>
      <button
        v-if="userActive == propsİtem.userId"
        @click="commentDelet"
        id="commentDelet"
      >
        X
      </button>
    </div>
    <div id="commentText">
      <p>{{ propsİtem.comment }}</p>
    </div>
    <div id="commentLikeDisklikeTocomment">
      <div class="commentLDTC">
        <span @click="commentCom" class="commentCom"
          ><fa icon="comment"></fa
        ></span>
        <span>{{ propsİtem.CommentToComment.length }}</span>
      </div>
      <div class="commentLDTC">
        <span
          @click="commentLike"
          :class="[like_disklike_Active.like ? 'commentLike' : 'commentCom']"
          ><fa icon="thumbs-up"></fa
        ></span>
        <span>{{ like_disklike.like }}</span>
      </div>
      <div class="commentLDTC">
        <span
          @click="commentDisklike"
          :class="[
            like_disklike_Active.disklike ? 'commentDisklike' : 'commentCom',
          ]"
          ><fa icon="thumbs-down"></fa
        ></span>
        <span>{{ like_disklike.disklike }}</span>
      </div>
    </div>
    <div v-if="commentTocomment" id="commentToCommentCap">
      <div id="commentToCommentTextarea">
        <textarea
          @keyup.enter="CommentToCommentButton"
          id="commentTCTextarea"
          placeholder="To Comment"
        ></textarea>
        <button @click="CommentToCommentButton">To Comment</button>
      </div>
      <CommentToComment
        v-for="(item, index) of CommentToCommentArray"
        :key="index"
        :item="item"
        :index="index"
        :TheRestComToComStore="TheRestComToComStore"
      />
      <button
        @click="TheRestCom"
        v-if="propsİtem.CommentToComment.length > 5"
        id="TheRestComToCom"
      >
        {{ TheRestComLength }}
      </button>
    </div>
  </div>
</template>

<script>
import CommentToComment from "../components/CommentToComment.vue";
import axios from "axios";

export default {
  props: ["item", "TheRestComStore", "index"],
  components: { CommentToComment },
  data() {
    return {
      commentTocomment: false,
      CommentToCommentArray: "",
      localhost: "http://localhost:3000",
      userActive: JSON.parse(localStorage.getItem("userActive")),
      propsİtem: this.item,
      TheRestComToComStore: 5,
      user: "",
      randomId: "",
      date: {
        getDate: "",
        getMonth: "",
        getFullYear: "",
      },
      like_disklike_Active: {
        like: "",
        disklike: "",
      },
      like_disklike: {
        like: "",
        disklike: "",
      },
    };
  },
  methods: {
    commentCom() {
      this.commentTocomment = this.commentTocomment == false ? true : false;
    },
    commentLike() {
      axios
        .put(`${this.localhost}/comments/${this.propsİtem.id}`, {
          ...this.propsİtem,

          like: this.propsİtem.like.includes(this.userActive)
            ? this.propsİtem.like.filter((element) => {
                if (element != this.userActive) return element;
              })
            : [...this.propsİtem.like, this.userActive],

          disklike: this.propsİtem.disklike.includes(this.userActive)
            ? this.propsİtem.disklike.filter((element) => {
                if (element != this.userActive) return element;
              })
            : this.propsİtem.disklike,
        })
        .then((response) => {
          this.like_disklike.like = response.data.like.length;
          this.like_disklike.disklike = response.data.disklike.length;

          this.like_disklike_Active.like = response.data.like.includes(
            this.userActive
          );
          this.like_disklike_Active.disklike = response.data.disklike.includes(
            this.userActive
          );

          this.propsİtem = response.data;
        });
    },
    commentDisklike() {
      axios
        .put(`${this.localhost}/comments/${this.propsİtem.id}`, {
          ...this.propsİtem,

          like: this.propsİtem.like.includes(this.userActive)
            ? this.propsİtem.like.filter((element) => {
                if (element != this.userActive) return element;
              })
            : this.propsİtem.like,

          disklike: this.propsİtem.disklike.includes(this.userActive)
            ? this.propsİtem.disklike.filter((element) => {
                if (element != this.userActive) return element;
              })
            : [...this.propsİtem.disklike, this.userActive],
        })
        .then((response) => {
          this.like_disklike.like = response.data.like.length;
          this.like_disklike.disklike = response.data.disklike.length;

          this.like_disklike_Active.like = response.data.like.includes(
            this.userActive
          );
          this.like_disklike_Active.disklike = response.data.disklike.includes(
            this.userActive
          );

          this.propsİtem = response.data;
        });
    },
    commentDelet() {
      axios
        .delete(`${this.localhost}/comments/${this.propsİtem.id}`)
        .then(() => this.$router.go("CommentPage"));
    },
    CommentToCommentButton() {
      let textarea = document.getElementById("commentTCTextarea");

      if (textarea.value != "") {
        for (let i = 0; i <= 10; i++) {
          this.randomId += Math.trunc(Math.random() * 10);
        }

        axios
          .put(`${this.localhost}/comments/${this.propsİtem.id}`, {
            ...this.propsİtem,
            CommentToComment: [
              ...this.propsİtem.CommentToComment,
              {
                userId: this.userActive,
                commentMadeId: this.propsİtem.id,
                commentId: this.randomId,
                date: this.propsİtem.date,
                comment: textarea.value,
                like: [],
                disklike: [],
              },
            ],
          })
          .then(() => {
            this.$router.go("CommentPage");
          });
      } else alert("Please enter value.");
    },
    TheRestCom() {
      this.TheRestComToComStore =
        this.TheRestComToComStore >= this.propsİtem.CommentToComment.length
          ? 5
          : this.TheRestComToComStore + 5;
    },
  },
  computed: {
    TheRestComLength() {
      return this.propsİtem.CommentToComment.length -
        this.TheRestComToComStore <=
        0
        ? "Turn off all comments"
        : `see the remaining ${
            this.propsİtem.CommentToComment.length - this.TheRestComToComStore
          } comments`;
    },
  },
  created() {
    axios.get(`${this.localhost}/user`).then((response) => {
      response.data.forEach((element) => {
        if (element.userId == this.propsİtem.userId) {
          this.user = {
            ...element,
          };
        }
      });
    });

    this.date.getDate =
      new Date(this.propsİtem.date).getDate() < 10
        ? "0" + new Date(this.propsİtem.date).getDate()
        : new Date(this.propsİtem.date).getDate();
    this.date.getMonth =
      new Date(this.propsİtem.date).getMonth() < 10
        ? "0" + new Date(this.propsİtem.date).getMonth()
        : new Date(this.propsİtem.date).getMonth();
    this.date.getFullYear = new Date(this.propsİtem.date).getFullYear();

    this.like_disklike_Active.like = this.propsİtem.like.includes(
      this.userActive
    );
    this.like_disklike_Active.disklike = this.propsİtem.disklike.includes(
      this.userActive
    );

    this.like_disklike.like = this.propsİtem.like.length;
    this.like_disklike.disklike = this.propsİtem.disklike.length;

    setTimeout(() => {
        this.CommentToCommentArray = this.propsİtem.CommentToComment.reverse()
    }, 100);
  },
};
</script>
