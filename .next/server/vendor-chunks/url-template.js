/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/url-template";
exports.ids = ["vendor-chunks/url-template"];
exports.modules = {

/***/ "(action-browser)/./node_modules/url-template/lib/url-template.js":
/*!*******************************************************!*\
  !*** ./node_modules/url-template/lib/url-template.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("(function (root, factory) {\n    if (true) {\n        module.exports = factory();\n    } else {}\n}(this, function () {\n  /**\n   * @constructor\n   */\n  function UrlTemplate() {\n  }\n\n  /**\n   * @private\n   * @param {string} str\n   * @return {string}\n   */\n  UrlTemplate.prototype.encodeReserved = function (str) {\n    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {\n      if (!/%[0-9A-Fa-f]/.test(part)) {\n        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');\n      }\n      return part;\n    }).join('');\n  };\n\n  /**\n   * @private\n   * @param {string} str\n   * @return {string}\n   */\n  UrlTemplate.prototype.encodeUnreserved = function (str) {\n    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {\n      return '%' + c.charCodeAt(0).toString(16).toUpperCase();\n    });\n  }\n\n  /**\n   * @private\n   * @param {string} operator\n   * @param {string} value\n   * @param {string} key\n   * @return {string}\n   */\n  UrlTemplate.prototype.encodeValue = function (operator, value, key) {\n    value = (operator === '+' || operator === '#') ? this.encodeReserved(value) : this.encodeUnreserved(value);\n\n    if (key) {\n      return this.encodeUnreserved(key) + '=' + value;\n    } else {\n      return value;\n    }\n  };\n\n  /**\n   * @private\n   * @param {*} value\n   * @return {boolean}\n   */\n  UrlTemplate.prototype.isDefined = function (value) {\n    return value !== undefined && value !== null;\n  };\n\n  /**\n   * @private\n   * @param {string}\n   * @return {boolean}\n   */\n  UrlTemplate.prototype.isKeyOperator = function (operator) {\n    return operator === ';' || operator === '&' || operator === '?';\n  };\n\n  /**\n   * @private\n   * @param {Object} context\n   * @param {string} operator\n   * @param {string} key\n   * @param {string} modifier\n   */\n  UrlTemplate.prototype.getValues = function (context, operator, key, modifier) {\n    var value = context[key],\n        result = [];\n\n    if (this.isDefined(value) && value !== '') {\n      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {\n        value = value.toString();\n\n        if (modifier && modifier !== '*') {\n          value = value.substring(0, parseInt(modifier, 10));\n        }\n\n        result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));\n      } else {\n        if (modifier === '*') {\n          if (Array.isArray(value)) {\n            value.filter(this.isDefined).forEach(function (value) {\n              result.push(this.encodeValue(operator, value, this.isKeyOperator(operator) ? key : null));\n            }, this);\n          } else {\n            Object.keys(value).forEach(function (k) {\n              if (this.isDefined(value[k])) {\n                result.push(this.encodeValue(operator, value[k], k));\n              }\n            }, this);\n          }\n        } else {\n          var tmp = [];\n\n          if (Array.isArray(value)) {\n            value.filter(this.isDefined).forEach(function (value) {\n              tmp.push(this.encodeValue(operator, value));\n            }, this);\n          } else {\n            Object.keys(value).forEach(function (k) {\n              if (this.isDefined(value[k])) {\n                tmp.push(this.encodeUnreserved(k));\n                tmp.push(this.encodeValue(operator, value[k].toString()));\n              }\n            }, this);\n          }\n\n          if (this.isKeyOperator(operator)) {\n            result.push(this.encodeUnreserved(key) + '=' + tmp.join(','));\n          } else if (tmp.length !== 0) {\n            result.push(tmp.join(','));\n          }\n        }\n      }\n    } else {\n      if (operator === ';') {\n        if (this.isDefined(value)) {\n          result.push(this.encodeUnreserved(key));\n        }\n      } else if (value === '' && (operator === '&' || operator === '?')) {\n        result.push(this.encodeUnreserved(key) + '=');\n      } else if (value === '') {\n        result.push('');\n      }\n    }\n    return result;\n  };\n\n  /**\n   * @param {string} template\n   * @return {function(Object):string}\n   */\n  UrlTemplate.prototype.parse = function (template) {\n    var that = this;\n    var operators = ['+', '#', '.', '/', ';', '?', '&'];\n\n    return {\n      expand: function (context) {\n        return template.replace(/\\{([^\\{\\}]+)\\}|([^\\{\\}]+)/g, function (_, expression, literal) {\n          if (expression) {\n            var operator = null,\n                values = [];\n\n            if (operators.indexOf(expression.charAt(0)) !== -1) {\n              operator = expression.charAt(0);\n              expression = expression.substr(1);\n            }\n\n            expression.split(/,/g).forEach(function (variable) {\n              var tmp = /([^:\\*]*)(?::(\\d+)|(\\*))?/.exec(variable);\n              values.push.apply(values, that.getValues(context, operator, tmp[1], tmp[2] || tmp[3]));\n            });\n\n            if (operator && operator !== '+') {\n              var separator = ',';\n\n              if (operator === '?') {\n                separator = '&';\n              } else if (operator !== '#') {\n                separator = operator;\n              }\n              return (values.length !== 0 ? operator : '') + values.join(separator);\n            } else {\n              return values.join(',');\n            }\n          } else {\n            return that.encodeReserved(literal);\n          }\n        });\n      }\n    };\n  };\n\n  return new UrlTemplate();\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy91cmwtdGVtcGxhdGUvbGliL3VybC10ZW1wbGF0ZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBLFFBQVEsSUFBMkI7QUFDbkM7QUFDQSxNQUFNLEtBQUssRUFJTjtBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYztBQUNkO0FBQ0E7QUFDQSxvQ0FBb0MsRUFBRTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsY0FBYztBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGNBQWM7QUFDZDtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04seUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSyxFQUFFLEtBQUssTUFBTSxFQUFFO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaG9ydGN1dF9hcHAvLi9ub2RlX21vZHVsZXMvdXJsLXRlbXBsYXRlL2xpYi91cmwtdGVtcGxhdGUuanM/MGEwMiJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC51cmx0ZW1wbGF0ZSA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gVXJsVGVtcGxhdGUoKSB7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBVcmxUZW1wbGF0ZS5wcm90b3R5cGUuZW5jb2RlUmVzZXJ2ZWQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgvKCVbMC05QS1GYS1mXXsyfSkvZykubWFwKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICBpZiAoIS8lWzAtOUEtRmEtZl0vLnRlc3QocGFydCkpIHtcbiAgICAgICAgcGFydCA9IGVuY29kZVVSSShwYXJ0KS5yZXBsYWNlKC8lNUIvZywgJ1snKS5yZXBsYWNlKC8lNUQvZywgJ10nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJ0O1xuICAgIH0pLmpvaW4oJycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIFVybFRlbXBsYXRlLnByb3RvdHlwZS5lbmNvZGVVbnJlc2VydmVkID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRvclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBVcmxUZW1wbGF0ZS5wcm90b3R5cGUuZW5jb2RlVmFsdWUgPSBmdW5jdGlvbiAob3BlcmF0b3IsIHZhbHVlLCBrZXkpIHtcbiAgICB2YWx1ZSA9IChvcGVyYXRvciA9PT0gJysnIHx8IG9wZXJhdG9yID09PSAnIycpID8gdGhpcy5lbmNvZGVSZXNlcnZlZCh2YWx1ZSkgOiB0aGlzLmVuY29kZVVucmVzZXJ2ZWQodmFsdWUpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlVW5yZXNlcnZlZChrZXkpICsgJz0nICsgdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIFVybFRlbXBsYXRlLnByb3RvdHlwZS5pc0RlZmluZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtzdHJpbmd9XG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBVcmxUZW1wbGF0ZS5wcm90b3R5cGUuaXNLZXlPcGVyYXRvciA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgIHJldHVybiBvcGVyYXRvciA9PT0gJzsnIHx8IG9wZXJhdG9yID09PSAnJicgfHwgb3BlcmF0b3IgPT09ICc/JztcbiAgfTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGlmaWVyXG4gICAqL1xuICBVcmxUZW1wbGF0ZS5wcm90b3R5cGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24gKGNvbnRleHQsIG9wZXJhdG9yLCBrZXksIG1vZGlmaWVyKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dFtrZXldLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIGlmICh0aGlzLmlzRGVmaW5lZCh2YWx1ZSkgJiYgdmFsdWUgIT09ICcnKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgICBpZiAobW9kaWZpZXIgJiYgbW9kaWZpZXIgIT09ICcqJykge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIHBhcnNlSW50KG1vZGlmaWVyLCAxMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5lbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIHRoaXMuaXNLZXlPcGVyYXRvcihvcGVyYXRvcikgPyBrZXkgOiBudWxsKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobW9kaWZpZXIgPT09ICcqJykge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZmlsdGVyKHRoaXMuaXNEZWZpbmVkKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwgdGhpcy5pc0tleU9wZXJhdG9yKG9wZXJhdG9yKSA/IGtleSA6IG51bGwpKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICBpZiAodGhpcy5pc0RlZmluZWQodmFsdWVba10pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5lbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWVba10sIGspKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0bXAgPSBbXTtcblxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUuZmlsdGVyKHRoaXMuaXNEZWZpbmVkKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICB0bXAucHVzaCh0aGlzLmVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSkpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzRGVmaW5lZCh2YWx1ZVtrXSkpIHtcbiAgICAgICAgICAgICAgICB0bXAucHVzaCh0aGlzLmVuY29kZVVucmVzZXJ2ZWQoaykpO1xuICAgICAgICAgICAgICAgIHRtcC5wdXNoKHRoaXMuZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlW2tdLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNLZXlPcGVyYXRvcihvcGVyYXRvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZW5jb2RlVW5yZXNlcnZlZChrZXkpICsgJz0nICsgdG1wLmpvaW4oJywnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0bXAubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0bXAuam9pbignLCcpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG9wZXJhdG9yID09PSAnOycpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZW5jb2RlVW5yZXNlcnZlZChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycgJiYgKG9wZXJhdG9yID09PSAnJicgfHwgb3BlcmF0b3IgPT09ICc/JykpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5lbmNvZGVVbnJlc2VydmVkKGtleSkgKyAnPScpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goJycpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVcbiAgICogQHJldHVybiB7ZnVuY3Rpb24oT2JqZWN0KTpzdHJpbmd9XG4gICAqL1xuICBVcmxUZW1wbGF0ZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIG9wZXJhdG9ycyA9IFsnKycsICcjJywgJy4nLCAnLycsICc7JywgJz8nLCAnJiddO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGV4cGFuZDogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoL1xceyhbXlxce1xcfV0rKVxcfXwoW15cXHtcXH1dKykvZywgZnVuY3Rpb24gKF8sIGV4cHJlc3Npb24sIGxpdGVyYWwpIHtcbiAgICAgICAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgdmFyIG9wZXJhdG9yID0gbnVsbCxcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKG9wZXJhdG9ycy5pbmRleE9mKGV4cHJlc3Npb24uY2hhckF0KDApKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgb3BlcmF0b3IgPSBleHByZXNzaW9uLmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uc3Vic3RyKDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleHByZXNzaW9uLnNwbGl0KC8sL2cpLmZvckVhY2goZnVuY3Rpb24gKHZhcmlhYmxlKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSAvKFteOlxcKl0qKSg/OjooXFxkKyl8KFxcKikpPy8uZXhlYyh2YXJpYWJsZSk7XG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgdGhhdC5nZXRWYWx1ZXMoY29udGV4dCwgb3BlcmF0b3IsIHRtcFsxXSwgdG1wWzJdIHx8IHRtcFszXSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChvcGVyYXRvciAmJiBvcGVyYXRvciAhPT0gJysnKSB7XG4gICAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnLCc7XG5cbiAgICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnPycpIHtcbiAgICAgICAgICAgICAgICBzZXBhcmF0b3IgPSAnJic7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgIT09ICcjJykge1xuICAgICAgICAgICAgICAgIHNlcGFyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiAodmFsdWVzLmxlbmd0aCAhPT0gMCA/IG9wZXJhdG9yIDogJycpICsgdmFsdWVzLmpvaW4oc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhhdC5lbmNvZGVSZXNlcnZlZChsaXRlcmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBVcmxUZW1wbGF0ZSgpO1xufSkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/url-template/lib/url-template.js\n");

/***/ })

};
;