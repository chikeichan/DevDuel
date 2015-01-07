//Basic profiles model
var Profile = Backbone.Model.extend({
	url: 'http://api.github.com/users/',
	initialize: function(){
		this.url = this.url+this.get('login')
		this.fetch({success: function(d){
			var reposURL = d.get('repos_url');
			var repos = new Repos(reposURL);
			var reposView = new ReposView({el: $('#stats'),collection: repos});
		}});
	}
})

var ProfileView = Backbone.View.extend({
	template: _.template('<img src="<%= avatar_url %>"></img> \
												<div id="vitals"> \
											    <span id="name"><%= name %></span><br> \
											    <span id="location"><%= location %></span><br> \
											    <span id="created_at">Developing since <%= created_at %></span><br> \
											  </div>'),
	render: function(){
		this.$el.html(this.template(this.model.attributes));
	},
	initialize: function(){
		this.model.on('sync',function(){
			this.render();
		},this)
	}
})