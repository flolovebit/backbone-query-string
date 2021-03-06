#Backbone Query-String
A Backbone.Router extension that defines a new sub-class/constructor-function. It will supply a query-string params object in route callbacks. The query-string is provided in the following format: `#/url/?query=1&string=hi`

Current Version: `0.5.1`
Tested with Backbone: `1.0 >=`

Features:
  * Lightweight and Efficient
  * AMD support
  * Abstracted from Backbone.Router to prevent future Backbone breaking changes
  * Speed optimized
  * Recover from regex string errors.
  * We need battle-testers.

#install

Inline Script:

Add query-string.js before backbone dependencies.

```html
<script type="text/javascript" src="jquery-2.0.2.min.js"></script>
<script type="text/javascript" src="underscore-min.js"></script>
<script type="text/javascript" src="backbone-min.js"></script>
<script type="text/javascript" src="query-string.js"></script>
```

AMD:

If you are using require.js or amd you can require query-string; ensure that you set your backbone and underscore vars in query-string.js (variables backboneRequireLocation && underscoreRequireLocation).

In query-string.js: you will see the variables located at the top.

```javascript
(function(root, factory) {

  var backboneRequireLocation = 'backbone';
  var underscoreRequireLocation = 'underscore';

  ...
```

In a AMD environment, require query-string, applies a new method `QueryRouter` to Backbone and returns the core Backbone Object.

```javascript
require(['query-string'], function(Backbone) {
  console.log(Backbone.QueryRouter);
});
```

#example
View the index.html in the example/ folder for use and example.

#methods
Exposes `Backbone.QueryRouter` method to be used as Backbone.Router would.

#use
Use the router as documented by Backbone.Router, but in callbacks, the last argument will always be a param object. The query-string is provided in the following format: `#/url/?query=1&string=hi`
```javascript
{

  _index: function(params) {
    console.log('The last parameter is always params', params);
  }

}
```

#change log

v0.5.1 - 7/1/13:
  * Stability: recover from string errors with try catch

v0.5.0 - 6/27/13:
  * complete rewrite of extraction method utilized to grab query string from matched routes

v0.4.1 - (6/25/13):
  * decodeURIComponent bug: values must be string
  * example file published in example/
  * added ability to catch other query-strings before last one: a prefix