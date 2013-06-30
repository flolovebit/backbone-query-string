#Backbone Query-String
A Backbone.Router extension that defines a new sub-class/constuctor-function. It will supply a query-string params object in route callbacks. The query-string is provided in the following format: `#/url/?query=1&string=hi`

Current Version: `0.5.0`
Tested with Backbone: `1.0 >=`

#install

Inline Script:

Add query-string.js before backbone dependancies.

```html
<script type="text/javascript" src="jquery-2.0.2.min.js"></script>
<script type="text/javascript" src="underscore-min.js"></script>
<script type="text/javascript" src="backbone-min.js"></script>
<script type="text/javascript" src="query-string.js"></script>
```

AMD:

If you are using requirejs or amd you can require query-string; ensure that you set your backbone and underscore vars in query-string.js (variables backboneRequireLocation && underscoreRequireLocation).

In query-string.js: you will see the variables located at the top.

```javascript
(function(root, factory) {

  var backboneRequireLocation = 'backbone';
  var underscoreRequireLocation = 'underscore';

  ...
```

In any AMD app: used to load query-string which applies a new method to Backbone and retuns the core Backbone Object.

```javascript
require(['query-string'], function(Backbone) {
  console.log(Backbone.QueryRouter);
});
```

#example
Check the example/ folder for use.

#methods
Exposes `Backbone.QueryRouter` method to be used as Backbone.Router would.

#use
Use your router as documented by Backbone.Router but in callbacks the last argument will always be a param object. The query string is provided in the following format: `#/url/?query=1&string=hi`
```javascript
{

  _index: function(params) {
    console.log('The last parameter is always params', params);
  }

}
```

#change log

v0.5.0 - 6/27/13:
  * complete rewrite of extraction method utilized to grab query string from matched routes

v0.4.1 - (6/25/13):
  * decodeURIComponent bug: values must be string
  * example file published in example/
  * added ability to catch other query-strings before last one: a prefix