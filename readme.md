#Backbone Query-String
A extension of Backbone.Router that defines a new sub class. It will supply a query-string params object in route callbacks.

Current Version: 0.5.0

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
Check the example/ folder for use.

#methods
Exposes `Backbone.QueryRouter` method to be used as Backbone.Router would.

#use
Use your router as documented by Backbone.Router but in linked callbacks the last argument will always be a param object.
```
{

  _index: function(params) {
    console.log('The last parameter is always params', params);
  }

}
```

#change log

v0.5.0 - 6/27/13
  * complete rewrite of extraction method utilized to grab query string from matched routes
v0.4.1 - (6/25/13)
  * decodeURIComponent bug: values must be string
  * example file published in example/
  * added ability to catch other query-strings before last one: a prefix