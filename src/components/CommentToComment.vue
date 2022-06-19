<template>
  <div v-if="index < TheRestComToComStore" id="commentToComment">
    <div id="commentToCommentİmgNameDate">
      <div id="commentToCommmentİmgName">
        <div id="commentToCommentİmg">
          <img :src="user.img" />
        </div>
        <div id="commentToCommentName">{{ user.name }}</div>
      </div>
      <div id="commentToCommmentDate">
        {{ date.getDate }}.{{ date.getMonth }}.{{ date.getFullYear }}
      </div>
      <button
        v-if="userActive == propsİtem.userId"
        @click="commentDelet"
        id="commentToCommentDelet"
      >
        X
      </button>
    </div>
    <div id="commentToCommentText">
      <p>{{ propsİtem.comment }}</p>
    </div>
    <div id="commentToCommentLikeDisklikeTocomment">
      <div class="commentToLDC">
        <span
          @click="commentLike"
          :class="[
            like_disklike_Active.like
              ? 'commentToCommentLike'
              : 'commentToCommentCornsilk',
          ]"
          ><fa icon="thumbs-up"></fa
        ></span>
        <span>{{ like_disklike.like }}</span>
      </div>
      <div class="commentToLDC">
        <span
          @click="commentDisklike"
          :class="[
            like_disklike_Active.disklike
              ? 'commentToCommentDisklike'
              : 'commentToCommentCornsilk',
          ]"
          ><fa icon="thumbs-down"></fa
        ></span>
        <span>{{ like_disklike.disklike }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["item", "TheRestComToComStore", "index"],
  data() {
    return {
      commentTocomment: false,
      localhost: "http://localhost:3000",
      userActive: JSON.parse(localStorage.getItem("userActive")),
      user: "",
      propsİtem: this.item,
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
    commentLike() {
      axios
        .get(`${this.localhost}/comments/${this.propsİtem.commentMadeId}`)
        .then((response) => {
          axios
            .put(`${this.localhost}/comments/${this.propsİtem.commentMadeId}`, {
              ...response.data,
              CommentToComment: response.data.CommentToComment.map(
                (element) => {
                  if (element.commentId == this.propsİtem.commentId) {
                    return {
                      ...element,

                      like: element.like.includes(this.userActive)
                        ? element.like.filter((element) => {
                            if (element != this.userActive) return element;
                          })
                        : [...element.like, this.userActive],

                      disklike: element.disklike.includes(this.userActive)
                        ? element.disklike.filter((element) => {
                            if (element != this.userActive) return element;
                          })
                        : element.disklike,
                    };
                  } else return element;
                }
              ),
            })
            .then((response) => {
              response.data.CommentToComment.forEach((element) => {
                if (element.commentId == this.propsİtem.commentId) {
                  this.like_disklike.like = element.like.length;
                  this.like_disklike.disklike = element.disklike.length;

                  this.like_disklike_Active.like = element.like.includes(
                    this.userActive
                  );
                  this.like_disklike_Active.disklike =
                    element.disklike.includes(this.userActive);

                  this.propsİtem = element;
                }
              });
            });
        });
    },
    commentDisklike() {
      axios
        .get(`${this.localhost}/comments/${this.propsİtem.commentMadeId}`)
        .then((response) => {
          axios
            .put(`${this.localhost}/comments/${this.propsİtem.commentMadeId}`, {
              ...response.data,
              CommentToComment: response.data.CommentToComment.map(
                (element) => {
                  if (element.commentId == this.propsİtem.commentId) {
                    return {
                      ...element,

                      like: element.like.includes(this.userActive)
                        ? element.like.filter((element) => {
                            if (element != this.userActive) return element;
                          })
                        : element.like,

                      disklike: element.disklike.includes(this.userActive)
                        ? element.disklike.filter((element) => {
                            if (element != this.userActive) return element;
                          })
                        : [...element.disklike, this.userActive],
                    };
                  } else return element;
                }
              ),
            })
            .then((response) => {
              response.data.CommentToComment.forEach((element) => {
                if (element.commentId == this.propsİtem.commentId) {
                  this.like_disklike.like = element.like.length;
                  this.like_disklike.disklike = element.disklike.length;

                  this.like_disklike_Active.like = element.like.includes(
                    this.userActive
                  );
                  this.like_disklike_Active.disklike =
                    element.disklike.includes(this.userActive);

                  this.propsİtem = element;
                }
              });
            });
        });
    },
    commentDelet() {
      axios
        .get(`${this.localhost}/comments/${this.propsİtem.commentMadeId}`)
        .then((response) => {
          axios
            .put(`${this.localhost}/comments/${this.propsİtem.commentMadeId}`, {
              ...response.data,
              CommentToComment: response.data.CommentToComment.filter(
                (element) => {
                  if (element.commentId != this.propsİtem.commentId) {
                    return element;
                  }
                }
              ),
            })
            .then(() => this.$router.go("CommentPage"));
        });
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
  },
};
</script>
