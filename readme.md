#Backbone Query-String
A extension of Backbone.Router that defines a new sub class. It will supply a query-string params object in route callbacks.

Current Version: 0.2

AMD supported (see config).

#install

AMD:
  ```
  require(['query-string'], function(Backbone) {
    console.log(Backbone.QueryRouter);
  });
  ```

Add query-string.js:
`<script type="text/javascript" src="query-string.js"></script>`
depends on jquery, underscore, and backbone to exist on page first

#config
For AMD support define backboneRequireLocation and underscoreRequireLocation to the AMD file locations. Default: 'backbone' & 'underscore'

#example
```
/**
 * @class : router
 * @info : subclass of Backbone.Router
 */
  var Router = Backbone.QueryRouter.extend({

    routes: {
      'test*query' : 'query'
    },

    query: function(query, params) {
      console.log(params);
    }

  });

  var router = new Router();

  Backbone.history.start();
```

Updated On: June 24th, 2013
