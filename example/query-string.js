 // Copyright 2013 Joshua Anderson
 //
 // Licensed under the Apache License, Version 2.0 (the "License");
 // you may not use this file except in compliance with the License.
 // You may obtain a copy of the License at
 //
 //  http://www.apache.org/licenses/LICENSE-2.0
 //
 // Unless required by applicable law or agreed to in writing, software
 // distributed under the License is distributed on an "AS IS" BASIS,
 // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 // See the License for the specific language governing permissions and
 // limitations under the License.

/**
 * author: Joshua Anderson
 * website: andersonjoshua.com
 *
 * project: backbone query rotuer
 *
 * info: adds params object to routes
 *   valid query string '?hash=1&bob=2'
 *   note: will only grab values after las question mark
 *
 * license:
 *   Apache License, Version 2.0
 *   used one function from jQuery BBQ
 * config:
 *   set backboneRequireLocation for amd backbone location
 *   set underscoreRequireLocation for amd underscore location
 * version:
 *   current: 0.2
 */
(function(root, factory) {

  var backboneRequireLocation = 'vendor/backbone';
  var underscoreRequireLocation = 'vendor/underscore';

  if (typeof define === 'function' && define.amd) {
    // AMD
    define([backboneRequireLocation, underscoreRequireLocation], function(Backbone, _) {
      return factory(Backbone, _);
    });

  } else {

    if ('object' === typeof root.Backbone &&
          'function' === typeof root._) {
      factory(root.Backbone, root._);
    }
  }

}(this, function(Backbone, _) {

  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  /**
   * info:
   *   backbone special router with
   *   query params attached
   * type:
   *   sub (class)
   * super:
   *   Backbone.Router
   */
  Backbone.QueryRouter = Backbone.Router.extend({

    /**
     * info:
     *   parse method used to
     *   generate object from a
     *   query string
     *
     * license-info:
     *   borrowed from jQuery BBQ until rewrite
     */
    _parseParams: function(params, coerce) {

      var obj = {},
      coerce_types = {
        'true': !0,
        'false': !1,
        'null': null
      };

      // Iterate over all name=value pairs.
      _.each(params.replace(/\+/g, ' ').split('&'), function(v, j) {
        var param = v.split('='),
          key = decodeURIComponent(param[0]),
          val, cur = obj,
          i = 0,

          // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
          // into its component parts.
          keys = key.split(']['),
          keys_last = keys.length - 1;

        // If the first keys part contains [ and the last ends with ], then []
        // are correctly balanced.
        if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
          // Remove the trailing ] from the last keys part.
          keys[keys_last] = keys[keys_last].replace(/\]$/, '');

          // Split first keys part into two parts on the [ and add them back onto
          // the beginning of the keys array.
          keys = keys.shift().split('[').concat(keys);

          keys_last = keys.length - 1;
        } else {
          // Basic 'foo' style key.
          keys_last = 0;
        }

        // Are we dealing with a name=value pair, or just a name?
        if (param.length === 2) {
          val = decodeURIComponent(param[1]);

          // Coerce values.
          if (coerce) {
            val = val && !isNaN(val) ? +val // number
            :
            val === 'undefined' ? undefined // undefined
            :
            coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
            :
            val; // string
          }

          if (keys_last) {
            // Complex key, build deep object structure based on a few rules:
            // * The 'cur' pointer starts at the object top-level.
            // * [] = array push (n is set to array length), [n] = array if n is
            //   numeric, otherwise object.
            // * If at the last keys part, set the value.
            // * For each keys part, if the current level is undefined create an
            //   object or array based on the type of the next keys part.
            // * Move the 'cur' pointer to the next level.
            // * Rinse & repeat.
            for (; i <= keys_last; i++) {
              key = keys[i] === '' ? cur.length : keys[i];
              cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
            }

          } else {
            // Simple key, even simpler rules, since only scalars and shallow
            // arrays are allowed.
            if ($.isArray(obj[key])) {
              // val is already an array, so push on the next value.
              obj[key].push(val);

            } else if (obj[key] !== undefined) {
              // val isn't an array, but since a second value has been specified,
              // convert val into an array.
              obj[key] = [obj[key], val];

            } else {
              // val is a scalar.
              obj[key] = val;
            }
          }

        } else if (key) {
          // No value was defined, so set something meaningful.
          obj[key] = coerce ? undefined : '';
        }
      });

      return obj;

    },

    /**
     * info:
     *   generate regex pattern given route
     */
    _routeToRegExp: function(route) {

      route = route.replace(escapeRegExp, '\\$&');
      route = route.replace(optionalParam, '(?:$1)?');

      route = route.replace(namedParam, function(match, optional) {
        return optional ? match : '([^\/]+)';
      });

      route = route.replace(splatParam, '(.*?)');

      return new RegExp('^' + route + '($|\\?.+)');

    },

    /**
     * info:
     *   method for extracting query-string then
     *   invoking super method that returns array
     *   where we then push params object into
     *   arguments that each router callback function
     *   can easily access.
     * type:
     *   sub (class)
     * super:
     *   Backbone.Router.prototype._extractParameters
     */
    _extractParameters: function(route, fragment) {

      var uri = fragment;

      /**
       * info:
       *   obtain the last indexed position
       *   of a character:questionmark
       */
      var indexOfQuestionMark = fragment.lastIndexOf('?');

      /**
       * info:
       *   params object defaults to
       *   a standard object
       */
      var params = {};

      /**
       * if:
       *   querystring exists then
       *   parse it and make it an object
       * do:
       *   remove query-string from uri
       *   store returned object in params
       */
      if (indexOfQuestionMark >= 0) {

        var paramsString;

        // make paramsString by striping values before index of last question mark
        paramsString = fragment.substring((indexOfQuestionMark + 1), fragment.length);

        // make uri by striping saving everything before index of last question mark
        uri = fragment.substring(0, indexOfQuestionMark);

        // store parsed query-string in object
        params = this._parseParams(paramsString);

      }

      // result array from regex execution
      var callbackParams = route.exec(uri).slice(1);


      // only combine last value of array with matched query-string if
      // the array length is greater than one, implying that
      // only a query-string match was found in regex; otherwise, just add
      // the uri (that doesn't contain the actual parsed params object string)
      // and only contains other query-strings objects that the user may want
      // to include in the path value
      if (callbackParams.length > 1) {
        // combine query string with soon to be last item: before slice occurs
        callbackParams[callbackParams.length - 2] = callbackParams[callbackParams.length - 2] + callbackParams[callbackParams.length - 1];
      }

      else {
        callbackParams.unshift(uri);
      }

      // remove the last item of array
      callbackParams = callbackParams.slice(0, callbackParams.length - 1);

      /**
       * info:
       *   call super class method (_extractParameters)
       */
      var extraction = _.map(callbackParams, function(param, key) {
        return param ? decodeURIComponent(param) : null;
      });

      /**
       * info:
       *   add the params object
       *   to the array of values to be returned
       * important:
       *   params should always be an object
       */
      extraction.push(params);

      /**
       * return:
       *   array object to router callback
       */
      return extraction;

    }

  });

  /**
   * info:
   *   version information for future use
   * @type {String}
   */
  Backbone.QueryRouter.VERSION = '0.2.0';

  /**
   * info:
   *   go ahead and return Backbone
   */
  return Backbone;

}));