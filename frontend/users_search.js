var UsersSearch = function($nav){
  this.$nav = $nav;
  let $textBox = $nav.find("input[type='text']");

  $textBox.on("input", this.searchUsers.bind(this));
};

UsersSearch.prototype.searchUsers = function (e) {
  let $nav = this.$nav;

  $.ajax({
    method: "GET",
    url: "/users/search.json",
    data: { query: e.currentTarget.value },

    success(users){
      let $ul = $nav.find($('ul'));
      $ul.empty();
      for (var i = 0; i < users.length; i++) {
        let userUrl = users[i].url;
        let userName = users[i].username;
        $ul.append(`<li><a href='${userUrl}'>${userName}</a></li>`);
      }
    }
  });
};




module.exports = UsersSearch;
