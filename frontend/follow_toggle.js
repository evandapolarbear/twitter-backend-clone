var FollowToggle = function($followButton){
  $followButton.on("click", this.changeFollow.bind(this));
};


FollowToggle.prototype.changeFollow = function (e) {
  e.preventDefault();
  let $button = $(e.currentTarget);
  $button.prop("disabled",true);
  let userId = $button.data("userid");
  if ($button.data("follow-status") === "Follow") {
    this.follow(userId,$button);
  } else {
    this.unfollow(userId, $button);
  }
};

FollowToggle.prototype.follow = function(userId,$button) {
  $.ajax({
    method: "POST",
    url: `/users/${userId}/follow.json`,
    success(){
      $button.attr("value","Unfollow");
      $button.data("follow-status","Unfollow");
      $button.prop("disabled",false);
    }
  });
};

FollowToggle.prototype.unfollow = function(userId,$button) {
  $.ajax({
    method: "DELETE",
    url: `/users/${userId}/follow.json`,
    success(){
      $button.attr("value","Follow");
      $button.data("follow-status","Follow");
      $button.prop("disabled",false);
    }
  });
};

module.exports = FollowToggle;
