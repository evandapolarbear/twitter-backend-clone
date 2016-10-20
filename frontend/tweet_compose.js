var TweetCompose =  function ($form) {
  this.$form = $form;
  this.$ul = $form.find("ul");
  this.$counter = $form.find(".counter");

  this.$form.find("textarea").on("input", (e)=> {
    this.$counter.text(140-e.currentTarget.value.length);
  });

  this.$form.find("#add-mention").on("click",
    this.preSubmitMentions.bind(this));

  this.$form.on("submit", this.submitTweet.bind(this));
};

TweetCompose.prototype.preSubmitMentions = function (e) {
  e.preventDefault();
  let $select = this.$form.find(".original-select").clone();
  $select.removeClass("original-select");
  $(".presubmit-mentions").append($select);
};

TweetCompose.prototype.submitTweet = function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/tweets",
    dataType: "json",
    data: this.$form.serialize(),
    success: function(message){
      this.addTweet(message);
      this.clearForm();
    }.bind(this)
  });
};

TweetCompose.prototype.addTweet = function (message) {
  var $message = $("<li>").text(message.content + " -- " +
  message.user.username + " -- " + message.created_at);
  let $li = $($("#feed")[0]).append($message);
  for (var i = 0; i < message.mentions.length; i++) {
    let mention = message.mentions[i].user;
    let url = `/users/${mention.id}`;
    $li.append($(`<ul><li><a href=${url}>${mention.username}</a></li></ul>`));
  }
  // this.$ul.find(".loader").remove();
};

TweetCompose.prototype.clearForm = function () {
  this.$form.find("input[type='text']").val("");
};

// TweetCompose.prototype.addSpinner = function () {
//   this.$ul.append('<div class="loader">Loading...</div>');
// };









module.exports = TweetCompose;
