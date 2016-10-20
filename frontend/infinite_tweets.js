var InfiniteTweets = function($div) {
  this.$div = $div;
  let $fetchTweet = $(".get-more-tweets");
  this.maxCreatedAt = null;
  $fetchTweet.on("click",this.fetchTweets.bind(this));
};

InfiniteTweets.prototype.fetchTweets = function (e) {
  let $div = this.$div;
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: "/feed.json",
    data: {
      max_created_at: this.maxCreatedAt
    },
    success(message){
      console.log(message);
      for (var i = 0; i < message.length; i++) {
        $div.append($(`<p>${message[i].content} -- by author</p>`));
      }
      this.maxCreatedAt = message[message.length-1].created_at;
    }
  });

};

module.exports = InfiniteTweets;
