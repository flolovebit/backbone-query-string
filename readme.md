#Backbone Query-String
A extension of Backbone.Router that defines a new sub class. It will supply a query-string params object in route callbacks.

AMD supported (see config).

#install
Add query-string.js

#config
For AMD support define backboneRequireLocation and underscoreRequireLocation to the AMD file locations. Default: 'backbone' & 'underscore'

#use
```/**
 * @class : router
 * @info : subclass of Backbone.Router
 */
  var Router = Backbone.QueryRouter.extend({
		routes: {
      '' : 'index'
    },

		index: function(path, params) {
			console.log(params, arguments);
		}

	});
```

Updated On: June 24th, 2013
