var FollowToggle = require("./follow_toggle.js");
var UsersSearch = require("./users_search.js");
var TweetCompose = require("./tweet_compose.js");
var InfiniteTweets = require("./infinite_tweets.js");

$(()=>{
  new FollowToggle($(".follow-toggle"));
  new UsersSearch($(".users-search"));
  new TweetCompose($(".tweet-compose"));
  new InfiniteTweets($(".infinite-tweets"));
});
