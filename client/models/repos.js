var Repo = Backbone.Model.extend({
	initialize: function(){
		this.fetchData(this.get("events_url"))
	},
	fetchData: function(url){
		$.ajax({
			url: url,
			type: 'GET',
			success: function(){
				console.log(url)
			}
		})
	}
})

var Repos = Backbone.Collection.extend({
	model: Repo,
	initialize: function(url){
		this.url = url;
		var ctx = this;
		this.fetch({success: function(d){
			// console.log(d);
			ctx.trigger('finished');
		}});
	}
})

var RepoView = Backbone.View.extend({
	template: _.template('<tr id="repos"> \
												<td><%=  name %></td> \
												<td><%= !fork %></td> \
												<td> </td> \
												<td> </td> \
												<td> </td> \
												<td> </td> \
												<td> </td> \
												<td><%= stargazers_count %></td> \
												<td><%= forks %></td> \
												<td><%= open_issues %></td> \
												<td> </td> \
											</tr>'),
	render: function(){
		return this.template(this.model.attributes);
	}
})

var ReposView = Backbone.View.extend({
	initialize: function(){
		this.collection.on('finished',function(){
			this.render();
		},this)
	},
	render: function(){
		this.collection.forEach(function(repo){
			var repoView = new RepoView({model: repo})
			this.$el.find('table').append(repoView.render());
		},this)
	}
})