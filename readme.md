#Backbone Query-String
A extension of Backbone.Router that defines a new sub class. It will supply a query-string params object in route callbacks.

Current Version: 0.4.1

AMD supported (see config).

#install

AMD:

If you are using requirejs or amd you can require query-string; ensure that you set your backbone and underscore vars in query-string.js (backboneRequireLocation && underscoreRequireLocation).

```
require(['query-string'], function(Backbone) {
  console.log(Backbone.QueryRouter);
});
```

Inline Script:

Add query-string.js:
`<script type="text/javascript" src="query-string.js"></script>`
depends on jquery, underscore, and backbone to exist on page first.

#example
```
/**
 * @class : router
 * @info : subclass of Backbone.Router
 */
  var Router = Backbone.QueryRouter.extend({

    routes: {
      '' : 'query',
      'test' : 'query',
      ':test' : 'query',
      ':test/:test2' : 'query',
      ':test/*hi/' : 'query',
      '*test' : 'query'
    },

    query: function() {
      console.log(arguments);
    }

  });

  var router = new Router();

  Backbone.history.start();
```

Updated On: June 24th, 2013
