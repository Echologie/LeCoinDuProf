(function (scope) {
    "use strict";
    function F(arity, fun, wrapper) {
        wrapper.a = arity;
        wrapper.f = fun;
        return wrapper;
    }
    function F2(fun) {
        var curried = function (a) {
            return function (b) {
                return fun(a, b);
            };
        };
        curried.a2 = fun;
        return curried;
    }
    function F3(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return fun(a, b, c);
                };
            };
        };
        curried.a3 = fun;
        return curried;
    }
    function F4(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return fun(a, b, c, d);
                    };
                };
            };
        };
        curried.a4 = fun;
        return curried;
    }
    function F5(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return fun(a, b, c, d, e);
                        };
                    };
                };
            };
        };
        curried.a5 = fun;
        return curried;
    }
    function F6(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return fun(a, b, c, d, e, f);
                            };
                        };
                    };
                };
            };
        };
        curried
            .a6 = fun;
        return curried;
    }
    function F7(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return fun(a, b, c, d, e, f, g);
                                };
                            };
                        };
                    };
                };
            };
        };
        curried.a7 = fun;
        return curried;
    }
    function F8(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return fun(a, b, c, d, e, f, g, h);
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        curried.a8 = fun;
        return curried;
    }
    function F9(fun) {
        var curried = function (a) {
            return function (b) {
                return function (c) {
                    return function (d) {
                        return function (e) {
                            return function (f) {
                                return function (g) {
                                    return function (h) {
                                        return function (i) {
                                            return fun(a, b, c, d, e, f, g, h, i);
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        curried.a9 = fun;
        return curried;
    }
    function A2(fun, a, b) {
        return fun.a2 ? fun.a2(a, b) : fun(a)(b);
    }
    function A3(fun, a, b, c) {
        return fun.a3 ? fun.a3(a, b, c) :
            fun(a)(b)(c);
    }
    function A4(fun, a, b, c, d) {
        return fun.a4 ? fun.a4(a, b, c, d) : fun(a)(b)(c)(d);
    }
    function A5(fun, a, b, c, d, e) {
        return fun.a5 ? fun.a5(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
    }
    function A6(fun, a, b, c, d, e, f) {
        return fun.a6 ? fun.a6(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
    }
    function A7(fun, a, b, c, d, e, f, g) {
        return fun.a7 ? fun.a7(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
    }
    function A8(fun, a, b, c, d, e, f, g, h) {
        return fun.a8 ? fun.a8(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
    }
    function A9(fun, a, b, c, d, e, f, g, h, i) {
        return fun.a9 ?
            fun.a9(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
    }
    var _JsArray_empty = [];
    function _JsArray_singleton(value) {
        return [value];
    }
    function _JsArray_length(array) {
        return array.length;
    }
    var _JsArray_initialize_fn = function (size, offset, func) {
        var result = new Array(size);
        for (var i = 0; i < size; i++) {
            result[i] = func(offset + i);
        }
        return result;
    }, _JsArray_initialize = F3(_JsArray_initialize_fn);
    var _JsArray_initializeFromList_fn = function (max, ls) {
        var result = new Array(max);
        for (var i = 0; i < max && ls.b; i++) {
            result[i] = ls.a;
            ls = ls.b;
        }
        result.length = i;
        return _Utils_Tuple2(result, ls);
    }, _JsArray_initializeFromList = F2(_JsArray_initializeFromList_fn);
    var _JsArray_unsafeGet_fn = function (index, array) {
        return array[index];
    }, _JsArray_unsafeGet = F2(_JsArray_unsafeGet_fn);
    var _JsArray_unsafeSet_fn = function (index, value, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = array[i];
        }
        result[index] = value;
        return result;
    }, _JsArray_unsafeSet = F3(_JsArray_unsafeSet_fn);
    var _JsArray_push_fn = function (value, array) {
        var length = array.length;
        var result = new Array(length + 1);
        for (var i = 0; i < length; i++) {
            result[i] = array[i];
        }
        result[length] = value;
        return result;
    }, _JsArray_push = F2(_JsArray_push_fn);
    var _JsArray_foldl_fn = function (func, acc, array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            acc = A2(func, array[i], acc);
        }
        return acc;
    }, _JsArray_foldl_fn_unwrapped = function (func, acc, array) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            acc = func(array[i], acc);
        }
        return acc;
    }, _JsArray_foldl = F3(_JsArray_foldl_fn);
    var _JsArray_foldr_fn = function (func, acc, array) {
        for (var i = array.length - 1; i >= 0; i--) {
            acc = A2(func, array[i], acc);
        }
        return acc;
    }, _JsArray_foldr_fn_unwrapped = function (func, acc, array) {
        for (var i = array.length - 1; i >= 0; i--) {
            acc = func(array[i], acc);
        }
        return acc;
    }, _JsArray_foldr = F3(_JsArray_foldr_fn);
    var _JsArray_map_fn = function (func, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = func(array[i]);
        }
        return result;
    }, _JsArray_map = F2(_JsArray_map_fn);
    var _JsArray_indexedMap_fn = function (func, offset, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = A2(func, offset + i, array[i]);
        }
        return result;
    }, _JsArray_indexedMap_fn_unwrapped = function (func, offset, array) {
        var length = array.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = func(offset + i, array[i]);
        }
        return result;
    }, _JsArray_indexedMap = F3(_JsArray_indexedMap_fn);
    var _JsArray_slice_fn = function (from, to, array) {
        return array.slice(from, to);
    }, _JsArray_slice = F3(_JsArray_slice_fn);
    var _JsArray_appendN_fn = function (n, dest, source) {
        var destLen = dest.length;
        var itemsToCopy = n - destLen;
        if (itemsToCopy > source.length) {
            itemsToCopy = source.length;
        }
        var size = destLen + itemsToCopy;
        var result = new Array(size);
        for (var i = 0; i < destLen; i++) {
            result[i] = dest[i];
        }
        for (var i = 0; i < itemsToCopy; i++) {
            result[i + destLen] = source[i];
        }
        return result;
    }, _JsArray_appendN = F3(_JsArray_appendN_fn);
    // LOG
    var _Debug_log_fn = function (tag, value) {
        return value;
    }, _Debug_log = F2(_Debug_log_fn);
    var _Debug_log_UNUSED_fn = function (tag, value) {
        console.log(tag + ": " + _Debug_toString(value));
        return value;
    }, _Debug_log_UNUSED = F2(_Debug_log_UNUSED_fn);
    // TODOS
    function _Debug_todo(moduleName, region) {
        return function (message) {
            _Debug_crash(8, moduleName, region, message);
        };
    }
    function _Debug_todoCase(moduleName, region, value) {
        return function (message) {
            _Debug_crash(9, moduleName, region, value, message);
        };
    }
    // TO STRING
    function _Debug_toString(value) {
        return "<internals>";
    }
    function _Debug_toString_UNUSED(value) {
        return _Debug_toAnsiString(false, value);
    }
    function _Debug_toAnsiString(ansi, value) {
        if (typeof value === "function") {
            return _Debug_internalColor(ansi, "<function>");
        }
        if (typeof value === "boolean") {
            return _Debug_ctorColor(ansi, value ? "True" : "False");
        }
        if (typeof value === "number") {
            return _Debug_numberColor(ansi, value + "");
        }
        if (value instanceof String) {
            return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
        }
        if (typeof value === "string") {
            return _Debug_stringColor(ansi, "\"" + _Debug_addSlashes(value, false) + "\"");
        }
        if (typeof value === "object" && "$" in value) {
            var tag = value.$;
            if (typeof tag === "number") {
                return _Debug_internalColor(ansi, "<internals>");
            }
            if (tag[0] === "#") {
                var output = [];
                for (var k in value) {
                    if (k === "$")
                        continue;
                    output.push(_Debug_toAnsiString(ansi, value[k]));
                }
                return "(" + output.join(",") + ")";
            }
            if (tag === "Set_elm_builtin") {
                return _Debug_ctorColor(ansi, "Set")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
            }
            if (tag === "RBNode_elm_builtin" || tag === "RBEmpty_elm_builtin") {
                return _Debug_ctorColor(ansi, "Dict")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
            }
            if (tag === "Array_elm_builtin") {
                return _Debug_ctorColor(ansi, "Array")
                    + _Debug_fadeColor(ansi, ".fromList") + " "
                    + _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
            }
            if (tag === "::" || tag === "[]") {
                var output = "[";
                value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b);
                for (; value.b; value = value.b) // WHILE_CONS
                 {
                    output += "," + _Debug_toAnsiString(ansi, value.a);
                }
                return output + "]";
            }
            var output = "";
            for (var i in value) {
                if (i === "$")
                    continue;
                var str = _Debug_toAnsiString(ansi, value[i]);
                var c0 = str[0];
                var parenless = c0 === "{" || c0 === "(" || c0 === "[" || c0 === "<" || c0 === "\"" || str.indexOf(" ") < 0;
                output += " " + (parenless ? str : "(" + str + ")");
            }
            return _Debug_ctorColor(ansi, tag) + output;
        }
        if (typeof DataView === "function" && value instanceof DataView) {
            return _Debug_stringColor(ansi, "<" + value.byteLength + " bytes>");
        }
        if (typeof File !== "undefined" && value instanceof File) {
            return _Debug_internalColor(ansi, "<" + value.name + ">");
        }
        if (typeof value === "object") {
            var output = [];
            for (var key in value) {
                var field = key[0] === "_" ? key.slice(1) : key;
                output.push(_Debug_fadeColor(ansi, field) + " = " + _Debug_toAnsiString(ansi, value[key]));
            }
            if (output.length === 0) {
                return "{}";
            }
            return "{ " + output.join(", ") + " }";
        }
        return _Debug_internalColor(ansi, "<internals>");
    }
    function _Debug_addSlashes(str, isChar) {
        var s = str
            .replace(/\\/g, "\\\\")
            .replace(/\n/g, "\\n")
            .replace(/\t/g, "\\t")
            .replace(/\r/g, "\\r")
            .replace(/\v/g, "\\v")
            .replace(/\0/g, "\\0");
        if (isChar) {
            return s.replace(/\'/g, "\\'");
        }
        else {
            return s.replace(/\"/g, "\\\"");
        }
    }
    function _Debug_ctorColor(ansi, string) {
        return ansi ? "\u001B[96m" + string + "\u001B[0m" : string;
    }
    function _Debug_numberColor(ansi, string) {
        return ansi ? "\u001B[95m" + string + "\u001B[0m" : string;
    }
    function _Debug_stringColor(ansi, string) {
        return ansi ? "\u001B[93m" + string + "\u001B[0m" : string;
    }
    function _Debug_charColor(ansi, string) {
        return ansi ? "\u001B[92m" + string + "\u001B[0m" : string;
    }
    function _Debug_fadeColor(ansi, string) {
        return ansi ? "\u001B[37m" + string + "\u001B[0m" : string;
    }
    function _Debug_internalColor(ansi, string) {
        return ansi ? "\u001B[36m" + string + "\u001B[0m" : string;
    }
    function _Debug_toHexDigit(n) {
        return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
    }
    // CRASH
    function _Debug_crash(identifier) {
        throw new Error("https://github.com/elm/core/blob/1.0.0/hints/" + identifier + ".md");
    }
    function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4) {
        switch (identifier) {
            case 0:
                throw new Error("What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById(\"elm-node\")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.");
            case 1:
                throw new Error("Browser.application programs cannot handle URLs like this:\n\n    " + document.location.href + "\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.");
            case 2:
                var jsonErrorString = fact1;
                throw new Error("Problem with the flags given to your Elm program on initialization.\n\n" + jsonErrorString);
            case 3:
                var portName = fact1;
                throw new Error("There can only be one port named `" + portName + "`, but your program has multiple.");
            case 4:
                var portName = fact1;
                var problem = fact2;
                throw new Error("Trying to send an unexpected type of value through port `" + portName + "`:\n" + problem);
            case 5:
                throw new Error("Trying to use `(==)` on functions.\nThere is no way to know if functions are \"the same\" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.");
            case 6:
                var moduleName = fact1;
                throw new Error("Your page is loading multiple Elm scripts with a module named " + moduleName + ". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!");
            case 8:
                var moduleName = fact1;
                var region = fact2;
                var message = fact3;
                throw new Error("TODO in module `" + moduleName + "` " + _Debug_regionToString(region) + "\n\n" + message);
            case 9:
                var moduleName = fact1;
                var region = fact2;
                var value = fact3;
                var message = fact4;
                throw new Error("TODO in module `" + moduleName + "` from the `case` expression "
                    + _Debug_regionToString(region) + "\n\nIt received the following value:\n\n    "
                    + _Debug_toString(value).replace("\n", "\n    ")
                    + "\n\nBut the branch that handles it says:\n\n    " + message.replace("\n", "\n    "));
            case 10:
                throw new Error("Bug in https://github.com/elm/virtual-dom/issues");
            case 11:
                throw new Error("Cannot perform mod 0. Division by zero error.");
        }
    }
    function _Debug_regionToString(region) {
        if (region.ao.fi === region.a4.fi) {
            return "on line " + region.ao.fi;
        }
        return "on lines " + region.ao.fi + " through " + region.a4.fi;
    }
    // EQUALITY
    function _Utils_eq(x, y) {
        for (var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack); isEqual && (pair = stack.pop()); isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)) { }
        return isEqual;
    }
    function _Utils_eqHelp(x, y, depth, stack) {
        if (x === y) {
            return true;
        }
        if (typeof x !== "object" || x === null || y === null) {
            typeof x === "function" && _Debug_crash(5);
            return false;
        }
        if (depth > 100) {
            stack.push(_Utils_Tuple2(x, y));
            return true;
        }
        /**_UNUSED/
        if (x.$ === 'Set_elm_builtin')
        {
            x = $elm$core$Set$toList(x);
            y = $elm$core$Set$toList(y);
        }
        if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
        {
            x = $elm$core$Dict$toList(x);
            y = $elm$core$Dict$toList(y);
        }
        //*/
        /**/
        if (x.$ < 0) {
            x = $elm$core$Dict$toList(x);
            y = $elm$core$Dict$toList(y);
        }
        //*/
        for (var key in x) {
            if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack)) {
                return false;
            }
        }
        return true;
    }
    var _Utils_equal = F2(_Utils_eq);
    var _Utils_notEqual_fn = function (a, b) { return !_Utils_eq(a, b); }, _Utils_notEqual = F2(_Utils_notEqual_fn);
    // COMPARISONS
    // Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
    // the particular integer values assigned to LT, EQ, and GT.
    function _Utils_cmp(x, y, ord) {
        if (typeof x !== "object") {
            return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
        }
        /**_UNUSED/
        if (x instanceof String)
        {
            var a = x.valueOf();
            var b = y.valueOf();
            return a === b ? 0 : a < b ? -1 : 1;
        }
        //*/
        /**/
        if (typeof x.$ === "undefined") 
        //*/
        /**_UNUSED/
        if (x.$[0] === '#')
        //*/
        {
            return (ord = _Utils_cmp(x.a, y.a))
                ? ord
                : (ord = _Utils_cmp(x.b, y.b))
                    ? ord
                    : _Utils_cmp(x.c, y.c);
        }
        // traverse conses until end of a list or a mismatch
        for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) { } // WHILE_CONSES
        return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
    }
    var _Utils_lt_fn = function (a, b) { return _Utils_cmp(a, b) < 0; }, _Utils_lt = F2(_Utils_lt_fn);
    var _Utils_le_fn = function (a, b) { return _Utils_cmp(a, b) < 1; }, _Utils_le = F2(_Utils_le_fn);
    var _Utils_gt_fn = function (a, b) { return _Utils_cmp(a, b) > 0; }, _Utils_gt = F2(_Utils_gt_fn);
    var _Utils_ge_fn = function (a, b) { return _Utils_cmp(a, b) >= 0; }, _Utils_ge = F2(_Utils_ge_fn);
    var _Utils_compare_fn = function (x, y) {
        var n = _Utils_cmp(x, y);
        return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
    }, _Utils_compare = F2(_Utils_compare_fn);
    // COMMON VALUES
    var _Utils_Tuple0 = 0;
    var _Utils_Tuple0_UNUSED = { $: "#0" };
    function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
    function _Utils_Tuple2_UNUSED(a, b) { return { $: "#2", a: a, b: b }; }
    function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
    function _Utils_Tuple3_UNUSED(a, b, c) { return { $: "#3", a: a, b: b, c: c }; }
    function _Utils_chr(c) { return c; }
    function _Utils_chr_UNUSED(c) { return new String(c); }
    // RECORDS
    function _Utils_update(oldRecord, updatedFields) {
        var newRecord = {};
        for (var key in oldRecord) {
            newRecord[key] = oldRecord[key];
        }
        for (var key in updatedFields) {
            newRecord[key] = updatedFields[key];
        }
        return newRecord;
    }
    // APPEND
    var _Utils_append = F2(_Utils_ap);
    function _Utils_ap(xs, ys) {
        // append Strings
        if (typeof xs === "string") {
            return xs + ys;
        }
        // append Lists
        if (!xs.b) {
            return ys;
        }
        var root = _List_Cons(xs.a, ys);
        xs = xs.b;
        for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
         {
            curr = curr.b = _List_Cons(xs.a, ys);
        }
        return root;
    }
    var _List_Nil = { $: 0, a: null, b: null };
    var _List_Nil_UNUSED = { $: "[]" };
    function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
    function _List_Cons_UNUSED(hd, tl) { return { $: "::", a: hd, b: tl }; }
    var _List_cons = F2(_List_Cons);
    function _List_fromArray(arr) {
        var out = _List_Nil;
        for (var i = arr.length; i--;) {
            out = _List_Cons(arr[i], out);
        }
        return out;
    }
    function _List_toArray(xs) {
        for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
         {
            out.push(xs.a);
        }
        return out;
    }
    var _List_map2_fn = function (f, xs, ys) {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
         {
            arr.push(A2(f, xs.a, ys.a));
        }
        return _List_fromArray(arr);
    }, _List_map2_fn_unwrapped = function (f, xs, ys) {
        for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
         {
            arr.push(f(xs.a, ys.a));
        }
        return _List_fromArray(arr);
    }, _List_map2 = F3(_List_map2_fn);
    var _List_map3_fn = function (f, xs, ys, zs) {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
         {
            arr.push(A3(f, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map3_fn_unwrapped = function (f, xs, ys, zs) {
        for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
         {
            arr.push(f(xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map3 = F4(_List_map3_fn);
    var _List_map4_fn = function (f, ws, xs, ys, zs) {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
         {
            arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map4_fn_unwrapped = function (f, ws, xs, ys, zs) {
        for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
         {
            arr.push(f(ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map4 = F5(_List_map4_fn);
    var _List_map5_fn = function (f, vs, ws, xs, ys, zs) {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
         {
            arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map5_fn_unwrapped = function (f, vs, ws, xs, ys, zs) {
        for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
         {
            arr.push(f(vs.a, ws.a, xs.a, ys.a, zs.a));
        }
        return _List_fromArray(arr);
    }, _List_map5 = F6(_List_map5_fn);
    var _List_sortBy_fn = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            return _Utils_cmp(f(a), f(b));
        }));
    }, _List_sortBy = F2(_List_sortBy_fn);
    var _List_sortWith_fn = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            var ord = A2(f, a, b);
            return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
        }));
    }, _List_sortWith_fn_unwrapped = function (f, xs) {
        return _List_fromArray(_List_toArray(xs).sort(function (a, b) {
            var ord = f(a, b);
            return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
        }));
    }, _List_sortWith = F2(_List_sortWith_fn);
    // MATH
    var _Basics_add_fn = function (a, b) { return a + b; }, _Basics_add = F2(_Basics_add_fn);
    var _Basics_sub_fn = function (a, b) { return a - b; }, _Basics_sub = F2(_Basics_sub_fn);
    var _Basics_mul_fn = function (a, b) { return a * b; }, _Basics_mul = F2(_Basics_mul_fn);
    var _Basics_fdiv_fn = function (a, b) { return a / b; }, _Basics_fdiv = F2(_Basics_fdiv_fn);
    var _Basics_idiv_fn = function (a, b) { return (a / b) | 0; }, _Basics_idiv = F2(_Basics_idiv_fn);
    var _Basics_pow_fn = Math.pow, _Basics_pow = F2(_Basics_pow_fn);
    var _Basics_remainderBy_fn = function (b, a) { return a % b; }, _Basics_remainderBy = F2(_Basics_remainderBy_fn);
    // https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
    var _Basics_modBy_fn = function (modulus, x) {
        var answer = x % modulus;
        return modulus === 0
            ? _Debug_crash(11)
            :
                ((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
                    ? answer + modulus
                    : answer;
    }, _Basics_modBy = F2(_Basics_modBy_fn);
    // TRIGONOMETRY
    var _Basics_pi = Math.PI;
    var _Basics_e = Math.E;
    var _Basics_cos = Math.cos;
    var _Basics_sin = Math.sin;
    var _Basics_tan = Math.tan;
    var _Basics_acos = Math.acos;
    var _Basics_asin = Math.asin;
    var _Basics_atan = Math.atan;
    var _Basics_atan2_fn = Math.atan2, _Basics_atan2 = F2(_Basics_atan2_fn);
    // MORE MATH
    function _Basics_toFloat(x) { return x; }
    function _Basics_truncate(n) { return n | 0; }
    function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }
    var _Basics_ceiling = Math.ceil;
    var _Basics_floor = Math.floor;
    var _Basics_round = Math.round;
    var _Basics_sqrt = Math.sqrt;
    var _Basics_log = Math.log;
    var _Basics_isNaN = isNaN;
    // BOOLEANS
    function _Basics_not(bool) { return !bool; }
    var _Basics_and_fn = function (a, b) { return a && b; }, _Basics_and = F2(_Basics_and_fn);
    var _Basics_or_fn = function (a, b) { return a || b; }, _Basics_or = F2(_Basics_or_fn);
    var _Basics_xor_fn = function (a, b) { return a !== b; }, _Basics_xor = F2(_Basics_xor_fn);
    var _String_cons_fn = function (chr, str) {
        return chr + str;
    }, _String_cons = F2(_String_cons_fn);
    function _String_uncons(string) {
        var word = string.charCodeAt(0);
        return !isNaN(word)
            ? $elm$core$Maybe$Just(55296 <= word && word <= 56319
                ? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
                : _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1)))
            : $elm$core$Maybe$Nothing;
    }
    var _String_append_fn = function (a, b) {
        return a + b;
    }, _String_append = F2(_String_append_fn);
    function _String_length(str) {
        return str.length;
    }
    var _String_map_fn = function (func, string) {
        var len = string.length;
        var array = new Array(len);
        var i = 0;
        while (i < len) {
            var word = string.charCodeAt(i);
            if (55296 <= word && word <= 56319) {
                array[i] = func(_Utils_chr(string[i] + string[i + 1]));
                i += 2;
                continue;
            }
            array[i] = func(_Utils_chr(string[i]));
            i++;
        }
        return array.join("");
    }, _String_map = F2(_String_map_fn);
    var _String_filter_fn = function (isGood, str) {
        var arr = [];
        var len = str.length;
        var i = 0;
        while (i < len) {
            var char = str[i];
            var word = str.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += str[i];
                i++;
            }
            if (isGood(_Utils_chr(char))) {
                arr.push(char);
            }
        }
        return arr.join("");
    }, _String_filter = F2(_String_filter_fn);
    function _String_reverse(str) {
        var len = str.length;
        var arr = new Array(len);
        var i = 0;
        while (i < len) {
            var word = str.charCodeAt(i);
            if (55296 <= word && word <= 56319) {
                arr[len - i] = str[i + 1];
                i++;
                arr[len - i] = str[i - 1];
                i++;
            }
            else {
                arr[len - i] = str[i];
                i++;
            }
        }
        return arr.join("");
    }
    var _String_foldl_fn = function (func, state, string) {
        var len = string.length;
        var i = 0;
        while (i < len) {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += string[i];
                i++;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    }, _String_foldl_fn_unwrapped = function (func, state, string) {
        var len = string.length;
        var i = 0;
        while (i < len) {
            var char = string[i];
            var word = string.charCodeAt(i);
            i++;
            if (55296 <= word && word <= 56319) {
                char += string[i];
                i++;
            }
            state = func(_Utils_chr(char), state);
        }
        return state;
    }, _String_foldl = F3(_String_foldl_fn);
    var _String_foldr_fn = function (func, state, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            state = A2(func, _Utils_chr(char), state);
        }
        return state;
    }, _String_foldr_fn_unwrapped = function (func, state, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            state = func(_Utils_chr(char), state);
        }
        return state;
    }, _String_foldr = F3(_String_foldr_fn);
    var _String_split_fn = function (sep, str) {
        return str.split(sep);
    }, _String_split = F2(_String_split_fn);
    var _String_join_fn = function (sep, strs) {
        return strs.join(sep);
    }, _String_join = F2(_String_join_fn);
    var _String_slice_fn = function (start, end, str) {
        return str.slice(start, end);
    }, _String_slice = F3(_String_slice_fn);
    function _String_trim(str) {
        return str.trim();
    }
    function _String_trimLeft(str) {
        return str.replace(/^\s+/, "");
    }
    function _String_trimRight(str) {
        return str.replace(/\s+$/, "");
    }
    function _String_words(str) {
        return _List_fromArray(str.trim().split(/\s+/g));
    }
    function _String_lines(str) {
        return _List_fromArray(str.split(/\r\n|\r|\n/g));
    }
    function _String_toUpper(str) {
        return str.toUpperCase();
    }
    function _String_toLower(str) {
        return str.toLowerCase();
    }
    var _String_any_fn = function (isGood, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            if (isGood(_Utils_chr(char))) {
                return true;
            }
        }
        return false;
    }, _String_any = F2(_String_any_fn);
    var _String_all_fn = function (isGood, string) {
        var i = string.length;
        while (i--) {
            var char = string[i];
            var word = string.charCodeAt(i);
            if (56320 <= word && word <= 57343) {
                i--;
                char = string[i] + char;
            }
            if (!isGood(_Utils_chr(char))) {
                return false;
            }
        }
        return true;
    }, _String_all = F2(_String_all_fn);
    var _String_contains_fn = function (sub, str) {
        return str.indexOf(sub) > -1;
    }, _String_contains = F2(_String_contains_fn);
    var _String_startsWith_fn = function (sub, str) {
        return str.indexOf(sub) === 0;
    }, _String_startsWith = F2(_String_startsWith_fn);
    var _String_endsWith_fn = function (sub, str) {
        return str.length >= sub.length &&
            str.lastIndexOf(sub) === str.length - sub.length;
    }, _String_endsWith = F2(_String_endsWith_fn);
    var _String_indexes_fn = function (sub, str) {
        var subLen = sub.length;
        if (subLen < 1) {
            return _List_Nil;
        }
        var i = 0;
        var is = [];
        while ((i = str.indexOf(sub, i)) > -1) {
            is.push(i);
            i = i + subLen;
        }
        return _List_fromArray(is);
    }, _String_indexes = F2(_String_indexes_fn);
    // TO STRING
    function _String_fromNumber(number) {
        return number + "";
    }
    // INT CONVERSIONS
    function _String_toInt(str) {
        var total = 0;
        var code0 = str.charCodeAt(0);
        var start = code0 == 43 /* + */ || code0 == 45 /* - */ ? 1 : 0;
        for (var i = start; i < str.length; ++i) {
            var code = str.charCodeAt(i);
            if (code < 48 || 57 < code) {
                return $elm$core$Maybe$Nothing;
            }
            total = 10 * total + code - 48;
        }
        return i == start
            ? $elm$core$Maybe$Nothing
            : $elm$core$Maybe$Just(code0 == 45 ? -total : total);
    }
    // FLOAT CONVERSIONS
    function _String_toFloat(s) {
        // check if it is a hex, octal, or binary number
        if (s.length === 0 || /[\sxbo]/.test(s)) {
            return $elm$core$Maybe$Nothing;
        }
        var n = +s;
        // faster isNaN check
        return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
    }
    function _String_fromList(chars) {
        return _List_toArray(chars).join("");
    }
    function _Char_toCode(char) {
        var code = char.charCodeAt(0);
        if (55296 <= code && code <= 56319) {
            return (code - 55296) * 1024 + char.charCodeAt(1) - 56320 + 65536;
        }
        return code;
    }
    function _Char_fromCode(code) {
        return _Utils_chr((code < 0 || 1114111 < code)
            ? "\uFFFD"
            :
                (code <= 65535)
                    ? String.fromCharCode(code)
                    :
                        (code -= 65536,
                            String.fromCharCode(Math.floor(code / 1024) + 55296, code % 1024 + 56320)));
    }
    function _Char_toUpper(char) {
        return _Utils_chr(char.toUpperCase());
    }
    function _Char_toLower(char) {
        return _Utils_chr(char.toLowerCase());
    }
    function _Char_toLocaleUpper(char) {
        return _Utils_chr(char.toLocaleUpperCase());
    }
    function _Char_toLocaleLower(char) {
        return _Utils_chr(char.toLocaleLowerCase());
    }
    /**_UNUSED/
    function _Json_errorToString(error)
    {
        return $elm$json$Json$Decode$errorToString(error);
    }
    //*/
    // CORE DECODERS
    function _Json_succeed(msg) {
        return {
            $: 0,
            a: msg
        };
    }
    function _Json_fail(msg) {
        return {
            $: 1,
            a: msg
        };
    }
    function _Json_decodePrim(decoder) {
        return { $: 2, b: decoder };
    }
    var _Json_decodeInt = _Json_decodePrim(function (value) {
        return (typeof value !== "number")
            ? _Json_expecting("an INT", value)
            :
                (-2147483647 < value && value < 2147483647 && (value | 0) === value)
                    ? $elm$core$Result$Ok(value)
                    :
                        (isFinite(value) && !(value % 1))
                            ? $elm$core$Result$Ok(value)
                            : _Json_expecting("an INT", value);
    });
    var _Json_decodeBool = _Json_decodePrim(function (value) {
        return (typeof value === "boolean")
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a BOOL", value);
    });
    var _Json_decodeFloat = _Json_decodePrim(function (value) {
        return (typeof value === "number")
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a FLOAT", value);
    });
    var _Json_decodeValue = _Json_decodePrim(function (value) {
        return $elm$core$Result$Ok(_Json_wrap(value));
    });
    var _Json_decodeString = _Json_decodePrim(function (value) {
        return (typeof value === "string")
            ? $elm$core$Result$Ok(value)
            : (value instanceof String)
                ? $elm$core$Result$Ok(value + "")
                : _Json_expecting("a STRING", value);
    });
    function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
    function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }
    function _Json_decodeNull(value) { return { $: 5, c: value }; }
    var _Json_decodeField_fn = function (field, decoder) {
        return {
            $: 6,
            d: field,
            b: decoder
        };
    }, _Json_decodeField = F2(_Json_decodeField_fn);
    var _Json_decodeIndex_fn = function (index, decoder) {
        return {
            $: 7,
            e: index,
            b: decoder
        };
    }, _Json_decodeIndex = F2(_Json_decodeIndex_fn);
    function _Json_decodeKeyValuePairs(decoder) {
        return {
            $: 8,
            b: decoder
        };
    }
    function _Json_mapMany(f, decoders) {
        return {
            $: 9,
            f: f,
            g: decoders
        };
    }
    var _Json_andThen_fn = function (callback, decoder) {
        return {
            $: 10,
            b: decoder,
            h: callback
        };
    }, _Json_andThen = F2(_Json_andThen_fn);
    function _Json_oneOf(decoders) {
        return {
            $: 11,
            g: decoders
        };
    }
    // DECODING OBJECTS
    var _Json_map1_fn = function (f, d1) {
        return _Json_mapMany(f, [d1]);
    }, _Json_map1 = F2(_Json_map1_fn);
    var _Json_map2_fn = function (f, d1, d2) {
        return _Json_mapMany(f, [d1, d2]);
    }, _Json_map2 = F3(_Json_map2_fn);
    var _Json_map3_fn = function (f, d1, d2, d3) {
        return _Json_mapMany(f, [d1, d2, d3]);
    }, _Json_map3 = F4(_Json_map3_fn);
    var _Json_map4_fn = function (f, d1, d2, d3, d4) {
        return _Json_mapMany(f, [d1, d2, d3, d4]);
    }, _Json_map4 = F5(_Json_map4_fn);
    var _Json_map5_fn = function (f, d1, d2, d3, d4, d5) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
    }, _Json_map5 = F6(_Json_map5_fn);
    var _Json_map6_fn = function (f, d1, d2, d3, d4, d5, d6) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
    }, _Json_map6 = F7(_Json_map6_fn);
    var _Json_map7_fn = function (f, d1, d2, d3, d4, d5, d6, d7) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
    }, _Json_map7 = F8(_Json_map7_fn);
    var _Json_map8_fn = function (f, d1, d2, d3, d4, d5, d6, d7, d8) {
        return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
    }, _Json_map8 = F9(_Json_map8_fn);
    // DECODE
    var _Json_runOnString_fn = function (decoder, string) {
        try {
            var value = JSON.parse(string);
            return _Json_runHelp(decoder, value);
        }
        catch (e) {
            return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn("This is not valid JSON! " + e.message, _Json_wrap(string)));
        }
    }, _Json_runOnString = F2(_Json_runOnString_fn);
    var _Json_run_fn = function (decoder, value) {
        return _Json_runHelp(decoder, _Json_unwrap(value));
    }, _Json_run = F2(_Json_run_fn);
    function _Json_runHelp(decoder, value) {
        switch (decoder.$) {
            case 2:
                return decoder.b(value);
            case 5:
                return (value === null)
                    ? $elm$core$Result$Ok(decoder.c)
                    : _Json_expecting("null", value);
            case 3:
                if (!_Json_isArray(value)) {
                    return _Json_expecting("a LIST", value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);
            case 4:
                if (!_Json_isArray(value)) {
                    return _Json_expecting("an ARRAY", value);
                }
                return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);
            case 6:
                var field = decoder.d;
                if (typeof value !== "object" || value === null || !(field in value)) {
                    return _Json_expecting("an OBJECT with a field named `" + field + "`", value);
                }
                var result = _Json_runHelp(decoder.b, value[field]);
                return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err($elm$json$Json$Decode$Field_fn(field, result.a));
            case 7:
                var index = decoder.e;
                if (!_Json_isArray(value)) {
                    return _Json_expecting("an ARRAY", value);
                }
                if (index >= value.length) {
                    return _Json_expecting("a LONGER array. Need index " + index + " but only see " + value.length + " entries", value);
                }
                var result = _Json_runHelp(decoder.b, value[index]);
                return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err($elm$json$Json$Decode$Index_fn(index, result.a));
            case 8:
                if (typeof value !== "object" || value === null || _Json_isArray(value)) {
                    return _Json_expecting("an OBJECT", value);
                }
                var keyValuePairs = _List_Nil;
                // TODO test perf of Object.keys and switch when support is good enough
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        var result = _Json_runHelp(decoder.b, value[key]);
                        if (!$elm$core$Result$isOk(result)) {
                            return $elm$core$Result$Err($elm$json$Json$Decode$Field_fn(key, result.a));
                        }
                        keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
                    }
                }
                return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));
            case 9:
                var answer = decoder.f;
                var decoders = decoder.g;
                for (var i = 0; i < decoders.length; i++) {
                    var result = _Json_runHelp(decoders[i], value);
                    if (!$elm$core$Result$isOk(result)) {
                        return result;
                    }
                    answer = answer(result.a);
                }
                return $elm$core$Result$Ok(answer);
            case 10:
                var result = _Json_runHelp(decoder.b, value);
                return (!$elm$core$Result$isOk(result))
                    ? result
                    : _Json_runHelp(decoder.h(result.a), value);
            case 11:
                var errors = _List_Nil;
                for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
                 {
                    var result = _Json_runHelp(temp.a, value);
                    if ($elm$core$Result$isOk(result)) {
                        return result;
                    }
                    errors = _List_Cons(result.a, errors);
                }
                return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));
            case 1:
                return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn(decoder.a, _Json_wrap(value)));
            case 0:
                return $elm$core$Result$Ok(decoder.a);
        }
    }
    function _Json_runArrayDecoder(decoder, value, toElmValue) {
        var len = value.length;
        var array = new Array(len);
        for (var i = 0; i < len; i++) {
            var result = _Json_runHelp(decoder, value[i]);
            if (!$elm$core$Result$isOk(result)) {
                return $elm$core$Result$Err($elm$json$Json$Decode$Index_fn(i, result.a));
            }
            array[i] = result.a;
        }
        return $elm$core$Result$Ok(toElmValue(array));
    }
    function _Json_isArray(value) {
        return Array.isArray(value) || (typeof FileList !== "undefined" && value instanceof FileList);
    }
    function _Json_toElmArray(array) {
        return $elm$core$Array$initialize_fn(array.length, function (i) { return array[i]; });
    }
    function _Json_expecting(type, value) {
        return $elm$core$Result$Err($elm$json$Json$Decode$Failure_fn("Expecting " + type, _Json_wrap(value)));
    }
    // EQUALITY
    function _Json_equality(x, y) {
        if (x === y) {
            return true;
        }
        if (x.$ !== y.$) {
            return false;
        }
        switch (x.$) {
            case 0:
            case 1:
                return x.a === y.a;
            case 2:
                return x.b === y.b;
            case 5:
                return x.c === y.c;
            case 3:
            case 4:
            case 8:
                return _Json_equality(x.b, y.b);
            case 6:
                return x.d === y.d && _Json_equality(x.b, y.b);
            case 7:
                return x.e === y.e && _Json_equality(x.b, y.b);
            case 9:
                return x.f === y.f && _Json_listEquality(x.g, y.g);
            case 10:
                return x.h === y.h && _Json_equality(x.b, y.b);
            case 11:
                return _Json_listEquality(x.g, y.g);
        }
    }
    function _Json_listEquality(aDecoders, bDecoders) {
        var len = aDecoders.length;
        if (len !== bDecoders.length) {
            return false;
        }
        for (var i = 0; i < len; i++) {
            if (!_Json_equality(aDecoders[i], bDecoders[i])) {
                return false;
            }
        }
        return true;
    }
    // ENCODE
    var _Json_encode_fn = function (indentLevel, value) {
        return JSON.stringify(_Json_unwrap(value), null, indentLevel) + "";
    }, _Json_encode = F2(_Json_encode_fn);
    function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
    function _Json_unwrap_UNUSED(value) { return value.a; }
    function _Json_wrap(value) { return value; }
    function _Json_unwrap(value) { return value; }
    function _Json_emptyArray() { return []; }
    function _Json_emptyObject() { return {}; }
    var _Json_addField_fn = function (key, value, object) {
        object[key] = _Json_unwrap(value);
        return object;
    }, _Json_addField = F3(_Json_addField_fn);
    function _Json_addEntry(func) {
        return F2(function (entry, array) {
            array.push(_Json_unwrap(func(entry)));
            return array;
        });
    }
    var _Json_encodeNull = _Json_wrap(null);
    // TASKS
    function _Scheduler_succeed(value) {
        return {
            $: 0,
            a: value
        };
    }
    function _Scheduler_fail(error) {
        return {
            $: 1,
            a: error
        };
    }
    function _Scheduler_binding(callback) {
        return {
            $: 2,
            b: callback,
            c: null
        };
    }
    var _Scheduler_andThen_fn = function (callback, task) {
        return {
            $: 3,
            b: callback,
            d: task
        };
    }, _Scheduler_andThen = F2(_Scheduler_andThen_fn);
    var _Scheduler_onError_fn = function (callback, task) {
        return {
            $: 4,
            b: callback,
            d: task
        };
    }, _Scheduler_onError = F2(_Scheduler_onError_fn);
    function _Scheduler_receive(callback) {
        return {
            $: 5,
            b: callback
        };
    }
    // PROCESSES
    var _Scheduler_guid = 0;
    function _Scheduler_rawSpawn(task) {
        var proc = {
            $: 0,
            e: _Scheduler_guid++,
            f: task,
            g: null,
            h: []
        };
        _Scheduler_enqueue(proc);
        return proc;
    }
    function _Scheduler_spawn(task) {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
        });
    }
    function _Scheduler_rawSend(proc, msg) {
        proc.h.push(msg);
        _Scheduler_enqueue(proc);
    }
    var _Scheduler_send_fn = function (proc, msg) {
        return _Scheduler_binding(function (callback) {
            _Scheduler_rawSend(proc, msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }, _Scheduler_send = F2(_Scheduler_send_fn);
    function _Scheduler_kill(proc) {
        return _Scheduler_binding(function (callback) {
            var task = proc.f;
            if (task.$ === 2 && task.c) {
                task.c();
            }
            proc.f = null;
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }
    /* STEP PROCESSES
    
    type alias Process =
      { $ : tag
      , id : unique_id
      , root : Task
      , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
      , mailbox : [msg]
      }
    
    */
    var _Scheduler_working = false;
    var _Scheduler_queue = [];
    function _Scheduler_enqueue(proc) {
        _Scheduler_queue.push(proc);
        if (_Scheduler_working) {
            return;
        }
        _Scheduler_working = true;
        while (proc = _Scheduler_queue.shift()) {
            _Scheduler_step(proc);
        }
        _Scheduler_working = false;
    }
    function _Scheduler_step(proc) {
        while (proc.f) {
            var rootTag = proc.f.$;
            if (rootTag === 0 || rootTag === 1) {
                while (proc.g && proc.g.$ !== rootTag) {
                    proc.g = proc.g.i;
                }
                if (!proc.g) {
                    return;
                }
                proc.f = proc.g.b(proc.f.a);
                proc.g = proc.g.i;
            }
            else if (rootTag === 2) {
                proc.f.c = proc.f.b(function (newRoot) {
                    proc.f = newRoot;
                    _Scheduler_enqueue(proc);
                });
                return;
            }
            else if (rootTag === 5) {
                if (proc.h.length === 0) {
                    return;
                }
                proc.f = proc.f.b(proc.h.shift());
            }
            else // if (rootTag === 3 || rootTag === 4)
             {
                proc.g = {
                    $: rootTag === 3 ? 0 : 1,
                    b: proc.f.b,
                    i: proc.g
                };
                proc.f = proc.f.d;
            }
        }
    }
    function _Process_sleep(time) {
        return _Scheduler_binding(function (callback) {
            var id = setTimeout(function () {
                callback(_Scheduler_succeed(_Utils_Tuple0));
            }, time);
            return function () { clearTimeout(id); };
        });
    }
    // PROGRAMS
    var _Platform_worker_fn = function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.hv, impl.iN, impl.ir, function () { return function () { }; });
    }, _Platform_worker = F4(_Platform_worker_fn);
    // INITIALIZE A PROGRAM
    function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder) {
        var result = _Json_run_fn(flagDecoder, _Json_wrap(args ? args["flags"] : undefined));
        $elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
        var managers = {};
        var initPair = init(result.a);
        var model = initPair.a;
        var stepper = stepperBuilder(sendToApp, model);
        var ports = _Platform_setupEffects(managers, sendToApp);
        function sendToApp(msg, viewMetadata) {
            var pair = A2(update, msg, model);
            stepper(model = pair.a, viewMetadata);
            _Platform_enqueueEffects(managers, pair.b, subscriptions(model));
        }
        _Platform_enqueueEffects(managers, initPair.b, subscriptions(model));
        return ports ? { ports: ports } : {};
    }
    // TRACK PRELOADS
    //
    // This is used by code in elm/browser and elm/http
    // to register any HTTP requests that are triggered by init.
    //
    var _Platform_preload;
    function _Platform_registerPreload(url) {
        _Platform_preload.add(url);
    }
    // EFFECT MANAGERS
    var _Platform_effectManagers = {};
    function _Platform_setupEffects(managers, sendToApp) {
        var ports;
        // setup all necessary effect managers
        for (var key in _Platform_effectManagers) {
            var manager = _Platform_effectManagers[key];
            if (manager.a) {
                ports = ports || {};
                ports[key] = manager.a(key, sendToApp);
            }
            managers[key] = _Platform_instantiateManager(manager, sendToApp);
        }
        return ports;
    }
    function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap) {
        return {
            b: init,
            c: onEffects,
            d: onSelfMsg,
            e: cmdMap,
            f: subMap
        };
    }
    function _Platform_instantiateManager(info, sendToApp) {
        var router = {
            g: sendToApp,
            h: undefined
        };
        var onEffects = info.c;
        var onSelfMsg = info.d;
        var cmdMap = info.e;
        var subMap = info.f;
        function loop(state) {
            return _Scheduler_andThen_fn(loop, _Scheduler_receive(function (msg) {
                var value = msg.a;
                if (msg.$ === 0) {
                    return A3(onSelfMsg, router, value, state);
                }
                return cmdMap && subMap
                    ? A4(onEffects, router, value.i, value.j, state)
                    : A3(onEffects, router, cmdMap ? value.i : value.j, state);
            }));
        }
        return router.h = _Scheduler_rawSpawn(_Scheduler_andThen_fn(loop, info.b));
    }
    // ROUTING
    var _Platform_sendToApp_fn = function (router, msg) {
        return _Scheduler_binding(function (callback) {
            router.g(msg);
            callback(_Scheduler_succeed(_Utils_Tuple0));
        });
    }, _Platform_sendToApp = F2(_Platform_sendToApp_fn);
    var _Platform_sendToSelf_fn = function (router, msg) {
        return _Scheduler_send_fn(router.h, {
            $: 0,
            a: msg
        });
    }, _Platform_sendToSelf = F2(_Platform_sendToSelf_fn);
    // BAGS
    function _Platform_leaf(home) {
        return function (value) {
            return {
                $: 1,
                k: home,
                l: value
            };
        };
    }
    function _Platform_batch(list) {
        return {
            $: 2,
            m: list
        };
    }
    var _Platform_map_fn = function (tagger, bag) {
        return {
            $: 3,
            n: tagger,
            o: bag
        };
    }, _Platform_map = F2(_Platform_map_fn);
    // PIPE BAGS INTO EFFECT MANAGERS
    //
    // Effects must be queued!
    //
    // Say your init contains a synchronous command, like Time.now or Time.here
    //
    //   - This will produce a batch of effects (FX_1)
    //   - The synchronous task triggers the subsequent `update` call
    //   - This will produce a batch of effects (FX_2)
    //
    // If we just start dispatching FX_2, subscriptions from FX_2 can be processed
    // before subscriptions from FX_1. No good! Earlier versions of this code had
    // this problem, leading to these reports:
    //
    //   https://github.com/elm/core/issues/980
    //   https://github.com/elm/core/pull/981
    //   https://github.com/elm/compiler/issues/1776
    //
    // The queue is necessary to avoid ordering issues for synchronous commands.
    // Why use true/false here? Why not just check the length of the queue?
    // The goal is to detect "are we currently dispatching effects?" If we
    // are, we need to bail and let the ongoing while loop handle things.
    //
    // Now say the queue has 1 element. When we dequeue the final element,
    // the queue will be empty, but we are still actively dispatching effects.
    // So you could get queue jumping in a really tricky category of cases.
    //
    var _Platform_effectsQueue = [];
    var _Platform_effectsActive = false;
    function _Platform_enqueueEffects(managers, cmdBag, subBag) {
        _Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });
        if (_Platform_effectsActive)
            return;
        _Platform_effectsActive = true;
        for (var fx; fx = _Platform_effectsQueue.shift();) {
            _Platform_dispatchEffects(fx.p, fx.q, fx.r);
        }
        _Platform_effectsActive = false;
    }
    function _Platform_dispatchEffects(managers, cmdBag, subBag) {
        var effectsDict = {};
        _Platform_gatherEffects(true, cmdBag, effectsDict, null);
        _Platform_gatherEffects(false, subBag, effectsDict, null);
        for (var home in managers) {
            _Scheduler_rawSend(managers[home], {
                $: "fx",
                a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
            });
        }
    }
    function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers) {
        switch (bag.$) {
            case 1:
                var home = bag.k;
                var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
                effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
                return;
            case 2:
                for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
                 {
                    _Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
                }
                return;
            case 3:
                _Platform_gatherEffects(isCmd, bag.o, effectsDict, {
                    s: bag.n,
                    t: taggers
                });
                return;
        }
    }
    function _Platform_toEffect(isCmd, home, taggers, value) {
        function applyTaggers(x) {
            for (var temp = taggers; temp; temp = temp.t) {
                x = temp.s(x);
            }
            return x;
        }
        var map = isCmd
            ? _Platform_effectManagers[home].e
            : _Platform_effectManagers[home].f;
        return A2(map, applyTaggers, value);
    }
    function _Platform_insert(isCmd, newEffect, effects) {
        effects = effects || { i: _List_Nil, j: _List_Nil };
        isCmd
            ? (effects.i = _List_Cons(newEffect, effects.i))
            : (effects.j = _List_Cons(newEffect, effects.j));
        return effects;
    }
    // PORTS
    function _Platform_checkPortName(name) {
        if (_Platform_effectManagers[name]) {
            _Debug_crash(3, name);
        }
    }
    // OUTGOING PORTS
    function _Platform_outgoingPort(name, converter) {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            e: _Platform_outgoingPortMap,
            u: converter,
            a: _Platform_setupOutgoingPort
        };
        return _Platform_leaf(name);
    }
    var _Platform_outgoingPortMap_fn = function (tagger, value) { return value; }, _Platform_outgoingPortMap = F2(_Platform_outgoingPortMap_fn);
    function _Platform_setupOutgoingPort(name) {
        var subs = [];
        var converter = _Platform_effectManagers[name].u;
        // CREATE MANAGER
        var init = _Process_sleep(0);
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function (router, cmdList, state) {
            for (; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
             {
                // grab a separate reference to subs in case unsubscribe is called
                var currentSubs = subs;
                var value = _Json_unwrap(converter(cmdList.a));
                for (var i = 0; i < currentSubs.length; i++) {
                    currentSubs[i](value);
                }
            }
            return init;
        });
        // PUBLIC API
        function subscribe(callback) {
            subs.push(callback);
        }
        function unsubscribe(callback) {
            // copy subs into a new array in case unsubscribe is called within a
            // subscribed callback
            subs = subs.slice();
            var index = subs.indexOf(callback);
            if (index >= 0) {
                subs.splice(index, 1);
            }
        }
        return {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        };
    }
    // INCOMING PORTS
    function _Platform_incomingPort(name, converter) {
        _Platform_checkPortName(name);
        _Platform_effectManagers[name] = {
            f: _Platform_incomingPortMap,
            u: converter,
            a: _Platform_setupIncomingPort
        };
        return _Platform_leaf(name);
    }
    var _Platform_incomingPortMap_fn = function (tagger, finalTagger) {
        return function (value) {
            return tagger(finalTagger(value));
        };
    }, _Platform_incomingPortMap = F2(_Platform_incomingPortMap_fn);
    function _Platform_setupIncomingPort(name, sendToApp) {
        var subs = _List_Nil;
        var converter = _Platform_effectManagers[name].u;
        // CREATE MANAGER
        var init = _Scheduler_succeed(null);
        _Platform_effectManagers[name].b = init;
        _Platform_effectManagers[name].c = F3(function (router, subList, state) {
            subs = subList;
            return init;
        });
        // PUBLIC API
        function send(incomingValue) {
            var result = _Json_run_fn(converter, _Json_wrap(incomingValue));
            $elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);
            var value = result.a;
            for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
             {
                sendToApp(temp.a(value));
            }
        }
        return { send: send };
    }
    // EXPORT ELM MODULES
    //
    // Have DEBUG and PROD versions so that we can (1) give nicer errors in
    // debug mode and (2) not pay for the bits needed for that in prod mode.
    //
    function _Platform_export(exports) {
        scope["Elm"]
            ? _Platform_mergeExportsProd(scope["Elm"], exports)
            : scope["Elm"] = exports;
    }
    function _Platform_mergeExportsProd(obj, exports) {
        for (var name in exports) {
            (name in obj)
                ? (name == "init")
                    ? _Debug_crash(6)
                    : _Platform_mergeExportsProd(obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    function _Platform_export_UNUSED(exports) {
        scope["Elm"]
            ? _Platform_mergeExportsDebug("Elm", scope["Elm"], exports)
            : scope["Elm"] = exports;
    }
    function _Platform_mergeExportsDebug(moduleName, obj, exports) {
        for (var name in exports) {
            (name in obj)
                ? (name == "init")
                    ? _Debug_crash(6, moduleName)
                    : _Platform_mergeExportsDebug(moduleName + "." + name, obj[name], exports[name])
                : (obj[name] = exports[name]);
        }
    }
    // HELPERS
    var _VirtualDom_divertHrefToApp;
    var _VirtualDom_doc = typeof document !== "undefined" ? document : {};
    function _VirtualDom_appendChild(parent, child) {
        parent.appendChild(child);
    }
    var _VirtualDom_init_fn = function (virtualNode, flagDecoder, debugMetadata, args) {
        // NOTE: this function needs _Platform_export available to work
        /**/
        var node = args["node"];
        //*/
        /**_UNUSED/
        var node = args && args['node'] ? args['node'] : _Debug_crash(0);
        //*/
        node.parentNode.replaceChild(_VirtualDom_render(virtualNode, function () { }), node);
        return {};
    }, _VirtualDom_init = F4(_VirtualDom_init_fn);
    // TEXT
    function _VirtualDom_text(string) {
        return {
            $: 0,
            a: string
        };
    }
    // NODE
    var _VirtualDom_nodeNS_fn = function (namespace, tag) {
        return F2(function (factList, kidList) {
            for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
             {
                var kid = kidList.a;
                descendantsCount += (kid.b || 0);
                kids.push(kid);
            }
            descendantsCount += kids.length;
            return {
                $: 1,
                c: tag,
                d: _VirtualDom_organizeFacts(factList),
                e: kids,
                f: namespace,
                b: descendantsCount
            };
        });
    }, _VirtualDom_nodeNS = F2(_VirtualDom_nodeNS_fn);
    var _VirtualDom_node_a0 = undefined, _VirtualDom_node = _VirtualDom_nodeNS(_VirtualDom_node_a0);
    // KEYED NODE
    var _VirtualDom_keyedNodeNS_fn = function (namespace, tag) {
        return F2(function (factList, kidList) {
            for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
             {
                var kid = kidList.a;
                descendantsCount += (kid.b.b || 0);
                kids.push(kid);
            }
            descendantsCount += kids.length;
            return {
                $: 2,
                c: tag,
                d: _VirtualDom_organizeFacts(factList),
                e: kids,
                f: namespace,
                b: descendantsCount
            };
        });
    }, _VirtualDom_keyedNodeNS = F2(_VirtualDom_keyedNodeNS_fn);
    var _VirtualDom_keyedNode_a0 = undefined, _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(_VirtualDom_keyedNode_a0);
    // CUSTOM
    function _VirtualDom_custom(factList, model, render, diff) {
        return {
            $: 3,
            d: _VirtualDom_organizeFacts(factList),
            g: model,
            h: render,
            i: diff
        };
    }
    // MAP
    var _VirtualDom_map_fn = function (tagger, node) {
        return {
            $: 4,
            j: tagger,
            k: node,
            b: 1 + (node.b || 0)
        };
    }, _VirtualDom_map = F2(_VirtualDom_map_fn);
    // LAZY
    function _VirtualDom_thunk(refs, thunk) {
        return {
            $: 5,
            l: refs,
            m: thunk,
            k: undefined
        };
    }
    var _VirtualDom_lazy_fn = function (func, a) {
        return _VirtualDom_thunk([func, a], function () {
            return func(a);
        });
    }, _VirtualDom_lazy = F2(_VirtualDom_lazy_fn);
    var _VirtualDom_lazy2_fn = function (func, a, b) {
        return _VirtualDom_thunk([func, a, b], function () {
            return A2(func, a, b);
        });
    }, _VirtualDom_lazy2_fn_unwrapped = function (func, a, b) {
        return _VirtualDom_thunk([func, a, b], function () {
            return func(a, b);
        });
    }, _VirtualDom_lazy2 = F3(_VirtualDom_lazy2_fn);
    var _VirtualDom_lazy3_fn = function (func, a, b, c) {
        return _VirtualDom_thunk([func, a, b, c], function () {
            return A3(func, a, b, c);
        });
    }, _VirtualDom_lazy3_fn_unwrapped = function (func, a, b, c) {
        return _VirtualDom_thunk([func, a, b, c], function () {
            return func(a, b, c);
        });
    }, _VirtualDom_lazy3 = F4(_VirtualDom_lazy3_fn);
    var _VirtualDom_lazy4_fn = function (func, a, b, c, d) {
        return _VirtualDom_thunk([func, a, b, c, d], function () {
            return A4(func, a, b, c, d);
        });
    }, _VirtualDom_lazy4_fn_unwrapped = function (func, a, b, c, d) {
        return _VirtualDom_thunk([func, a, b, c, d], function () {
            return func(a, b, c, d);
        });
    }, _VirtualDom_lazy4 = F5(_VirtualDom_lazy4_fn);
    var _VirtualDom_lazy5_fn = function (func, a, b, c, d, e) {
        return _VirtualDom_thunk([func, a, b, c, d, e], function () {
            return A5(func, a, b, c, d, e);
        });
    }, _VirtualDom_lazy5_fn_unwrapped = function (func, a, b, c, d, e) {
        return _VirtualDom_thunk([func, a, b, c, d, e], function () {
            return func(a, b, c, d, e);
        });
    }, _VirtualDom_lazy5 = F6(_VirtualDom_lazy5_fn);
    var _VirtualDom_lazy6_fn = function (func, a, b, c, d, e, f) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f], function () {
            return A6(func, a, b, c, d, e, f);
        });
    }, _VirtualDom_lazy6_fn_unwrapped = function (func, a, b, c, d, e, f) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f], function () {
            return func(a, b, c, d, e, f);
        });
    }, _VirtualDom_lazy6 = F7(_VirtualDom_lazy6_fn);
    var _VirtualDom_lazy7_fn = function (func, a, b, c, d, e, f, g) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function () {
            return A7(func, a, b, c, d, e, f, g);
        });
    }, _VirtualDom_lazy7_fn_unwrapped = function (func, a, b, c, d, e, f, g) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function () {
            return func(a, b, c, d, e, f, g);
        });
    }, _VirtualDom_lazy7 = F8(_VirtualDom_lazy7_fn);
    var _VirtualDom_lazy8_fn = function (func, a, b, c, d, e, f, g, h) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function () {
            return A8(func, a, b, c, d, e, f, g, h);
        });
    }, _VirtualDom_lazy8_fn_unwrapped = function (func, a, b, c, d, e, f, g, h) {
        return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function () {
            return func(a, b, c, d, e, f, g, h);
        });
    }, _VirtualDom_lazy8 = F9(_VirtualDom_lazy8_fn);
    // FACTS
    var _VirtualDom_on_fn = function (key, handler) {
        return {
            $: "a0",
            n: key,
            o: handler
        };
    }, _VirtualDom_on = F2(_VirtualDom_on_fn);
    var _VirtualDom_style_fn = function (key, value) {
        return {
            $: "a1",
            n: key,
            o: value
        };
    }, _VirtualDom_style = F2(_VirtualDom_style_fn);
    var _VirtualDom_property_fn = function (key, value) {
        return {
            $: "a2",
            n: key,
            o: value
        };
    }, _VirtualDom_property = F2(_VirtualDom_property_fn);
    var _VirtualDom_attribute_fn = function (key, value) {
        return {
            $: "a3",
            n: key,
            o: value
        };
    }, _VirtualDom_attribute = F2(_VirtualDom_attribute_fn);
    var _VirtualDom_attributeNS_fn = function (namespace, key, value) {
        return {
            $: "a4",
            n: key,
            o: { f: namespace, o: value }
        };
    }, _VirtualDom_attributeNS = F3(_VirtualDom_attributeNS_fn);
    // XSS ATTACK VECTOR CHECKS
    function _VirtualDom_noScript(tag) {
        return tag == "script" ? "p" : tag;
    }
    function _VirtualDom_noOnOrFormAction(key) {
        return /^(on|formAction$)/i.test(key) ? "data-" + key : key;
    }
    function _VirtualDom_noInnerHtmlOrFormAction(key) {
        return key == "innerHTML" || key == "formAction" ? "data-" + key : key;
    }
    function _VirtualDom_noJavaScriptUri(value) {
        return /^javascript:/i.test(value.replace(/\s/g, "")) ? "" : value;
    }
    function _VirtualDom_noJavaScriptUri_UNUSED(value) {
        return /^javascript:/i.test(value.replace(/\s/g, ""))
            ? "javascript:alert(\"This is an XSS vector. Please use ports or web components instead.\")"
            : value;
    }
    function _VirtualDom_noJavaScriptOrHtmlUri(value) {
        return /^\s*(javascript:|data:text\/html)/i.test(value) ? "" : value;
    }
    function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value) {
        return /^\s*(javascript:|data:text\/html)/i.test(value)
            ? "javascript:alert(\"This is an XSS vector. Please use ports or web components instead.\")"
            : value;
    }
    // MAP FACTS
    var _VirtualDom_mapAttribute_fn = function (func, attr) {
        return (attr.$ === "a0")
            ? _VirtualDom_on_fn(attr.n, _VirtualDom_mapHandler(func, attr.o)) : attr;
    }, _VirtualDom_mapAttribute = F2(_VirtualDom_mapAttribute_fn);
    function _VirtualDom_mapHandler(func, handler) {
        var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);
        // 0 = Normal
        // 1 = MayStopPropagation
        // 2 = MayPreventDefault
        // 3 = Custom
        return {
            $: handler.$,
            a: !tag
                ? _Json_map1_fn(func, handler.a) : _Json_map2_fn(tag < 3
                ? _VirtualDom_mapEventTuple
                : _VirtualDom_mapEventRecord, $elm$json$Json$Decode$succeed(func), handler.a)
        };
    }
    var _VirtualDom_mapEventTuple_fn = function (func, tuple) {
        return _Utils_Tuple2(func(tuple.a), tuple.b);
    }, _VirtualDom_mapEventTuple = F2(_VirtualDom_mapEventTuple_fn);
    var _VirtualDom_mapEventRecord_fn = function (func, record) {
        return {
            T: func(record.T),
            ep: record.ep,
            dO: record.dO
        };
    }, _VirtualDom_mapEventRecord = F2(_VirtualDom_mapEventRecord_fn);
    // ORGANIZE FACTS
    function _VirtualDom_organizeFacts(factList) {
        for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
         {
            var entry = factList.a;
            var tag = entry.$;
            var key = entry.n;
            var value = entry.o;
            if (tag === "a2") {
                (key === "className")
                    ? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
                    : facts[key] = _Json_unwrap(value);
                continue;
            }
            var subFacts = facts[tag] || (facts[tag] = {});
            (tag === "a3" && key === "class")
                ? _VirtualDom_addClass(subFacts, key, value)
                : subFacts[key] = value;
        }
        return facts;
    }
    function _VirtualDom_addClass(object, key, newClass) {
        var classes = object[key];
        object[key] = classes ? classes + " " + newClass : newClass;
    }
    // RENDER
    function _VirtualDom_render(vNode, eventNode) {
        var tag = vNode.$;
        if (tag === 5) {
            return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
        }
        if (tag === 0) {
            return _VirtualDom_doc.createTextNode(vNode.a);
        }
        if (tag === 4) {
            var subNode = vNode.k;
            var tagger = vNode.j;
            while (subNode.$ === 4) {
                typeof tagger !== "object"
                    ? tagger = [tagger, subNode.j]
                    : tagger.push(subNode.j);
                subNode = subNode.k;
            }
            var subEventRoot = { j: tagger, p: eventNode };
            var domNode = _VirtualDom_render(subNode, subEventRoot);
            domNode.elm_event_node_ref = subEventRoot;
            return domNode;
        }
        if (tag === 3) {
            var domNode = vNode.h(vNode.g);
            _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
            return domNode;
        }
        // at this point `tag` must be 1 or 2
        var domNode = vNode.f
            ? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
            : _VirtualDom_doc.createElement(vNode.c);
        if (_VirtualDom_divertHrefToApp && vNode.c == "a") {
            domNode.addEventListener("click", _VirtualDom_divertHrefToApp(domNode));
        }
        _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
        for (var kids = vNode.e, i = 0; i < kids.length; i++) {
            _VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
        }
        return domNode;
    }
    // APPLY FACTS
    function _VirtualDom_applyFacts(domNode, eventNode, facts) {
        for (var key in facts) {
            var value = facts[key];
            key === "a1"
                ? _VirtualDom_applyStyles(domNode, value)
                :
                    key === "a0"
                        ? _VirtualDom_applyEvents(domNode, eventNode, value)
                        :
                            key === "a3"
                                ? _VirtualDom_applyAttrs(domNode, value)
                                :
                                    key === "a4"
                                        ? _VirtualDom_applyAttrsNS(domNode, value)
                                        :
                                            ((key !== "value" && key !== "checked") || domNode[key] !== value) && (domNode[key] = value);
        }
    }
    // APPLY STYLES
    function _VirtualDom_applyStyles(domNode, styles) {
        var domNodeStyle = domNode.style;
        for (var key in styles) {
            domNodeStyle[key] = styles[key];
        }
    }
    // APPLY ATTRS
    function _VirtualDom_applyAttrs(domNode, attrs) {
        for (var key in attrs) {
            var value = attrs[key];
            typeof value !== "undefined"
                ? domNode.setAttribute(key, value)
                : domNode.removeAttribute(key);
        }
    }
    // APPLY NAMESPACED ATTRS
    function _VirtualDom_applyAttrsNS(domNode, nsAttrs) {
        for (var key in nsAttrs) {
            var pair = nsAttrs[key];
            var namespace = pair.f;
            var value = pair.o;
            typeof value !== "undefined"
                ? domNode.setAttributeNS(namespace, key, value)
                : domNode.removeAttributeNS(namespace, key);
        }
    }
    // APPLY EVENTS
    function _VirtualDom_applyEvents(domNode, eventNode, events) {
        var allCallbacks = domNode.elmFs || (domNode.elmFs = {});
        for (var key in events) {
            var newHandler = events[key];
            var oldCallback = allCallbacks[key];
            if (!newHandler) {
                domNode.removeEventListener(key, oldCallback);
                allCallbacks[key] = undefined;
                continue;
            }
            if (oldCallback) {
                var oldHandler = oldCallback.q;
                if (oldHandler.$ === newHandler.$) {
                    oldCallback.q = newHandler;
                    continue;
                }
                domNode.removeEventListener(key, oldCallback);
            }
            oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
            domNode.addEventListener(key, oldCallback, _VirtualDom_passiveSupported
                && { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 });
            allCallbacks[key] = oldCallback;
        }
    }
    // PASSIVE EVENTS
    var _VirtualDom_passiveSupported;
    try {
        window.addEventListener("t", null, Object.defineProperty({}, "passive", {
            get: function () { _VirtualDom_passiveSupported = true; }
        }));
    }
    catch (e) { }
    // EVENT HANDLERS
    function _VirtualDom_makeCallback(eventNode, initialHandler) {
        function callback(event) {
            var handler = callback.q;
            var result = _Json_runHelp(handler.a, event);
            if (!$elm$core$Result$isOk(result)) {
                return;
            }
            var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);
            // 0 = Normal
            // 1 = MayStopPropagation
            // 2 = MayPreventDefault
            // 3 = Custom
            var value = result.a;
            var message = !tag ? value : tag < 3 ? value.a : value.T;
            var stopPropagation = tag == 1 ? value.b : tag == 3 && value.ep;
            var currentEventNode = (stopPropagation && event.stopPropagation(),
                (tag == 2 ? value.b : tag == 3 && value.dO) && event.preventDefault(),
                eventNode);
            var tagger;
            var i;
            while (tagger = currentEventNode.j) {
                if (typeof tagger == "function") {
                    message = tagger(message);
                }
                else {
                    for (var i = tagger.length; i--;) {
                        message = tagger[i](message);
                    }
                }
                currentEventNode = currentEventNode.p;
            }
            currentEventNode(message, stopPropagation); // stopPropagation implies isSync
        }
        callback.q = initialHandler;
        return callback;
    }
    function _VirtualDom_equalEvents(x, y) {
        return x.$ == y.$ && _Json_equality(x.a, y.a);
    }
    // DIFF
    // TODO: Should we do patches like in iOS?
    //
    // type Patch
    //   = At Int Patch
    //   | Batch (List Patch)
    //   | Change ...
    //
    // How could it not be better?
    //
    function _VirtualDom_diff(x, y) {
        var patches = [];
        _VirtualDom_diffHelp(x, y, patches, 0);
        return patches;
    }
    function _VirtualDom_pushPatch(patches, type, index, data) {
        var patch = {
            $: type,
            r: index,
            s: data,
            t: undefined,
            u: undefined
        };
        patches.push(patch);
        return patch;
    }
    function _VirtualDom_diffHelp(x, y, patches, index) {
        if (x === y) {
            return;
        }
        var xType = x.$;
        var yType = y.$;
        // Bail if you run into different types of nodes. Implies that the
        // structure has changed significantly and it's not worth a diff.
        if (xType !== yType) {
            if (xType === 1 && yType === 2) {
                y = _VirtualDom_dekey(y);
                yType = 1;
            }
            else {
                _VirtualDom_pushPatch(patches, 0, index, y);
                return;
            }
        }
        // Now we know that both nodes are the same $.
        switch (yType) {
            case 5:
                var xRefs = x.l;
                var yRefs = y.l;
                var i = xRefs.length;
                var same = i === yRefs.length;
                while (same && i--) {
                    same = xRefs[i] === yRefs[i];
                }
                if (same) {
                    y.k = x.k;
                    return;
                }
                y.k = y.m();
                var subPatches = [];
                _VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
                subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
                return;
            case 4:
                // gather nested taggers
                var xTaggers = x.j;
                var yTaggers = y.j;
                var nesting = false;
                var xSubNode = x.k;
                while (xSubNode.$ === 4) {
                    nesting = true;
                    typeof xTaggers !== "object"
                        ? xTaggers = [xTaggers, xSubNode.j]
                        : xTaggers.push(xSubNode.j);
                    xSubNode = xSubNode.k;
                }
                var ySubNode = y.k;
                while (ySubNode.$ === 4) {
                    nesting = true;
                    typeof yTaggers !== "object"
                        ? yTaggers = [yTaggers, ySubNode.j]
                        : yTaggers.push(ySubNode.j);
                    ySubNode = ySubNode.k;
                }
                // Just bail if different numbers of taggers. This implies the
                // structure of the virtual DOM has changed.
                if (nesting && xTaggers.length !== yTaggers.length) {
                    _VirtualDom_pushPatch(patches, 0, index, y);
                    return;
                }
                // check if taggers are "the same"
                if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers) {
                    _VirtualDom_pushPatch(patches, 2, index, yTaggers);
                }
                // diff everything below the taggers
                _VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
                return;
            case 0:
                if (x.a !== y.a) {
                    _VirtualDom_pushPatch(patches, 3, index, y.a);
                }
                return;
            case 1:
                _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
                return;
            case 2:
                _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
                return;
            case 3:
                if (x.h !== y.h) {
                    _VirtualDom_pushPatch(patches, 0, index, y);
                    return;
                }
                var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
                factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
                var patch = y.i(x.g, y.g);
                patch && _VirtualDom_pushPatch(patches, 5, index, patch);
                return;
        }
    }
    // assumes the incoming arrays are the same length
    function _VirtualDom_pairwiseRefEqual(as, bs) {
        for (var i = 0; i < as.length; i++) {
            if (as[i] !== bs[i]) {
                return false;
            }
        }
        return true;
    }
    function _VirtualDom_diffNodes(x, y, patches, index, diffKids) {
        // Bail if obvious indicators have changed. Implies more serious
        // structural changes such that it's not worth it to diff.
        if (x.c !== y.c || x.f !== y.f) {
            _VirtualDom_pushPatch(patches, 0, index, y);
            return;
        }
        var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
        factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);
        diffKids(x, y, patches, index);
    }
    // DIFF FACTS
    // TODO Instead of creating a new diff object, it's possible to just test if
    // there *is* a diff. During the actual patch, do the diff again and make the
    // modifications directly. This way, there's no new allocations. Worth it?
    function _VirtualDom_diffFacts(x, y, category) {
        var diff;
        // look for changes and removals
        for (var xKey in x) {
            if (xKey === "a1" || xKey === "a0" || xKey === "a3" || xKey === "a4") {
                var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
                if (subDiff) {
                    diff = diff || {};
                    diff[xKey] = subDiff;
                }
                continue;
            }
            // remove if not in the new facts
            if (!(xKey in y)) {
                diff = diff || {};
                diff[xKey] =
                    !category
                        ? (typeof x[xKey] === "string" ? "" : null)
                        :
                            (category === "a1")
                                ? ""
                                :
                                    (category === "a0" || category === "a3")
                                        ? undefined
                                        :
                                            { f: x[xKey].f, o: undefined };
                continue;
            }
            var xValue = x[xKey];
            var yValue = y[xKey];
            // reference equal, so don't worry about it
            if (xValue === yValue && xKey !== "value" && xKey !== "checked"
                || category === "a0" && _VirtualDom_equalEvents(xValue, yValue)) {
                continue;
            }
            diff = diff || {};
            diff[xKey] = yValue;
        }
        // add new stuff
        for (var yKey in y) {
            if (!(yKey in x)) {
                diff = diff || {};
                diff[yKey] = y[yKey];
            }
        }
        return diff;
    }
    // DIFF KIDS
    function _VirtualDom_diffKids(xParent, yParent, patches, index) {
        var xKids = xParent.e;
        var yKids = yParent.e;
        var xLen = xKids.length;
        var yLen = yKids.length;
        // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS
        if (xLen > yLen) {
            _VirtualDom_pushPatch(patches, 6, index, {
                v: yLen,
                i: xLen - yLen
            });
        }
        else if (xLen < yLen) {
            _VirtualDom_pushPatch(patches, 7, index, {
                v: xLen,
                e: yKids
            });
        }
        // PAIRWISE DIFF EVERYTHING ELSE
        for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++) {
            var xKid = xKids[i];
            _VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
            index += xKid.b || 0;
        }
    }
    // KEYED DIFF
    function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex) {
        var localPatches = [];
        var changes = {}; // Dict String Entry
        var inserts = []; // Array { index : Int, entry : Entry }
        // type Entry = { tag : String, vnode : VNode, index : Int, data : _ }
        var xKids = xParent.e;
        var yKids = yParent.e;
        var xLen = xKids.length;
        var yLen = yKids.length;
        var xIndex = 0;
        var yIndex = 0;
        var index = rootIndex;
        while (xIndex < xLen && yIndex < yLen) {
            var x = xKids[xIndex];
            var y = yKids[yIndex];
            var xKey = x.a;
            var yKey = y.a;
            var xNode = x.b;
            var yNode = y.b;
            var newMatch = undefined;
            var oldMatch = undefined;
            // check if keys match
            if (xKey === yKey) {
                index++;
                _VirtualDom_diffHelp(xNode, yNode, localPatches, index);
                index += xNode.b || 0;
                xIndex++;
                yIndex++;
                continue;
            }
            // look ahead 1 to detect insertions and removals.
            var xNext = xKids[xIndex + 1];
            var yNext = yKids[yIndex + 1];
            if (xNext) {
                var xNextKey = xNext.a;
                var xNextNode = xNext.b;
                oldMatch = yKey === xNextKey;
            }
            if (yNext) {
                var yNextKey = yNext.a;
                var yNextNode = yNext.b;
                newMatch = xKey === yNextKey;
            }
            // swap x and y
            if (newMatch && oldMatch) {
                index++;
                _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
                _VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
                index += xNode.b || 0;
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
                index += xNextNode.b || 0;
                xIndex += 2;
                yIndex += 2;
                continue;
            }
            // insert y
            if (newMatch) {
                index++;
                _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
                _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
                index += xNode.b || 0;
                xIndex += 1;
                yIndex += 2;
                continue;
            }
            // remove x
            if (oldMatch) {
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
                index += xNode.b || 0;
                index++;
                _VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
                index += xNextNode.b || 0;
                xIndex += 2;
                yIndex += 1;
                continue;
            }
            // remove x, insert y
            if (xNext && xNextKey === yNextKey) {
                index++;
                _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
                _VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
                index += xNode.b || 0;
                index++;
                _VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
                index += xNextNode.b || 0;
                xIndex += 2;
                yIndex += 2;
                continue;
            }
            break;
        }
        // eat up any remaining nodes with removeNode and insertNode
        while (xIndex < xLen) {
            index++;
            var x = xKids[xIndex];
            var xNode = x.b;
            _VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
            index += xNode.b || 0;
            xIndex++;
        }
        while (yIndex < yLen) {
            var endInserts = endInserts || [];
            var y = yKids[yIndex];
            _VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
            yIndex++;
        }
        if (localPatches.length > 0 || inserts.length > 0 || endInserts) {
            _VirtualDom_pushPatch(patches, 8, rootIndex, {
                w: localPatches,
                x: inserts,
                y: endInserts
            });
        }
    }
    // CHANGES FROM KEYED DIFF
    var _VirtualDom_POSTFIX = "_elmW6BL";
    function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts) {
        var entry = changes[key];
        // never seen this key before
        if (!entry) {
            entry = {
                c: 0,
                z: vnode,
                r: yIndex,
                s: undefined
            };
            inserts.push({ r: yIndex, A: entry });
            changes[key] = entry;
            return;
        }
        // this key was removed earlier, a match!
        if (entry.c === 1) {
            inserts.push({ r: yIndex, A: entry });
            entry.c = 2;
            var subPatches = [];
            _VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
            entry.r = yIndex;
            entry.s.s = {
                w: subPatches,
                A: entry
            };
            return;
        }
        // this key has already been inserted or moved, a duplicate!
        _VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
    }
    function _VirtualDom_removeNode(changes, localPatches, key, vnode, index) {
        var entry = changes[key];
        // never seen this key before
        if (!entry) {
            var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);
            changes[key] = {
                c: 1,
                z: vnode,
                r: index,
                s: patch
            };
            return;
        }
        // this key was inserted earlier, a match!
        if (entry.c === 0) {
            entry.c = 2;
            var subPatches = [];
            _VirtualDom_diffHelp(vnode, entry.z, subPatches, index);
            _VirtualDom_pushPatch(localPatches, 9, index, {
                w: subPatches,
                A: entry
            });
            return;
        }
        // this key has already been removed or moved, a duplicate!
        _VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
    }
    // ADD DOM NODES
    //
    // Each DOM node has an "index" assigned in order of traversal. It is important
    // to minimize our crawl over the actual DOM, so these indexes (along with the
    // descendantsCount of virtual nodes) let us skip touching entire subtrees of
    // the DOM if we know there are no patches there.
    function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode) {
        _VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
    }
    // assumes `patches` is non-empty and indexes increase monotonically.
    function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode) {
        var patch = patches[i];
        var index = patch.r;
        while (index === low) {
            var patchType = patch.$;
            if (patchType === 1) {
                _VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
            }
            else if (patchType === 8) {
                patch.t = domNode;
                patch.u = eventNode;
                var subPatches = patch.s.w;
                if (subPatches.length > 0) {
                    _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                }
            }
            else if (patchType === 9) {
                patch.t = domNode;
                patch.u = eventNode;
                var data = patch.s;
                if (data) {
                    data.A.s = domNode;
                    var subPatches = data.w;
                    if (subPatches.length > 0) {
                        _VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
                    }
                }
            }
            else {
                patch.t = domNode;
                patch.u = eventNode;
            }
            i++;
            if (!(patch = patches[i]) || (index = patch.r) > high) {
                return i;
            }
        }
        var tag = vNode.$;
        if (tag === 4) {
            var subNode = vNode.k;
            while (subNode.$ === 4) {
                subNode = subNode.k;
            }
            return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
        }
        // tag must be 1 or 2 at this point
        var vKids = vNode.e;
        var childNodes = domNode.childNodes;
        for (var j = 0; j < vKids.length; j++) {
            low++;
            var vKid = tag === 1 ? vKids[j] : vKids[j].b;
            var nextLow = low + (vKid.b || 0);
            if (low <= index && index <= nextLow) {
                i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
                if (!(patch = patches[i]) || (index = patch.r) > high) {
                    return i;
                }
            }
            low = nextLow;
        }
        return i;
    }
    // APPLY PATCHES
    function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode) {
        if (patches.length === 0) {
            return rootDomNode;
        }
        _VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
        return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
    }
    function _VirtualDom_applyPatchesHelp(rootDomNode, patches) {
        for (var i = 0; i < patches.length; i++) {
            var patch = patches[i];
            var localDomNode = patch.t;
            var newNode = _VirtualDom_applyPatch(localDomNode, patch);
            if (localDomNode === rootDomNode) {
                rootDomNode = newNode;
            }
        }
        return rootDomNode;
    }
    function _VirtualDom_applyPatch(domNode, patch) {
        switch (patch.$) {
            case 0:
                return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);
            case 4:
                _VirtualDom_applyFacts(domNode, patch.u, patch.s);
                return domNode;
            case 3:
                domNode.replaceData(0, domNode.length, patch.s);
                return domNode;
            case 1:
                return _VirtualDom_applyPatchesHelp(domNode, patch.s);
            case 2:
                if (domNode.elm_event_node_ref) {
                    domNode.elm_event_node_ref.j = patch.s;
                }
                else {
                    domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
                }
                return domNode;
            case 6:
                var data = patch.s;
                for (var i = 0; i < data.i; i++) {
                    domNode.removeChild(domNode.childNodes[data.v]);
                }
                return domNode;
            case 7:
                var data = patch.s;
                var kids = data.e;
                var i = data.v;
                var theEnd = domNode.childNodes[i];
                for (; i < kids.length; i++) {
                    domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
                }
                return domNode;
            case 9:
                var data = patch.s;
                if (!data) {
                    domNode.parentNode.removeChild(domNode);
                    return domNode;
                }
                var entry = data.A;
                if (typeof entry.r !== "undefined") {
                    domNode.parentNode.removeChild(domNode);
                }
                entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
                return domNode;
            case 8:
                return _VirtualDom_applyPatchReorder(domNode, patch);
            case 5:
                return patch.s(domNode);
            default:
                _Debug_crash(10); // 'Ran into an unknown patch!'
        }
    }
    function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode) {
        var parentNode = domNode.parentNode;
        var newNode = _VirtualDom_render(vNode, eventNode);
        if (!newNode.elm_event_node_ref) {
            newNode.elm_event_node_ref = domNode.elm_event_node_ref;
        }
        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
        }
        return newNode;
    }
    function _VirtualDom_applyPatchReorder(domNode, patch) {
        var data = patch.s;
        // remove end inserts
        var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);
        // removals
        domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);
        // inserts
        var inserts = data.x;
        for (var i = 0; i < inserts.length; i++) {
            var insert = inserts[i];
            var entry = insert.A;
            var node = entry.c === 2
                ? entry.s
                : _VirtualDom_render(entry.z, patch.u);
            domNode.insertBefore(node, domNode.childNodes[insert.r]);
        }
        // add end inserts
        if (frag) {
            _VirtualDom_appendChild(domNode, frag);
        }
        return domNode;
    }
    function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch) {
        if (!endInserts) {
            return;
        }
        var frag = _VirtualDom_doc.createDocumentFragment();
        for (var i = 0; i < endInserts.length; i++) {
            var insert = endInserts[i];
            var entry = insert.A;
            _VirtualDom_appendChild(frag, entry.c === 2
                ? entry.s
                : _VirtualDom_render(entry.z, patch.u));
        }
        return frag;
    }
    function _VirtualDom_virtualize(node) {
        // TEXT NODES
        if (node.nodeType === 3) {
            return _VirtualDom_text(node.textContent);
        }
        // WEIRD NODES
        if (node.nodeType !== 1) {
            return _VirtualDom_text("");
        }
        // ELEMENT NODES
        var attrList = _List_Nil;
        var attrs = node.attributes;
        for (var i = attrs.length; i--;) {
            var attr = attrs[i];
            var name = attr.name;
            var value = attr.value;
            attrList = _List_Cons(_VirtualDom_attribute_fn(name, value), attrList);
        }
        var tag = node.tagName.toLowerCase();
        var kidList = _List_Nil;
        var kids = node.childNodes;
        for (var i = kids.length; i--;) {
            kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
        }
        return A3(_VirtualDom_node, tag, attrList, kidList);
    }
    function _VirtualDom_dekey(keyedNode) {
        var keyedKids = keyedNode.e;
        var len = keyedKids.length;
        var kids = new Array(len);
        for (var i = 0; i < len; i++) {
            kids[i] = keyedKids[i].b;
        }
        return {
            $: 1,
            c: keyedNode.c,
            d: keyedNode.d,
            e: kids,
            f: keyedNode.f,
            b: keyedNode.b
        };
    }
    // ELEMENT
    var _Debugger_element;
    var _Browser_element = _Debugger_element || F4(function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.hv, impl.iN, impl.ir, function (sendToApp, initialModel) {
            var view = impl.f7;
            /**/
            var domNode = args["node"];
            //*/
            /**_UNUSED/
            var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
            //*/
            var currNode = _VirtualDom_virtualize(domNode);
            return _Browser_makeAnimator(initialModel, function (model) {
                var nextNode = view(model);
                var patches = _VirtualDom_diff(currNode, nextNode);
                domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
                currNode = nextNode;
            });
        });
    });
    // DOCUMENT
    var _Debugger_document;
    var _Browser_document = _Debugger_document || F4(function (impl, flagDecoder, debugMetadata, args) {
        return _Platform_initialize(flagDecoder, args, impl.hv, impl.iN, impl.ir, function (sendToApp, initialModel) {
            var divertHrefToApp = impl.d2 && impl.d2(sendToApp);
            var view = impl.f7;
            var title = _VirtualDom_doc.title;
            var bodyNode = _VirtualDom_doc.body;
            var currNode = _VirtualDom_virtualize(bodyNode);
            return _Browser_makeAnimator(initialModel, function (model) {
                _VirtualDom_divertHrefToApp = divertHrefToApp;
                var doc = view(model);
                var nextNode = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "body")(_List_Nil)(doc.au);
                var patches = _VirtualDom_diff(currNode, nextNode);
                bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
                currNode = nextNode;
                _VirtualDom_divertHrefToApp = 0;
                (title !== doc.ch) && (_VirtualDom_doc.title = title = doc.ch);
            });
        });
    });
    // ANIMATION
    var _Browser_cancelAnimationFrame = typeof cancelAnimationFrame !== "undefined"
        ? cancelAnimationFrame
        : function (id) { clearTimeout(id); };
    var _Browser_requestAnimationFrame = typeof requestAnimationFrame !== "undefined"
        ? requestAnimationFrame
        : function (callback) { return setTimeout(callback, 1000 / 60); };
    function _Browser_makeAnimator(model, draw) {
        draw(model);
        var state = 0;
        function updateIfNeeded() {
            state = state === 1
                ? 0
                : (_Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1);
        }
        return function (nextModel, isSync) {
            model = nextModel;
            isSync
                ? (draw(model),
                    state === 2 && (state = 1))
                : (state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
                    state = 2);
        };
    }
    // APPLICATION
    function _Browser_application(impl) {
        var onUrlChange = impl.hR;
        var onUrlRequest = impl.hS;
        var key = function () { key.a(onUrlChange(_Browser_getUrl())); };
        return _Browser_document({
            d2: function (sendToApp) {
                key.a = sendToApp;
                _Browser_window.addEventListener("popstate", key);
                _Browser_window.navigator.userAgent.indexOf("Trident") < 0 || _Browser_window.addEventListener("hashchange", key);
                return F2(function (domNode, event) {
                    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute("download")) {
                        event.preventDefault();
                        var href = domNode.href;
                        var curr = _Browser_getUrl();
                        var next = $elm$url$Url$fromString(href).a;
                        sendToApp(onUrlRequest((next
                            && curr.fK === next.fK
                            && curr.e7 === next.e7
                            && curr.fG.a === next.fG.a)
                            ? $elm$browser$Browser$Internal(next)
                            : $elm$browser$Browser$External(href)));
                    }
                });
            },
            hv: function (flags) {
                return A3(impl.hv, flags, _Browser_getUrl(), key);
            },
            f7: impl.f7,
            iN: impl.iN,
            ir: impl.ir
        });
    }
    function _Browser_getUrl() {
        return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
    }
    var _Browser_go_fn = function (key, n) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function () {
            n && history.go(n);
            key();
        }));
    }, _Browser_go = F2(_Browser_go_fn);
    var _Browser_pushUrl_fn = function (key, url) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function () {
            history.pushState({}, "", url);
            key();
        }));
    }, _Browser_pushUrl = F2(_Browser_pushUrl_fn);
    var _Browser_replaceUrl_fn = function (key, url) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function () {
            history.replaceState({}, "", url);
            key();
        }));
    }, _Browser_replaceUrl = F2(_Browser_replaceUrl_fn);
    // GLOBAL EVENTS
    var _Browser_fakeNode = { addEventListener: function () { }, removeEventListener: function () { } };
    var _Browser_doc = typeof document !== "undefined" ? document : _Browser_fakeNode;
    var _Browser_window = typeof window !== "undefined" ? window : _Browser_fakeNode;
    var _Browser_on_fn = function (node, eventName, sendToSelf) {
        return _Scheduler_spawn(_Scheduler_binding(function (callback) {
            function handler(event) { _Scheduler_rawSpawn(sendToSelf(event)); }
            node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
            return function () { node.removeEventListener(eventName, handler); };
        }));
    }, _Browser_on = F3(_Browser_on_fn);
    var _Browser_decodeEvent_fn = function (decoder, event) {
        var result = _Json_runHelp(decoder, event);
        return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
    }, _Browser_decodeEvent = F2(_Browser_decodeEvent_fn);
    // PAGE VISIBILITY
    function _Browser_visibilityInfo() {
        return (typeof _VirtualDom_doc.hidden !== "undefined")
            ? { hn: "hidden", gN: "visibilitychange" }
            :
                (typeof _VirtualDom_doc.mozHidden !== "undefined")
                    ? { hn: "mozHidden", gN: "mozvisibilitychange" }
                    :
                        (typeof _VirtualDom_doc.msHidden !== "undefined")
                            ? { hn: "msHidden", gN: "msvisibilitychange" }
                            :
                                (typeof _VirtualDom_doc.webkitHidden !== "undefined")
                                    ? { hn: "webkitHidden", gN: "webkitvisibilitychange" }
                                    : { hn: "hidden", gN: "visibilitychange" };
    }
    // ANIMATION FRAMES
    function _Browser_rAF() {
        return _Scheduler_binding(function (callback) {
            var id = _Browser_requestAnimationFrame(function () {
                callback(_Scheduler_succeed(Date.now()));
            });
            return function () {
                _Browser_cancelAnimationFrame(id);
            };
        });
    }
    function _Browser_now() {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed(Date.now()));
        });
    }
    // DOM STUFF
    function _Browser_withNode(id, doStuff) {
        return _Scheduler_binding(function (callback) {
            _Browser_requestAnimationFrame(function () {
                var node = document.getElementById(id);
                callback(node
                    ? _Scheduler_succeed(doStuff(node))
                    : _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id)));
            });
        });
    }
    function _Browser_withWindow(doStuff) {
        return _Scheduler_binding(function (callback) {
            _Browser_requestAnimationFrame(function () {
                callback(_Scheduler_succeed(doStuff()));
            });
        });
    }
    // FOCUS and BLUR
    var _Browser_call_fn = function (functionName, id) {
        return _Browser_withNode(id, function (node) {
            node[functionName]();
            return _Utils_Tuple0;
        });
    }, _Browser_call = F2(_Browser_call_fn);
    // WINDOW VIEWPORT
    function _Browser_getViewport() {
        return {
            fU: _Browser_getScene(),
            f8: {
                gc: _Browser_window.pageXOffset,
                gd: _Browser_window.pageYOffset,
                f9: _Browser_doc.documentElement.clientWidth,
                e4: _Browser_doc.documentElement.clientHeight
            }
        };
    }
    function _Browser_getScene() {
        var body = _Browser_doc.body;
        var elem = _Browser_doc.documentElement;
        return {
            f9: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
            e4: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
        };
    }
    var _Browser_setViewport_fn = function (x, y) {
        return _Browser_withWindow(function () {
            _Browser_window.scroll(x, y);
            return _Utils_Tuple0;
        });
    }, _Browser_setViewport = F2(_Browser_setViewport_fn);
    // ELEMENT VIEWPORT
    function _Browser_getViewportOf(id) {
        return _Browser_withNode(id, function (node) {
            return {
                fU: {
                    f9: node.scrollWidth,
                    e4: node.scrollHeight
                },
                f8: {
                    gc: node.scrollLeft,
                    gd: node.scrollTop,
                    f9: node.clientWidth,
                    e4: node.clientHeight
                }
            };
        });
    }
    var _Browser_setViewportOf_fn = function (id, x, y) {
        return _Browser_withNode(id, function (node) {
            node.scrollLeft = x;
            node.scrollTop = y;
            return _Utils_Tuple0;
        });
    }, _Browser_setViewportOf = F3(_Browser_setViewportOf_fn);
    // ELEMENT
    function _Browser_getElement(id) {
        return _Browser_withNode(id, function (node) {
            var rect = node.getBoundingClientRect();
            var x = _Browser_window.pageXOffset;
            var y = _Browser_window.pageYOffset;
            return {
                fU: _Browser_getScene(),
                f8: {
                    gc: x,
                    gd: y,
                    f9: _Browser_doc.documentElement.clientWidth,
                    e4: _Browser_doc.documentElement.clientHeight
                },
                g9: {
                    gc: x + rect.left,
                    gd: y + rect.top,
                    f9: rect.width,
                    e4: rect.height
                }
            };
        });
    }
    // LOAD and RELOAD
    function _Browser_reload(skipCache) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function (callback) {
            _VirtualDom_doc.location.reload(skipCache);
        }));
    }
    function _Browser_load(url) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _Scheduler_binding(function (callback) {
            try {
                _Browser_window.location = url;
            }
            catch (err) {
                // Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
                // Other browsers reload the page, so let's be consistent about that.
                _VirtualDom_doc.location.reload(false);
            }
        }));
    }
    // STRINGS
    var _Parser_isSubString_fn = function (smallString, offset, row, col, bigString) {
        var smallLength = smallString.length;
        var isGood = offset + smallLength <= bigString.length;
        for (var i = 0; isGood && i < smallLength;) {
            var code = bigString.charCodeAt(offset);
            isGood =
                smallString[i++] === bigString[offset++]
                    && (code === 10 /* \n */
                        ? (row++, col = 1)
                        : (col++, (code & 63488) === 55296 ? smallString[i++] === bigString[offset++] : 1));
        }
        return _Utils_Tuple3(isGood ? offset : -1, row, col);
    }, _Parser_isSubString = F5(_Parser_isSubString_fn);
    // CHARS
    var _Parser_isSubChar_fn = function (predicate, offset, string) {
        return (string.length <= offset
            ? -1
            :
                (string.charCodeAt(offset) & 63488) === 55296
                    ? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
                    :
                        (predicate(_Utils_chr(string[offset]))
                            ? ((string[offset] === "\n") ? -2 : (offset + 1))
                            : -1));
    }, _Parser_isSubChar = F3(_Parser_isSubChar_fn);
    var _Parser_isAsciiCode_fn = function (code, offset, string) {
        return string.charCodeAt(offset) === code;
    }, _Parser_isAsciiCode = F3(_Parser_isAsciiCode_fn);
    // NUMBERS
    var _Parser_chompBase10_fn = function (offset, string) {
        for (; offset < string.length; offset++) {
            var code = string.charCodeAt(offset);
            if (code < 48 || 57 < code) {
                return offset;
            }
        }
        return offset;
    }, _Parser_chompBase10 = F2(_Parser_chompBase10_fn);
    var _Parser_consumeBase_fn = function (base, offset, string) {
        for (var total = 0; offset < string.length; offset++) {
            var digit = string.charCodeAt(offset) - 48;
            if (digit < 0 || base <= digit)
                break;
            total = base * total + digit;
        }
        return _Utils_Tuple2(offset, total);
    }, _Parser_consumeBase = F3(_Parser_consumeBase_fn);
    var _Parser_consumeBase16_fn = function (offset, string) {
        for (var total = 0; offset < string.length; offset++) {
            var code = string.charCodeAt(offset);
            if (48 <= code && code <= 57) {
                total = 16 * total + code - 48;
            }
            else if (65 <= code && code <= 70) {
                total = 16 * total + code - 55;
            }
            else if (97 <= code && code <= 102) {
                total = 16 * total + code - 87;
            }
            else {
                break;
            }
        }
        return _Utils_Tuple2(offset, total);
    }, _Parser_consumeBase16 = F2(_Parser_consumeBase16_fn);
    // FIND STRING
    var _Parser_findSubString_fn = function (smallString, offset, row, col, bigString) {
        var newOffset = bigString.indexOf(smallString, offset);
        var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;
        while (offset < target) {
            var code = bigString.charCodeAt(offset++);
            code === 10 /* \n */
                ? (col = 1, row++)
                : (col++, (code & 63488) === 55296 && offset++);
        }
        return _Utils_Tuple3(newOffset, row, col);
    }, _Parser_findSubString = F5(_Parser_findSubString_fn);
    var _Bitwise_and_fn = function (a, b) {
        return a & b;
    }, _Bitwise_and = F2(_Bitwise_and_fn);
    var _Bitwise_or_fn = function (a, b) {
        return a | b;
    }, _Bitwise_or = F2(_Bitwise_or_fn);
    var _Bitwise_xor_fn = function (a, b) {
        return a ^ b;
    }, _Bitwise_xor = F2(_Bitwise_xor_fn);
    function _Bitwise_complement(a) {
        return ~a;
    }
    ;
    var _Bitwise_shiftLeftBy_fn = function (offset, a) {
        return a << offset;
    }, _Bitwise_shiftLeftBy = F2(_Bitwise_shiftLeftBy_fn);
    var _Bitwise_shiftRightBy_fn = function (offset, a) {
        return a >> offset;
    }, _Bitwise_shiftRightBy = F2(_Bitwise_shiftRightBy_fn);
    var _Bitwise_shiftRightZfBy_fn = function (offset, a) {
        return a >>> offset;
    }, _Bitwise_shiftRightZfBy = F2(_Bitwise_shiftRightZfBy_fn);
    // DECODER
    var _File_decoder = _Json_decodePrim(function (value) {
        // NOTE: checks if `File` exists in case this is run on node
        return (typeof File !== "undefined" && value instanceof File)
            ? $elm$core$Result$Ok(value)
            : _Json_expecting("a FILE", value);
    });
    // METADATA
    function _File_name(file) { return file.name; }
    function _File_mime(file) { return file.type; }
    function _File_size(file) { return file.size; }
    function _File_lastModified(file) {
        return $elm$time$Time$millisToPosix(file.lastModified);
    }
    // DOWNLOAD
    var _File_downloadNode;
    function _File_getDownloadNode() {
        return _File_downloadNode || (_File_downloadNode = document.createElement("a"));
    }
    var _File_download_fn = function (name, mime, content) {
        return _Scheduler_binding(function (callback) {
            var blob = new Blob([content], { type: mime });
            // for IE10+
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, name);
                return;
            }
            // for HTML5
            var node = _File_getDownloadNode();
            var objectUrl = URL.createObjectURL(blob);
            node.href = objectUrl;
            node.download = name;
            _File_click(node);
            URL.revokeObjectURL(objectUrl);
        });
    }, _File_download = F3(_File_download_fn);
    function _File_downloadUrl(href) {
        return _Scheduler_binding(function (callback) {
            var node = _File_getDownloadNode();
            node.href = href;
            node.download = "";
            node.origin === location.origin || (node.target = "_blank");
            _File_click(node);
        });
    }
    // IE COMPATIBILITY
    function _File_makeBytesSafeForInternetExplorer(bytes) {
        // only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
        // all other browsers can just run `new Blob([bytes])` directly with no problem
        //
        return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    }
    function _File_click(node) {
        // only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
        // all other browsers have MouseEvent and do not need this conditional stuff
        //
        if (typeof MouseEvent === "function") {
            node.dispatchEvent(new MouseEvent("click"));
        }
        else {
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            document.body.appendChild(node);
            node.dispatchEvent(event);
            document.body.removeChild(node);
        }
    }
    // UPLOAD
    var _File_node;
    function _File_uploadOne(mimes) {
        return _Scheduler_binding(function (callback) {
            _File_node = document.createElement("input");
            _File_node.type = "file";
            _File_node.accept = $elm$core$String$join_fn(",", mimes);
            _File_node.addEventListener("change", function (event) {
                callback(_Scheduler_succeed(event.target.files[0]));
            });
            _File_click(_File_node);
        });
    }
    function _File_uploadOneOrMore(mimes) {
        return _Scheduler_binding(function (callback) {
            _File_node = document.createElement("input");
            _File_node.type = "file";
            _File_node.multiple = true;
            _File_node.accept = $elm$core$String$join_fn(",", mimes);
            _File_node.addEventListener("change", function (event) {
                var elmFiles = _List_fromArray(event.target.files);
                callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
            });
            _File_click(_File_node);
        });
    }
    // CONTENT
    function _File_toString(blob) {
        return _Scheduler_binding(function (callback) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
                callback(_Scheduler_succeed(reader.result));
            });
            reader.readAsText(blob);
            return function () { reader.abort(); };
        });
    }
    function _File_toBytes(blob) {
        return _Scheduler_binding(function (callback) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
                callback(_Scheduler_succeed(new DataView(reader.result)));
            });
            reader.readAsArrayBuffer(blob);
            return function () { reader.abort(); };
        });
    }
    function _File_toUrl(blob) {
        return _Scheduler_binding(function (callback) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
                callback(_Scheduler_succeed(reader.result));
            });
            reader.readAsDataURL(blob);
            return function () { reader.abort(); };
        });
    }
    function _Time_now(millisToPosix) {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed(millisToPosix(Date.now())));
        });
    }
    var _Time_setInterval_fn = function (interval, task) {
        return _Scheduler_binding(function (callback) {
            var id = setInterval(function () { _Scheduler_rawSpawn(task); }, interval);
            return function () { clearInterval(id); };
        });
    }, _Time_setInterval = F2(_Time_setInterval_fn);
    function _Time_here() {
        return _Scheduler_binding(function (callback) {
            callback(_Scheduler_succeed($elm$time$Time$Zone_fn(-(new Date().getTimezoneOffset()), _List_Nil)));
        });
    }
    function _Time_getZoneName() {
        return _Scheduler_binding(function (callback) {
            try {
                var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
            }
            catch (e) {
                var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
            }
            callback(_Scheduler_succeed(name));
        });
    }
    // CREATE
    var _Regex_never = /.^/;
    var _Regex_fromStringWith_fn = function (options, string) {
        var flags = "g";
        if (options.fu) {
            flags += "m";
        }
        if (options.eP) {
            flags += "i";
        }
        try {
            return $elm$core$Maybe$Just(new RegExp(string, flags));
        }
        catch (error) {
            return $elm$core$Maybe$Nothing;
        }
    }, _Regex_fromStringWith = F2(_Regex_fromStringWith_fn);
    // USE
    var _Regex_contains_fn = function (re, string) {
        return string.match(re) !== null;
    }, _Regex_contains = F2(_Regex_contains_fn);
    var _Regex_findAtMost_fn = function (n, re, str) {
        var out = [];
        var number = 0;
        var string = str;
        var lastIndex = re.lastIndex;
        var prevLastIndex = -1;
        var result;
        while (number++ < n && (result = re.exec(string))) {
            if (prevLastIndex == re.lastIndex)
                break;
            var i = result.length - 1;
            var subs = new Array(i);
            while (i > 0) {
                var submatch = result[i];
                subs[--i] = submatch
                    ? $elm$core$Maybe$Just(submatch)
                    : $elm$core$Maybe$Nothing;
            }
            out.push($elm$regex$Regex$Match_fn(result[0], result.index, number, _List_fromArray(subs)));
            prevLastIndex = re.lastIndex;
        }
        re.lastIndex = lastIndex;
        return _List_fromArray(out);
    }, _Regex_findAtMost = F3(_Regex_findAtMost_fn);
    var _Regex_replaceAtMost_fn = function (n, re, replacer, string) {
        var count = 0;
        function jsReplacer(match) {
            if (count++ >= n) {
                return match;
            }
            var i = arguments.length - 3;
            var submatches = new Array(i);
            while (i > 0) {
                var submatch = arguments[i];
                submatches[--i] = submatch
                    ? $elm$core$Maybe$Just(submatch)
                    : $elm$core$Maybe$Nothing;
            }
            return replacer($elm$regex$Regex$Match_fn(match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
        }
        return string.replace(re, jsReplacer);
    }, _Regex_replaceAtMost = F4(_Regex_replaceAtMost_fn);
    var _Regex_splitAtMost_fn = function (n, re, str) {
        var string = str;
        var out = [];
        var start = re.lastIndex;
        var restoreLastIndex = re.lastIndex;
        while (n--) {
            var result = re.exec(string);
            if (!result)
                break;
            out.push(string.slice(start, result.index));
            start = re.lastIndex;
        }
        out.push(string.slice(start));
        re.lastIndex = restoreLastIndex;
        return _List_fromArray(out);
    }, _Regex_splitAtMost = F3(_Regex_splitAtMost_fn);
    var _Regex_infinity = Infinity;
    var $author$project$Prof$LinkClicked = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$Prof$UrlChanged = function (a) {
        return { $: 1, a: a };
    };
    var $elm$core$List$cons = _List_cons;
    var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
    var $elm$core$Array$foldr_fn = function (func, baseCase, _v0) {
        var tree = _v0.c;
        var tail = _v0.d;
        var helper = F2(function (node, acc) {
            if (!node.$) {
                var subTree = node.a;
                return _JsArray_foldr_fn(helper, acc, subTree);
            }
            else {
                var values = node.a;
                return _JsArray_foldr_fn(func, acc, values);
            }
        });
        return _JsArray_foldr_fn(helper, _JsArray_foldr_fn(func, baseCase, tail), tree);
    }, $elm$core$Array$foldr = F3($elm$core$Array$foldr_fn);
    var $elm$core$Array$toList = function (array) {
        return $elm$core$Array$foldr_fn($elm$core$List$cons, _List_Nil, array);
    };
    var $elm$core$Dict$foldr_fn = function (func, acc, t) {
        foldr: while (true) {
            if (t.$ === -2) {
                return acc;
            }
            else {
                var key = t.b;
                var value = t.c;
                var left = t.d;
                var right = t.e;
                var $temp$func = func, $temp$acc = A3(func, key, value, $elm$core$Dict$foldr_fn(func, acc, right)), $temp$t = left;
                func = $temp$func;
                acc = $temp$acc;
                t = $temp$t;
                continue foldr;
            }
        }
    }, $elm$core$Dict$foldr_fn_unwrapped = function (func, acc, t) {
        foldr: while (true) {
            if (t.$ === -2) {
                return acc;
            }
            else {
                var key = t.b;
                var value = t.c;
                var left = t.d;
                var right = t.e;
                var $temp$func = func, $temp$acc = func(key, value, $elm$core$Dict$foldr_fn_unwrapped(func, acc, right)), $temp$t = left;
                func = $temp$func;
                acc = $temp$acc;
                t = $temp$t;
                continue foldr;
            }
        }
    }, $elm$core$Dict$foldr = F3($elm$core$Dict$foldr_fn);
    var $elm$core$Dict$toList = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, list) {
            return _List_Cons(_Utils_Tuple2(key, value), list);
        }, _List_Nil, dict);
    };
    var $elm$core$Dict$keys = function (dict) {
        return $elm$core$Dict$foldr_fn_unwrapped(function (key, value, keyList) {
            return _List_Cons(key, keyList);
        }, _List_Nil, dict);
    };
    var $elm$core$Set$toList = function (_v0) {
        var dict = _v0;
        return $elm$core$Dict$keys(dict);
    };
    var $elm$core$Basics$EQ = 1;
    var $elm$core$Basics$GT = 2;
    var $elm$core$Basics$LT = 0;
    var $elm$core$Result$Err = function (a) {
        return { $: 1, a: a };
    };
    var $elm$json$Json$Decode$Failure_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $elm$json$Json$Decode$Failure = F2($elm$json$Json$Decode$Failure_fn);
    var $elm$json$Json$Decode$Field_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$json$Json$Decode$Field = F2($elm$json$Json$Decode$Field_fn);
    var $elm$json$Json$Decode$Index_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$json$Json$Decode$Index = F2($elm$json$Json$Decode$Index_fn);
    var $elm$core$Result$Ok = function (a) {
        return { $: 0, a: a };
    };
    var $elm$json$Json$Decode$OneOf = function (a) {
        return { $: 2, a: a };
    };
    var $elm$core$Basics$False = 1;
    var $elm$core$Basics$add = _Basics_add;
    var $elm$core$Maybe$Just = function (a) { return { $: 0, a: a }; };
    var $elm$core$Maybe$Nothing = { $: 1, a: null };
    var $elm$core$String$all = _String_all;
    var $elm$core$Basics$and = _Basics_and;
    var $elm$core$Basics$append = _Utils_append;
    var $elm$json$Json$Encode$encode = _Json_encode;
    var $elm$core$String$fromInt = _String_fromNumber;
    var $elm$core$String$join_fn = function (sep, chunks) {
        return _String_join_fn(sep, _List_toArray(chunks));
    }, $elm$core$String$join = F2($elm$core$String$join_fn);
    var $elm$core$String$split_fn = function (sep, string) {
        return _List_fromArray(_String_split_fn(sep, string));
    }, $elm$core$String$split = F2($elm$core$String$split_fn);
    var $elm$json$Json$Decode$indent = function (str) {
        return $elm$core$String$join_fn("\n    ", $elm$core$String$split_fn("\n", str));
    };
    var $elm$core$List$foldl_fn = function (func, acc, list) {
        foldl: while (true) {
            if (!list.b) {
                return acc;
            }
            else {
                var x = list.a;
                var xs = list.b;
                var $temp$func = func, $temp$acc = A2(func, x, acc), $temp$list = xs;
                func = $temp$func;
                acc = $temp$acc;
                list = $temp$list;
                continue foldl;
            }
        }
    }, $elm$core$List$foldl_fn_unwrapped = function (func, acc, list) {
        foldl: while (true) {
            if (!list.b) {
                return acc;
            }
            else {
                var x = list.a;
                var xs = list.b;
                var $temp$func = func, $temp$acc = func(x, acc), $temp$list = xs;
                func = $temp$func;
                acc = $temp$acc;
                list = $temp$list;
                continue foldl;
            }
        }
    }, $elm$core$List$foldl = F3($elm$core$List$foldl_fn);
    var $elm$core$List$length = function (xs) {
        return $elm$core$List$foldl_fn_unwrapped(function (_v0, i) {
            return i + 1;
        }, 0, xs);
    };
    var $elm$core$List$map2 = _List_map2;
    var $elm$core$Basics$le = _Utils_le;
    var $elm$core$Basics$sub = _Basics_sub;
    var $elm$core$List$rangeHelp_fn = function (lo, hi, list) {
        rangeHelp: while (true) {
            if (_Utils_cmp(lo, hi) < 1) {
                var $temp$lo = lo, $temp$hi = hi - 1, $temp$list = _List_Cons(hi, list);
                lo = $temp$lo;
                hi = $temp$hi;
                list = $temp$list;
                continue rangeHelp;
            }
            else {
                return list;
            }
        }
    }, $elm$core$List$rangeHelp = F3($elm$core$List$rangeHelp_fn);
    var $elm$core$List$range_fn = function (lo, hi) {
        return $elm$core$List$rangeHelp_fn(lo, hi, _List_Nil);
    }, $elm$core$List$range = F2($elm$core$List$range_fn);
    var $elm$core$List$indexedMap_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; xs.b; i++, xs = xs.b) {
            var next = _List_Cons(A2(f, i, xs.a), _List_Nil);
            end
                .b = next;
            end
                = next;
        }
        return tmp.b;
    }, $elm$core$List$indexedMap_fn_unwrapped = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (var i = 0; xs.b; i++, xs = xs.b) {
            var next = _List_Cons(f(i, xs.a), _List_Nil);
            end
                .b = next;
            end
                = next;
        }
        return tmp.b;
    }, $elm$core$List$indexedMap = F2($elm$core$List$indexedMap_fn);
    var $elm$core$Char$toCode = _Char_toCode;
    var $elm$core$Char$isLower = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (97 <= code) && (code <= 122);
    };
    var $elm$core$Char$isUpper = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (code <= 90) && (65 <= code);
    };
    var $elm$core$Basics$or = _Basics_or;
    var $elm$core$Char$isAlpha = function (_char) {
        return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
    };
    var $elm$core$Char$isDigit = function (_char) {
        var code = $elm$core$Char$toCode(_char);
        return (code <= 57) && (48 <= code);
    };
    var $elm$core$Char$isAlphaNum = function (_char) {
        return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
    };
    var $elm$core$List$reverse = function (list) {
        return $elm$core$List$foldl_fn($elm$core$List$cons, _List_Nil, list);
    };
    var $elm$core$String$uncons = _String_uncons;
    var $elm$json$Json$Decode$errorOneOf_fn = function (i, error) {
        return "\n\n(" + ($elm$core$String$fromInt(i + 1) + (") " + $elm$json$Json$Decode$indent($elm$json$Json$Decode$errorToString(error))));
    }, $elm$json$Json$Decode$errorOneOf = F2($elm$json$Json$Decode$errorOneOf_fn);
    var $elm$json$Json$Decode$errorToString = function (error) {
        return $elm$json$Json$Decode$errorToStringHelp_fn(error, _List_Nil);
    };
    var $elm$json$Json$Decode$errorToStringHelp_fn = function (error, context) {
        errorToStringHelp: while (true) {
            switch (error.$) {
                case 0:
                    var f = error.a;
                    var err = error.b;
                    var isSimple = function () {
                        var _v1 = $elm$core$String$uncons(f);
                        if (_v1.$ === 1) {
                            return false;
                        }
                        else {
                            var _v2 = _v1.a;
                            var _char = _v2.a;
                            var rest = _v2.b;
                            return $elm$core$Char$isAlpha(_char) && _String_all_fn($elm$core$Char$isAlphaNum, rest);
                        }
                    }();
                    var fieldName = isSimple ? ("." + f) : ("['" + (f + "']"));
                    var $temp$error = err, $temp$context = _List_Cons(fieldName, context);
                    error = $temp$error;
                    context = $temp$context;
                    continue errorToStringHelp;
                case 1:
                    var i = error.a;
                    var err = error.b;
                    var indexName = "[" + ($elm$core$String$fromInt(i) + "]");
                    var $temp$error = err, $temp$context = _List_Cons(indexName, context);
                    error = $temp$error;
                    context = $temp$context;
                    continue errorToStringHelp;
                case 2:
                    var errors = error.a;
                    if (!errors.b) {
                        return "Ran into a Json.Decode.oneOf with no possibilities" + function () {
                            if (!context.b) {
                                return "!";
                            }
                            else {
                                return " at json" + $elm$core$String$join_fn("", $elm$core$List$reverse(context));
                            }
                        }();
                    }
                    else {
                        if (!errors.b.b) {
                            var err = errors.a;
                            var $temp$error = err, $temp$context = context;
                            error = $temp$error;
                            context = $temp$context;
                            continue errorToStringHelp;
                        }
                        else {
                            var starter = function () {
                                if (!context.b) {
                                    return "Json.Decode.oneOf";
                                }
                                else {
                                    return "The Json.Decode.oneOf at json" + $elm$core$String$join_fn("", $elm$core$List$reverse(context));
                                }
                            }();
                            var introduction = starter + (" failed in the following " + ($elm$core$String$fromInt($elm$core$List$length(errors)) + " ways:"));
                            return $elm$core$String$join_fn("\n\n", _List_Cons(introduction, $elm$core$List$indexedMap_fn($elm$json$Json$Decode$errorOneOf, errors)));
                        }
                    }
                default:
                    var msg = error.a;
                    var json = error.b;
                    var introduction = function () {
                        if (!context.b) {
                            return "Problem with the given value:\n\n";
                        }
                        else {
                            return "Problem with the value at json" + ($elm$core$String$join_fn("", $elm$core$List$reverse(context)) + ":\n\n    ");
                        }
                    }();
                    return introduction + ($elm$json$Json$Decode$indent(_Json_encode_fn(4, json)) + ("\n\n" + msg));
            }
        }
    }, $elm$json$Json$Decode$errorToStringHelp = F2($elm$json$Json$Decode$errorToStringHelp_fn);
    var $elm$core$Array$branchFactor = 32;
    var $elm$core$Array$Array_elm_builtin_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $elm$core$Array$Array_elm_builtin = F4($elm$core$Array$Array_elm_builtin_fn);
    var $elm$core$Elm$JsArray$empty = _JsArray_empty;
    var $elm$core$Basics$ceiling = _Basics_ceiling;
    var $elm$core$Basics$fdiv = _Basics_fdiv;
    var $elm$core$Basics$logBase_fn = function (base, number) {
        return _Basics_log(number) / _Basics_log(base);
    }, $elm$core$Basics$logBase = F2($elm$core$Basics$logBase_fn);
    var $elm$core$Basics$toFloat = _Basics_toFloat;
    var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling($elm$core$Basics$logBase_fn(2, $elm$core$Array$branchFactor));
    var $elm$core$Array$empty = $elm$core$Array$Array_elm_builtin_fn(0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
    var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
    var $elm$core$Array$Leaf = function (a) {
        return { $: 1, a: a };
    };
    var $elm$core$Basics$apL_fn = function (f, x) {
        return f(x);
    }, $elm$core$Basics$apL = F2($elm$core$Basics$apL_fn);
    var $elm$core$Basics$apR_fn = function (x, f) {
        return f(x);
    }, $elm$core$Basics$apR = F2($elm$core$Basics$apR_fn);
    var $elm$core$Basics$eq = _Utils_equal;
    var $elm$core$Basics$floor = _Basics_floor;
    var $elm$core$Elm$JsArray$length = _JsArray_length;
    var $elm$core$Basics$gt = _Utils_gt;
    var $elm$core$Basics$max_fn = function (x, y) {
        return (_Utils_cmp(x, y) > 0) ? x : y;
    }, $elm$core$Basics$max = F2($elm$core$Basics$max_fn);
    var $elm$core$Basics$mul = _Basics_mul;
    var $elm$core$Array$SubTree = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
    var $elm$core$Array$compressNodes_fn = function (nodes, acc) {
        compressNodes: while (true) {
            var _v0 = _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, nodes);
            var node = _v0.a;
            var remainingNodes = _v0.b;
            var newAcc = _List_Cons($elm$core$Array$SubTree(node), acc);
            if (!remainingNodes.b) {
                return $elm$core$List$reverse(newAcc);
            }
            else {
                var $temp$nodes = remainingNodes, $temp$acc = newAcc;
                nodes = $temp$nodes;
                acc = $temp$acc;
                continue compressNodes;
            }
        }
    }, $elm$core$Array$compressNodes = F2($elm$core$Array$compressNodes_fn);
    var $elm$core$Tuple$first = function (_v0) {
        var x = _v0.a;
        return x;
    };
    var $elm$core$Array$treeFromBuilder_fn = function (nodeList, nodeListSize) {
        treeFromBuilder: while (true) {
            var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
            if (newNodeSize === 1) {
                return _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, nodeList).a;
            }
            else {
                var $temp$nodeList = $elm$core$Array$compressNodes_fn(nodeList, _List_Nil), $temp$nodeListSize = newNodeSize;
                nodeList = $temp$nodeList;
                nodeListSize = $temp$nodeListSize;
                continue treeFromBuilder;
            }
        }
    }, $elm$core$Array$treeFromBuilder = F2($elm$core$Array$treeFromBuilder_fn);
    var $elm$core$Array$builderToArray_fn = function (reverseNodeList, builder) {
        if (!builder.j) {
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.l), $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, builder.l);
        }
        else {
            var treeLen = builder.j * $elm$core$Array$branchFactor;
            var depth = $elm$core$Basics$floor($elm$core$Basics$logBase_fn($elm$core$Array$branchFactor, treeLen - 1));
            var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.m) : builder.m;
            var tree = $elm$core$Array$treeFromBuilder_fn(correctNodeList, builder.j);
            return $elm$core$Array$Array_elm_builtin_fn($elm$core$Elm$JsArray$length(builder.l) + treeLen, $elm$core$Basics$max_fn(5, depth * $elm$core$Array$shiftStep), tree, builder.l);
        }
    }, $elm$core$Array$builderToArray = F2($elm$core$Array$builderToArray_fn);
    var $elm$core$Basics$idiv = _Basics_idiv;
    var $elm$core$Basics$lt = _Utils_lt;
    var $elm$core$Array$initializeHelp_fn = function (fn, fromIndex, len, nodeList, tail) {
        initializeHelp: while (true) {
            if (fromIndex < 0) {
                return $elm$core$Array$builderToArray_fn(false, { m: nodeList, j: (len / $elm$core$Array$branchFactor) | 0, l: tail });
            }
            else {
                var leaf = $elm$core$Array$Leaf(_JsArray_initialize_fn($elm$core$Array$branchFactor, fromIndex, fn));
                var $temp$fn = fn, $temp$fromIndex = fromIndex - $elm$core$Array$branchFactor, $temp$len = len, $temp$nodeList = _List_Cons(leaf, nodeList), $temp$tail = tail;
                fn = $temp$fn;
                fromIndex = $temp$fromIndex;
                len = $temp$len;
                nodeList = $temp$nodeList;
                tail = $temp$tail;
                continue initializeHelp;
            }
        }
    }, $elm$core$Array$initializeHelp = F5($elm$core$Array$initializeHelp_fn);
    var $elm$core$Basics$remainderBy = _Basics_remainderBy;
    var $elm$core$Array$initialize_fn = function (len, fn) {
        if (len <= 0) {
            return $elm$core$Array$empty;
        }
        else {
            var tailLen = len % $elm$core$Array$branchFactor;
            var tail = _JsArray_initialize_fn(tailLen, len - tailLen, fn);
            var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
            return $elm$core$Array$initializeHelp_fn(fn, initialFromIndex, len, _List_Nil, tail);
        }
    }, $elm$core$Array$initialize = F2($elm$core$Array$initialize_fn);
    var $elm$core$Basics$True = 0;
    var $elm$core$Result$isOk = function (result) {
        if (!result.$) {
            return true;
        }
        else {
            return false;
        }
    };
    var $elm$json$Json$Decode$andThen = _Json_andThen;
    var $elm$json$Json$Decode$map = _Json_map1;
    var $elm$json$Json$Decode$map2 = _Json_map2;
    var $elm$json$Json$Decode$succeed = _Json_succeed;
    var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
        switch (handler.$) {
            case 0:
                return 0;
            case 1:
                return 1;
            case 2:
                return 2;
            default:
                return 3;
        }
    };
    var $elm$browser$Browser$External = function (a) {
        return { $: 1, a: a };
    };
    var $elm$browser$Browser$Internal = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Basics$identity = function (x) {
        return x;
    };
    var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
    var $elm$url$Url$Http = 0;
    var $elm$url$Url$Https = 1;
    var $elm$url$Url$Url_fn = function (protocol, host, port_, path, query, fragment) {
        return { aC: fragment, e7: host, fE: path, fG: port_, fK: protocol, fL: query };
    }, $elm$url$Url$Url = F6($elm$url$Url$Url_fn);
    var $elm$core$String$contains = _String_contains;
    var $elm$core$String$length = _String_length;
    var $elm$core$String$slice = _String_slice;
    var $elm$core$String$dropLeft_fn = function (n, string) {
        return (n < 1) ? string : _String_slice_fn(n, $elm$core$String$length(string), string);
    }, $elm$core$String$dropLeft = F2($elm$core$String$dropLeft_fn);
    var $elm$core$String$indexes = _String_indexes;
    var $elm$core$String$isEmpty = function (string) {
        return string === "";
    };
    var $elm$core$String$left_fn = function (n, string) {
        return (n < 1) ? "" : _String_slice_fn(0, n, string);
    }, $elm$core$String$left = F2($elm$core$String$left_fn);
    var $elm$core$String$toInt = _String_toInt;
    var $elm$url$Url$chompBeforePath_fn = function (protocol, path, params, frag, str) {
        if ($elm$core$String$isEmpty(str) || _String_contains_fn("@", str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn(":", str);
            if (!_v0.b) {
                return $elm$core$Maybe$Just($elm$url$Url$Url_fn(protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
            }
            else {
                if (!_v0.b.b) {
                    var i = _v0.a;
                    var _v1 = $elm$core$String$toInt($elm$core$String$dropLeft_fn(i + 1, str));
                    if (_v1.$ === 1) {
                        return $elm$core$Maybe$Nothing;
                    }
                    else {
                        var port_ = _v1;
                        return $elm$core$Maybe$Just($elm$url$Url$Url_fn(protocol, $elm$core$String$left_fn(i, str), port_, path, params, frag));
                    }
                }
                else {
                    return $elm$core$Maybe$Nothing;
                }
            }
        }
    }, $elm$url$Url$chompBeforePath = F5($elm$url$Url$chompBeforePath_fn);
    var $elm$url$Url$chompBeforeQuery_fn = function (protocol, params, frag, str) {
        if ($elm$core$String$isEmpty(str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn("/", str);
            if (!_v0.b) {
                return $elm$url$Url$chompBeforePath_fn(protocol, "/", params, frag, str);
            }
            else {
                var i = _v0.a;
                return $elm$url$Url$chompBeforePath_fn(protocol, $elm$core$String$dropLeft_fn(i, str), params, frag, $elm$core$String$left_fn(i, str));
            }
        }
    }, $elm$url$Url$chompBeforeQuery = F4($elm$url$Url$chompBeforeQuery_fn);
    var $elm$url$Url$chompBeforeFragment_fn = function (protocol, frag, str) {
        if ($elm$core$String$isEmpty(str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn("?", str);
            if (!_v0.b) {
                return $elm$url$Url$chompBeforeQuery_fn(protocol, $elm$core$Maybe$Nothing, frag, str);
            }
            else {
                var i = _v0.a;
                return $elm$url$Url$chompBeforeQuery_fn(protocol, $elm$core$Maybe$Just($elm$core$String$dropLeft_fn(i + 1, str)), frag, $elm$core$String$left_fn(i, str));
            }
        }
    }, $elm$url$Url$chompBeforeFragment = F3($elm$url$Url$chompBeforeFragment_fn);
    var $elm$url$Url$chompAfterProtocol_fn = function (protocol, str) {
        if ($elm$core$String$isEmpty(str)) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var _v0 = _String_indexes_fn("#", str);
            if (!_v0.b) {
                return $elm$url$Url$chompBeforeFragment_fn(protocol, $elm$core$Maybe$Nothing, str);
            }
            else {
                var i = _v0.a;
                return $elm$url$Url$chompBeforeFragment_fn(protocol, $elm$core$Maybe$Just($elm$core$String$dropLeft_fn(i + 1, str)), $elm$core$String$left_fn(i, str));
            }
        }
    }, $elm$url$Url$chompAfterProtocol = F2($elm$url$Url$chompAfterProtocol_fn);
    var $elm$core$String$startsWith = _String_startsWith;
    var $elm$url$Url$fromString = function (str) {
        return _String_startsWith_fn("http://", str) ? $elm$url$Url$chompAfterProtocol_fn(0, $elm$core$String$dropLeft_fn(7, str)) : (_String_startsWith_fn("https://", str) ? $elm$url$Url$chompAfterProtocol_fn(1, $elm$core$String$dropLeft_fn(8, str)) : $elm$core$Maybe$Nothing);
    };
    var $elm$core$Basics$never = function (_v0) {
        never: while (true) {
            var nvr = _v0;
            var $temp$_v0 = nvr;
            _v0 = $temp$_v0;
            continue never;
        }
    };
    var $elm$core$Task$Perform = $elm$core$Basics$identity;
    var $elm$core$Task$succeed = _Scheduler_succeed;
    var $elm$core$Task$init = $elm$core$Task$succeed(0);
    var $elm$core$List$foldrHelper_fn = function (fn, acc, ctr, ls) {
        if (!ls.b) {
            return acc;
        }
        else {
            var a = ls.a;
            var r1 = ls.b;
            if (!r1.b) {
                return A2(fn, a, acc);
            }
            else {
                var b = r1.a;
                var r2 = r1.b;
                if (!r2.b) {
                    return A2(fn, a, A2(fn, b, acc));
                }
                else {
                    var c = r2.a;
                    var r3 = r2.b;
                    if (!r3.b) {
                        return A2(fn, a, A2(fn, b, A2(fn, c, acc)));
                    }
                    else {
                        var d = r3.a;
                        var r4 = r3.b;
                        var res = (ctr > 500) ? $elm$core$List$foldl_fn(fn, acc, $elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper_fn(fn, acc, ctr + 1, r4);
                        return A2(fn, a, A2(fn, b, A2(fn, c, A2(fn, d, res))));
                    }
                }
            }
        }
    }, $elm$core$List$foldrHelper_fn_unwrapped = function (fn, acc, ctr, ls) {
        if (!ls.b) {
            return acc;
        }
        else {
            var a = ls.a;
            var r1 = ls.b;
            if (!r1.b) {
                return fn(a, acc);
            }
            else {
                var b = r1.a;
                var r2 = r1.b;
                if (!r2.b) {
                    return fn(a, fn(b, acc));
                }
                else {
                    var c = r2.a;
                    var r3 = r2.b;
                    if (!r3.b) {
                        return fn(a, fn(b, fn(c, acc)));
                    }
                    else {
                        var d = r3.a;
                        var r4 = r3.b;
                        var res = (ctr > 500) ? $elm$core$List$foldl_fn_unwrapped(fn, acc, $elm$core$List$reverse(r4)) : $elm$core$List$foldrHelper_fn_unwrapped(fn, acc, ctr + 1, r4);
                        return fn(a, fn(b, fn(c, fn(d, res))));
                    }
                }
            }
        }
    }, $elm$core$List$foldrHelper = F4($elm$core$List$foldrHelper_fn);
    var $elm$core$List$foldr_fn = function (fn, acc, ls) {
        return $elm$core$List$foldrHelper_fn(fn, acc, 0, ls);
    }, $elm$core$List$foldr = F3($elm$core$List$foldr_fn);
    var $elm$core$List$map_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs
            .b; xs = xs.b) {
            var next = _List_Cons(f(xs.a), _List_Nil);
            end.b = next;
            end = next;
        }
        return tmp.
            b;
    }, $elm$core$List$map = F2($elm$core$List$map_fn);
    var $elm$core$Task$andThen = _Scheduler_andThen;
    var $elm$core$Task$map_fn = function (func, taskA) {
        return _Scheduler_andThen_fn(function (a) {
            return $elm$core$Task$succeed(func(a));
        }, taskA);
    }, $elm$core$Task$map = F2($elm$core$Task$map_fn);
    var $elm$core$Task$map2_fn = function (func, taskA, taskB) {
        return _Scheduler_andThen_fn(function (a) {
            return _Scheduler_andThen_fn(function (b) {
                return $elm$core$Task$succeed(A2(func, a, b));
            }, taskB);
        }, taskA);
    }, $elm$core$Task$map2_fn_unwrapped = function (func, taskA, taskB) {
        return _Scheduler_andThen_fn(function (a) {
            return _Scheduler_andThen_fn(function (b) {
                return $elm$core$Task$succeed(func(a, b));
            }, taskB);
        }, taskA);
    }, $elm$core$Task$map2 = F3($elm$core$Task$map2_fn);
    var $elm$core$Task$sequence = function (tasks) {
        return $elm$core$List$foldr_fn($elm$core$Task$map2($elm$core$List$cons), $elm$core$Task$succeed(_List_Nil), tasks);
    };
    var $elm$core$Platform$sendToApp = _Platform_sendToApp;
    var $elm$core$Task$spawnCmd_fn = function (router, _v0) {
        var task = _v0;
        return _Scheduler_spawn(_Scheduler_andThen_fn($elm$core$Platform$sendToApp(router), task));
    }, $elm$core$Task$spawnCmd = F2($elm$core$Task$spawnCmd_fn);
    var $elm$core$Task$onEffects_fn = function (router, commands, state) {
        return $elm$core$Task$map_fn(function (_v0) {
            return 0;
        }, $elm$core$Task$sequence($elm$core$List$map_fn($elm$core$Task$spawnCmd(router), commands)));
    }, $elm$core$Task$onEffects = F3($elm$core$Task$onEffects_fn);
    var $elm$core$Task$onSelfMsg_fn = function (_v0, _v1, _v2) {
        return $elm$core$Task$succeed(0);
    }, $elm$core$Task$onSelfMsg = F3($elm$core$Task$onSelfMsg_fn);
    var $elm$core$Task$cmdMap_fn = function (tagger, _v0) {
        var task = _v0;
        return $elm$core$Task$map_fn(tagger, task);
    }, $elm$core$Task$cmdMap = F2($elm$core$Task$cmdMap_fn);
    _Platform_effectManagers["Task"] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
    var $elm$core$Task$command = _Platform_leaf("Task");
    var $elm$core$Task$perform_fn = function (toMessage, task) {
        return $elm$core$Task$command($elm$core$Task$map_fn(toMessage, task));
    }, $elm$core$Task$perform = F2($elm$core$Task$perform_fn);
    var $elm$browser$Browser$application = _Browser_application;
    var $elm$json$Json$Decode$field = _Json_decodeField;
    var $author$project$Prof$CalculateurDeNotes = 1;
    var $author$project$Prof$GenerateurDeProblemes = 0;
    var $author$project$Prof$GenerateurH5P = 2;
    var $author$project$Prof$GenerateurJson = 3;
    var $author$project$Prof$Model_fn = function (key, url, page, largeur, hauteur, modeleGenerateurDeProblemes, modeleCalculateurDeNotes, modeleGenerateurH5P, modeleGenerateurJson) {
        return { hl: hauteur, dq: key, a8: largeur, b0: modeleCalculateurDeNotes, b1: modeleGenerateurDeProblemes, b2: modeleGenerateurH5P, b3: modeleGenerateurJson, V: page, aS: url };
    }, $author$project$Prof$Model = F9($author$project$Prof$Model_fn);
    var $author$project$CalculateurDeNotes$init = { a_: "", L: _List_Nil, bd: "", be: "" };
    var $author$project$GenerateurDeProblemes$init = { aP: "", aR: "" };
    var $author$project$GenerateurH5P$init = { aA: "", aO: "" };
    var $author$project$GenerateurJson$init = { aa: "", U: "", an: "" };
    var $elm$core$Platform$Cmd$batch = _Platform_batch;
    var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
    var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
    var $elm$url$Url$addPort_fn = function (maybePort, starter) {
        if (maybePort.$ === 1) {
            return starter;
        }
        else {
            var port_ = maybePort.a;
            return starter + (":" + $elm$core$String$fromInt(port_));
        }
    }, $elm$url$Url$addPort = F2($elm$url$Url$addPort_fn);
    var $elm$url$Url$addPrefixed_fn = function (prefix, maybeSegment, starter) {
        if (maybeSegment.$ === 1) {
            return starter;
        }
        else {
            var segment = maybeSegment.a;
            return _Utils_ap(starter, _Utils_ap(prefix, segment));
        }
    }, $elm$url$Url$addPrefixed = F3($elm$url$Url$addPrefixed_fn);
    var $elm$url$Url$toString = function (url) {
        var http = function () {
            var _v0 = url.fK;
            if (!_v0) {
                return "http://";
            }
            else {
                return "https://";
            }
        }();
        return $elm$url$Url$addPrefixed_fn("#", url.aC, $elm$url$Url$addPrefixed_fn("?", url.fL, _Utils_ap($elm$url$Url$addPort_fn(url.fG, _Utils_ap(http, url.e7)), url.fE)));
    };
    var $author$project$Prof$init_fn = function (flags, url, key) {
        var _v0 = url.aC;
        _v0$4: while (true) {
            if (!_v0.$) {
                switch (_v0.a) {
                    case "CalculateurDeNotes":
                        return _Utils_Tuple2($author$project$Prof$Model_fn(key, url, 1, flags.ai, flags.af, $author$project$GenerateurDeProblemes$init, $author$project$CalculateurDeNotes$init, $author$project$GenerateurH5P$init, $author$project$GenerateurJson$init), $elm$core$Platform$Cmd$none);
                    case "GenerateurDeProblemes":
                        return _Utils_Tuple2($author$project$Prof$Model_fn(key, url, 0, flags.ai, flags.af, $author$project$GenerateurDeProblemes$init, $author$project$CalculateurDeNotes$init, $author$project$GenerateurH5P$init, $author$project$GenerateurJson$init), $elm$core$Platform$Cmd$none);
                    case "GenerateurH5P":
                        return _Utils_Tuple2($author$project$Prof$Model_fn(key, url, 2, flags.ai, flags.af, $author$project$GenerateurDeProblemes$init, $author$project$CalculateurDeNotes$init, $author$project$GenerateurH5P$init, $author$project$GenerateurJson$init), $elm$core$Platform$Cmd$none);
                    case "GenerateurJson":
                        return _Utils_Tuple2($author$project$Prof$Model_fn(key, url, 3, flags.ai, flags.af, $author$project$GenerateurDeProblemes$init, $author$project$CalculateurDeNotes$init, $author$project$GenerateurH5P$init, $author$project$GenerateurJson$init), $elm$core$Platform$Cmd$none);
                    default:
                        break _v0$4;
                }
            }
            else {
                break _v0$4;
            }
        }
        return _Utils_Tuple2($author$project$Prof$Model_fn(key, _Utils_update(url, {
            aC: $elm$core$Maybe$Just("GenerateurJson")
        }), 3, flags.ai, flags.af, $author$project$GenerateurDeProblemes$init, $author$project$CalculateurDeNotes$init, $author$project$GenerateurH5P$init, $author$project$GenerateurJson$init), _Browser_pushUrl_fn(key, $elm$url$Url$toString(_Utils_update(url, {
            aC: $elm$core$Maybe$Just("GenerateurJson")
        }))));
    }, $author$project$Prof$init = F3($author$project$Prof$init_fn);
    var $elm$json$Json$Decode$int = _Json_decodeInt;
    var $elm$core$Platform$Sub$batch = _Platform_batch;
    var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
    var $author$project$Prof$subscriptions = function (_v0) {
        return $elm$core$Platform$Sub$none;
    };
    var $author$project$Prof$CalculateurDeNotesMsg = function (a) {
        return { $: 2, a: a };
    };
    var $author$project$Prof$GenerateurDeProblemesMsg = function (a) {
        return { $: 3, a: a };
    };
    var $author$project$Prof$GenerateurH5PMsg = function (a) {
        return { $: 4, a: a };
    };
    var $author$project$Prof$GenerateurJsonMsg = function (a) {
        return { $: 5, a: a };
    };
    var $elm$browser$Browser$Navigation$load = _Browser_load;
    var $elm$core$Platform$Cmd$map = _Platform_map;
    var $elm$parser$Parser$Forbidden = 0;
    var $author$project$CalculateurDeNotes$BaremeQuestion_fn = function (bonneReponse, mauvaiseReponse) {
        return { av: bonneReponse, aI: mauvaiseReponse };
    }, $author$project$CalculateurDeNotes$BaremeQuestion = F2($author$project$CalculateurDeNotes$BaremeQuestion_fn);
    var $elm$core$Basics$always_fn = function (a, _v0) {
        return a;
    }, $elm$core$Basics$always = F2($elm$core$Basics$always_fn);
    var $elm$parser$Parser$Advanced$Bad_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Bad = F2($elm$parser$Parser$Advanced$Bad_fn);
    var $elm$parser$Parser$Advanced$Good_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $elm$parser$Parser$Advanced$Good = F3($elm$parser$Parser$Advanced$Good_fn);
    var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
    var $elm$parser$Parser$Advanced$map2_fn = function (func, _v0, _v1) {
        var parseA = _v0;
        var parseB = _v1;
        return function (s0) {
            var _v2 = parseA(s0);
            if (_v2.$ === 1) {
                var p = _v2.a;
                var x = _v2.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v2.a;
                var a = _v2.b;
                var s1 = _v2.c;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, A2(func, a, b), s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$map2_fn_unwrapped = function (func, _v0, _v1) {
        var parseA = _v0;
        var parseB = _v1;
        return function (s0) {
            var _v2 = parseA(s0);
            if (_v2.$ === 1) {
                var p = _v2.a;
                var x = _v2.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v2.a;
                var a = _v2.b;
                var s1 = _v2.c;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, func(a, b), s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$map2 = F3($elm$parser$Parser$Advanced$map2_fn);
    var $elm$parser$Parser$Advanced$ignorer_fn = function (keepParser, ignoreParser) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$core$Basics$always, keepParser, ignoreParser);
    }, $elm$parser$Parser$Advanced$ignorer = F2($elm$parser$Parser$Advanced$ignorer_fn);
    var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
    var $elm$parser$Parser$Advanced$keeper_fn = function (parseFunc, parseArg) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$core$Basics$apL, parseFunc, parseArg);
    }, $elm$parser$Parser$Advanced$keeper = F2($elm$parser$Parser$Advanced$keeper_fn);
    var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
    var $elm$parser$Parser$ExpectingFloat = { $: 5 };
    var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
    var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
    var $elm$parser$Parser$Advanced$bumpOffset_fn = function (newOffset, s) {
        return { gR: s.gR + (newOffset - s.b6), gV: s.gV, g: s.g, b6: newOffset, h6: s.h6, a: s.a };
    }, $elm$parser$Parser$Advanced$bumpOffset = F2($elm$parser$Parser$Advanced$bumpOffset_fn);
    var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
    var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
    var $elm$core$Basics$negate = function (n) {
        return -n;
    };
    var $elm$parser$Parser$Advanced$consumeExp_fn = function (offset, src) {
        if (_Parser_isAsciiCode_fn(101, offset, src) || _Parser_isAsciiCode_fn(69, offset, src)) {
            var eOffset = offset + 1;
            var expOffset = (_Parser_isAsciiCode_fn(43, eOffset, src) || _Parser_isAsciiCode_fn(45, eOffset, src)) ? (eOffset + 1) : eOffset;
            var newOffset = _Parser_chompBase10_fn(expOffset, src);
            return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
        }
        else {
            return offset;
        }
    }, $elm$parser$Parser$Advanced$consumeExp = F2($elm$parser$Parser$Advanced$consumeExp_fn);
    var $elm$parser$Parser$Advanced$consumeDotAndExp_fn = function (offset, src) {
        return _Parser_isAsciiCode_fn(46, offset, src) ? $elm$parser$Parser$Advanced$consumeExp_fn(_Parser_chompBase10_fn(offset + 1, src), src) : $elm$parser$Parser$Advanced$consumeExp_fn(offset, src);
    }, $elm$parser$Parser$Advanced$consumeDotAndExp = F2($elm$parser$Parser$Advanced$consumeDotAndExp_fn);
    var $elm$parser$Parser$Advanced$AddRight_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $elm$parser$Parser$Advanced$AddRight = F2($elm$parser$Parser$Advanced$AddRight_fn);
    var $elm$parser$Parser$Advanced$DeadEnd_fn = function (row, col, problem, contextStack) {
        return { gR: col, gW: contextStack, hY: problem, h6: row };
    }, $elm$parser$Parser$Advanced$DeadEnd = F4($elm$parser$Parser$Advanced$DeadEnd_fn);
    var $elm$parser$Parser$Advanced$Empty = { $: 0 };
    var $elm$parser$Parser$Advanced$fromState_fn = function (s, x) {
        return $elm$parser$Parser$Advanced$AddRight_fn($elm$parser$Parser$Advanced$Empty, $elm$parser$Parser$Advanced$DeadEnd_fn(s.h6, s.gR, x, s.gV));
    }, $elm$parser$Parser$Advanced$fromState = F2($elm$parser$Parser$Advanced$fromState_fn);
    var $elm$parser$Parser$Advanced$finalizeInt_fn = function (invalid, handler, startOffset, _v0, s) {
        var endOffset = _v0.a;
        var n = _v0.b;
        if (handler.$ === 1) {
            var x = handler.a;
            return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromState_fn(s, x));
        }
        else {
            var toValue = handler.a;
            return _Utils_eq(startOffset, endOffset) ? $elm$parser$Parser$Advanced$Bad_fn(_Utils_cmp(s.b6, startOffset) < 0, $elm$parser$Parser$Advanced$fromState_fn(s, invalid)) : $elm$parser$Parser$Advanced$Good_fn(true, toValue(n), $elm$parser$Parser$Advanced$bumpOffset_fn(endOffset, s));
        }
    }, $elm$parser$Parser$Advanced$finalizeInt = F5($elm$parser$Parser$Advanced$finalizeInt_fn);
    var $elm$parser$Parser$Advanced$fromInfo_fn = function (row, col, x, context) {
        return $elm$parser$Parser$Advanced$AddRight_fn($elm$parser$Parser$Advanced$Empty, $elm$parser$Parser$Advanced$DeadEnd_fn(row, col, x, context));
    }, $elm$parser$Parser$Advanced$fromInfo = F4($elm$parser$Parser$Advanced$fromInfo_fn);
    var $elm$core$String$toFloat = _String_toFloat;
    var $elm$parser$Parser$Advanced$finalizeFloat_fn = function (invalid, expecting, intSettings, floatSettings, intPair, s) {
        var intOffset = intPair.a;
        var floatOffset = $elm$parser$Parser$Advanced$consumeDotAndExp_fn(intOffset, s.a);
        if (floatOffset < 0) {
            return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromInfo_fn(s.h6, s.gR - (floatOffset + s.b6), invalid, s.gV));
        }
        else {
            if (_Utils_eq(s.b6, floatOffset)) {
                return $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting));
            }
            else {
                if (_Utils_eq(intOffset, floatOffset)) {
                    return $elm$parser$Parser$Advanced$finalizeInt_fn(invalid, intSettings, s.b6, intPair, s);
                }
                else {
                    if (floatSettings.$ === 1) {
                        var x = floatSettings.a;
                        return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromState_fn(s, invalid));
                    }
                    else {
                        var toValue = floatSettings.a;
                        var _v1 = $elm$core$String$toFloat(_String_slice_fn(s.b6, floatOffset, s.a));
                        if (_v1.$ === 1) {
                            return $elm$parser$Parser$Advanced$Bad_fn(true, $elm$parser$Parser$Advanced$fromState_fn(s, invalid));
                        }
                        else {
                            var n = _v1.a;
                            return $elm$parser$Parser$Advanced$Good_fn(true, toValue(n), $elm$parser$Parser$Advanced$bumpOffset_fn(floatOffset, s));
                        }
                    }
                }
            }
        }
    }, $elm$parser$Parser$Advanced$finalizeFloat = F6($elm$parser$Parser$Advanced$finalizeFloat_fn);
    var $elm$parser$Parser$Advanced$number = function (c) {
        return function (s) {
            if (_Parser_isAsciiCode_fn(48, s.b6, s.a)) {
                var zeroOffset = s.b6 + 1;
                var baseOffset = zeroOffset + 1;
                return _Parser_isAsciiCode_fn(120, zeroOffset, s.a) ? $elm$parser$Parser$Advanced$finalizeInt_fn(c.hC, c.hm, baseOffset, _Parser_consumeBase16_fn(baseOffset, s.a), s) : (_Parser_isAsciiCode_fn(111, zeroOffset, s.a) ? $elm$parser$Parser$Advanced$finalizeInt_fn(c.hC, c.fz, baseOffset, _Parser_consumeBase_fn(8, baseOffset, s.a), s) : (_Parser_isAsciiCode_fn(98, zeroOffset, s.a) ? $elm$parser$Parser$Advanced$finalizeInt_fn(c.hC, c.eO, baseOffset, _Parser_consumeBase_fn(2, baseOffset, s.a), s) : $elm$parser$Parser$Advanced$finalizeFloat_fn(c.hC, c.eZ, c.bX, c.bV, _Utils_Tuple2(zeroOffset, 0), s)));
            }
            else {
                return $elm$parser$Parser$Advanced$finalizeFloat_fn(c.hC, c.eZ, c.bX, c.bV, _Parser_consumeBase_fn(10, s.b6, s.a), s);
            }
        };
    };
    var $elm$parser$Parser$Advanced$float_fn = function (expecting, invalid) {
        return $elm$parser$Parser$Advanced$number({
            eO: $elm$core$Result$Err(invalid),
            eZ: expecting,
            bV: $elm$core$Result$Ok($elm$core$Basics$identity),
            hm: $elm$core$Result$Err(invalid),
            bX: $elm$core$Result$Ok($elm$core$Basics$toFloat),
            hC: invalid,
            fz: $elm$core$Result$Err(invalid)
        });
    }, $elm$parser$Parser$Advanced$float = F2($elm$parser$Parser$Advanced$float_fn);
    var $elm$parser$Parser$float = $elm$parser$Parser$Advanced$float_fn($elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
    var $elm$parser$Parser$Advanced$Append_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Append = F2($elm$parser$Parser$Advanced$Append_fn);
    var $elm$parser$Parser$Advanced$oneOfHelp_fn = function (s0, bag, parsers) {
        oneOfHelp: while (true) {
            if (!parsers.b) {
                return $elm$parser$Parser$Advanced$Bad_fn(false, bag);
            }
            else {
                var parse = parsers.a;
                var remainingParsers = parsers.b;
                var _v1 = parse(s0);
                if (!_v1.$) {
                    var step = _v1;
                    return step;
                }
                else {
                    var step = _v1;
                    var p = step.a;
                    var x = step.b;
                    if (p) {
                        return step;
                    }
                    else {
                        var $temp$s0 = s0, $temp$bag = $elm$parser$Parser$Advanced$Append_fn(bag, x), $temp$parsers = remainingParsers;
                        s0 = $temp$s0;
                        bag = $temp$bag;
                        parsers = $temp$parsers;
                        continue oneOfHelp;
                    }
                }
            }
        }
    }, $elm$parser$Parser$Advanced$oneOfHelp = F3($elm$parser$Parser$Advanced$oneOfHelp_fn);
    var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
        return function (s) {
            return $elm$parser$Parser$Advanced$oneOfHelp_fn(s, $elm$parser$Parser$Advanced$Empty, parsers);
        };
    };
    var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
    var $elm$parser$Parser$Advanced$succeed = function (a) {
        return function (s) {
            return $elm$parser$Parser$Advanced$Good_fn(false, a, s);
        };
    };
    var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
    var $elm$parser$Parser$ExpectingSymbol = function (a) {
        return { $: 8, a: a };
    };
    var $elm$parser$Parser$Advanced$Token_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$parser$Parser$Advanced$Token = F2($elm$parser$Parser$Advanced$Token_fn);
    var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
    var $elm$core$Basics$not = _Basics_not;
    var $elm$parser$Parser$Advanced$token = function (_v0) {
        var str = _v0.a;
        var expecting = _v0.b;
        var progress = !$elm$core$String$isEmpty(str);
        return function (s) {
            var _v1 = _Parser_isSubString_fn(str, s.b6, s.h6, s.gR, s.a);
            var newOffset = _v1.a;
            var newRow = _v1.b;
            var newCol = _v1.c;
            return newOffset === -1 ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting)) : $elm$parser$Parser$Advanced$Good_fn(progress, 0, { gR: newCol, gV: s.gV, g: s.g, b6: newOffset, h6: newRow, a: s.a });
        };
    };
    var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
    var $elm$parser$Parser$symbol = function (str) {
        return $elm$parser$Parser$Advanced$symbol($elm$parser$Parser$Advanced$Token_fn(str, $elm$parser$Parser$ExpectingSymbol(str)));
    };
    var $author$project$CalculateurDeNotes$nombre = $elm$parser$Parser$oneOf(_List_fromArray([
        $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$negate), $elm$parser$Parser$symbol("-")), $elm$parser$Parser$float),
        $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol("+")), $elm$parser$Parser$float)
    ]));
    var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
    var $elm$parser$Parser$Advanced$chompWhileHelp_fn = function (isGood, offset, row, col, s0) {
        chompWhileHelp: while (true) {
            var newOffset = _Parser_isSubChar_fn(isGood, offset, s0.a);
            if (newOffset === -1) {
                return $elm$parser$Parser$Advanced$Good_fn(_Utils_cmp(s0.b6, offset) < 0, 0, { gR: col, gV: s0.gV, g: s0.g, b6: offset, h6: row, a: s0.a });
            }
            else {
                if (newOffset === -2) {
                    var $temp$isGood = isGood, $temp$offset = offset + 1, $temp$row = row + 1, $temp$col = 1, $temp$s0 = s0;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    s0 = $temp$s0;
                    continue chompWhileHelp;
                }
                else {
                    var $temp$isGood = isGood, $temp$offset = newOffset, $temp$row = row, $temp$col = col + 1, $temp$s0 = s0;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    s0 = $temp$s0;
                    continue chompWhileHelp;
                }
            }
        }
    }, $elm$parser$Parser$Advanced$chompWhileHelp = F5($elm$parser$Parser$Advanced$chompWhileHelp_fn);
    var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
        return function (s) {
            return $elm$parser$Parser$Advanced$chompWhileHelp_fn(isGood, s.b6, s.h6, s.gR, s);
        };
    };
    var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(function (c) {
        return (c === " ") || ((c === "\n") || (c === "\r"));
    });
    var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
    var $author$project$CalculateurDeNotes$baremeQuestion = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($author$project$CalculateurDeNotes$BaremeQuestion), $elm$parser$Parser$Advanced$ignorer_fn($author$project$CalculateurDeNotes$nombre, $elm$parser$Parser$spaces)), $author$project$CalculateurDeNotes$nombre);
    var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
    var $author$project$CalculateurDeNotes$espaces = $elm$parser$Parser$chompWhile($elm$core$Basics$eq(" "));
    var $elm$parser$Parser$Advanced$andThen_fn = function (callback, _v0) {
        var parseA = _v0;
        return function (s0) {
            var _v1 = parseA(s0);
            if (_v1.$ === 1) {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p1 = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                var _v2 = callback(a);
                var parseB = _v2;
                var _v3 = parseB(s1);
                if (_v3.$ === 1) {
                    var p2 = _v3.a;
                    var x = _v3.b;
                    return $elm$parser$Parser$Advanced$Bad_fn(p1 || p2, x);
                }
                else {
                    var p2 = _v3.a;
                    var b = _v3.b;
                    var s2 = _v3.c;
                    return $elm$parser$Parser$Advanced$Good_fn(p1 || p2, b, s2);
                }
            }
        };
    }, $elm$parser$Parser$Advanced$andThen = F2($elm$parser$Parser$Advanced$andThen_fn);
    var $elm$parser$Parser$Advanced$loopHelp_fn = function (p, state, callback, s0) {
        loopHelp: while (true) {
            var _v0 = callback(state);
            var parse = _v0;
            var _v1 = parse(s0);
            if (!_v1.$) {
                var p1 = _v1.a;
                var step = _v1.b;
                var s1 = _v1.c;
                if (!step.$) {
                    var newState = step.a;
                    var $temp$p = p || p1, $temp$state = newState, $temp$callback = callback, $temp$s0 = s1;
                    p = $temp$p;
                    state = $temp$state;
                    callback = $temp$callback;
                    s0 = $temp$s0;
                    continue loopHelp;
                }
                else {
                    var result = step.a;
                    return $elm$parser$Parser$Advanced$Good_fn(p || p1, result, s1);
                }
            }
            else {
                var p1 = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p || p1, x);
            }
        }
    }, $elm$parser$Parser$Advanced$loopHelp = F4($elm$parser$Parser$Advanced$loopHelp_fn);
    var $elm$parser$Parser$Advanced$loop_fn = function (state, callback) {
        return function (s) {
            return $elm$parser$Parser$Advanced$loopHelp_fn(false, state, callback, s);
        };
    }, $elm$parser$Parser$Advanced$loop = F2($elm$parser$Parser$Advanced$loop_fn);
    var $elm$parser$Parser$Advanced$map_fn = function (func, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (!_v1.$) {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, func(a), s1);
            }
            else {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
        };
    }, $elm$parser$Parser$Advanced$map = F2($elm$parser$Parser$Advanced$map_fn);
    var $elm$parser$Parser$Advanced$Done = function (a) {
        return { $: 1, a: a };
    };
    var $elm$parser$Parser$Advanced$Loop = function (a) {
        return { $: 0, a: a };
    };
    var $elm$parser$Parser$Advanced$revAlways_fn = function (_v0, b) {
        return b;
    }, $elm$parser$Parser$Advanced$revAlways = F2($elm$parser$Parser$Advanced$revAlways_fn);
    var $elm$parser$Parser$Advanced$skip_fn = function (iParser, kParser) {
        return $elm$parser$Parser$Advanced$map2_fn($elm$parser$Parser$Advanced$revAlways, iParser, kParser);
    }, $elm$parser$Parser$Advanced$skip = F2($elm$parser$Parser$Advanced$skip_fn);
    var $elm$parser$Parser$Advanced$sequenceEndForbidden_fn = function (ender, ws, parseItem, sep, revItems) {
        var chompRest = function (item) {
            return $elm$parser$Parser$Advanced$sequenceEndForbidden_fn(ender, ws, parseItem, sep, _List_Cons(item, revItems));
        };
        return $elm$parser$Parser$Advanced$skip_fn(ws, $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$skip_fn(sep, $elm$parser$Parser$Advanced$skip_fn(ws, $elm$parser$Parser$Advanced$map_fn(function (item) {
                return $elm$parser$Parser$Advanced$Loop(_List_Cons(item, revItems));
            }, parseItem))),
            $elm$parser$Parser$Advanced$map_fn(function (_v0) {
                return $elm$parser$Parser$Advanced$Done($elm$core$List$reverse(revItems));
            }, ender)
        ])));
    }, $elm$parser$Parser$Advanced$sequenceEndForbidden = F5($elm$parser$Parser$Advanced$sequenceEndForbidden_fn);
    var $elm$parser$Parser$Advanced$sequenceEndMandatory_fn = function (ws, parseItem, sep, revItems) {
        return $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$map_fn(function (item) {
                return $elm$parser$Parser$Advanced$Loop(_List_Cons(item, revItems));
            }, $elm$parser$Parser$Advanced$ignorer_fn(parseItem, $elm$parser$Parser$Advanced$ignorer_fn(ws, $elm$parser$Parser$Advanced$ignorer_fn(sep, ws)))),
            $elm$parser$Parser$Advanced$map_fn(function (_v0) {
                return $elm$parser$Parser$Advanced$Done($elm$core$List$reverse(revItems));
            }, $elm$parser$Parser$Advanced$succeed(0))
        ]));
    }, $elm$parser$Parser$Advanced$sequenceEndMandatory = F4($elm$parser$Parser$Advanced$sequenceEndMandatory_fn);
    var $elm$parser$Parser$Advanced$sequenceEndOptional_fn = function (ender, ws, parseItem, sep, revItems) {
        var parseEnd = $elm$parser$Parser$Advanced$map_fn(function (_v0) {
            return $elm$parser$Parser$Advanced$Done($elm$core$List$reverse(revItems));
        }, ender);
        return $elm$parser$Parser$Advanced$skip_fn(ws, $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$skip_fn(sep, $elm$parser$Parser$Advanced$skip_fn(ws, $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$map_fn(function (item) {
                    return $elm$parser$Parser$Advanced$Loop(_List_Cons(item, revItems));
                }, parseItem),
                parseEnd
            ])))),
            parseEnd
        ])));
    }, $elm$parser$Parser$Advanced$sequenceEndOptional = F5($elm$parser$Parser$Advanced$sequenceEndOptional_fn);
    var $elm$parser$Parser$Advanced$sequenceEnd_fn = function (ender, ws, parseItem, sep, trailing) {
        var chompRest = function (item) {
            switch (trailing) {
                case 0:
                    return $elm$parser$Parser$Advanced$loop_fn(_List_fromArray([item]), A4($elm$parser$Parser$Advanced$sequenceEndForbidden, ender, ws, parseItem, sep));
                case 1:
                    return $elm$parser$Parser$Advanced$loop_fn(_List_fromArray([item]), A4($elm$parser$Parser$Advanced$sequenceEndOptional, ender, ws, parseItem, sep));
                default:
                    return $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$skip_fn(ws, $elm$parser$Parser$Advanced$skip_fn(sep, $elm$parser$Parser$Advanced$skip_fn(ws, $elm$parser$Parser$Advanced$loop_fn(_List_fromArray([item]), A3($elm$parser$Parser$Advanced$sequenceEndMandatory, ws, parseItem, sep))))), ender);
            }
        };
        return $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$andThen_fn(chompRest, parseItem),
            $elm$parser$Parser$Advanced$map_fn(function (_v0) {
                return _List_Nil;
            }, ender)
        ]));
    }, $elm$parser$Parser$Advanced$sequenceEnd = F5($elm$parser$Parser$Advanced$sequenceEnd_fn);
    var $elm$parser$Parser$Advanced$sequence = function (i) {
        return $elm$parser$Parser$Advanced$skip_fn($elm$parser$Parser$Advanced$token(i.ao), $elm$parser$Parser$Advanced$skip_fn(i.bg, $elm$parser$Parser$Advanced$sequenceEnd_fn($elm$parser$Parser$Advanced$token(i.a4), i.bg, i.a7, $elm$parser$Parser$Advanced$token(i.bf), i.bt)));
    };
    var $elm$parser$Parser$Advanced$Forbidden = 0;
    var $elm$parser$Parser$Advanced$Mandatory = 2;
    var $elm$parser$Parser$Advanced$Optional = 1;
    var $elm$parser$Parser$toAdvancedTrailing = function (trailing) {
        switch (trailing) {
            case 0:
                return 0;
            case 1:
                return 1;
            default:
                return 2;
        }
    };
    var $elm$parser$Parser$Expecting = function (a) {
        return { $: 0, a: a };
    };
    var $elm$parser$Parser$toToken = function (str) {
        return $elm$parser$Parser$Advanced$Token_fn(str, $elm$parser$Parser$Expecting(str));
    };
    var $elm$parser$Parser$sequence = function (i) {
        return $elm$parser$Parser$Advanced$sequence({
            a4: $elm$parser$Parser$toToken(i.a4),
            a7: i.a7,
            bf: $elm$parser$Parser$toToken(i.bf),
            bg: i.bg,
            ao: $elm$parser$Parser$toToken(i.ao),
            bt: $elm$parser$Parser$toAdvancedTrailing(i.bt)
        });
    };
    var $author$project$CalculateurDeNotes$baremeSujet = $elm$parser$Parser$sequence({ a4: "", a7: $author$project$CalculateurDeNotes$baremeQuestion, bf: ",", bg: $author$project$CalculateurDeNotes$espaces, ao: "", bt: 0 });
    var $elm$core$Bitwise$and = _Bitwise_and;
    var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
    var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
    var $elm$core$Basics$ge = _Utils_ge;
    var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
    var $elm$core$Array$getHelp_fn = function (shift, index, tree) {
        getHelp: while (true) {
            var pos = $elm$core$Array$bitMask & (index >>> shift);
            var _v0 = _JsArray_unsafeGet_fn(pos, tree);
            if (!_v0.$) {
                var subTree = _v0.a;
                var $temp$shift = shift - $elm$core$Array$shiftStep, $temp$index = index, $temp$tree = subTree;
                shift = $temp$shift;
                index = $temp$index;
                tree = $temp$tree;
                continue getHelp;
            }
            else {
                var values = _v0.a;
                return _JsArray_unsafeGet_fn($elm$core$Array$bitMask & index, values);
            }
        }
    }, $elm$core$Array$getHelp = F3($elm$core$Array$getHelp_fn);
    var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
    var $elm$core$Array$tailIndex = function (len) {
        return (len >>> 5) << 5;
    };
    var $elm$core$Array$get_fn = function (index, _v0) {
        var len = _v0.a;
        var startShift = _v0.b;
        var tree = _v0.c;
        var tail = _v0.d;
        return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(index, $elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(_JsArray_unsafeGet_fn($elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just($elm$core$Array$getHelp_fn(startShift, index, tree)));
    }, $elm$core$Array$get = F2($elm$core$Array$get_fn);
    var $elm$core$Maybe$andThen_fn = function (callback, maybeValue) {
        if (!maybeValue.$) {
            var value = maybeValue.a;
            return callback(value);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    }, $elm$core$Maybe$andThen = F2($elm$core$Maybe$andThen_fn);
    var $elm$core$Basics$composeL_fn = function (g, f, x) {
        return g(f(x));
    }, $elm$core$Basics$composeL = F3($elm$core$Basics$composeL_fn);
    var $elm$core$List$head = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just(x);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $author$project$CalculateurDeNotes$noteQuestion_fn = function (brm, bonneRpn, rpnEleve) {
        switch (bonneRpn) {
            case "V":
                return (rpnEleve === "A") ? brm.av : ((rpnEleve === "B") ? ((2 * brm.av) / 3) : ((rpnEleve === "C") ? (brm.aI / 3) : ((rpnEleve === "D") ? brm.aI : 0)));
            case "F":
                return (rpnEleve === "D") ? brm.av : ((rpnEleve === "C") ? ((2 * brm.av) / 3) : ((rpnEleve === "B") ? (brm.aI / 3) : ((rpnEleve === "A") ? brm.aI : 0)));
            default:
                return _Utils_eq(bonneRpn, rpnEleve) ? brm.av : ((rpnEleve === "-") ? 0 : brm.aI);
        }
    }, $author$project$CalculateurDeNotes$noteQuestion = F3($author$project$CalculateurDeNotes$noteQuestion_fn);
    var $elm$core$List$tail = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just(xs);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $author$project$CalculateurDeNotes$noteSujet_fn = function (brms, bonneRpns, rpnsEleve) {
        if (!brms.b) {
            return $elm$core$Maybe$Just(0);
        }
        else {
            var brm = brms.a;
            var brmss = brms.b;
            var rpnEleveSuite = $elm$core$List$tail(rpnsEleve);
            var rpnEleve = $elm$core$List$head(rpnsEleve);
            var bonneRpnSuite = $elm$core$List$tail(bonneRpns);
            var bonneRpn = $elm$core$List$head(bonneRpns);
            var _v1 = _Utils_Tuple2(_Utils_Tuple2(bonneRpn, bonneRpnSuite), _Utils_Tuple2(rpnEleve, rpnEleveSuite));
            if ((((!_v1.a.a.$) && (!_v1.a.b.$)) && (!_v1.b.a.$)) && (!_v1.b.b.$)) {
                var _v2 = _v1.a;
                var bnRpn = _v2.a.a;
                var bnRpnSuite = _v2.b.a;
                var _v3 = _v1.b;
                var rpnElv = _v3.a.a;
                var rpnElvSuite = _v3.b.a;
                return $elm$core$Maybe$andThen_fn(A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, $elm$core$Basics$add($author$project$CalculateurDeNotes$noteQuestion_fn(brm, bnRpn, rpnElv))), $author$project$CalculateurDeNotes$noteSujet_fn(brmss, bnRpnSuite, rpnElvSuite));
            }
            else {
                return $elm$core$Maybe$Nothing;
            }
        }
    }, $author$project$CalculateurDeNotes$noteSujet = F3($author$project$CalculateurDeNotes$noteSujet_fn);
    var $author$project$CalculateurDeNotes$notes_fn = function (brms, rpnCorrectes, rpnEleves) {
        var f = function (rpnEleve) {
            var _v0 = $elm$core$Array$get_fn(rpnEleve.fx - 11, rpnCorrectes);
            if (_v0.$ === 1) {
                return rpnEleve;
            }
            else {
                var bonneRpns = _v0.a;
                return _Utils_update(rpnEleve, {
                    aK: $author$project$CalculateurDeNotes$noteSujet_fn(brms, bonneRpns, rpnEleve.fN)
                });
            }
        };
        return $elm$core$List$map_fn(f, rpnEleves);
    }, $author$project$CalculateurDeNotes$notes = F3($author$project$CalculateurDeNotes$notes_fn);
    var $elm$parser$Parser$Optional = 1;
    var $elm$core$Array$fromListHelp_fn = function (list, nodeList, nodeListSize) {
        fromListHelp: while (true) {
            var _v0 = _JsArray_initializeFromList_fn($elm$core$Array$branchFactor, list);
            var jsArray = _v0.a;
            var remainingItems = _v0.b;
            if (_Utils_cmp($elm$core$Elm$JsArray$length(jsArray), $elm$core$Array$branchFactor) < 0) {
                return $elm$core$Array$builderToArray_fn(true, { m: nodeList, j: nodeListSize, l: jsArray });
            }
            else {
                var $temp$list = remainingItems, $temp$nodeList = _List_Cons($elm$core$Array$Leaf(jsArray), nodeList), $temp$nodeListSize = nodeListSize + 1;
                list = $temp$list;
                nodeList = $temp$nodeList;
                nodeListSize = $temp$nodeListSize;
                continue fromListHelp;
            }
        }
    }, $elm$core$Array$fromListHelp = F3($elm$core$Array$fromListHelp_fn);
    var $elm$core$Array$fromList = function (list) {
        if (!list.b) {
            return $elm$core$Array$empty;
        }
        else {
            return $elm$core$Array$fromListHelp_fn(list, _List_Nil, 0);
        }
    };
    var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
    var $elm$core$Dict$RBEmpty_elm_builtin = { $: -2 };
    var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
    var $elm$core$Set$empty = $elm$core$Dict$empty;
    var $elm$core$Dict$Black = 1;
    var $elm$core$Dict$RBNode_elm_builtin_fn = function (a, b, c, d, e) {
        return { $: -1, a: a, b: b, c: c, d: d, e: e };
    }, $elm$core$Dict$RBNode_elm_builtin = F5($elm$core$Dict$RBNode_elm_builtin_fn);
    var $elm$core$Dict$Red = 0;
    var $elm$core$Dict$balance_fn = function (color, key, value, left, right) {
        if ((right.$ === -1) && (!right.a)) {
            var _v1 = right.a;
            var rK = right.b;
            var rV = right.c;
            var rLeft = right.d;
            var rRight = right.e;
            if ((left.$ === -1) && (!left.a)) {
                var _v3 = left.a;
                var lK = left.b;
                var lV = left.c;
                var lLeft = left.d;
                var lRight = left.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, $elm$core$Dict$RBNode_elm_builtin_fn(1, lK, lV, lLeft, lRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, rK, rV, rLeft, rRight));
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, rK, rV, $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, left, rLeft), rRight);
            }
        }
        else {
            if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
                var _v5 = left.a;
                var lK = left.b;
                var lV = left.c;
                var _v6 = left.d;
                var _v7 = _v6.a;
                var llK = _v6.b;
                var llV = _v6.c;
                var llLeft = _v6.d;
                var llRight = _v6.e;
                var lRight = left.e;
                return $elm$core$Dict$RBNode_elm_builtin_fn(0, lK, lV, $elm$core$Dict$RBNode_elm_builtin_fn(1, llK, llV, llLeft, llRight), $elm$core$Dict$RBNode_elm_builtin_fn(1, key, value, lRight, right));
            }
            else {
                return $elm$core$Dict$RBNode_elm_builtin_fn(color, key, value, left, right);
            }
        }
    }, $elm$core$Dict$balance = F5($elm$core$Dict$balance_fn);
    var $elm$core$Basics$compare = _Utils_compare;
    var $elm$core$Dict$insertHelp_fn = function (key, value, dict) {
        if (dict.$ === -2) {
            return $elm$core$Dict$RBNode_elm_builtin_fn(0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
        }
        else {
            var nColor = dict.a;
            var nKey = dict.b;
            var nValue = dict.c;
            var nLeft = dict.d;
            var nRight = dict.e;
            var _v1 = _Utils_compare_fn(key, nKey);
            switch (_v1) {
                case 0:
                    return $elm$core$Dict$balance_fn(nColor, nKey, nValue, $elm$core$Dict$insertHelp_fn(key, value, nLeft), nRight);
                case 1:
                    return $elm$core$Dict$RBNode_elm_builtin_fn(nColor, nKey, value, nLeft, nRight);
                default:
                    return $elm$core$Dict$balance_fn(nColor, nKey, nValue, nLeft, $elm$core$Dict$insertHelp_fn(key, value, nRight));
            }
        }
    }, $elm$core$Dict$insertHelp = F3($elm$core$Dict$insertHelp_fn);
    var $elm$core$Dict$insert_fn = function (key, value, dict) {
        var _v0 = $elm$core$Dict$insertHelp_fn(key, value, dict);
        if ((_v0.$ === -1) && (!_v0.a)) {
            var _v1 = _v0.a;
            var k = _v0.b;
            var v = _v0.c;
            var l = _v0.d;
            var r = _v0.e;
            return $elm$core$Dict$RBNode_elm_builtin_fn(1, k, v, l, r);
        }
        else {
            var x = _v0;
            return x;
        }
    }, $elm$core$Dict$insert = F3($elm$core$Dict$insert_fn);
    var $elm$core$Set$insert_fn = function (key, _v0) {
        var dict = _v0;
        return $elm$core$Dict$insert_fn(key, 0, dict);
    }, $elm$core$Set$insert = F2($elm$core$Set$insert_fn);
    var $elm$core$Set$fromList = function (list) {
        return $elm$core$List$foldl_fn($elm$core$Set$insert, $elm$core$Set$empty, list);
    };
    var $elm$core$Basics$neq = _Utils_notEqual;
    var $elm$parser$Parser$ExpectingVariable = { $: 7 };
    var $elm$core$Dict$get_fn = function (targetKey, dict) {
        get: while (true) {
            if (dict.$ === -2) {
                return $elm$core$Maybe$Nothing;
            }
            else {
                var key = dict.b;
                var value = dict.c;
                var left = dict.d;
                var right = dict.e;
                var _v1 = _Utils_compare_fn(targetKey, key);
                switch (_v1) {
                    case 0:
                        var $temp$targetKey = targetKey, $temp$dict = left;
                        targetKey = $temp$targetKey;
                        dict = $temp$dict;
                        continue get;
                    case 1:
                        return $elm$core$Maybe$Just(value);
                    default:
                        var $temp$targetKey = targetKey, $temp$dict = right;
                        targetKey = $temp$targetKey;
                        dict = $temp$dict;
                        continue get;
                }
            }
        }
    }, $elm$core$Dict$get = F2($elm$core$Dict$get_fn);
    var $elm$core$Dict$member_fn = function (key, dict) {
        var _v0 = $elm$core$Dict$get_fn(key, dict);
        if (!_v0.$) {
            return true;
        }
        else {
            return false;
        }
    }, $elm$core$Dict$member = F2($elm$core$Dict$member_fn);
    var $elm$core$Set$member_fn = function (key, _v0) {
        var dict = _v0;
        return $elm$core$Dict$member_fn(key, dict);
    }, $elm$core$Set$member = F2($elm$core$Set$member_fn);
    var $elm$parser$Parser$Advanced$varHelp_fn = function (isGood, offset, row, col, src, indent, context) {
        varHelp: while (true) {
            var newOffset = _Parser_isSubChar_fn(isGood, offset, src);
            if (newOffset === -1) {
                return { gR: col, gV: context, g: indent, b6: offset, h6: row, a: src };
            }
            else {
                if (newOffset === -2) {
                    var $temp$isGood = isGood, $temp$offset = offset + 1, $temp$row = row + 1, $temp$col = 1, $temp$src = src, $temp$indent = indent, $temp$context = context;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    src = $temp$src;
                    indent = $temp$indent;
                    context = $temp$context;
                    continue varHelp;
                }
                else {
                    var $temp$isGood = isGood, $temp$offset = newOffset, $temp$row = row, $temp$col = col + 1, $temp$src = src, $temp$indent = indent, $temp$context = context;
                    isGood = $temp$isGood;
                    offset = $temp$offset;
                    row = $temp$row;
                    col = $temp$col;
                    src = $temp$src;
                    indent = $temp$indent;
                    context = $temp$context;
                    continue varHelp;
                }
            }
        }
    }, $elm$parser$Parser$Advanced$varHelp = F7($elm$parser$Parser$Advanced$varHelp_fn);
    var $elm$parser$Parser$Advanced$variable = function (i) {
        return function (s) {
            var firstOffset = _Parser_isSubChar_fn(i.ao, s.b6, s.a);
            if (firstOffset === -1) {
                return $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, i.eZ));
            }
            else {
                var s1 = firstOffset === -2 ? $elm$parser$Parser$Advanced$varHelp_fn(i.fb, s.b6 + 1, s.h6 + 1, 1, s.a, s.g, s.gV) : $elm$parser$Parser$Advanced$varHelp_fn(i.fb, firstOffset, s.h6, s.gR + 1, s.a, s.g, s.gV);
                var name = _String_slice_fn(s.b6, s1.b6, s.a);
                return $elm$core$Set$member_fn(name, i.fR) ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, i.eZ)) : $elm$parser$Parser$Advanced$Good_fn(true, name, s1);
            }
        };
    };
    var $elm$parser$Parser$variable = function (i) {
        return $elm$parser$Parser$Advanced$variable({ eZ: $elm$parser$Parser$ExpectingVariable, fb: i.fb, fR: i.fR, ao: i.ao });
    };
    var $author$project$CalculateurDeNotes$reponses = $elm$parser$Parser$sequence({
        a4: "",
        a7: $elm$parser$Parser$variable({
            fb: function (_v0) {
                return false;
            },
            fR: $elm$core$Set$fromList(_List_Nil),
            ao: function (x) {
                return (x !== "\n") && (x !== ";");
            }
        }),
        bf: "",
        bg: $author$project$CalculateurDeNotes$espaces,
        ao: "",
        bt: 1
    });
    var $author$project$CalculateurDeNotes$reponsesCorrectes = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($elm$core$Array$fromList), $elm$parser$Parser$sequence({ a4: "", a7: $author$project$CalculateurDeNotes$reponses, bf: "\n", bg: $author$project$CalculateurDeNotes$espaces, ao: "", bt: 1 }));
    var $author$project$CalculateurDeNotes$Eleve_fn = function (numeroEtudiant, numeroSujet, nomEtudiant, prenomEtudiant, reponses, note) {
        return { fw: nomEtudiant, aK: note, b5: numeroEtudiant, fx: numeroSujet, fH: prenomEtudiant, fN: reponses };
    }, $author$project$CalculateurDeNotes$Eleve = F6($author$project$CalculateurDeNotes$Eleve_fn);
    var $elm$parser$Parser$Advanced$mapChompedString_fn = function (func, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (_v1.$ === 1) {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, A2(func, _String_slice_fn(s0.b6, s1.b6, s0.a), a), s1);
            }
        };
    }, $elm$parser$Parser$Advanced$mapChompedString_fn_unwrapped = function (func, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (_v1.$ === 1) {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
            else {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, func(_String_slice_fn(s0.b6, s1.b6, s0.a), a), s1);
            }
        };
    }, $elm$parser$Parser$Advanced$mapChompedString = F2($elm$parser$Parser$Advanced$mapChompedString_fn);
    var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
        return $elm$parser$Parser$Advanced$mapChompedString_fn($elm$core$Basics$always, parser);
    };
    var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
    var $author$project$CalculateurDeNotes$champ = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol(";")), $elm$parser$Parser$getChompedString($elm$parser$Parser$chompWhile($elm$core$Basics$neq(";"))));
    var $author$project$CalculateurDeNotes$champzInteret = $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Maybe$Nothing), $elm$parser$Parser$symbol(";")), $elm$parser$Parser$chompWhile(function (x) {
        return (x !== "\n") && (x !== ";");
    }));
    var $elm$parser$Parser$UnexpectedChar = { $: 11 };
    var $elm$parser$Parser$Advanced$chompIf_fn = function (isGood, expecting) {
        return function (s) {
            var newOffset = _Parser_isSubChar_fn(isGood, s.b6, s.a);
            return newOffset === -1 ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting)) : (newOffset === -2 ? $elm$parser$Parser$Advanced$Good_fn(true, 0, { gR: 1, gV: s.gV, g: s.g, b6: s.b6 + 1, h6: s.h6 + 1, a: s.a }) : $elm$parser$Parser$Advanced$Good_fn(true, 0, { gR: s.gR + 1, gV: s.gV, g: s.g, b6: newOffset, h6: s.h6, a: s.a }));
        };
    }, $elm$parser$Parser$Advanced$chompIf = F2($elm$parser$Parser$Advanced$chompIf_fn);
    var $elm$parser$Parser$chompIf = function (isGood) {
        return $elm$parser$Parser$Advanced$chompIf_fn(isGood, $elm$parser$Parser$UnexpectedChar);
    };
    var $author$project$CalculateurDeNotes$etudiant = $elm$parser$Parser$getChompedString($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$chompIf($elm$core$Char$isDigit), $elm$parser$Parser$chompIf($elm$core$Char$isDigit)), $elm$parser$Parser$chompIf($elm$core$Char$isDigit)), $elm$parser$Parser$chompIf($elm$core$Char$isDigit)), $elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
    var $elm$parser$Parser$ExpectingInt = { $: 1 };
    var $elm$parser$Parser$Advanced$int_fn = function (expecting, invalid) {
        return $elm$parser$Parser$Advanced$number({
            eO: $elm$core$Result$Err(invalid),
            eZ: expecting,
            bV: $elm$core$Result$Err(invalid),
            hm: $elm$core$Result$Err(invalid),
            bX: $elm$core$Result$Ok($elm$core$Basics$identity),
            hC: invalid,
            fz: $elm$core$Result$Err(invalid)
        });
    }, $elm$parser$Parser$Advanced$int = F2($elm$parser$Parser$Advanced$int_fn);
    var $elm$parser$Parser$int = $elm$parser$Parser$Advanced$int_fn($elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
    var $elm$parser$Parser$Mandatory = 2;
    var $author$project$CalculateurDeNotes$reponsesQuizScan = $elm$parser$Parser$sequence({
        a4: "",
        a7: $elm$parser$Parser$variable({
            fb: function (_v0) {
                return false;
            },
            fR: $elm$core$Set$fromList(_List_Nil),
            ao: function (x) {
                return (x !== "\n") && (x !== ";");
            }
        }),
        bf: ";",
        bg: $author$project$CalculateurDeNotes$espaces,
        ao: ";",
        bt: 2
    });
    var $author$project$CalculateurDeNotes$reponsesEleve = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($author$project$CalculateurDeNotes$Eleve), $author$project$CalculateurDeNotes$etudiant), $elm$parser$Parser$int), $author$project$CalculateurDeNotes$champ), $author$project$CalculateurDeNotes$champ), $author$project$CalculateurDeNotes$reponsesQuizScan), $author$project$CalculateurDeNotes$champzInteret);
    var $author$project$CalculateurDeNotes$reponsesEleves = $elm$parser$Parser$sequence({ a4: "", a7: $author$project$CalculateurDeNotes$reponsesEleve, bf: "\n", bg: $author$project$CalculateurDeNotes$espaces, ao: "", bt: 1 });
    var $elm$time$Time$Posix = $elm$core$Basics$identity;
    var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
    var $elm$file$File$Download$string_fn = function (name, mime, content) {
        return $elm$core$Task$perform_fn($elm$core$Basics$never, _File_download_fn(name, mime, content));
    }, $elm$file$File$Download$string = F3($elm$file$File$Download$string_fn);
    var $elm$parser$Parser$DeadEnd_fn = function (row, col, problem) {
        return { gR: col, hY: problem, h6: row };
    }, $elm$parser$Parser$DeadEnd = F3($elm$parser$Parser$DeadEnd_fn);
    var $elm$parser$Parser$problemToDeadEnd = function (p) {
        return $elm$parser$Parser$DeadEnd_fn(p.h6, p.gR, p.hY);
    };
    var $elm$parser$Parser$Advanced$bagToList_fn = function (bag, list) {
        bagToList: while (true) {
            switch (bag.$) {
                case 0:
                    return list;
                case 1:
                    var bag1 = bag.a;
                    var x = bag.b;
                    var $temp$bag = bag1, $temp$list = _List_Cons(x, list);
                    bag = $temp$bag;
                    list = $temp$list;
                    continue bagToList;
                default:
                    var bag1 = bag.a;
                    var bag2 = bag.b;
                    var $temp$bag = bag1, $temp$list = $elm$parser$Parser$Advanced$bagToList_fn(bag2, list);
                    bag = $temp$bag;
                    list = $temp$list;
                    continue bagToList;
            }
        }
    }, $elm$parser$Parser$Advanced$bagToList = F2($elm$parser$Parser$Advanced$bagToList_fn);
    var $elm$parser$Parser$Advanced$run_fn = function (_v0, src) {
        var parse = _v0;
        var _v1 = parse({ gR: 1, gV: _List_Nil, g: 1, b6: 0, h6: 1, a: src });
        if (!_v1.$) {
            var value = _v1.b;
            return $elm$core$Result$Ok(value);
        }
        else {
            var bag = _v1.b;
            return $elm$core$Result$Err($elm$parser$Parser$Advanced$bagToList_fn(bag, _List_Nil));
        }
    }, $elm$parser$Parser$Advanced$run = F2($elm$parser$Parser$Advanced$run_fn);
    var $elm$parser$Parser$run_fn = function (parser, source) {
        var _v0 = $elm$parser$Parser$Advanced$run_fn(parser, source);
        if (!_v0.$) {
            var a = _v0.a;
            return $elm$core$Result$Ok(a);
        }
        else {
            var problems = _v0.a;
            return $elm$core$Result$Err($elm$core$List$map_fn($elm$parser$Parser$problemToDeadEnd, problems));
        }
    }, $elm$parser$Parser$run = F2($elm$parser$Parser$run_fn);
    var $author$project$CalculateurDeNotes$unsafeRun_fn = function (prsr, defaut, texte) {
        var _v0 = $elm$parser$Parser$run_fn(prsr, texte);
        if (!_v0.$) {
            var x = _v0.a;
            return x;
        }
        else {
            return defaut;
        }
    }, $author$project$CalculateurDeNotes$unsafeRun = F3($author$project$CalculateurDeNotes$unsafeRun_fn);
    var $elm$core$String$concat = function (strings) {
        return $elm$core$String$join_fn("", strings);
    };
    var $elm$core$String$fromFloat = _String_fromNumber;
    var $author$project$CalculateurDeNotes$voirNotesOrg = function (rpnsEleves) {
        var voirNote = function (rpns) {
            var _v0 = rpns.aK;
            if (_v0.$ === 1) {
                return "";
            }
            else {
                var nt = _v0.a;
                return $elm$core$String$fromFloat(nt);
            }
        };
        var numero = function (rpns) {
            return rpns.b5;
        };
        var ligne = function (rpns) {
            return "|" + (rpns.b5 + ("|" + (rpns.fw + ("|" + (rpns.fH + ("|" + (voirNote(rpns) + "|\n")))))));
        };
        return "|Num\u00E9ro|Nom|Pr\u00E9nom|Note|\n" + $elm$core$String$concat($elm$core$List$map_fn(ligne, rpnsEleves));
    };
    var $author$project$CalculateurDeNotes$update_fn = function (msg, model) {
        var rpnEleves = $author$project$CalculateurDeNotes$unsafeRun_fn($author$project$CalculateurDeNotes$reponsesEleves, _List_Nil, model.be);
        var rpnCorrectes = $author$project$CalculateurDeNotes$unsafeRun_fn($author$project$CalculateurDeNotes$reponsesCorrectes, $elm$core$Array$empty, model.bd);
        var brms = $author$project$CalculateurDeNotes$unsafeRun_fn($author$project$CalculateurDeNotes$baremeSujet, _List_Nil, model.a_);
        switch (msg.$) {
            case 0:
                var nouveauBareme = msg.a;
                var brmss = $author$project$CalculateurDeNotes$unsafeRun_fn($author$project$CalculateurDeNotes$baremeSujet, _List_Nil, nouveauBareme);
                return _Utils_Tuple2(_Utils_update(model, {
                    a_: nouveauBareme,
                    L: $author$project$CalculateurDeNotes$notes_fn(brmss, rpnCorrectes, rpnEleves)
                }), $elm$core$Platform$Cmd$none);
            case 1:
                var nouvellesReponsesCorrectes = msg.a;
                var rpnCorrectess = $author$project$CalculateurDeNotes$unsafeRun_fn($author$project$CalculateurDeNotes$reponsesCorrectes, $elm$core$Array$empty, nouvellesReponsesCorrectes);
                return _Utils_Tuple2(_Utils_update(model, {
                    L: $author$project$CalculateurDeNotes$notes_fn(brms, rpnCorrectess, rpnEleves),
                    bd: nouvellesReponsesCorrectes
                }), $elm$core$Platform$Cmd$none);
            case 2:
                var nouvellesReponsesEleves = msg.a;
                var rpnElevess = $author$project$CalculateurDeNotes$unsafeRun_fn($author$project$CalculateurDeNotes$reponsesEleves, _List_Nil, nouvellesReponsesEleves);
                return _Utils_Tuple2(_Utils_update(model, {
                    L: $author$project$CalculateurDeNotes$notes_fn(brms, rpnCorrectes, rpnElevess),
                    be: nouvellesReponsesEleves
                }), $elm$core$Platform$Cmd$none);
            default:
                return _Utils_Tuple2(model, $elm$file$File$Download$string_fn("Notes.org", "text/org", $author$project$CalculateurDeNotes$voirNotesOrg(model.L)));
        }
    }, $author$project$CalculateurDeNotes$update = F2($author$project$CalculateurDeNotes$update_fn);
    var $author$project$GenerateurDeProblemes$SujetGenere = function (a) {
        return { $: 3, a: a };
    };
    var $elm$random$Random$Generator = $elm$core$Basics$identity;
    var $elm$random$Random$constant = function (value) {
        return function (seed) {
            return _Utils_Tuple2(value, seed);
        };
    };
    var $author$project$GenerateurDeProblemes$voirErreur = function (err) {
        return "Ligne : " + ($elm$core$String$fromInt(err.h6) + (" | Colonne : " + $elm$core$String$fromInt(err.gR)));
    };
    var $author$project$GenerateurDeProblemes$deadEndsToStringBis = function (errs) {
        return "Il y a des probl\u00E8mes aux endroits suivants :\n" + $elm$core$String$concat($elm$core$List$map_fn($author$project$GenerateurDeProblemes$voirErreur, errs));
    };
    var $elm$core$Result$map_fn = function (func, ra) {
        if (!ra.$) {
            var a = ra.a;
            return $elm$core$Result$Ok(func(a));
        }
        else {
            var e = ra.a;
            return $elm$core$Result$Err(e);
        }
    }, $elm$core$Result$map = F2($elm$core$Result$map_fn);
    var $author$project$ParserExpressionMathematique$ArcCos = function (a) {
        return { $: 12, a: a };
    };
    var $author$project$ParserExpressionMathematique$ArcSin = function (a) {
        return { $: 13, a: a };
    };
    var $author$project$ParserExpressionMathematique$ArcTan = function (a) {
        return { $: 14, a: a };
    };
    var $author$project$ParserExpressionMathematique$Cos = function (a) {
        return { $: 9, a: a };
    };
    var $author$project$ParserExpressionMathematique$Degre = function (a) {
        return { $: 18, a: a };
    };
    var $author$project$ParserExpressionMathematique$Difference_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $author$project$ParserExpressionMathematique$Difference = F2($author$project$ParserExpressionMathematique$Difference_fn);
    var $author$project$ParserExpressionMathematique$E = { $: 20 };
    var $author$project$ParserExpressionMathematique$Entier = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$ParserExpressionMathematique$Exp_fn = function (a, b) {
        return { $: 8, a: a, b: b };
    }, $author$project$ParserExpressionMathematique$Exp = F2($author$project$ParserExpressionMathematique$Exp_fn);
    var $author$project$ParserExpressionMathematique$Factorielle = function (a) {
        return { $: 17, a: a };
    };
    var $author$project$ParserExpressionMathematique$Ln = function (a) {
        return { $: 16, a: a };
    };
    var $author$project$ParserExpressionMathematique$Log = function (a) {
        return { $: 15, a: a };
    };
    var $author$project$ParserExpressionMathematique$Oppose = function (a) {
        return { $: 2, a: a };
    };
    var $author$project$ParserExpressionMathematique$Pi = { $: 21 };
    var $author$project$ParserExpressionMathematique$Produit_fn = function (a, b) {
        return { $: 5, a: a, b: b };
    }, $author$project$ParserExpressionMathematique$Produit = F2($author$project$ParserExpressionMathematique$Produit_fn);
    var $author$project$ParserExpressionMathematique$Quotient_fn = function (a, b) {
        return { $: 6, a: a, b: b };
    }, $author$project$ParserExpressionMathematique$Quotient = F2($author$project$ParserExpressionMathematique$Quotient_fn);
    var $author$project$ParserExpressionMathematique$Reste_fn = function (a, b) {
        return { $: 7, a: a, b: b };
    }, $author$project$ParserExpressionMathematique$Reste = F2($author$project$ParserExpressionMathematique$Reste_fn);
    var $author$project$ParserExpressionMathematique$Sin = function (a) {
        return { $: 10, a: a };
    };
    var $author$project$ParserExpressionMathematique$Somme_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $author$project$ParserExpressionMathematique$Somme = F2($author$project$ParserExpressionMathematique$Somme_fn);
    var $author$project$ParserExpressionMathematique$Tan = function (a) {
        return { $: 11, a: a };
    };
    var $dmy$elm_pratt_parser$Pratt$Advanced$constant_fn = function (constantParser, e, _v0) {
        return $elm$parser$Parser$Advanced$map_fn($elm$core$Basics$always(e), constantParser);
    }, $dmy$elm_pratt_parser$Pratt$Advanced$constant = F3($dmy$elm_pratt_parser$Pratt$Advanced$constant_fn);
    var $dmy$elm_pratt_parser$Pratt$constant = $dmy$elm_pratt_parser$Pratt$Advanced$constant;
    var $dmy$elm_pratt_parser$Pratt$Advanced$Config = $elm$core$Basics$identity;
    var $dmy$elm_pratt_parser$Pratt$Advanced$filter_fn = function (_v0, currentPrecedence, leftExpression) {
        var precedence = _v0.a;
        var parser = _v0.b;
        return (_Utils_cmp(precedence, currentPrecedence) > 0) ? $elm$core$Maybe$Just(parser(leftExpression)) : $elm$core$Maybe$Nothing;
    }, $dmy$elm_pratt_parser$Pratt$Advanced$filter = F3($dmy$elm_pratt_parser$Pratt$Advanced$filter_fn);
    var $elm$core$List$maybeCons_fn = function (f, mx, xs) {
        var _v0 = f(mx);
        if (!_v0.$) {
            var x = _v0.a;
            return _List_Cons(x, xs);
        }
        else {
            return xs;
        }
    }, $elm$core$List$maybeCons = F3($elm$core$List$maybeCons_fn);
    var $elm$core$List$filterMap_fn = function (f, xs) {
        return $elm$core$List$foldr_fn($elm$core$List$maybeCons(f), _List_Nil, xs);
    }, $elm$core$List$filterMap = F2($elm$core$List$filterMap_fn);
    var $dmy$elm_pratt_parser$Pratt$Advanced$operation_fn = function (config, precedence, leftExpression) {
        var conf = config;
        return $elm$parser$Parser$Advanced$oneOf($elm$core$List$filterMap_fn(function (toOperation) {
            return $dmy$elm_pratt_parser$Pratt$Advanced$filter_fn(toOperation(config), precedence, leftExpression);
        }, conf.gt));
    }, $dmy$elm_pratt_parser$Pratt$Advanced$operation = F3($dmy$elm_pratt_parser$Pratt$Advanced$operation_fn);
    var $dmy$elm_pratt_parser$Pratt$Advanced$expressionHelp = function (_v0) {
        var config = _v0.a;
        var conf = config;
        var precedence = _v0.b;
        var leftExpression = _v0.c;
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed($elm$core$Basics$identity), conf.bg), $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
            $elm$parser$Parser$Advanced$map_fn(function (expr) {
                return $elm$parser$Parser$Advanced$Loop(_Utils_Tuple3(config, precedence, expr));
            }, $dmy$elm_pratt_parser$Pratt$Advanced$operation_fn(config, precedence, leftExpression)),
            $elm$parser$Parser$Advanced$succeed($elm$parser$Parser$Advanced$Done(leftExpression))
        ])));
    };
    var $elm$parser$Parser$Advanced$lazy = function (thunk) {
        return function (s) {
            var _v0 = thunk(0);
            var parse = _v0;
            return parse(s);
        };
    };
    var $dmy$elm_pratt_parser$Pratt$Advanced$subExpression_fn = function (precedence, config) {
        var conf = config;
        return $elm$parser$Parser$Advanced$andThen_fn(function (leftExpression) {
            return $elm$parser$Parser$Advanced$loop_fn(_Utils_Tuple3(config, precedence, leftExpression), $dmy$elm_pratt_parser$Pratt$Advanced$expressionHelp);
        }, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed($elm$core$Basics$identity), conf.bg), $elm$parser$Parser$Advanced$lazy(function (_v0) {
            return $elm$parser$Parser$Advanced$oneOf($elm$core$List$map_fn($elm$core$Basics$apR(config), conf.hT));
        })));
    }, $dmy$elm_pratt_parser$Pratt$Advanced$subExpression = F2($dmy$elm_pratt_parser$Pratt$Advanced$subExpression_fn);
    var $dmy$elm_pratt_parser$Pratt$Advanced$expression = function (config) {
        return $dmy$elm_pratt_parser$Pratt$Advanced$subExpression_fn(0, { gt: config.gt, hT: config.hT, bg: config.bg });
    };
    var $dmy$elm_pratt_parser$Pratt$expression = $dmy$elm_pratt_parser$Pratt$Advanced$expression;
    var $dmy$elm_pratt_parser$Pratt$subExpression = $dmy$elm_pratt_parser$Pratt$Advanced$subExpression;
    var $author$project$ParserExpressionMathematique$expressionEntreParentheses = function (config) {
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Basics$identity), $elm$parser$Parser$symbol("(")), $elm$parser$Parser$Advanced$ignorer_fn($dmy$elm_pratt_parser$Pratt$Advanced$subExpression_fn(0, config), $elm$parser$Parser$symbol(")")));
    };
    var $dmy$elm_pratt_parser$Pratt$Advanced$infixHelp_fn = function (_v0, operator, apply, config) {
        var leftPrecedence = _v0.a;
        var rightPrecedence = _v0.b;
        return _Utils_Tuple2(leftPrecedence, function (left) {
            return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed(apply(left)), operator), $dmy$elm_pratt_parser$Pratt$Advanced$subExpression_fn(rightPrecedence, config));
        });
    }, $dmy$elm_pratt_parser$Pratt$Advanced$infixHelp = F4($dmy$elm_pratt_parser$Pratt$Advanced$infixHelp_fn);
    var $dmy$elm_pratt_parser$Pratt$Advanced$infixLeft = function (precedence) {
        return $dmy$elm_pratt_parser$Pratt$Advanced$infixHelp(_Utils_Tuple2(precedence, precedence));
    };
    var $dmy$elm_pratt_parser$Pratt$infixLeft = $dmy$elm_pratt_parser$Pratt$Advanced$infixLeft;
    var $dmy$elm_pratt_parser$Pratt$Advanced$infixRight = function (precedence) {
        return $dmy$elm_pratt_parser$Pratt$Advanced$infixHelp(_Utils_Tuple2(precedence, precedence - 1));
    };
    var $dmy$elm_pratt_parser$Pratt$infixRight = $dmy$elm_pratt_parser$Pratt$Advanced$infixRight;
    var $elm$parser$Parser$ExpectingKeyword = function (a) {
        return { $: 9, a: a };
    };
    var $elm$parser$Parser$Advanced$keyword = function (_v0) {
        var kwd = _v0.a;
        var expecting = _v0.b;
        var progress = !$elm$core$String$isEmpty(kwd);
        return function (s) {
            var _v1 = _Parser_isSubString_fn(kwd, s.b6, s.h6, s.gR, s.a);
            var newOffset = _v1.a;
            var newRow = _v1.b;
            var newCol = _v1.c;
            return (newOffset === -1 || (0 <= _Parser_isSubChar_fn(function (c) {
                return $elm$core$Char$isAlphaNum(c) || (c === "_");
            }, newOffset, s.a))) ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, expecting)) : $elm$parser$Parser$Advanced$Good_fn(progress, 0, { gR: newCol, gV: s.gV, g: s.g, b6: newOffset, h6: newRow, a: s.a });
        };
    };
    var $elm$parser$Parser$keyword = function (kwd) {
        return $elm$parser$Parser$Advanced$keyword($elm$parser$Parser$Advanced$Token_fn(kwd, $elm$parser$Parser$ExpectingKeyword(kwd)));
    };
    var $dmy$elm_pratt_parser$Pratt$Advanced$literal = $elm$core$Basics$always;
    var $dmy$elm_pratt_parser$Pratt$literal = $dmy$elm_pratt_parser$Pratt$Advanced$literal;
    var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
    var $dmy$elm_pratt_parser$Pratt$Advanced$postfix_fn = function (precedence, operator, apply, _v0) {
        return _Utils_Tuple2(precedence, function (left) {
            return $elm$parser$Parser$Advanced$map_fn(function (_v1) {
                return apply(left);
            }, operator);
        });
    }, $dmy$elm_pratt_parser$Pratt$Advanced$postfix = F4($dmy$elm_pratt_parser$Pratt$Advanced$postfix_fn);
    var $dmy$elm_pratt_parser$Pratt$postfix = $dmy$elm_pratt_parser$Pratt$Advanced$postfix;
    var $dmy$elm_pratt_parser$Pratt$Advanced$prefix_fn = function (precedence, operator, apply, config) {
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed(apply), operator), $dmy$elm_pratt_parser$Pratt$Advanced$subExpression_fn(precedence, config));
    }, $dmy$elm_pratt_parser$Pratt$Advanced$prefix = F4($dmy$elm_pratt_parser$Pratt$Advanced$prefix_fn);
    var $dmy$elm_pratt_parser$Pratt$prefix = $dmy$elm_pratt_parser$Pratt$Advanced$prefix;
    var $author$project$ParserExpressionMathematique$expressionMathematique = $dmy$elm_pratt_parser$Pratt$expression({
        gt: _List_fromArray([
            A3($dmy$elm_pratt_parser$Pratt$infixLeft, 1, $elm$parser$Parser$symbol("+"), $author$project$ParserExpressionMathematique$Somme),
            A3($dmy$elm_pratt_parser$Pratt$infixLeft, 1, $elm$parser$Parser$symbol("-"), $author$project$ParserExpressionMathematique$Difference),
            A3($dmy$elm_pratt_parser$Pratt$infixLeft, 2, $elm$parser$Parser$symbol("*"), $author$project$ParserExpressionMathematique$Produit),
            A3($dmy$elm_pratt_parser$Pratt$infixLeft, 2, $elm$parser$Parser$symbol("%"), $author$project$ParserExpressionMathematique$Reste),
            A3($dmy$elm_pratt_parser$Pratt$infixLeft, 2, $elm$parser$Parser$symbol("/"), $author$project$ParserExpressionMathematique$Quotient),
            A3($dmy$elm_pratt_parser$Pratt$infixRight, 4, $elm$parser$Parser$symbol("^"), $author$project$ParserExpressionMathematique$Exp),
            A3($dmy$elm_pratt_parser$Pratt$postfix, 6, $elm$parser$Parser$symbol("!"), $author$project$ParserExpressionMathematique$Factorielle),
            A3($dmy$elm_pratt_parser$Pratt$postfix, 6, $elm$parser$Parser$symbol("\u00B0"), $author$project$ParserExpressionMathematique$Degre)
        ]),
        hT: _List_fromArray([
            A2($dmy$elm_pratt_parser$Pratt$constant, $elm$parser$Parser$keyword("E"), $author$project$ParserExpressionMathematique$E),
            A2($dmy$elm_pratt_parser$Pratt$constant, $elm$parser$Parser$keyword("Pi"), $author$project$ParserExpressionMathematique$Pi),
            $dmy$elm_pratt_parser$Pratt$literal($elm$parser$Parser$Advanced$map_fn($author$project$ParserExpressionMathematique$Entier, $elm$parser$Parser$int)),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 3, $elm$parser$Parser$symbol("-"), $author$project$ParserExpressionMathematique$Oppose),
            $author$project$ParserExpressionMathematique$expressionEntreParentheses,
            A3($dmy$elm_pratt_parser$Pratt$prefix, 3, $elm$parser$Parser$symbol("+"), $elm$core$Basics$identity),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("Cos"), $author$project$ParserExpressionMathematique$Cos),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("Sin"), $author$project$ParserExpressionMathematique$Sin),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("Tan"), $author$project$ParserExpressionMathematique$Tan),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("ArcCos"), $author$project$ParserExpressionMathematique$ArcCos),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("ArcSin"), $author$project$ParserExpressionMathematique$ArcSin),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("ArcTan"), $author$project$ParserExpressionMathematique$ArcTan),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("Log"), $author$project$ParserExpressionMathematique$Log),
            A3($dmy$elm_pratt_parser$Pratt$prefix, 5, $elm$parser$Parser$keyword("Ln"), $author$project$ParserExpressionMathematique$Ln)
        ]),
        bg: $elm$parser$Parser$spaces
    });
    var $author$project$ParserExpressionMathematique$parserExpressionMathematique = function (source) {
        return $elm$parser$Parser$run_fn($author$project$ParserExpressionMathematique$expressionMathematique, source);
    };
    var $author$project$Fraction$Fraction_fn = function (numerateur, denominateur) {
        return { f: denominateur, e: numerateur };
    }, $author$project$Fraction$Fraction = F2($author$project$Fraction$Fraction_fn);
    var $author$project$Fraction$oppose = function (a) {
        return $author$project$Fraction$Fraction_fn(-a.e, a.f);
    };
    var $elm$core$Basics$pow = _Basics_pow;
    var $elm$core$Basics$abs = function (n) {
        return (n < 0) ? (-n) : n;
    };
    var $elm$core$Basics$modBy = _Basics_modBy;
    var $lynn$elm_arithmetic$Arithmetic$gcd_fn = function (a, b) {
        var gcd_ = F2(function (x, y) {
            gcd_: while (true) {
                if (!y) {
                    return x;
                }
                else {
                    var $temp$x = y, $temp$y = _Basics_modBy_fn(y, x);
                    x = $temp$x;
                    y = $temp$y;
                    continue gcd_;
                }
            }
        });
        return A2(gcd_, $elm$core$Basics$abs(a), $elm$core$Basics$abs(b));
    }, $lynn$elm_arithmetic$Arithmetic$gcd = F2($lynn$elm_arithmetic$Arithmetic$gcd_fn);
    var $author$project$Fraction$simplifier = function (a) {
        var sgnDuDen = (a.f < 0) ? (-1) : 1;
        var pgcd = $lynn$elm_arithmetic$Arithmetic$gcd_fn(a.e, a.f);
        return _Utils_update(a, { f: sgnDuDen * ((a.f / pgcd) | 0), e: sgnDuDen * ((a.e / pgcd) | 0) });
    };
    var $author$project$Fraction$fraction_fn = function (a, b) {
        var min = 1 - _Basics_pow_fn(2, 31);
        var max = _Basics_pow_fn(2, 31) - 1;
        if (!b) {
            return $elm$core$Result$Err("Division par z\u00E9ro.");
        }
        else {
            return ((_Utils_cmp(a, max) > 0) || ((_Utils_cmp(b, max) > 0) || ((_Utils_cmp(a, min) < 0) || (_Utils_cmp(b, min) < 0)))) ? $elm$core$Result$Err("Certains calculs font intervenir des valeurs trop grandes pour \u00EAtre prises en charge.") : $elm$core$Result$Ok($author$project$Fraction$simplifier($author$project$Fraction$Fraction_fn(a, b)));
        }
    }, $author$project$Fraction$fraction = F2($author$project$Fraction$fraction_fn);
    var $author$project$Fraction$somme_fn = function (a, b) {
        var pgcd = $lynn$elm_arithmetic$Arithmetic$gcd_fn(a.f, b.f);
        var bDenBis = (b.f / pgcd) | 0;
        var aDenBis = (a.f / pgcd) | 0;
        return $author$project$Fraction$fraction_fn((a.e * bDenBis) + (b.e * aDenBis), a.f * bDenBis);
    }, $author$project$Fraction$somme = F2($author$project$Fraction$somme_fn);
    var $author$project$Fraction$difference_fn = function (a, b) {
        return $author$project$Fraction$somme_fn(a, $author$project$Fraction$oppose(b));
    }, $author$project$Fraction$difference = F2($author$project$Fraction$difference_fn);
    var $author$project$Fraction$exp_fn = function (a, b) {
        var sgnDeB = (b.e < 0) ? (-1) : 1;
        var sgnDeA = (a.e < 0) ? (-1) : 1;
        return ((b.f === 1) && (b.e < 0)) ? $author$project$Fraction$fraction_fn(_Basics_pow_fn(sgnDeA * a.f, sgnDeB * b.e), _Basics_pow_fn(sgnDeA * a.e, sgnDeB * b.e)) : ((b.f === 1) ? $author$project$Fraction$fraction_fn(_Basics_pow_fn(a.e, b.e), _Basics_pow_fn(a.f, b.e)) : $elm$core$Result$Err("L'extraction de racine n'est pas disponible pour les nombres \u00E9crits sous forme fractiontionnaire."));
    }, $author$project$Fraction$exp = F2($author$project$Fraction$exp_fn);
    var $author$project$Fraction$map2_fn = function (operation, resultat1, resultat2) {
        var _v0 = _Utils_Tuple2(resultat1, resultat2);
        if (!_v0.a.$) {
            if (!_v0.b.$) {
                var fractiontion1 = _v0.a.a;
                var fractiontion2 = _v0.b.a;
                return A2(operation, fractiontion1, fractiontion2);
            }
            else {
                var erreur = _v0.b.a;
                return $elm$core$Result$Err(erreur);
            }
        }
        else {
            var erreur = _v0.a.a;
            return $elm$core$Result$Err(erreur);
        }
    }, $author$project$Fraction$map2_fn_unwrapped = function (operation, resultat1, resultat2) {
        var _v0 = _Utils_Tuple2(resultat1, resultat2);
        if (!_v0.a.$) {
            if (!_v0.b.$) {
                var fractiontion1 = _v0.a.a;
                var fractiontion2 = _v0.b.a;
                return operation(fractiontion1, fractiontion2);
            }
            else {
                var erreur = _v0.b.a;
                return $elm$core$Result$Err(erreur);
            }
        }
        else {
            var erreur = _v0.a.a;
            return $elm$core$Result$Err(erreur);
        }
    }, $author$project$Fraction$map2 = F3($author$project$Fraction$map2_fn);
    var $author$project$Fraction$produit_fn = function (a, b) {
        var pgcdBis = $lynn$elm_arithmetic$Arithmetic$gcd_fn(b.e, a.f);
        var pgcd = $lynn$elm_arithmetic$Arithmetic$gcd_fn(a.e, b.f);
        var bNum = (b.e / pgcdBis) | 0;
        var bDen = (b.f / pgcd) | 0;
        var aNum = (a.e / pgcd) | 0;
        var aDen = (a.f / pgcdBis) | 0;
        return $author$project$Fraction$fraction_fn(aNum * bNum, aDen * bDen);
    }, $author$project$Fraction$produit = F2($author$project$Fraction$produit_fn);
    var $elm$core$Result$andThen_fn = function (callback, result) {
        if (!result.$) {
            var value = result.a;
            return callback(value);
        }
        else {
            var msg = result.a;
            return $elm$core$Result$Err(msg);
        }
    }, $elm$core$Result$andThen = F2($elm$core$Result$andThen_fn);
    var $author$project$Fraction$inverse = function (a) {
        var _v0 = a.e;
        if (!_v0) {
            return $elm$core$Result$Err("Division par z\u00E9ro");
        }
        else {
            return $elm$core$Result$Ok($author$project$Fraction$Fraction_fn(a.f, a.e));
        }
    };
    var $author$project$Fraction$quotient_fn = function (a, b) {
        return $elm$core$Result$andThen_fn($author$project$Fraction$produit(a), $author$project$Fraction$inverse(b));
    }, $author$project$Fraction$quotient = F2($author$project$Fraction$quotient_fn);
    var $author$project$ParserExpressionMathematique$resultatFractionnaire = function (expression) {
        var f = F3(function (opperation, a, b) {
            return $author$project$Fraction$map2_fn(opperation, $author$project$ParserExpressionMathematique$resultatFractionnaire(a), $author$project$ParserExpressionMathematique$resultatFractionnaire(b));
        });
        switch (expression.$) {
            case 3:
                var a = expression.a;
                var b = expression.b;
                return A3(f, $author$project$Fraction$somme, a, b);
            case 4:
                var a = expression.a;
                var b = expression.b;
                return A3(f, $author$project$Fraction$difference, a, b);
            case 5:
                var a = expression.a;
                var b = expression.b;
                return A3(f, $author$project$Fraction$produit, a, b);
            case 6:
                var a = expression.a;
                var b = expression.b;
                return A3(f, $author$project$Fraction$quotient, a, b);
            case 8:
                var a = expression.a;
                var b = expression.b;
                return A3(f, $author$project$Fraction$exp, a, b);
            case 2:
                var a = expression.a;
                return $elm$core$Result$map_fn($author$project$Fraction$oppose, $author$project$ParserExpressionMathematique$resultatFractionnaire(a));
            case 0:
                var n = expression.a;
                return $author$project$Fraction$fraction_fn(n, 1);
            case 19:
                var a_i = expression.a;
                var x = expression.b;
                return $elm$core$Result$Err("Les polyn\u00F4mes ne sont pas encore pris en charge.");
            default:
                return $elm$core$Result$Err("BOOM");
        }
    };
    var $author$project$Fraction$teX = function (a) {
        var _v0 = a.f;
        if (_v0 === 1) {
            return $elm$core$String$fromInt(a.e);
        }
        else {
            return (a.e < 0) ? ("-\\fraction{" + ($elm$core$String$fromInt(-a.e) + ("}{" + ($elm$core$String$fromInt(a.f) + "}")))) : ("\\fraction{" + ($elm$core$String$fromInt(a.e) + ("}{" + ($elm$core$String$fromInt(a.f) + "}"))));
        }
    };
    var $author$project$GenerateurDeProblemes$voirTexteVariable = function (txtvar) {
        if (!txtvar.$) {
            var txt = txtvar.a;
            return txt;
        }
        else {
            var _var = txtvar.a;
            var expressionParseePotentielle = $author$project$ParserExpressionMathematique$parserExpressionMathematique(_var);
            if (expressionParseePotentielle.$ === 1) {
                var erreur = expressionParseePotentielle.a;
                return "L'expression est mal form\u00E9e.";
            }
            else {
                var expressionParsee = expressionParseePotentielle.a;
                var _v2 = $elm$core$Result$map_fn($author$project$Fraction$teX, $author$project$ParserExpressionMathematique$resultatFractionnaire(expressionParsee));
                if (!_v2.$) {
                    var a = _v2.a;
                    return a;
                }
                else {
                    var erreur = _v2.a;
                    return erreur;
                }
            }
        }
    };
    var $author$project$GenerateurDeProblemes$voirMacro_a0 = $elm$core$String$concat, $author$project$GenerateurDeProblemes$voirMacro_a1 = $elm$core$List$map($author$project$GenerateurDeProblemes$voirTexteVariable), $author$project$GenerateurDeProblemes$voirMacro = A2($elm$core$Basics$composeL, $author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1);
    var $author$project$GenerateurDeProblemes$evalBoxVoirBloc = function (blc) {
        var f = function (prp) {
            if (!prp.$) {
                var mc = prp.a;
                return "+" + $elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mc);
            }
            else {
                var mc = prp.a;
                return "-" + $elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mc);
            }
        };
        switch (blc.$) {
            case 0:
                var blcs = blc.a;
                return $author$project$GenerateurDeProblemes$evalBoxVoirBlocs(blcs);
            case 2:
                var mcr = blc.a;
                var sjt = blc.b;
                return _Utils_ap($elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mcr), $author$project$GenerateurDeProblemes$evalBoxVoirBlocs(sjt));
            case 3:
                var mcr = blc.a;
                var prps = blc.b;
                return $elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mcr) + ("\n" + $elm$core$String$join_fn("\n", $elm$core$List$map_fn(f, prps)));
            case 4:
                var prps = blc.a;
                return $elm$core$String$concat($elm$core$List$map_fn(f, prps));
            default:
                var ar = blc.a;
                var sjt = blc.b;
                return "" + $author$project$GenerateurDeProblemes$evalBoxVoirBlocs(sjt);
        }
    };
    var $author$project$GenerateurDeProblemes$evalBoxVoirBlocs = function (blcs) {
        return $elm$core$String$join_fn("\n", $elm$core$List$map_fn($author$project$GenerateurDeProblemes$evalBoxVoirBloc, blcs));
    };
    var $elm$random$Random$Generate = $elm$core$Basics$identity;
    var $elm$random$Random$Seed_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$random$Random$Seed = F2($elm$random$Random$Seed_fn);
    var $elm$random$Random$next = function (_v0) {
        var state0 = _v0.a;
        var incr = _v0.b;
        return $elm$random$Random$Seed_fn(((state0 * 1664525) + incr) >>> 0, incr);
    };
    var $elm$random$Random$initialSeed = function (x) {
        var _v0 = $elm$random$Random$next($elm$random$Random$Seed_fn(0, 1013904223));
        var state1 = _v0.a;
        var incr = _v0.b;
        var state2 = (state1 + x) >>> 0;
        return $elm$random$Random$next($elm$random$Random$Seed_fn(state2, incr));
    };
    var $elm$time$Time$Name = function (a) {
        return { $: 0, a: a };
    };
    var $elm$time$Time$Offset = function (a) {
        return { $: 1, a: a };
    };
    var $elm$time$Time$Zone_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $elm$time$Time$Zone = F2($elm$time$Time$Zone_fn);
    var $elm$time$Time$customZone = $elm$time$Time$Zone;
    var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
    var $elm$time$Time$posixToMillis = function (_v0) {
        var millis = _v0;
        return millis;
    };
    var $elm$random$Random$init = _Scheduler_andThen_fn(function (time) {
        return $elm$core$Task$succeed($elm$random$Random$initialSeed($elm$time$Time$posixToMillis(time)));
    }, $elm$time$Time$now);
    var $elm$random$Random$step_fn = function (_v0, seed) {
        var generator = _v0;
        return generator(seed);
    }, $elm$random$Random$step = F2($elm$random$Random$step_fn);
    var $elm$random$Random$onEffects_fn = function (router, commands, seed) {
        if (!commands.b) {
            return $elm$core$Task$succeed(seed);
        }
        else {
            var generator = commands.a;
            var rest = commands.b;
            var _v1 = $elm$random$Random$step_fn(generator, seed);
            var value = _v1.a;
            var newSeed = _v1.b;
            return _Scheduler_andThen_fn(function (_v2) {
                return $elm$random$Random$onEffects_fn(router, rest, newSeed);
            }, _Platform_sendToApp_fn(router, value));
        }
    }, $elm$random$Random$onEffects = F3($elm$random$Random$onEffects_fn);
    var $elm$random$Random$onSelfMsg_fn = function (_v0, _v1, seed) {
        return $elm$core$Task$succeed(seed);
    }, $elm$random$Random$onSelfMsg = F3($elm$random$Random$onSelfMsg_fn);
    var $elm$random$Random$map_fn = function (func, _v0) {
        var genA = _v0;
        return function (seed0) {
            var _v1 = genA(seed0);
            var a = _v1.a;
            var seed1 = _v1.b;
            return _Utils_Tuple2(func(a), seed1);
        };
    }, $elm$random$Random$map = F2($elm$random$Random$map_fn);
    var $elm$random$Random$cmdMap_fn = function (func, _v0) {
        var generator = _v0;
        return $elm$random$Random$map_fn(func, generator);
    }, $elm$random$Random$cmdMap = F2($elm$random$Random$cmdMap_fn);
    _Platform_effectManagers["Random"] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
    var $elm$random$Random$command = _Platform_leaf("Random");
    var $elm$random$Random$generate_fn = function (tagger, generator) {
        return $elm$random$Random$command($elm$random$Random$map_fn(tagger, generator));
    }, $elm$random$Random$generate = F2($elm$random$Random$generate_fn);
    var $author$project$GenerateurDeProblemes$quizScanVoirBloc = function (prblm) {
        switch (prblm.$) {
            case 0:
                var blcs = prblm.a;
                return "\n\\begin{Sujet}\n" + ($author$project$GenerateurDeProblemes$quizScanVoirBlocs(blcs) + "\n\\end{Sujet}");
            case 2:
                var mcr = prblm.a;
                var sjt = prblm.b;
                return $elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mcr) + ("\n" + $author$project$GenerateurDeProblemes$quizScanVoirBlocs(sjt));
            case 3:
                var mcr = prblm.a;
                var prps = prblm.b;
                var f = function (prp) {
                    if (!prp.$) {
                        var mc = prp.a;
                        return "    \\Vrai{" + ($elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mc) + "}");
                    }
                    else {
                        var mc = prp.a;
                        return "    \\Faux{" + ($elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mc) + "}");
                    }
                };
                return "\n  \\begin{QCM}\n" + ($elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mcr) + ("\n    \\begin{enumerate}\n" + ($elm$core$String$join_fn("\n", $elm$core$List$map_fn(f, prps)) + "\n    \\end{enumerate}\n  \\end{QCM}")));
            case 4:
                var prps = prblm.a;
                var f = function (prp) {
                    if (!prp.$) {
                        var mc = prp.a;
                        return "\n  \\begin{VraiFaux}\n    \\Vrai{" + ($elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mc) + "}\n  \\end{VraiFaux}");
                    }
                    else {
                        var mc = prp.a;
                        return "\n  \\begin{VraiFaux}\n    \\Faux{" + ($elm$core$Basics$composeL_fn($author$project$GenerateurDeProblemes$voirMacro_a0, $author$project$GenerateurDeProblemes$voirMacro_a1, mc) + "}\n  \\end{VraiFaux}");
                    }
                };
                return $elm$core$String$concat($elm$core$List$map_fn(f, prps));
            default:
                var ar = prblm.a;
                var sjt = prblm.b;
                return "" + $author$project$GenerateurDeProblemes$quizScanVoirBlocs(sjt);
        }
    };
    var $author$project$GenerateurDeProblemes$quizScanVoirBlocs = function (blcs) {
        return $elm$core$String$join_fn("\n", $elm$core$List$map_fn($author$project$GenerateurDeProblemes$quizScanVoirBloc, blcs));
    };
    var $author$project$GenerateurDeProblemes$quizScanVoirSujet = function (blcs) {
        return "\\documentclass[oneside,twocolumn,landscape]{book}\n\\usepackage[T1]{fontenc}\n\\usepackage[utf8]{inputenc}\n\\usepackage{geometry}\n\\geometry{verbose,tmargin=1cm,bmargin=1cm,lmargin=2cm,rmargin=2cm}\n\\setcounter{secnumdepth}{3}\n\\setcounter{tocdepth}{3}\n\\usepackage{mathrsfs}\n\\usepackage{amsmath}\n\\usepackage{amssymb}\n\\usepackage{amsfonts}\n\\usepackage{bbold}\n\\usepackage{xcolor}\n\\pagestyle{empty}\n\\newcounter{NumeroDuSujet}\n\\setcounter{NumeroDuSujet}{10}\n\\newenvironment{Sujet}[1][]\n  {\\refstepcounter{NumeroDuSujet}\\section*{Num\u00E9ro du sujet :~\\theNumeroDuSujet}\\par #1}{\\newpage}\n\\newcounter{NumeroDeLaQuestion}[NumeroDuSujet]\n\\newenvironment{VraiFaux}[1][]\n  {\\begin{enumerate}\\setcounter{enumi}{\\theNumeroDeLaQuestion}#1}\n  {\\end{enumerate}\\stepcounter{NumeroDeLaQuestion}}\n\\newenvironment{QCM}[1][]\n  {\\begin{enumerate}\\setcounter{enumi}{\\theNumeroDeLaQuestion}\\item #1}\n  {\\end{enumerate}\\stepcounter{NumeroDeLaQuestion}}\n\n\\let\\Vrai\\item\n\\let\\Faux\\item\n\n% Pour obtenir les corrig\u00E9s, retirer les % devant les deux lignes suivantes :\n\n%\\def\\Vrai#1{\\item{\\color{green}#1}}\n%\\def\\Faux#1{\\item{\\color{red}#1}}\n\n\\begin{document}\n\n" + ($author$project$GenerateurDeProblemes$quizScanVoirBlocs(blcs) + "\n\n\\end{document}");
    };
    var $author$project$GenerateurDeProblemes$Sujet = function (a) {
        return { $: 0, a: a };
    };
    var $elm$parser$Parser$Done = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$GenerateurDeProblemes$Entete_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $author$project$GenerateurDeProblemes$Entete = F2($author$project$GenerateurDeProblemes$Entete_fn);
    var $elm$parser$Parser$Loop = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$GenerateurDeProblemes$VariableAremplacer_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $author$project$GenerateurDeProblemes$VariableAremplacer = F2($author$project$GenerateurDeProblemes$VariableAremplacer_fn);
    var $author$project$GenerateurDeProblemes$Aremplacer_fn = function (_var, vals) {
        return { cj: vals, bw: _var };
    }, $author$project$GenerateurDeProblemes$Aremplacer = F2($author$project$GenerateurDeProblemes$Aremplacer_fn);
    var $author$project$Fraction$asciiMath = function (a) {
        return "(" + ($elm$core$String$fromInt(a.e) + ("/" + ($elm$core$String$fromInt(a.f) + ")")));
    };
    var $author$project$GenerateurDeProblemes$espaces = $elm$parser$Parser$chompWhile($elm$core$Basics$eq(" "));
    var $author$project$ParserExpressionMathematique$evaluerUnsafe = function (expression) {
        var _v0 = $author$project$ParserExpressionMathematique$resultatFractionnaire(expression);
        if (_v0.$ === 1) {
            return { f: 1, e: 666 };
        }
        else {
            var a = _v0.a;
            return a;
        }
    };
    var $author$project$GenerateurDeProblemes$reserve = $elm$core$Set$fromList(_List_fromArray(["qcm", "vrfx"]));
    var $author$project$GenerateurDeProblemes$aRemplacer = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(F2(function (x, y) {
        return $author$project$GenerateurDeProblemes$Aremplacer_fn(x, $elm$core$List$map_fn(A2($elm$core$Basics$composeL, $author$project$Fraction$asciiMath, $author$project$ParserExpressionMathematique$evaluerUnsafe), y));
    })), $author$project$GenerateurDeProblemes$espaces), $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$variable({ fb: $elm$core$Char$isAlpha, fR: $author$project$GenerateurDeProblemes$reserve, ao: $elm$core$Char$isAlpha }), $author$project$GenerateurDeProblemes$espaces), $elm$parser$Parser$symbol(":"))), $elm$parser$Parser$sequence({ a4: "", a7: $author$project$ParserExpressionMathematique$expressionMathematique, bf: ",", bg: $author$project$GenerateurDeProblemes$espaces, ao: "", bt: 1 }));
    var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
    var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse(s0);
            if (_v1.$ === 1) {
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(false, x);
            }
            else {
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(false, a, s1);
            }
        };
    };
    var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
    var $elm$parser$Parser$ExpectingEnd = { $: 10 };
    var $elm$parser$Parser$Advanced$end = function (x) {
        return function (s) {
            return _Utils_eq($elm$core$String$length(s.a), s.b6) ? $elm$parser$Parser$Advanced$Good_fn(false, 0, s) : $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, x));
        };
    };
    var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
    var $author$project$GenerateurDeProblemes$flip_fn = function (f, a, b) {
        return A2(f, b, a);
    }, $author$project$GenerateurDeProblemes$flip_fn_unwrapped = function (f, a, b) {
        return f(b, a);
    }, $author$project$GenerateurDeProblemes$flip = F3($author$project$GenerateurDeProblemes$flip_fn);
    var $elm$parser$Parser$Advanced$getCol = function (s) {
        return $elm$parser$Parser$Advanced$Good_fn(false, s.gR, s);
    };
    var $elm$parser$Parser$getCol = $elm$parser$Parser$Advanced$getCol;
    var $elm$parser$Parser$Advanced$getIndent = function (s) {
        return $elm$parser$Parser$Advanced$Good_fn(false, s.g, s);
    };
    var $elm$parser$Parser$getIndent = $elm$parser$Parser$Advanced$getIndent;
    var $elm$parser$Parser$toAdvancedStep = function (step) {
        if (!step.$) {
            var s = step.a;
            return $elm$parser$Parser$Advanced$Loop(s);
        }
        else {
            var a = step.a;
            return $elm$parser$Parser$Advanced$Done(a);
        }
    };
    var $elm$parser$Parser$loop_fn = function (state, callback) {
        return $elm$parser$Parser$Advanced$loop_fn(state, function (s) {
            return $elm$parser$Parser$Advanced$map_fn($elm$parser$Parser$toAdvancedStep, callback(s));
        });
    }, $elm$parser$Parser$loop = F2($elm$parser$Parser$loop_fn);
    var $author$project$GenerateurDeProblemes$Variable = function (a) {
        return { $: 1, a: a };
    };
    var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
    var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
        var str = _v0.a;
        var expecting = _v0.b;
        return function (s) {
            var _v1 = _Parser_findSubString_fn(str, s.b6, s.h6, s.gR, s.a);
            var newOffset = _v1.a;
            var newRow = _v1.b;
            var newCol = _v1.c;
            return newOffset === -1 ? $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromInfo_fn(newRow, newCol, expecting, s.gV)) : $elm$parser$Parser$Advanced$Good_fn(_Utils_cmp(s.b6, newOffset) < 0, 0, { gR: newCol, gV: s.gV, g: s.g, b6: newOffset, h6: newRow, a: s.a });
        };
    };
    var $elm$parser$Parser$chompUntil = function (str) {
        return $elm$parser$Parser$Advanced$chompUntil($elm$parser$Parser$toToken(str));
    };
    var $author$project$GenerateurDeProblemes$expressionVariable = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$Variable), $elm$parser$Parser$symbol("#")), $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$getChompedString($elm$parser$Parser$chompUntil("#")), $elm$parser$Parser$symbol("#")));
    var $author$project$GenerateurDeProblemes$Texte = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
    var $elm$core$String$repeatHelp_fn = function (n, chunk, result) {
        return (n <= 0) ? result : $elm$core$String$repeatHelp_fn(n >> 1, _Utils_ap(chunk, chunk), (!(n & 1)) ? result : _Utils_ap(result, chunk));
    }, $elm$core$String$repeatHelp = F3($elm$core$String$repeatHelp_fn);
    var $elm$core$String$repeat_fn = function (n, chunk) {
        return $elm$core$String$repeatHelp_fn(n, chunk, "");
    }, $elm$core$String$repeat = F2($elm$core$String$repeat_fn);
    var $elm$parser$Parser$token = function (str) {
        return $elm$parser$Parser$Advanced$token($elm$parser$Parser$toToken(str));
    };
    var $author$project$GenerateurDeProblemes$retourAlaLigne = function () {
        var suite = function (ind) {
            return $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$Texte("\n")), $elm$parser$Parser$token("\n")), $elm$parser$Parser$token($elm$core$String$repeat_fn(ind - 1, " ")));
        };
        return $elm$parser$Parser$Advanced$andThen_fn(suite, $elm$parser$Parser$getIndent);
    }();
    var $author$project$GenerateurDeProblemes$texteSansVariables = function () {
        var condition = function (caractere) {
            return (caractere !== "#") && (caractere !== "\n");
        };
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$Texte), $elm$parser$Parser$getChompedString($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(0), $elm$parser$Parser$chompIf(condition)), $elm$parser$Parser$chompWhile(condition))));
    }();
    var $author$project$GenerateurDeProblemes$macro = function () {
        var suite = function (ls) {
            return $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed(function (l) {
                    return $elm$parser$Parser$Loop(_List_Cons(l, ls));
                }), $elm$parser$Parser$oneOf(_List_fromArray([
                    $author$project$GenerateurDeProblemes$expressionVariable,
                    $author$project$GenerateurDeProblemes$texteSansVariables,
                    $elm$parser$Parser$backtrackable($author$project$GenerateurDeProblemes$retourAlaLigne)
                ]))),
                $elm$parser$Parser$Advanced$map_fn(function (_v0) {
                    return $elm$parser$Parser$Done($elm$core$List$reverse(ls));
                }, $elm$parser$Parser$succeed(0))
            ]));
        };
        return $elm$parser$Parser$loop_fn(_List_Nil, suite);
    }();
    var $elm$core$Tuple$pair_fn = function (a, b) {
        return _Utils_Tuple2(a, b);
    }, $elm$core$Tuple$pair = F2($elm$core$Tuple$pair_fn);
    var $author$project$GenerateurDeProblemes$QCM_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $author$project$GenerateurDeProblemes$QCM = F2($author$project$GenerateurDeProblemes$QCM_fn);
    var $author$project$GenerateurDeProblemes$Faux = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$GenerateurDeProblemes$Vrai = function (a) {
        return { $: 0, a: a };
    };
    var $elm$core$Tuple$second = function (_v0) {
        var y = _v0.b;
        return y;
    };
    var $author$project$GenerateurDeProblemes$propositions = function () {
        var suiteBis = function (prps) {
            var fin = $elm$parser$Parser$map(function (_v0) {
                return $elm$parser$Parser$Done(prps);
            });
            var boucle = $elm$parser$Parser$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(function (mcr) {
                    return $elm$parser$Parser$Loop(_List_Cons($author$project$GenerateurDeProblemes$Vrai(mcr), prps));
                }), $elm$parser$Parser$symbol("+")), $author$project$GenerateurDeProblemes$macro),
                $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(function (mcr) {
                    return $elm$parser$Parser$Loop(_List_Cons($author$project$GenerateurDeProblemes$Faux(mcr), prps));
                }), $elm$parser$Parser$symbol("-")), $author$project$GenerateurDeProblemes$macro)
            ]));
            var suite = function (col_ind) {
                return $elm$parser$Parser$oneOf(_List_fromArray([
                    fin($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(0), $elm$parser$Parser$end)),
                    (_Utils_cmp(col_ind.a, col_ind.b) > 0) ? boucle : fin($elm$parser$Parser$succeed(0))
                ]));
            };
            return $elm$parser$Parser$Advanced$andThen_fn(suite, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Tuple$pair), $elm$parser$Parser$spaces), $elm$parser$Parser$getCol), $elm$parser$Parser$getIndent));
        };
        return $elm$parser$Parser$loop_fn(_List_Nil, suiteBis);
    }();
    var $author$project$GenerateurDeProblemes$qcm = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$QCM), $elm$parser$Parser$keyword("qcm")), $author$project$GenerateurDeProblemes$espaces), $author$project$GenerateurDeProblemes$macro), $author$project$GenerateurDeProblemes$propositions);
    var $author$project$GenerateurDeProblemes$VraiFaux = function (a) {
        return { $: 4, a: a };
    };
    var $author$project$GenerateurDeProblemes$vraiFaux = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$VraiFaux), $elm$parser$Parser$keyword("vrfx")), $author$project$GenerateurDeProblemes$propositions);
    var $elm$parser$Parser$Advanced$changeIndent_fn = function (newIndent, s) {
        return { gR: s.gR, gV: s.gV, g: newIndent, b6: s.b6, h6: s.h6, a: s.a };
    }, $elm$parser$Parser$Advanced$changeIndent = F2($elm$parser$Parser$Advanced$changeIndent_fn);
    var $elm$parser$Parser$Advanced$withIndent_fn = function (newIndent, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse($elm$parser$Parser$Advanced$changeIndent_fn(newIndent, s0));
            if (!_v1.$) {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, a, $elm$parser$Parser$Advanced$changeIndent_fn(s0.g, s1));
            }
            else {
                var p = _v1.a;
                var x = _v1.b;
                return $elm$parser$Parser$Advanced$Bad_fn(p, x);
            }
        };
    }, $elm$parser$Parser$Advanced$withIndent = F2($elm$parser$Parser$Advanced$withIndent_fn);
    var $elm$parser$Parser$withIndent = $elm$parser$Parser$Advanced$withIndent;
    function $author$project$GenerateurDeProblemes$cyclic$bloc() {
        var suite = A2($author$project$GenerateurDeProblemes$flip, $elm$parser$Parser$withIndent, $elm$parser$Parser$oneOf(_List_fromArray([
            $author$project$GenerateurDeProblemes$vraiFaux,
            $author$project$GenerateurDeProblemes$qcm,
            $elm$parser$Parser$backtrackable($author$project$GenerateurDeProblemes$cyclic$variableAremplacer()),
            $author$project$GenerateurDeProblemes$cyclic$entete()
        ])));
        return $elm$parser$Parser$Advanced$andThen_fn(suite, $elm$parser$Parser$getCol);
    }
    function $author$project$GenerateurDeProblemes$cyclic$variableAremplacer() {
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$VariableAremplacer), $author$project$GenerateurDeProblemes$aRemplacer), $author$project$GenerateurDeProblemes$cyclic$blocs());
    }
    function $author$project$GenerateurDeProblemes$cyclic$entete() {
        return $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed($author$project$GenerateurDeProblemes$Entete), $author$project$GenerateurDeProblemes$macro), $author$project$GenerateurDeProblemes$cyclic$blocs());
    }
    function $author$project$GenerateurDeProblemes$cyclic$blocs() {
        var problemes = function (prblms) {
            var fin = $elm$parser$Parser$map(function (_v0) {
                return $elm$parser$Parser$Done($elm$core$List$reverse(prblms));
            });
            var boucle = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed(function (prblm) {
                return $elm$parser$Parser$Loop(_List_Cons(prblm, prblms));
            }), $author$project$GenerateurDeProblemes$cyclic$bloc());
            var suite = function (col_ind) {
                return $elm$parser$Parser$oneOf(_List_fromArray([
                    fin($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed(0), $elm$parser$Parser$end)),
                    (_Utils_cmp(col_ind.a, col_ind.b) > 0) ? boucle : fin($elm$parser$Parser$succeed(0))
                ]));
            };
            return $elm$parser$Parser$Advanced$andThen_fn(suite, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$succeed($elm$core$Tuple$pair), $elm$parser$Parser$spaces), $elm$parser$Parser$getCol), $elm$parser$Parser$getIndent));
        };
        return $elm$parser$Parser$loop_fn(_List_Nil, problemes);
    }
    var $author$project$GenerateurDeProblemes$bloc = $author$project$GenerateurDeProblemes$cyclic$bloc();
    $author$project$GenerateurDeProblemes$cyclic$bloc = function () {
        return $author$project$GenerateurDeProblemes$bloc;
    };
    var $author$project$GenerateurDeProblemes$variableAremplacer = $author$project$GenerateurDeProblemes$cyclic$variableAremplacer();
    $author$project$GenerateurDeProblemes$cyclic$variableAremplacer = function () {
        return $author$project$GenerateurDeProblemes$variableAremplacer;
    };
    var $author$project$GenerateurDeProblemes$entete = $author$project$GenerateurDeProblemes$cyclic$entete();
    $author$project$GenerateurDeProblemes$cyclic$entete = function () {
        return $author$project$GenerateurDeProblemes$entete;
    };
    var $author$project$GenerateurDeProblemes$blocs = $author$project$GenerateurDeProblemes$cyclic$blocs();
    $author$project$GenerateurDeProblemes$cyclic$blocs = function () {
        return $author$project$GenerateurDeProblemes$blocs;
    };
    var $elm$core$List$singleton = function (value) {
        return _List_fromArray([value]);
    };
    var $author$project$GenerateurDeProblemes$sujet = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$succeed(A2($elm$core$Basics$composeL, $elm$core$List$singleton, $author$project$GenerateurDeProblemes$Sujet)), $author$project$GenerateurDeProblemes$blocs);
    var $elm$random$Random$andThen_fn = function (callback, _v0) {
        var genA = _v0;
        return function (seed) {
            var _v1 = genA(seed);
            var result = _v1.a;
            var newSeed = _v1.b;
            var _v2 = callback(result);
            var genB = _v2;
            return genB(newSeed);
        };
    }, $elm$random$Random$andThen = F2($elm$random$Random$andThen_fn);
    var $elm$core$List$append_fn = function (xs, ys) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs.b; xs = xs.b) {
            var next = _List_Cons(xs.a, _List_Nil);
            end.b = next;
            end = next;
        }
        end.b = ys;
        return tmp.b;
    }, $elm$core$List$append = F2($elm$core$List$append_fn);
    var $elm$core$List$concat = function (lists) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        if (!lists.
            b) {
            return _List_Nil;
        }
        for (; lists.b.b; lists = lists.b) {
            var xs = lists.a;
            for (; xs.b; xs =
                xs.b) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b = next;
                end = next;
            }
        }
        end
            .b = lists.a;
        return tmp.b;
    };
    var $elm$random$Random$map2_fn = function (func, _v0, _v1) {
        var genA = _v0;
        var genB = _v1;
        return function (seed0) {
            var _v2 = genA(seed0);
            var a = _v2.a;
            var seed1 = _v2.b;
            var _v3 = genB(seed1);
            var b = _v3.a;
            var seed2 = _v3.b;
            return _Utils_Tuple2(A2(func, a, b), seed2);
        };
    }, $elm$random$Random$map2_fn_unwrapped = function (func, _v0, _v1) {
        var genA = _v0;
        var genB = _v1;
        return function (seed0) {
            var _v2 = genA(seed0);
            var a = _v2.a;
            var seed1 = _v2.b;
            var _v3 = genB(seed1);
            var b = _v3.a;
            var seed2 = _v3.b;
            return _Utils_Tuple2(func(a, b), seed2);
        };
    }, $elm$random$Random$map2 = F3($elm$random$Random$map2_fn);
    var $elm$core$String$replace_fn = function (before, after, string) {
        return $elm$core$String$join_fn(after, $elm$core$String$split_fn(before, string));
    }, $elm$core$String$replace = F3($elm$core$String$replace_fn);
    var $author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLeTexteVariable_fn = function (_var, val, tv) {
        if (!tv.$) {
            var chaine = tv.a;
            return $author$project$GenerateurDeProblemes$Texte(chaine);
        }
        else {
            var chaine = tv.a;
            return $author$project$GenerateurDeProblemes$Variable($elm$core$String$replace_fn(_var, val, chaine));
        }
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLeTexteVariable = F3($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLeTexteVariable_fn);
    var $author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn = function (_var, val, mcr) {
        return $elm$core$List$map_fn(A2($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLeTexteVariable, _var, val), mcr);
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro = F3($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn);
    var $author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaProposition_fn = function (vrbl, vlr, prp) {
        if (!prp.$) {
            var mcr = prp.a;
            return $author$project$GenerateurDeProblemes$Vrai($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn(vrbl, vlr, mcr));
        }
        else {
            var mcr = prp.a;
            return $author$project$GenerateurDeProblemes$Faux($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn(vrbl, vlr, mcr));
        }
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaProposition = F3($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaProposition_fn);
    var $elm_community$random_extra$Random$Extra$sequence_a0 = $elm$random$Random$map2($elm$core$List$cons), $elm_community$random_extra$Random$Extra$sequence_a1 = $elm$random$Random$constant(_List_Nil), $elm_community$random_extra$Random$Extra$sequence = A2($elm$core$List$foldr, $elm_community$random_extra$Random$Extra$sequence_a0, $elm_community$random_extra$Random$Extra$sequence_a1);
    var $elm$core$Bitwise$xor = _Bitwise_xor;
    var $elm$random$Random$peel = function (_v0) {
        var state = _v0.a;
        var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
        return ((word >>> 22) ^ word) >>> 0;
    };
    var $elm$random$Random$int_fn = function (a, b) {
        return function (seed0) {
            var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
            var lo = _v0.a;
            var hi = _v0.b;
            var range = (hi - lo) + 1;
            if (!((range - 1) & range)) {
                return _Utils_Tuple2((((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo, $elm$random$Random$next(seed0));
            }
            else {
                var threshhold = (((-range) >>> 0) % range) >>> 0;
                var accountForBias = function (seed) {
                    accountForBias: while (true) {
                        var x = $elm$random$Random$peel(seed);
                        var seedN = $elm$random$Random$next(seed);
                        if (_Utils_cmp(x, threshhold) < 0) {
                            var $temp$seed = seedN;
                            seed = $temp$seed;
                            continue accountForBias;
                        }
                        else {
                            return _Utils_Tuple2((x % range) + lo, seedN);
                        }
                    }
                };
                return accountForBias(seed0);
            }
        };
    }, $elm$random$Random$int = F2($elm$random$Random$int_fn);
    var $elm$random$Random$maxInt = 2147483647;
    var $elm$random$Random$minInt = -2147483648;
    var $elm_community$random_extra$Random$List$anyInt = $elm$random$Random$int_fn($elm$random$Random$minInt, $elm$random$Random$maxInt);
    var $elm$random$Random$map3_fn = function (func, _v0, _v1, _v2) {
        var genA = _v0;
        var genB = _v1;
        var genC = _v2;
        return function (seed0) {
            var _v3 = genA(seed0);
            var a = _v3.a;
            var seed1 = _v3.b;
            var _v4 = genB(seed1);
            var b = _v4.a;
            var seed2 = _v4.b;
            var _v5 = genC(seed2);
            var c = _v5.a;
            var seed3 = _v5.b;
            return _Utils_Tuple2(A3(func, a, b, c), seed3);
        };
    }, $elm$random$Random$map3_fn_unwrapped = function (func, _v0, _v1, _v2) {
        var genA = _v0;
        var genB = _v1;
        var genC = _v2;
        return function (seed0) {
            var _v3 = genA(seed0);
            var a = _v3.a;
            var seed1 = _v3.b;
            var _v4 = genB(seed1);
            var b = _v4.a;
            var seed2 = _v4.b;
            var _v5 = genC(seed2);
            var c = _v5.a;
            var seed3 = _v5.b;
            return _Utils_Tuple2(func(a, b, c), seed3);
        };
    }, $elm$random$Random$map3 = F4($elm$random$Random$map3_fn);
    var $elm$core$Bitwise$or = _Bitwise_or;
    var $elm$random$Random$independentSeed = function (seed0) {
        var makeIndependentSeed = F3(function (state, b, c) {
            return $elm$random$Random$next($elm$random$Random$Seed_fn(state, (1 | (b ^ c)) >>> 0));
        });
        var gen = $elm$random$Random$int_fn(0, 4294967295);
        return $elm$random$Random$step_fn($elm$random$Random$map3_fn(makeIndependentSeed, gen, gen, gen), seed0);
    };
    var $elm$core$List$sortBy = _List_sortBy;
    var $elm_community$random_extra$Random$List$shuffle = function (list) {
        return $elm$random$Random$map_fn(function (independentSeed) {
            return $elm$core$List$map_fn($elm$core$Tuple$first, _List_sortBy_fn($elm$core$Tuple$second, $elm$core$List$foldl_fn_unwrapped(function (item, _v0) {
                var acc = _v0.a;
                var seed = _v0.b;
                var _v1 = $elm$random$Random$step_fn($elm_community$random_extra$Random$List$anyInt, seed);
                var tag = _v1.a;
                var nextSeed = _v1.b;
                return _Utils_Tuple2(_List_Cons(_Utils_Tuple2(item, tag), acc), nextSeed);
            }, _Utils_Tuple2(_List_Nil, independentSeed), list).a));
        }, $elm$random$Random$independentSeed);
    };
    var $elm$random$Random$addOne = function (value) {
        return _Utils_Tuple2(1, value);
    };
    var $elm$random$Random$float_fn = function (a, b) {
        return function (seed0) {
            var seed1 = $elm$random$Random$next(seed0);
            var range = $elm$core$Basics$abs(b - a);
            var n1 = $elm$random$Random$peel(seed1);
            var n0 = $elm$random$Random$peel(seed0);
            var lo = (134217727 & n1) * 1;
            var hi = (67108863 & n0) * 1;
            var val = ((hi * 134217728) + lo) / 9007199254740992;
            var scaled = (val * range) + a;
            return _Utils_Tuple2(scaled, $elm$random$Random$next(seed1));
        };
    }, $elm$random$Random$float = F2($elm$random$Random$float_fn);
    var $elm$random$Random$getByWeight_fn = function (_v0, others, countdown) {
        getByWeight: while (true) {
            var weight = _v0.a;
            var value = _v0.b;
            if (!others.b) {
                return value;
            }
            else {
                var second = others.a;
                var otherOthers = others.b;
                if (_Utils_cmp(countdown, $elm$core$Basics$abs(weight)) < 1) {
                    return value;
                }
                else {
                    var $temp$_v0 = second, $temp$others = otherOthers, $temp$countdown = countdown - $elm$core$Basics$abs(weight);
                    _v0 = $temp$_v0;
                    others = $temp$others;
                    countdown = $temp$countdown;
                    continue getByWeight;
                }
            }
        }
    }, $elm$random$Random$getByWeight = F3($elm$random$Random$getByWeight_fn);
    var $elm$core$List$sum = function (numbers) {
        return $elm$core$List$foldl_fn($elm$core$Basics$add, 0, numbers);
    };
    var $elm$random$Random$weighted_fn = function (first, others) {
        var normalize = function (_v0) {
            var weight = _v0.a;
            return $elm$core$Basics$abs(weight);
        };
        var total = normalize(first) + $elm$core$List$sum($elm$core$List$map_fn(normalize, others));
        return $elm$random$Random$map_fn(A2($elm$random$Random$getByWeight, first, others), $elm$random$Random$float_fn(0, total));
    }, $elm$random$Random$weighted = F2($elm$random$Random$weighted_fn);
    var $elm$random$Random$uniform_fn = function (value, valueList) {
        return $elm$random$Random$weighted_fn($elm$random$Random$addOne(value), $elm$core$List$map_fn($elm$random$Random$addOne, valueList));
    }, $elm$random$Random$uniform = F2($elm$random$Random$uniform_fn);
    var $author$project$GenerateurDeProblemes$valeurAleatoire_fn = function (f, fs) {
        if (!fs.b) {
            return $elm$random$Random$constant(f);
        }
        else {
            var ff = fs.a;
            var fss = fs.b;
            return $elm$random$Random$uniform_fn(ff, fss);
        }
    }, $author$project$GenerateurDeProblemes$valeurAleatoire = F2($author$project$GenerateurDeProblemes$valeurAleatoire_fn);
    var $author$project$GenerateurDeProblemes$blocAleatoire = function (prblm) {
        switch (prblm.$) {
            case 0:
                var blcs = prblm.a;
                return $elm$random$Random$map_fn(A2($elm$core$Basics$composeL, $elm$core$List$singleton, $author$project$GenerateurDeProblemes$Sujet), $author$project$GenerateurDeProblemes$blocsAleatoires(blcs));
            case 1:
                var ar = prblm.a;
                var sjt = prblm.b;
                var vrbl = ar.bw;
                var vlr = $author$project$GenerateurDeProblemes$valeurAleatoire_fn("", ar.cj);
                var f = F2(function (sj, vl) {
                    return $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires_fn(vrbl, vl, sj);
                });
                return $elm$random$Random$andThen_fn(f(sjt), vlr);
            case 2:
                var mcr = prblm.a;
                var sjt = prblm.b;
                return $elm$random$Random$map_fn(A2($elm$core$Basics$composeL, $elm$core$List$singleton, $author$project$GenerateurDeProblemes$Entete(mcr)), $author$project$GenerateurDeProblemes$blocsAleatoires(sjt));
            case 4:
                var prps = prblm.a;
                return $elm$random$Random$map_fn(A2($elm$core$Basics$composeL, A2($elm$core$Basics$composeL, $elm$core$List$singleton, $author$project$GenerateurDeProblemes$VraiFaux), $elm$core$List$singleton), $author$project$GenerateurDeProblemes$valeurAleatoire_fn($author$project$GenerateurDeProblemes$Vrai(_List_fromArray([
                    $author$project$GenerateurDeProblemes$Texte("Le prof de maths est le meilleur.")
                ])), prps));
            default:
                var mcr = prblm.a;
                var prps = prblm.b;
                return $elm$random$Random$map_fn(A2($elm$core$Basics$composeL, $elm$core$List$singleton, $author$project$GenerateurDeProblemes$QCM(mcr)), $elm_community$random_extra$Random$List$shuffle(prps));
        }
    };
    var $author$project$GenerateurDeProblemes$blocsAleatoires = function (sjt) {
        return $elm$random$Random$map_fn($elm$core$List$concat, $elm$core$List$foldr_fn($elm_community$random_extra$Random$Extra$sequence_a0, $elm_community$random_extra$Random$Extra$sequence_a1, $elm$core$List$map_fn($author$project$GenerateurDeProblemes$blocAleatoire, sjt)));
    };
    var $author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBlocAleatoire_fn = function (vrbl, vlr, prblm) {
        switch (prblm.$) {
            case 0:
                var blcs = prblm.a;
                return $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires_fn(vrbl, vlr, blcs);
            case 1:
                var ar = prblm.a;
                var sjt = prblm.b;
                return $elm$random$Random$andThen_fn(A2($author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires, vrbl, vlr), $author$project$GenerateurDeProblemes$blocAleatoire($author$project$GenerateurDeProblemes$VariableAremplacer_fn(ar, sjt)));
            case 2:
                var mcr = prblm.a;
                var sjt = prblm.b;
                return $elm$random$Random$map_fn($elm$core$List$singleton, $elm$random$Random$map2_fn($author$project$GenerateurDeProblemes$Entete, $elm$random$Random$constant($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn(vrbl, vlr, mcr)), $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires_fn(vrbl, vlr, sjt)));
            case 3:
                var mcr = prblm.a;
                var prps = prblm.b;
                return $elm$random$Random$map_fn($elm$core$List$singleton, $elm$random$Random$map2_fn($author$project$GenerateurDeProblemes$QCM, $elm$random$Random$constant($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn(vrbl, vlr, mcr)), $elm_community$random_extra$Random$List$shuffle($elm$core$List$map_fn(A2($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaProposition, vrbl, vlr), prps))));
            default:
                var prps = prblm.a;
                return $elm$random$Random$map_fn(A2($elm$core$Basics$composeL, A2($elm$core$Basics$composeL, A2($elm$core$Basics$composeL, $elm$core$List$singleton, $author$project$GenerateurDeProblemes$VraiFaux), $elm$core$List$singleton), A2($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaProposition, vrbl, vlr)), $author$project$GenerateurDeProblemes$valeurAleatoire_fn($author$project$GenerateurDeProblemes$Vrai(_List_fromArray([
                    $author$project$GenerateurDeProblemes$Texte("Le prof de maths est le meilleur.")
                ])), prps));
        }
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBlocAleatoire = F3($author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBlocAleatoire_fn);
    var $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires_fn = function (vrbl, vlr, sjt) {
        return $elm$random$Random$map_fn($elm$core$List$concat, $elm$core$List$foldr_fn($elm_community$random_extra$Random$Extra$sequence_a0, $elm_community$random_extra$Random$Extra$sequence_a1, $elm$core$List$map_fn(A2($author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBlocAleatoire, vrbl, vlr), sjt)));
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires = F3($author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocsAleatoires_fn);
    var $elm$random$Random$listHelp_fn = function (revList, n, gen, seed) {
        listHelp: while (true) {
            if (n < 1) {
                return _Utils_Tuple2(revList, seed);
            }
            else {
                var _v0 = gen(seed);
                var value = _v0.a;
                var newSeed = _v0.b;
                var $temp$revList = _List_Cons(value, revList), $temp$n = n - 1, $temp$gen = gen, $temp$seed = newSeed;
                revList = $temp$revList;
                n = $temp$n;
                gen = $temp$gen;
                seed = $temp$seed;
                continue listHelp;
            }
        }
    }, $elm$random$Random$listHelp = F4($elm$random$Random$listHelp_fn);
    var $elm$random$Random$list_fn = function (n, _v0) {
        var gen = _v0;
        return function (seed) {
            return $elm$random$Random$listHelp_fn(_List_Nil, n, gen, seed);
        };
    }, $elm$random$Random$list = F2($elm$random$Random$list_fn);
    var $author$project$GenerateurDeProblemes$sujetsAleatoires = function (sjt) {
        return $elm$random$Random$map_fn($elm$core$List$concat, $elm$random$Random$list_fn(89, $author$project$GenerateurDeProblemes$blocsAleatoires(sjt)));
    };
    var $elm$core$Maybe$map_fn = function (f, maybe) {
        if (!maybe.$) {
            var value = maybe.a;
            return $elm$core$Maybe$Just(f(value));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    }, $elm$core$Maybe$map = F2($elm$core$Maybe$map_fn);
    var $author$project$GenerateurDeProblemes$mix = function (lls) {
        if (!lls.b) {
            return _List_Nil;
        }
        else {
            if (!lls.a.b) {
                var llss = lls.b;
                return _List_Nil;
            }
            else {
                if (!lls.b.b) {
                    var l = lls.a;
                    return $elm$core$List$map_fn($elm$core$List$singleton, l);
                }
                else {
                    var _v1 = lls.a;
                    var a = _v1.a;
                    var ls = _v1.b;
                    var llss = lls.b;
                    return _Utils_ap($elm$core$List$map_fn($elm$core$List$cons(a), $author$project$GenerateurDeProblemes$mix(llss)), $author$project$GenerateurDeProblemes$mix(_List_Cons(ls, llss)));
                }
            }
        }
    };
    var $author$project$GenerateurDeProblemes$qcmsDepuisVraiFauxx_fn = function (mcr, blcs) {
        var listeDesAlternatives = F2(function (listePartielle, listeDeMaybePropositions) {
            listeDesAlternatives: while (true) {
                if (!listeDeMaybePropositions.b) {
                    return $elm$core$Maybe$Just($elm$core$List$reverse(listePartielle));
                }
                else {
                    if (listeDeMaybePropositions.a.$ === 1) {
                        var _v1 = listeDeMaybePropositions.a;
                        var lstMbPrps = listeDeMaybePropositions.b;
                        return $elm$core$Maybe$Nothing;
                    }
                    else {
                        var prps = listeDeMaybePropositions.a.a;
                        var lstMbPrps = listeDeMaybePropositions.b;
                        var $temp$listePartielle = _List_Cons(prps, listePartielle), $temp$listeDeMaybePropositions = lstMbPrps;
                        listePartielle = $temp$listePartielle;
                        listeDeMaybePropositions = $temp$listeDeMaybePropositions;
                        continue listeDesAlternatives;
                    }
                }
            }
        });
        var alternativesDuVraiFaux = function (blc) {
            if (blc.$ === 4) {
                var prps = blc.a;
                return $elm$core$Maybe$Just(prps);
            }
            else {
                return $elm$core$Maybe$Nothing;
            }
        };
        return $elm$core$Maybe$map_fn($elm$core$List$map($author$project$GenerateurDeProblemes$QCM(mcr)), $elm$core$Maybe$map_fn($author$project$GenerateurDeProblemes$mix, A2(listeDesAlternatives, _List_Nil, $elm$core$List$map_fn(alternativesDuVraiFaux, blcs))));
    }, $author$project$GenerateurDeProblemes$qcmsDepuisVraiFauxx = F2($author$project$GenerateurDeProblemes$qcmsDepuisVraiFauxx_fn);
    var $author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBloc_fn = function (ar, blc) {
        switch (blc.$) {
            case 0:
                var blcs = blc.a;
                return $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs_fn(ar, blcs);
            case 1:
                var arr = blc.a;
                var sjt = blc.b;
                return $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs_fn(ar, $author$project$GenerateurDeProblemes$variantesBloc($author$project$GenerateurDeProblemes$VariableAremplacer_fn(arr, sjt)));
            case 2:
                var mcr = blc.a;
                var blcs = blc.b;
                var _v3 = $author$project$GenerateurDeProblemes$qcmsDepuisVraiFauxx_fn(mcr, blcs);
                if (!_v3.$) {
                    var qcms = _v3.a;
                    return $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs_fn(ar, qcms);
                }
                else {
                    return _List_fromArray([
                        $author$project$GenerateurDeProblemes$Entete_fn(_List_fromArray([
                            $author$project$GenerateurDeProblemes$Texte("Je ne peux pas prendre en charge une telle imbrication :(")
                        ]), _List_Nil)
                    ]);
                }
            case 3:
                var mcr = blc.a;
                var prps = blc.b;
                var f = function (vlr) {
                    return $author$project$GenerateurDeProblemes$QCM_fn($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaMacro_fn(ar.bw, vlr, mcr), $elm$core$List$map_fn(A2($author$project$GenerateurDeProblemes$remplacerLaVariableParLaValeurDansLaProposition, ar.bw, vlr), prps));
                };
                return $elm$core$List$map_fn(f, ar.cj);
            default:
                var prps = blc.a;
                return _List_fromArray([
                    $author$project$GenerateurDeProblemes$Entete_fn(_List_fromArray([
                        $author$project$GenerateurDeProblemes$Texte("J'ai besoin d'un ent\u00EAte pour g\u00E9n\u00E9rer des QCM \u00E0 partir de vrai-faux :(")
                    ]), _List_Nil)
                ]);
        }
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBloc = F2($author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBloc_fn);
    var $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs_fn = function (ar, blcs) {
        return $elm$core$List$concat($elm$core$List$map_fn($author$project$GenerateurDeProblemes$remplacerLaVariableDansLeBloc(ar), blcs));
    }, $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs = F2($author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs_fn);
    var $author$project$GenerateurDeProblemes$variantesBloc = function (blcs) {
        switch (blcs.$) {
            case 0:
                var blcss = blcs.a;
                return $elm$core$List$singleton($author$project$GenerateurDeProblemes$Sujet($author$project$GenerateurDeProblemes$cyclic$variantesBlocs()(blcss)));
            case 1:
                var ar = blcs.a;
                var blcss = blcs.b;
                return $author$project$GenerateurDeProblemes$remplacerLaVariableDansLesBlocs_fn(ar, blcss);
            case 2:
                var mcr = blcs.a;
                var blcss = blcs.b;
                var _v1 = $author$project$GenerateurDeProblemes$qcmsDepuisVraiFauxx_fn(mcr, blcss);
                if (!_v1.$) {
                    var qcms = _v1.a;
                    return qcms;
                }
                else {
                    return _List_fromArray([
                        $author$project$GenerateurDeProblemes$Entete_fn(_List_fromArray([
                            $author$project$GenerateurDeProblemes$Texte("Je ne peux pas prendre en charge une telle imbrication :(")
                        ]), _List_Nil)
                    ]);
                }
            case 4:
                var prps = blcs.a;
                return _List_fromArray([
                    $author$project$GenerateurDeProblemes$VraiFaux(prps)
                ]);
            default:
                var mcr = blcs.a;
                var prps = blcs.b;
                return _List_fromArray([
                    $author$project$GenerateurDeProblemes$QCM_fn(mcr, prps)
                ]);
        }
    };
    function $author$project$GenerateurDeProblemes$cyclic$variantesBlocs() {
        return A2($elm$core$Basics$composeL, $elm$core$List$concat, $elm$core$List$map($author$project$GenerateurDeProblemes$variantesBloc));
    }
    var $author$project$GenerateurDeProblemes$variantesBlocs = $author$project$GenerateurDeProblemes$cyclic$variantesBlocs();
    $author$project$GenerateurDeProblemes$cyclic$variantesBlocs = function () {
        return $author$project$GenerateurDeProblemes$variantesBlocs;
    };
    var $author$project$GenerateurDeProblemes$update_fn = function (msg, model) {
        switch (msg.$) {
            case 0:
                var nouvelleStructure = msg.a;
                return _Utils_Tuple2(_Utils_update(model, { aP: nouvelleStructure }), $elm$core$Platform$Cmd$none);
            case 3:
                var nouveauSujetGenere = msg.a;
                return _Utils_Tuple2(_Utils_update(model, { aR: nouveauSujetGenere }), $elm$core$Platform$Cmd$none);
            case 1:
                var f = function (strSuj) {
                    var _v1 = $elm$parser$Parser$run_fn($elm$parser$Parser$Advanced$withIndent_fn(-1, $author$project$GenerateurDeProblemes$sujet), strSuj);
                    if (!_v1.$) {
                        var sjt = _v1.a;
                        return $elm$random$Random$map_fn($author$project$GenerateurDeProblemes$quizScanVoirSujet, $author$project$GenerateurDeProblemes$sujetsAleatoires(sjt));
                    }
                    else {
                        var erreurs = _v1.a;
                        return $elm$random$Random$constant($author$project$GenerateurDeProblemes$deadEndsToStringBis(erreurs));
                    }
                };
                return _Utils_Tuple2(model, $elm$random$Random$generate_fn($author$project$GenerateurDeProblemes$SujetGenere, f(model.aP)));
            case 2:
                var f = function (strSuj) {
                    var _v2 = $elm$parser$Parser$run_fn($elm$parser$Parser$Advanced$withIndent_fn(-1, $author$project$GenerateurDeProblemes$sujet), strSuj);
                    if (!_v2.$) {
                        var sjt = _v2.a;
                        return $author$project$GenerateurDeProblemes$evalBoxVoirBlocs($author$project$GenerateurDeProblemes$variantesBlocs(sjt));
                    }
                    else {
                        var erreurs = _v2.a;
                        return $author$project$GenerateurDeProblemes$deadEndsToStringBis(erreurs);
                    }
                };
                return _Utils_Tuple2(_Utils_update(model, {
                    aR: f(model.aP)
                }), $elm$core$Platform$Cmd$none);
            default:
                return _Utils_Tuple2(model, $elm$file$File$Download$string_fn("Sujets.tex", "text/tex", model.aR));
        }
    }, $author$project$GenerateurDeProblemes$update = F2($author$project$GenerateurDeProblemes$update_fn);
    var $author$project$GenerateurH5P$showContextHelp_fn = function (depth, ccc) {
        showContextHelp: while (true) {
            if (!ccc.b) {
                return "";
            }
            else {
                var c = ccc.a;
                var cc = ccc.b;
                var f = function (x) {
                    return _Utils_ap($elm$core$String$repeat_fn(depth, "*"), _Utils_ap(x, $author$project$GenerateurH5P$showContextHelp_fn(depth + 1, cc)));
                };
                switch (c) {
                    case 0:
                        return "Pr\u00E9ambule";
                    case 1:
                        if (_Utils_eq(cc, _List_Nil)) {
                            return "Root";
                        }
                        else {
                            var $temp$depth = 1, $temp$ccc = cc;
                            depth = $temp$depth;
                            ccc = $temp$ccc;
                            continue showContextHelp;
                        }
                    case 2:
                        return f("BranchingScenario\n");
                    case 3:
                        return f("BranchingQuestion\n");
                    case 4:
                        return f("Alternative\n");
                    case 5:
                        return f("CoursePresentation\n");
                    default:
                        return f("TrueFalse\n");
                }
            }
        }
    }, $author$project$GenerateurH5P$showContextHelp = F2($author$project$GenerateurH5P$showContextHelp_fn);
    var $author$project$GenerateurH5P$showContext = function (contextStack) {
        if (!contextStack.b) {
            return "";
        }
        else {
            return "\nDans le contexte suivant :\n" + $author$project$GenerateurH5P$showContextHelp_fn(0, $elm$core$List$reverse(contextStack));
        }
    };
    var $author$project$GenerateurH5P$showProblem = function (prob) {
        switch (prob.$) {
            case 2:
                var p = prob.a;
                return p + "\n";
            case 0:
                return "Je ne peux pas produire de contenu \u00E0 partir de rien !\n";
            case 4:
                return "Fin de fichier\n";
            case 5:
                return "Je m'attends \u00E0 trouver l'un des mots clefs suivants :\n    BranchingScenario\n    CoursePresentation\n    TrueFalse\n";
            case 6:
                var x = prob.a;
                return "Contenu H5P inconnu : " + (x + "\n");
            case 7:
                return "La structure du document n'est pas consistante !\n";
            default:
                return "Probl\u00E8me inconnu\n";
        }
    };
    var $author$project$GenerateurH5P$voirErreur = function (err) {
        return "Ligne " + ($elm$core$String$fromInt(err.h6) + (", Colonne " + ($elm$core$String$fromInt(err.gR) + (" : " + ($author$project$GenerateurH5P$showProblem(err.hY) + ($author$project$GenerateurH5P$showContext($elm$core$List$map_fn(function ($) {
            return $.gV;
        }, err.gW)) + "\n\n---------------------------------------------------------\n"))))));
    };
    var $author$project$GenerateurH5P$deadEndsToStringBis = function (errs) {
        return "J'ai rencontr\u00E9 les probl\u00E8mes suivants :\n\n" + $elm$core$String$join_fn("\n\n", $elm$core$List$map_fn($author$project$GenerateurH5P$voirErreur, errs));
    };
    var $elm$json$Json$Encode$bool = _Json_wrap;
    var $elm$json$Json$Encode$object = function (pairs) {
        return _Json_wrap($elm$core$List$foldl_fn_unwrapped(function (_v0, obj) {
            var k = _v0.a;
            var v = _v0.b;
            return _Json_addField_fn(k, v, obj);
        }, _Json_emptyObject(0), pairs));
    };
    var $author$project$GenerateurH5P$encodedBranchingScenarioBehaviour = function (branchingScenarioBehaviour) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("enableBackwardsNavigation", $elm$json$Json$Encode$bool(branchingScenarioBehaviour.cU)),
            _Utils_Tuple2("forceContentFinished", $elm$json$Json$Encode$bool(branchingScenarioBehaviour.ac))
        ]));
    };
    var $elm$json$Json$Encode$int = _Json_wrap;
    var $elm$json$Json$Encode$string = _Json_wrap;
    var $author$project$GenerateurH5P$encodedBranchingScenarioEndScreensObject = function (branchingScenarioEndScreensObject) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("contentId", $elm$json$Json$Encode$int(branchingScenarioEndScreensObject.cN)),
            _Utils_Tuple2("endScreenScore", $elm$json$Json$Encode$int(branchingScenarioEndScreensObject.c_)),
            _Utils_Tuple2("endScreenSubtitle", $elm$json$Json$Encode$string(branchingScenarioEndScreensObject.c$)),
            _Utils_Tuple2("endScreenTitle", $elm$json$Json$Encode$string(branchingScenarioEndScreensObject.c0))
        ]));
    };
    var $author$project$GenerateurH5P$encodedBranchingScenarioL10n = function (branchingScenarioL10n) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("backButtonText", $elm$json$Json$Encode$string(branchingScenarioL10n.cy)),
            _Utils_Tuple2("disableProceedButtonText", $elm$json$Json$Encode$string(branchingScenarioL10n.cS)),
            _Utils_Tuple2("endScreenButtonText", $elm$json$Json$Encode$string(branchingScenarioL10n.cZ)),
            _Utils_Tuple2("fullscreenAria", $elm$json$Json$Encode$string(branchingScenarioL10n.dg)),
            _Utils_Tuple2("proceedButtonText", $elm$json$Json$Encode$string(branchingScenarioL10n.dT)),
            _Utils_Tuple2("replayButtonText", $elm$json$Json$Encode$string(branchingScenarioL10n.dW)),
            _Utils_Tuple2("scoreText", $elm$json$Json$Encode$string(branchingScenarioL10n.d_)),
            _Utils_Tuple2("startScreenButtonText", $elm$json$Json$Encode$string(branchingScenarioL10n.em))
        ]));
    };
    var $author$project$GenerateurH5P$encodedBranchingScenarioScoringOptionGroup = function (branchingScenarioScoringOptionGroup) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("includeInteractionsScores", $elm$json$Json$Encode$bool(branchingScenarioScoringOptionGroup.dp)),
            _Utils_Tuple2("scoringOption", $elm$json$Json$Encode$string(branchingScenarioScoringOptionGroup.d$))
        ]));
    };
    var $author$project$GenerateurH5P$encodedBranchingScenarioStartScreen = function (branchingScenarioStartScreen) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("startScreenSubtitle", $elm$json$Json$Encode$string(branchingScenarioStartScreen.bi)),
            _Utils_Tuple2("startScreenTitle", $elm$json$Json$Encode$string(branchingScenarioStartScreen.en))
        ]));
    };
    var $elm$json$Json$Encode$list_fn = function (func, entries) {
        return _Json_wrap($elm$core$List$foldl_fn(_Json_addEntry(func), _Json_emptyArray(0), entries));
    }, $elm$json$Json$Encode$list = F2($elm$json$Json$Encode$list_fn);
    var $author$project$GenerateurH5P$encodedBranchingScenario = function (branchingScenario) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("branchingScenario", $elm$json$Json$Encode$object(_List_fromArray([
                _Utils_Tuple2("behaviour", $author$project$GenerateurH5P$encodedBranchingScenarioBehaviour(branchingScenario.at)),
                _Utils_Tuple2("endScreens", $elm$json$Json$Encode$list_fn($author$project$GenerateurH5P$encodedBranchingScenarioEndScreensObject, branchingScenario.c1)),
                _Utils_Tuple2("l10n", $author$project$GenerateurH5P$encodedBranchingScenarioL10n(branchingScenario.M)),
                _Utils_Tuple2("scoringOptionGroup", $author$project$GenerateurH5P$encodedBranchingScenarioScoringOptionGroup(branchingScenario.d0)),
                _Utils_Tuple2("startScreen", $author$project$GenerateurH5P$encodedBranchingScenarioStartScreen(branchingScenario.bh))
            ])))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationL10n = function (coursePresentationL10n) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("accessibilityCanvasLabel", $elm$json$Json$Encode$string(coursePresentationL10n.cn)),
            _Utils_Tuple2("accessibilityEnteredFullscreen", $elm$json$Json$Encode$string(coursePresentationL10n.co)),
            _Utils_Tuple2("accessibilityExitedFullscreen", $elm$json$Json$Encode$string(coursePresentationL10n.cp)),
            _Utils_Tuple2("accessibilitySlideNavigationExplanation", $elm$json$Json$Encode$string(coursePresentationL10n.cq)),
            _Utils_Tuple2("accessibilityTotalScore", $elm$json$Json$Encode$string(coursePresentationL10n.cr)),
            _Utils_Tuple2("confirmDialogConfirmText", $elm$json$Json$Encode$string(coursePresentationL10n.cE)),
            _Utils_Tuple2("confirmDialogHeader", $elm$json$Json$Encode$string(coursePresentationL10n.cF)),
            _Utils_Tuple2("confirmDialogText", $elm$json$Json$Encode$string(coursePresentationL10n.cG)),
            _Utils_Tuple2("containsCompleted", $elm$json$Json$Encode$string(coursePresentationL10n.cJ)),
            _Utils_Tuple2("containsIncorrectAnswers", $elm$json$Json$Encode$string(coursePresentationL10n.cK)),
            _Utils_Tuple2("containsNotCompleted", $elm$json$Json$Encode$string(coursePresentationL10n.cL)),
            _Utils_Tuple2("containsOnlyCorrect", $elm$json$Json$Encode$string(coursePresentationL10n.cM)),
            _Utils_Tuple2("currentSlide", $elm$json$Json$Encode$string(coursePresentationL10n.cQ)),
            _Utils_Tuple2("exitFullscreen", $elm$json$Json$Encode$string(coursePresentationL10n.c3)),
            _Utils_Tuple2("exportAnswers", $elm$json$Json$Encode$string(coursePresentationL10n.c6)),
            _Utils_Tuple2("fullscreen", $elm$json$Json$Encode$string(coursePresentationL10n.df)),
            _Utils_Tuple2("hideKeywords", $elm$json$Json$Encode$string(coursePresentationL10n.dn)),
            _Utils_Tuple2("lastSlide", $elm$json$Json$Encode$string(coursePresentationL10n.dw)),
            _Utils_Tuple2("maxScore", $elm$json$Json$Encode$string(coursePresentationL10n.dy)),
            _Utils_Tuple2("nextSlide", $elm$json$Json$Encode$string(coursePresentationL10n.dE)),
            _Utils_Tuple2("noTitle", $elm$json$Json$Encode$string(coursePresentationL10n.dG)),
            _Utils_Tuple2("prevSlide", $elm$json$Json$Encode$string(coursePresentationL10n.dN)),
            _Utils_Tuple2("printAllSlides", $elm$json$Json$Encode$string(coursePresentationL10n.dP)),
            _Utils_Tuple2("printCurrentSlide", $elm$json$Json$Encode$string(coursePresentationL10n.dQ)),
            _Utils_Tuple2("printIngress", $elm$json$Json$Encode$string(coursePresentationL10n.dR)),
            _Utils_Tuple2("printTitle", $elm$json$Json$Encode$string(coursePresentationL10n.dS)),
            _Utils_Tuple2("retry", $elm$json$Json$Encode$string(coursePresentationL10n.dX)),
            _Utils_Tuple2("score", $elm$json$Json$Encode$string(coursePresentationL10n.aM)),
            _Utils_Tuple2("scoreMessage", $elm$json$Json$Encode$string(coursePresentationL10n.dZ)),
            _Utils_Tuple2("shareFacebook", $elm$json$Json$Encode$string(coursePresentationL10n.d3)),
            _Utils_Tuple2("shareGoogle", $elm$json$Json$Encode$string(coursePresentationL10n.d4)),
            _Utils_Tuple2("shareResult", $elm$json$Json$Encode$string(coursePresentationL10n.d5)),
            _Utils_Tuple2("shareTwitter", $elm$json$Json$Encode$string(coursePresentationL10n.d6)),
            _Utils_Tuple2("showKeywords", $elm$json$Json$Encode$string(coursePresentationL10n.d9)),
            _Utils_Tuple2("showSolutions", $elm$json$Json$Encode$string(coursePresentationL10n.eb)),
            _Utils_Tuple2("slide", $elm$json$Json$Encode$string(coursePresentationL10n.ed)),
            _Utils_Tuple2("slideCount", $elm$json$Json$Encode$string(coursePresentationL10n.ef)),
            _Utils_Tuple2("solutionModeText", $elm$json$Json$Encode$string(coursePresentationL10n.ei)),
            _Utils_Tuple2("solutionModeTitle", $elm$json$Json$Encode$string(coursePresentationL10n.ej)),
            _Utils_Tuple2("solutionsButtonTitle", $elm$json$Json$Encode$string(coursePresentationL10n.ek)),
            _Utils_Tuple2("summary", $elm$json$Json$Encode$string(coursePresentationL10n.es)),
            _Utils_Tuple2("summaryMultipleTaskText", $elm$json$Json$Encode$string(coursePresentationL10n.et)),
            _Utils_Tuple2("total", $elm$json$Json$Encode$string(coursePresentationL10n.ex)),
            _Utils_Tuple2("totalScore", $elm$json$Json$Encode$string(coursePresentationL10n.ey)),
            _Utils_Tuple2("yourScore", $elm$json$Json$Encode$string(coursePresentationL10n.eH))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationOverrideSocialFacebookShare = function (coursePresentationOverrideSocialFacebookShare) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("quote", $elm$json$Json$Encode$string(coursePresentationOverrideSocialFacebookShare.dV)),
            _Utils_Tuple2("url", $elm$json$Json$Encode$string(coursePresentationOverrideSocialFacebookShare.aS))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationOverrideSocialTwitterShare = function (coursePresentationOverrideSocialTwitterShare) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("hashtags", $elm$json$Json$Encode$string(coursePresentationOverrideSocialTwitterShare.dk)),
            _Utils_Tuple2("statement", $elm$json$Json$Encode$string(coursePresentationOverrideSocialTwitterShare.eo)),
            _Utils_Tuple2("url", $elm$json$Json$Encode$string(coursePresentationOverrideSocialTwitterShare.aS))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationOverrideSocial = function (coursePresentationOverrideSocial) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("facebookShare", $author$project$GenerateurH5P$encodedCoursePresentationOverrideSocialFacebookShare(coursePresentationOverrideSocial.c8)),
            _Utils_Tuple2("googleShareUrl", $elm$json$Json$Encode$string(coursePresentationOverrideSocial.di)),
            _Utils_Tuple2("showFacebookShare", $elm$json$Json$Encode$bool(coursePresentationOverrideSocial.d7)),
            _Utils_Tuple2("showGoogleShare", $elm$json$Json$Encode$bool(coursePresentationOverrideSocial.d8)),
            _Utils_Tuple2("showTwitterShare", $elm$json$Json$Encode$bool(coursePresentationOverrideSocial.ec)),
            _Utils_Tuple2("twitterShare", $author$project$GenerateurH5P$encodedCoursePresentationOverrideSocialTwitterShare(coursePresentationOverrideSocial.eB))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationOverride = function (coursePresentationOverride) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("activeSurface", $elm$json$Json$Encode$bool(coursePresentationOverride.ct)),
            _Utils_Tuple2("enablePrintButton", $elm$json$Json$Encode$bool(coursePresentationOverride.cW)),
            _Utils_Tuple2("hideSummarySlide", $elm$json$Json$Encode$bool(coursePresentationOverride.$7)),
            _Utils_Tuple2("social", $author$project$GenerateurH5P$encodedCoursePresentationOverrideSocial(coursePresentationOverride.eh)),
            _Utils_Tuple2("summarySlideRetryButton", $elm$json$Json$Encode$bool(coursePresentationOverride.eu)),
            _Utils_Tuple2("summarySlideSolutionButton", $elm$json$Json$Encode$bool(coursePresentationOverride.ev))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationPresentationGlobalBackgroundSelector = function (coursePresentationPresentationGlobalBackgroundSelector) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("fillGlobalBackground", $elm$json$Json$Encode$string(coursePresentationPresentationGlobalBackgroundSelector.dc))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationPresentationSlidesObjectSlideBackgroundSelector = function (coursePresentationPresentationSlidesObjectSlideBackgroundSelector) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("fillSlideBackground", $elm$json$Json$Encode$string(coursePresentationPresentationSlidesObjectSlideBackgroundSelector.dd))
        ]));
    };
    var $elm$json$Json$Encode$null = _Json_encodeNull;
    var $author$project$GenerateurH5P$encodedCoursePresentationPresentationSlidesObject = function (coursePresentationPresentationSlidesObject) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("elements", $elm$json$Json$Encode$list_fn(function (_v0) {
                return $elm$json$Json$Encode$null;
            }, coursePresentationPresentationSlidesObject.cT)),
            _Utils_Tuple2("slideBackgroundSelector", $author$project$GenerateurH5P$encodedCoursePresentationPresentationSlidesObjectSlideBackgroundSelector(coursePresentationPresentationSlidesObject.ee))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentationPresentation = function (coursePresentationPresentation) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("globalBackgroundSelector", $author$project$GenerateurH5P$encodedCoursePresentationPresentationGlobalBackgroundSelector(coursePresentationPresentation.dh)),
            _Utils_Tuple2("keywordListAlwaysShow", $elm$json$Json$Encode$bool(coursePresentationPresentation.dr)),
            _Utils_Tuple2("keywordListAutoHide", $elm$json$Json$Encode$bool(coursePresentationPresentation.ds)),
            _Utils_Tuple2("keywordListEnabled", $elm$json$Json$Encode$bool(coursePresentationPresentation.dt)),
            _Utils_Tuple2("keywordListOpacity", $elm$json$Json$Encode$int(coursePresentationPresentation.du)),
            _Utils_Tuple2("slides", $elm$json$Json$Encode$list_fn($author$project$GenerateurH5P$encodedCoursePresentationPresentationSlidesObject, coursePresentationPresentation.eg))
        ]));
    };
    var $author$project$GenerateurH5P$encodedCoursePresentation = function (coursePresentation) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("l10n", $author$project$GenerateurH5P$encodedCoursePresentationL10n(coursePresentation.M)),
            _Utils_Tuple2("override", $author$project$GenerateurH5P$encodedCoursePresentationOverride(coursePresentation.dJ)),
            _Utils_Tuple2("presentation", $author$project$GenerateurH5P$encodedCoursePresentationPresentation(coursePresentation.dM))
        ]));
    };
    var $author$project$GenerateurH5P$encodedTrueFalseBehaviour = function (trueFalseBehaviour) {
        return $elm$json$Json$Encode$object(_Utils_ap(_List_fromArray([
            _Utils_Tuple2("autoCheck", $elm$json$Json$Encode$bool(trueFalseBehaviour.cx)),
            _Utils_Tuple2("confirmCheckDialog", $elm$json$Json$Encode$bool(trueFalseBehaviour.cD)),
            _Utils_Tuple2("confirmRetryDialog", $elm$json$Json$Encode$bool(trueFalseBehaviour.cI)),
            _Utils_Tuple2("enableCheckButton", $elm$json$Json$Encode$bool(trueFalseBehaviour.cV)),
            _Utils_Tuple2("enableRetry", $elm$json$Json$Encode$bool(trueFalseBehaviour.cX)),
            _Utils_Tuple2("enableSolutionsButton", $elm$json$Json$Encode$bool(trueFalseBehaviour.cY))
        ]), _Utils_ap(function () {
            var _v0 = trueFalseBehaviour.da;
            if (!_v0.$) {
                var value = _v0.a;
                return _List_fromArray([
                    _Utils_Tuple2("feedbackOnCorrect", $elm$json$Json$Encode$string(value))
                ]);
            }
            else {
                return _List_Nil;
            }
        }(), function () {
            var _v1 = trueFalseBehaviour.db;
            if (!_v1.$) {
                var value = _v1.a;
                return _List_fromArray([
                    _Utils_Tuple2("feedbackOnWrong", $elm$json$Json$Encode$string(value))
                ]);
            }
            else {
                return _List_Nil;
            }
        }())));
    };
    var $author$project$GenerateurH5P$encodedTrueFalseConfirmCheck = function (trueFalseConfirmCheck) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("body", $elm$json$Json$Encode$string(trueFalseConfirmCheck.au)),
            _Utils_Tuple2("cancelLabel", $elm$json$Json$Encode$string(trueFalseConfirmCheck.aw)),
            _Utils_Tuple2("confirmLabel", $elm$json$Json$Encode$string(trueFalseConfirmCheck.az)),
            _Utils_Tuple2("header", $elm$json$Json$Encode$string(trueFalseConfirmCheck.e2))
        ]));
    };
    var $author$project$GenerateurH5P$encodedTrueFalseConfirmRetry = function (trueFalseConfirmRetry) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("body", $elm$json$Json$Encode$string(trueFalseConfirmRetry.au)),
            _Utils_Tuple2("cancelLabel", $elm$json$Json$Encode$string(trueFalseConfirmRetry.aw)),
            _Utils_Tuple2("confirmLabel", $elm$json$Json$Encode$string(trueFalseConfirmRetry.az)),
            _Utils_Tuple2("header", $elm$json$Json$Encode$string(trueFalseConfirmRetry.e2))
        ]));
    };
    var $author$project$GenerateurH5P$encodedTrueFalseL10n = function (trueFalseL10n) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("a11yCheck", $elm$json$Json$Encode$string(trueFalseL10n.ck)),
            _Utils_Tuple2("a11yRetry", $elm$json$Json$Encode$string(trueFalseL10n.cl)),
            _Utils_Tuple2("a11yShowSolution", $elm$json$Json$Encode$string(trueFalseL10n.cm)),
            _Utils_Tuple2("checkAnswer", $elm$json$Json$Encode$string(trueFalseL10n.cA)),
            _Utils_Tuple2("correctAnswerMessage", $elm$json$Json$Encode$string(trueFalseL10n.cP)),
            _Utils_Tuple2("falseText", $elm$json$Json$Encode$string(trueFalseL10n.c9)),
            _Utils_Tuple2("score", $elm$json$Json$Encode$string(trueFalseL10n.aM)),
            _Utils_Tuple2("scoreBarLabel", $elm$json$Json$Encode$string(trueFalseL10n.dY)),
            _Utils_Tuple2("showSolutionButton", $elm$json$Json$Encode$string(trueFalseL10n.ea)),
            _Utils_Tuple2("submitAnswer", $elm$json$Json$Encode$string(trueFalseL10n.eq)),
            _Utils_Tuple2("trueText", $elm$json$Json$Encode$string(trueFalseL10n.ez)),
            _Utils_Tuple2("tryAgain", $elm$json$Json$Encode$string(trueFalseL10n.eA)),
            _Utils_Tuple2("wrongAnswerMessage", $elm$json$Json$Encode$string(trueFalseL10n.eG))
        ]));
    };
    var $author$project$GenerateurH5P$encodedTrueFalseMedia = function (trueFalseMedia) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("disableImageZooming", $elm$json$Json$Encode$bool(trueFalseMedia.cR))
        ]));
    };
    var $author$project$GenerateurH5P$encodedTrueFalse = function (trueFalse) {
        return $elm$json$Json$Encode$object(_List_fromArray([
            _Utils_Tuple2("behaviour", $author$project$GenerateurH5P$encodedTrueFalseBehaviour(trueFalse.at)),
            _Utils_Tuple2("confirmCheck", $author$project$GenerateurH5P$encodedTrueFalseConfirmCheck(trueFalse.cC)),
            _Utils_Tuple2("confirmRetry", $author$project$GenerateurH5P$encodedTrueFalseConfirmRetry(trueFalse.cH)),
            _Utils_Tuple2("correct", $elm$json$Json$Encode$string(trueFalse.cO)),
            _Utils_Tuple2("l10n", $author$project$GenerateurH5P$encodedTrueFalseL10n(trueFalse.M)),
            _Utils_Tuple2("media", $author$project$GenerateurH5P$encodedTrueFalseMedia(trueFalse.dz)),
            _Utils_Tuple2("question", $elm$json$Json$Encode$string(trueFalse.dU))
        ]));
    };
    var $author$project$GenerateurH5P$h5pEncode_fn = function (indent, content) {
        return _Json_encode_fn(indent, function () {
            switch (content.$) {
                case 0:
                    return $elm$json$Json$Encode$object(_List_Nil);
                case 1:
                    var branchingScenario = content.a;
                    return $author$project$GenerateurH5P$encodedBranchingScenario(branchingScenario);
                case 2:
                    var coursePresentation = content.a;
                    return $author$project$GenerateurH5P$encodedCoursePresentation(coursePresentation);
                default:
                    var trueFalse = content.a;
                    return $author$project$GenerateurH5P$encodedTrueFalse(trueFalse);
            }
        }());
    }, $author$project$GenerateurH5P$h5pEncode = F2($author$project$GenerateurH5P$h5pEncode_fn);
    var $author$project$GenerateurH5P$EndOfFile = { $: 4 };
    var $author$project$GenerateurH5P$RootContext = 1;
    var $author$project$GenerateurH5P$BranchingQuestionAlternativeContext = 4;
    var $author$project$GenerateurH5P$BranchingQuestionContext = 3;
    var $author$project$GenerateurH5P$BranchingScenarioContext = 2;
    var $author$project$GenerateurH5P$CoursePresentationContext = 5;
    var $author$project$GenerateurH5P$GenericProblem = { $: 3 };
    var $author$project$GenerateurH5P$H5pTree_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $author$project$GenerateurH5P$H5pTree = F3($author$project$GenerateurH5P$H5pTree_fn);
    var $author$project$GenerateurH5P$InconsistantStructure = { $: 7 };
    var $author$project$GenerateurH5P$NoContent = { $: 0 };
    var $author$project$GenerateurH5P$Problem = function (a) {
        return { $: 2, a: a };
    };
    var $author$project$GenerateurH5P$TrueFalseContext = 6;
    var $author$project$GenerateurH5P$UnknownContentType = function (a) {
        return { $: 6, a: a };
    };
    var $elm$parser$Parser$Advanced$Located_fn = function (row, col, context) {
        return { gR: col, gV: context, h6: row };
    }, $elm$parser$Parser$Advanced$Located = F3($elm$parser$Parser$Advanced$Located_fn);
    var $elm$parser$Parser$Advanced$changeContext_fn = function (newContext, s) {
        return { gR: s.gR, gV: newContext, g: s.g, b6: s.b6, h6: s.h6, a: s.a };
    }, $elm$parser$Parser$Advanced$changeContext = F2($elm$parser$Parser$Advanced$changeContext_fn);
    var $elm$parser$Parser$Advanced$inContext_fn = function (context, _v0) {
        var parse = _v0;
        return function (s0) {
            var _v1 = parse($elm$parser$Parser$Advanced$changeContext_fn(_List_Cons($elm$parser$Parser$Advanced$Located_fn(s0.h6, s0.gR, context), s0.gV), s0));
            if (!_v1.$) {
                var p = _v1.a;
                var a = _v1.b;
                var s1 = _v1.c;
                return $elm$parser$Parser$Advanced$Good_fn(p, a, $elm$parser$Parser$Advanced$changeContext_fn(s0.gV, s1));
            }
            else {
                var step = _v1;
                return step;
            }
        };
    }, $elm$parser$Parser$Advanced$inContext = F2($elm$parser$Parser$Advanced$inContext_fn);
    var $author$project$GenerateurH5P$mySpaces = $elm$parser$Parser$Advanced$chompWhile(function (x) {
        return (x === " ") || (x === "\t");
    });
    var $elm$parser$Parser$Advanced$problem = function (x) {
        return function (s) {
            return $elm$parser$Parser$Advanced$Bad_fn(false, $elm$parser$Parser$Advanced$fromState_fn(s, x));
        };
    };
    var $author$project$GenerateurH5P$star = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$succeed(function (x) {
        return (!$elm$core$String$length(x)) ? false : true;
    }), $elm$parser$Parser$Advanced$getChompedString($elm$parser$Parser$Advanced$chompWhile($elm$core$Basics$eq("*"))));
    var $author$project$GenerateurH5P$stars = function (depth) {
        return $elm$parser$Parser$Advanced$symbol($elm$parser$Parser$Advanced$Token_fn($elm$core$String$repeat_fn(depth, "*"), $author$project$GenerateurH5P$GenericProblem));
    };
    var $author$project$GenerateurH5P$tillEndOfLine = $elm$parser$Parser$Advanced$getChompedString($elm$parser$Parser$Advanced$chompWhile($elm$core$Basics$neq("\n")));
    function $author$project$GenerateurH5P$cyclic$whileNoStarOnFirstColumnOrEndOfFile() {
        return $elm$parser$Parser$Advanced$andThen_fn(function (col) {
            return (col > 1) ? $elm$parser$Parser$Advanced$oneOf(_List_fromArray([
                $elm$parser$Parser$Advanced$end($author$project$GenerateurH5P$EndOfFile),
                $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed(0), $elm$parser$Parser$Advanced$token($elm$parser$Parser$Advanced$Token_fn("*", $author$project$GenerateurH5P$EndOfFile))), $author$project$GenerateurH5P$cyclic$whileNoStarOnFirstColumnOrEndOfFile())
            ])) : $elm$parser$Parser$Advanced$succeed(0);
        }, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed($elm$core$Basics$identity), $elm$parser$Parser$Advanced$chompWhile($elm$core$Basics$neq("*"))), $elm$parser$Parser$Advanced$getCol));
    }
    var $author$project$GenerateurH5P$whileNoStarOnFirstColumnOrEndOfFile = $author$project$GenerateurH5P$cyclic$whileNoStarOnFirstColumnOrEndOfFile();
    $author$project$GenerateurH5P$cyclic$whileNoStarOnFirstColumnOrEndOfFile = function () {
        return $author$project$GenerateurH5P$whileNoStarOnFirstColumnOrEndOfFile;
    };
    var $author$project$GenerateurH5P$contentParser_fn = function (context, depth) {
        return $elm$parser$Parser$Advanced$andThen_fn(function (_v0) {
            var maybeStar = _v0.a;
            var maybeContentType = _v0.b;
            if (maybeStar) {
                return $elm$parser$Parser$Advanced$problem($author$project$GenerateurH5P$InconsistantStructure);
            }
            else {
                var _v1 = _Utils_Tuple2(maybeContentType, context);
                _v1$1: while (true) {
                    _v1$5: while (true) {
                        _v1$8: while (true) {
                            switch (_v1.a) {
                                case "BranchingScenario":
                                    switch (_v1.b) {
                                        case 1:
                                            var _v2 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(2, depth, "");
                                        case 2:
                                            break _v1$1;
                                        case 4:
                                            break _v1$1;
                                        case 3:
                                            break _v1$1;
                                        default:
                                            break _v1$1;
                                    }
                                case "CoursePresentation":
                                    switch (_v1.b) {
                                        case 1:
                                            var _v3 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(5, depth, "");
                                        case 2:
                                            var _v4 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(5, depth, "");
                                        case 4:
                                            var _v5 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(5, depth, "");
                                        case 3:
                                            break _v1$5;
                                        default:
                                            break _v1$5;
                                    }
                                case "TrueFalse":
                                    switch (_v1.b) {
                                        case 1:
                                            var _v6 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(6, depth, "");
                                        case 5:
                                            var _v7 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(6, depth, "");
                                        case 2:
                                            break _v1$8;
                                        case 4:
                                            break _v1$8;
                                        case 3:
                                            break _v1$8;
                                        default:
                                            break _v1$8;
                                    }
                                case "":
                                    return $elm$parser$Parser$Advanced$problem($author$project$GenerateurH5P$NoContent);
                                default:
                                    switch (_v1.b) {
                                        case 2:
                                            var _v8 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(3, depth, maybeContentType);
                                        case 4:
                                            var _v9 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(3, depth, maybeContentType);
                                        case 3:
                                            var _v10 = _v1.b;
                                            return $author$project$GenerateurH5P$contentParserHelp_fn(4, depth, maybeContentType);
                                        default:
                                            return $elm$parser$Parser$Advanced$problem($author$project$GenerateurH5P$UnknownContentType(maybeContentType));
                                    }
                            }
                        }
                        return $elm$parser$Parser$Advanced$problem($author$project$GenerateurH5P$Problem("Un TrueFalse doit se trouver \u00E0 la racine ou dans un CoursePresentation"));
                    }
                    return $elm$parser$Parser$Advanced$problem($author$project$GenerateurH5P$Problem("Un CoursePresentation doit se trouver \u00E0 la racine, sous un BranchingScenario ou dans une alternative de BranchingQuestion"));
                }
                return $elm$parser$Parser$Advanced$problem($author$project$GenerateurH5P$Problem("Un BranchingScenario doit se trouver \u00E0 la racine"));
            }
        }, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed($elm$core$Tuple$pair), $author$project$GenerateurH5P$stars(depth)), $elm$parser$Parser$Advanced$ignorer_fn($author$project$GenerateurH5P$star, $author$project$GenerateurH5P$mySpaces)), $elm$parser$Parser$Advanced$getChompedString($elm$parser$Parser$Advanced$chompWhile(function (c) {
            return (c !== " ") && ((c !== "\n") && ((c !== "\r") && (c !== "\r")));
        }))));
    }, $author$project$GenerateurH5P$contentParser = F2($author$project$GenerateurH5P$contentParser_fn);
    var $author$project$GenerateurH5P$contentParserHelp_fn = function (context, depth, bit) {
        var f = F2(function (endOfLine, contentList) {
            return $author$project$GenerateurH5P$H5pTree_fn(context, _Utils_ap(bit, endOfLine), contentList);
        });
        return $elm$parser$Parser$Advanced$inContext_fn(context, $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$succeed(f), $elm$parser$Parser$Advanced$ignorer_fn($author$project$GenerateurH5P$tillEndOfLine, $author$project$GenerateurH5P$whileNoStarOnFirstColumnOrEndOfFile)), $author$project$GenerateurH5P$contentsParser_fn(context, depth + 1)));
    }, $author$project$GenerateurH5P$contentParserHelp = F3($author$project$GenerateurH5P$contentParserHelp_fn);
    var $author$project$GenerateurH5P$contentsParser_fn = function (context, depth) {
        return $elm$parser$Parser$Advanced$sequence({
            a4: $elm$parser$Parser$Advanced$Token_fn("", $author$project$GenerateurH5P$GenericProblem),
            a7: $author$project$GenerateurH5P$contentParser_fn(context, depth),
            bf: $elm$parser$Parser$Advanced$Token_fn("", $author$project$GenerateurH5P$GenericProblem),
            bg: $elm$parser$Parser$Advanced$succeed(0),
            ao: $elm$parser$Parser$Advanced$Token_fn("", $author$project$GenerateurH5P$GenericProblem),
            bt: 1
        });
    }, $author$project$GenerateurH5P$contentsParser = F2($author$project$GenerateurH5P$contentsParser_fn);
    var $author$project$GenerateurH5P$BranchingScenarioH5P = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$GenerateurH5P$CoursePresentationH5P = function (a) {
        return { $: 2, a: a };
    };
    var $author$project$GenerateurH5P$TrueFalseH5P = function (a) {
        return { $: 3, a: a };
    };
    var $author$project$GenerateurH5P$contentField = {
        bU: function ($) {
            return $.bL;
        },
        aU: F2(function (value, record) {
            return _Utils_update(record, { bL: value });
        })
    };
    var $author$project$GenerateurH5P$nouveauBranchingScenario = {
        at: { cU: true, ac: false },
        bL: _List_Nil,
        c1: _List_fromArray([
            { cN: -1, c_: 0, c$: "Fin du parcours personnalis\u00E9", c0: "Fin du parcours personnalis\u00E9" }
        ]),
        M: { cy: "Revenir en arri\u00E8re", cS: "Jouer la vid\u00E9o de nouveau", cZ: "Recommencer le parcours", dg: "Plein \u00E9cran", dT: "Continuer", dW: "Votre note :", d_: "Votre note :", em: "Commencer le parcours" },
        d0: { dp: true, d$: "no-score" },
        bh: { bi: "<p>Pr\u00E9parez bien vos m\u00E9ninges !</p>\n", en: "<p>Parcours personnalis\u00E9</p>\n" }
    };
    var $author$project$GenerateurH5P$nouveauCoursePresentation = {
        M: { cn: "Le champs de pr\u00E9sentation. Utilisez les fleches gauche et droite pour naviguer entre les diapositives.", co: "Mode plein-\u00E9cran activ\u00E9", cp: "Mode plein-\u00E9cran d\u00E9sactiv\u00E9", cq: "Utilisez les fleches gauche et droite pour pour naviguer entre les diapositives", cr: "Vous avez obtenu @score sur @maxScore points au total", cE: "Envoyer et voir les r\u00E9sultats", cF: "Envoyer vos r\u00E9ponses", cG: "Cette action va envoyer vos r\u00E9ponses, voulez-vous continuer?", cJ: "@slideName contient des interactions compl\u00E8tes", cK: "@slideName contient des r\u00E9ponses incorrectes", cL: "@slideName contient des interactions incompl\u00E8tes", cM: "toutes les r\u00E9ponses sont bonnes sur @slideName", cQ: "Diapositive courante", c3: "Quitter le plein \u00E9cran", c6: "Exporter", df: "Plein \u00E9cran", dn: "Cacher la liste des mots-cl\u00E9s", dw: "Derni\u00E8re diapositive", dy: "Score maximum", dE: "Diapositive suivante", dG: "Sans intitul\u00E9", dN: "Diapositive pr\u00E9c\u00E9dente", dP: "Imprimer toutes les diapositives", dQ: "Imprimer la diapositive courante", dR: "Comment souhaitez-vous imprimer cette pr\u00E9sentation ?", dS: "Imprimer", dX: "Recommencer", aM: "Score", dZ: "Votre score :", d3: "Partager sur Facebook", d4: "Partager sur Google+", d5: "Partager le r\u00E9sultat", d6: "Partager sur Twitter", d9: "Afficher la liste des mots-cl\u00E9s", eb: "Voir la correction", ed: "Diapositive", ef: "Diapositive a @index de @total", ei: "Passer en mode &quot;Correction&quot;", ej: "Sortir du mode &quot;Correction&quot;", ek: "Afficher les commentaires", es: "R\u00E9sum\u00E9", et: "Activit\u00E9s multiples", ex: "Total", ey: "Score total", eH: "Votre score" },
        dJ: {
            ct: false,
            cW: false,
            $7: false,
            eh: {
                c8: { dV: "I scored @score out of @maxScore on a task at @currentpageurl.", aS: "@currentpageurl" },
                di: "@currentpageurl",
                d7: false,
                d8: false,
                ec: false,
                eB: { dk: "h5p, course", eo: "I scored @score out of @maxScore on a task at @currentpageurl.", aS: "@currentpageurl" }
            },
            eu: true,
            ev: true
        },
        dM: {
            dh: { dc: "" },
            dr: false,
            ds: false,
            dt: true,
            du: 90,
            eg: _List_fromArray([
                {
                    cT: _List_Nil,
                    ee: { dd: "" }
                }
            ])
        }
    };
    var $author$project$GenerateurH5P$nouveauTrueFalse = {
        at: {
            cx: true,
            cD: false,
            cI: false,
            cV: true,
            cX: true,
            cY: true,
            da: $elm$core$Maybe$Just("C&#039;est la base !\n"),
            db: $elm$core$Maybe$Nothing
        },
        cC: { au: "\u00CAtes-vous s\u00FBr de vouloir terminer ?", aw: "Annuler", az: "Confirmer", e2: "Terminer ?" },
        cH: { au: "\u00CAtes-vous s\u00FBr de vouloir recommencer ?", aw: "Annuler", az: "Confirmer", e2: "Recommencer ?" },
        cO: "true",
        M: { ck: "Check the answers. The responses will be marked as correct, incorrect, or unanswered.", cl: "Retry the task. Reset all responses and start the task over again.", cm: "Show the solution. The task will be marked with its correct solution.", cA: "V\u00E9rifier", cP: "Bonne r\u00E9ponse", c9: "Faux", aM: "Vous avez obtenu @score points sur un total de @total", dY: "Vous avez obtenu @score points sur un total de @total", ea: "Voir la solution", eq: "V\u00E9rifier", ez: "Vrai", eA: "Recommencer", eG: "R\u00E9ponse incorrecte" },
        dz: { cR: false },
        dU: ""
    };
    var $author$project$GenerateurH5P$startScreenField = {
        bU: function ($) {
            return $.bh;
        },
        aU: F2(function (value, record) {
            return _Utils_update(record, { bh: value });
        })
    };
    var $author$project$GenerateurH5P$startScreenSubtitleField = {
        bU: function ($) {
            return $.bi;
        },
        aU: F2(function (value, record) {
            return _Utils_update(record, { bi: value });
        })
    };
    var $TSFoster$elm_uuid$UUID$UUID_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $TSFoster$elm_uuid$UUID$UUID = F4($TSFoster$elm_uuid$UUID$UUID_fn);
    var $elm$core$Basics$composeR_fn = function (f, g, x) {
        return g(f(x));
    }, $elm$core$Basics$composeR = F3($elm$core$Basics$composeR_fn);
    var $elm$random$Random$map4_fn = function (func, _v0, _v1, _v2, _v3) {
        var genA = _v0;
        var genB = _v1;
        var genC = _v2;
        var genD = _v3;
        return function (seed0) {
            var _v4 = genA(seed0);
            var a = _v4.a;
            var seed1 = _v4.b;
            var _v5 = genB(seed1);
            var b = _v5.a;
            var seed2 = _v5.b;
            var _v6 = genC(seed2);
            var c = _v6.a;
            var seed3 = _v6.b;
            var _v7 = genD(seed3);
            var d = _v7.a;
            var seed4 = _v7.b;
            return _Utils_Tuple2(A4(func, a, b, c, d), seed4);
        };
    }, $elm$random$Random$map4_fn_unwrapped = function (func, _v0, _v1, _v2, _v3) {
        var genA = _v0;
        var genB = _v1;
        var genC = _v2;
        var genD = _v3;
        return function (seed0) {
            var _v4 = genA(seed0);
            var a = _v4.a;
            var seed1 = _v4.b;
            var _v5 = genB(seed1);
            var b = _v5.a;
            var seed2 = _v5.b;
            var _v6 = genC(seed2);
            var c = _v6.a;
            var seed3 = _v6.b;
            var _v7 = genD(seed3);
            var d = _v7.a;
            var seed4 = _v7.b;
            return _Utils_Tuple2(func(a, b, c, d), seed4);
        };
    }, $elm$random$Random$map4 = F5($elm$random$Random$map4_fn);
    var $TSFoster$elm_uuid$UUID$forceUnsigned_a0 = 0, $TSFoster$elm_uuid$UUID$forceUnsigned = $elm$core$Bitwise$shiftRightZfBy($TSFoster$elm_uuid$UUID$forceUnsigned_a0);
    var $TSFoster$elm_uuid$UUID$randomU32 = $elm$random$Random$map_fn($TSFoster$elm_uuid$UUID$forceUnsigned, $elm$random$Random$int_fn($elm$random$Random$minInt, $elm$random$Random$maxInt));
    var $TSFoster$elm_uuid$UUID$toVariant1 = function (_v0) {
        var a = _v0.a;
        var b = _v0.b;
        var c = _v0.c;
        var d = _v0.d;
        return $TSFoster$elm_uuid$UUID$UUID_fn(a, b, _Bitwise_shiftRightZfBy_fn($TSFoster$elm_uuid$UUID$forceUnsigned_a0, 2147483648 | (1073741823 & c)), d);
    };
    var $TSFoster$elm_uuid$UUID$toVersion_fn = function (v, _v0) {
        var a = _v0.a;
        var b = _v0.b;
        var c = _v0.c;
        var d = _v0.d;
        return $TSFoster$elm_uuid$UUID$UUID_fn(a, _Bitwise_shiftRightZfBy_fn($TSFoster$elm_uuid$UUID$forceUnsigned_a0, (v << 12) | (4294905855 & b)), c, d);
    }, $TSFoster$elm_uuid$UUID$toVersion = F2($TSFoster$elm_uuid$UUID$toVersion_fn);
    var $TSFoster$elm_uuid$UUID$generator = $elm$random$Random$map_fn(A2($elm$core$Basics$composeR, $TSFoster$elm_uuid$UUID$toVersion(4), $TSFoster$elm_uuid$UUID$toVariant1), $elm$random$Random$map4_fn($TSFoster$elm_uuid$UUID$UUID, $TSFoster$elm_uuid$UUID$randomU32, $TSFoster$elm_uuid$UUID$randomU32, $TSFoster$elm_uuid$UUID$randomU32, $TSFoster$elm_uuid$UUID$randomU32));
    var $elm$core$String$cons = _String_cons;
    var $elm$core$String$fromChar = function (_char) {
        return _String_cons_fn(_char, "");
    };
    var $elm$core$String$padLeft_fn = function (n, _char, string) {
        return _Utils_ap($elm$core$String$repeat_fn(n - $elm$core$String$length(string), $elm$core$String$fromChar(_char)), string);
    }, $elm$core$String$padLeft = F3($elm$core$String$padLeft_fn);
    var $elm$core$String$fromList = _String_fromList;
    var $TSFoster$elm_uuid$UUID$toHex_fn = function (acc, _int) {
        toHex: while (true) {
            if (!_int) {
                return $elm$core$String$fromList(acc);
            }
            else {
                var _char = function () {
                    var _v0 = 15 & _int;
                    switch (_v0) {
                        case 0:
                            return "0";
                        case 1:
                            return "1";
                        case 2:
                            return "2";
                        case 3:
                            return "3";
                        case 4:
                            return "4";
                        case 5:
                            return "5";
                        case 6:
                            return "6";
                        case 7:
                            return "7";
                        case 8:
                            return "8";
                        case 9:
                            return "9";
                        case 10:
                            return "a";
                        case 11:
                            return "b";
                        case 12:
                            return "c";
                        case 13:
                            return "d";
                        case 14:
                            return "e";
                        default:
                            return "f";
                    }
                }();
                var $temp$acc = _List_Cons(_char, acc), $temp$int = _int >>> 4;
                acc = $temp$acc;
                _int = $temp$int;
                continue toHex;
            }
        }
    }, $TSFoster$elm_uuid$UUID$toHex = F2($TSFoster$elm_uuid$UUID$toHex_fn);
    var $TSFoster$elm_uuid$UUID$toStringWith_fn = function (sep, _v0) {
        var a = _v0.a;
        var b = _v0.b;
        var c = _v0.c;
        var d = _v0.d;
        return _Utils_ap($elm$core$String$padLeft_fn(8, "0", $TSFoster$elm_uuid$UUID$toHex_fn(_List_Nil, a)), _Utils_ap(sep, _Utils_ap($elm$core$String$padLeft_fn(4, "0", $TSFoster$elm_uuid$UUID$toHex_fn(_List_Nil, b >>> 16)), _Utils_ap(sep, _Utils_ap($elm$core$String$padLeft_fn(4, "0", $TSFoster$elm_uuid$UUID$toHex_fn(_List_Nil, 65535 & b)), _Utils_ap(sep, _Utils_ap($elm$core$String$padLeft_fn(4, "0", $TSFoster$elm_uuid$UUID$toHex_fn(_List_Nil, c >>> 16)), _Utils_ap(sep, _Utils_ap($elm$core$String$padLeft_fn(4, "0", $TSFoster$elm_uuid$UUID$toHex_fn(_List_Nil, 65535 & c)), $elm$core$String$padLeft_fn(8, "0", $TSFoster$elm_uuid$UUID$toHex_fn(_List_Nil, d)))))))))));
    }, $TSFoster$elm_uuid$UUID$toStringWith = F2($TSFoster$elm_uuid$UUID$toStringWith_fn);
    var $TSFoster$elm_uuid$UUID$toString_a0 = "-", $TSFoster$elm_uuid$UUID$toString = $TSFoster$elm_uuid$UUID$toStringWith($TSFoster$elm_uuid$UUID$toString_a0);
    var $author$project$GenerateurH5P$uuid = function (n) {
        return $TSFoster$elm_uuid$UUID$toStringWith_fn($TSFoster$elm_uuid$UUID$toString_a0, $elm$random$Random$step_fn($TSFoster$elm_uuid$UUID$generator, $elm$random$Random$initialSeed(n)).a);
    };
    var $author$project$GenerateurH5P$withMap_fn = function (field, fieldInside, value, record) {
        return A2(field.aU, A2(fieldInside.aU, value, field.bU(record)), record);
    }, $author$project$GenerateurH5P$withMap = F4($author$project$GenerateurH5P$withMap_fn);
    var $author$project$GenerateurH5P$fromBranchingScenario = function (subTree) {
        if (subTree.a === 5) {
            var _v5 = subTree.a;
            var title = subTree.b;
            var subTrees = subTree.c;
            return {
                bM: "useBehavioural",
                bT: { cf: "" },
                ac: "useBehavioural",
                cb: false,
                ci: {
                    bY: "H5P.CoursePresentation 1.24",
                    b$: { bQ: "Branching Question", bZ: "U", ch: title },
                    b8: $author$project$GenerateurH5P$fromH5pTree(subTree),
                    ce: $author$project$GenerateurH5P$uuid(1)
                }
            };
        }
        else {
            var context = subTree.a;
            var title = subTree.b;
            var subTrees = subTree.c;
            return {
                bM: "useBehavioural",
                bT: { cf: "" },
                ac: "useBehavioural",
                cb: false,
                ci: {
                    bY: "H5P.CoursePresentation 1.24",
                    b$: { bQ: "Branching Question", bZ: "U", ch: "Untitled Branching Question" },
                    b8: $author$project$GenerateurH5P$fromH5pTree(subTree),
                    ce: $author$project$GenerateurH5P$uuid(1)
                }
            };
        }
    };
    var $author$project$GenerateurH5P$fromH5pTree = function (tree) {
        switch (tree.a) {
            case 2:
                var _v1 = tree.a;
                var title = tree.b;
                var subTrees = tree.c;
                return $author$project$GenerateurH5P$BranchingScenarioH5P(A3(function ($) {
                    return $.aU;
                }, $author$project$GenerateurH5P$contentField, $elm$core$List$map_fn($author$project$GenerateurH5P$fromBranchingScenario, subTrees), $author$project$GenerateurH5P$withMap_fn($author$project$GenerateurH5P$startScreenField, $author$project$GenerateurH5P$startScreenSubtitleField, title, $author$project$GenerateurH5P$nouveauBranchingScenario)));
            case 5:
                var _v2 = tree.a;
                var title = tree.b;
                var subTrees = tree.c;
                return $author$project$GenerateurH5P$CoursePresentationH5P($author$project$GenerateurH5P$nouveauCoursePresentation);
            case 6:
                var _v3 = tree.a;
                var title = tree.b;
                var subTrees = tree.c;
                return $author$project$GenerateurH5P$TrueFalseH5P($author$project$GenerateurH5P$nouveauTrueFalse);
            default:
                return $author$project$GenerateurH5P$TrueFalseH5P($author$project$GenerateurH5P$nouveauTrueFalse);
        }
    };
    var $author$project$GenerateurH5P$PreambleContext = 0;
    var $author$project$GenerateurH5P$preambleParser = $elm$parser$Parser$Advanced$inContext_fn(0, $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed($elm$core$Basics$identity), $author$project$GenerateurH5P$whileNoStarOnFirstColumnOrEndOfFile));
    var $author$project$GenerateurH5P$parser = $elm$parser$Parser$Advanced$keeper_fn($elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$succeed($elm$core$List$map($author$project$GenerateurH5P$fromH5pTree)), $author$project$GenerateurH5P$preambleParser), $elm$parser$Parser$Advanced$ignorer_fn($elm$parser$Parser$Advanced$inContext_fn(1, $author$project$GenerateurH5P$contentsParser_fn(1, 1)), $elm$parser$Parser$Advanced$end($author$project$GenerateurH5P$EndOfFile)));
    var $author$project$GenerateurH5P$update_fn = function (msg, model) {
        switch (msg.$) {
            case 0:
                var nouvelleStructure = msg.a;
                var f = function (strCtn) {
                    var _v1 = $elm$parser$Parser$Advanced$run_fn($author$project$GenerateurH5P$parser, strCtn);
                    if (!_v1.$) {
                        var ctn = _v1.a;
                        return $elm$core$String$join_fn("\n\n", $elm$core$List$map_fn($author$project$GenerateurH5P$h5pEncode(2), ctn));
                    }
                    else {
                        var erreurs = _v1.a;
                        return $author$project$GenerateurH5P$deadEndsToStringBis(erreurs);
                    }
                };
                return _Utils_Tuple2(_Utils_update(model, {
                    aA: f(model.aO),
                    aO: nouvelleStructure
                }), $elm$core$Platform$Cmd$none);
            case 1:
                var f = function (strCtn) {
                    var _v2 = $elm$parser$Parser$Advanced$run_fn($author$project$GenerateurH5P$parser, strCtn);
                    if (!_v2.$) {
                        var ctn = _v2.a;
                        return $elm$core$String$join_fn("\n\n", $elm$core$List$map_fn($author$project$GenerateurH5P$h5pEncode(0), ctn));
                    }
                    else {
                        var erreurs = _v2.a;
                        return $author$project$GenerateurH5P$deadEndsToStringBis(erreurs);
                    }
                };
                return _Utils_Tuple2(_Utils_update(model, {
                    aA: f(model.aO)
                }), $elm$core$Platform$Cmd$none);
            default:
                return _Utils_Tuple2(model, $elm$file$File$Download$string_fn("content.json", "text/json", model.aA));
        }
    }, $author$project$GenerateurH5P$update = F2($author$project$GenerateurH5P$update_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$ExposingNone = { $: 1 };
    var $alexkorban$json_to_elm$ElmCodeGenerator$NounNaming = 1;
    var $alexkorban$json_to_elm$ElmCodeGenerator$PlainDecoders = { $: 2 };
    var $elm$core$List$any_fn = function (isOkay, list) {
        any: while (true) {
            if (!list.b) {
                return false;
            }
            else {
                var x = list.a;
                var xs = list.b;
                if (isOkay(x)) {
                    return true;
                }
                else {
                    var $temp$isOkay = isOkay, $temp$list = xs;
                    isOkay = $temp$isOkay;
                    list = $temp$list;
                    continue any;
                }
            }
        }
    }, $elm$core$List$any = F2($elm$core$List$any_fn);
    var $elm$core$List$member_fn = function (x, xs) {
        return $elm$core$List$any_fn(function (a) {
            return _Utils_eq(a, x);
        }, xs);
    }, $elm$core$List$member = F2($elm$core$List$member_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified_fn = function (symbolName, _v0) {
        var importAlias = _v0.fa;
        var exposingSpec = _v0.e_;
        var qualifiedName = importAlias + ("." + symbolName);
        switch (exposingSpec.$) {
            case 0:
                return symbolName;
            case 1:
                return qualifiedName;
            default:
                var exposedSymbols = exposingSpec.a;
                return $elm$core$List$member_fn(symbolName, exposedSymbols) ? symbolName : qualifiedName;
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified = F2($alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$configFromOptions = function (options) {
        var perhapsQualifiedEncode = function (symbolName) {
            return $alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified_fn(symbolName, options.ha);
        };
        var perhapsQualifiedDecode = function (symbolName) {
            return $alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified_fn(symbolName, options.g1);
        };
        return {
            d: {
                bC: perhapsQualifiedDecode("bool"),
                a1: perhapsQualifiedDecode("Decoder"),
                bU: perhapsQualifiedDecode("field"),
                bV: perhapsQualifiedDecode("float"),
                bX: perhapsQualifiedDecode("int"),
                aG: perhapsQualifiedDecode("list"),
                aH: perhapsQualifiedDecode("map"),
                fl: perhapsQualifiedDecode("map2"),
                fm: perhapsQualifiedDecode("map3"),
                fn: perhapsQualifiedDecode("map4"),
                fo: perhapsQualifiedDecode("map5"),
                fp: perhapsQualifiedDecode("map6"),
                fq: perhapsQualifiedDecode("map7"),
                b_: perhapsQualifiedDecode("map8"),
                ba: perhapsQualifiedDecode("null"),
                hT: perhapsQualifiedDecode("oneOf"),
                cd: perhapsQualifiedDecode("string"),
                aQ: perhapsQualifiedDecode("succeed")
            },
            g2: options.g2,
            q: {
                bC: perhapsQualifiedEncode("bool"),
                bV: perhapsQualifiedEncode("float"),
                bX: perhapsQualifiedEncode("int"),
                aG: perhapsQualifiedEncode("list"),
                ba: perhapsQualifiedEncode("null"),
                fy: perhapsQualifiedEncode("object"),
                cd: perhapsQualifiedEncode("string"),
                bv: perhapsQualifiedEncode("Value")
            },
            c7: {
                eM: $alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified_fn("andMap", function () {
                    var _v0 = options.g2;
                    if (!_v0.$) {
                        var importSpec = _v0.a;
                        return importSpec;
                    }
                    else {
                        return { e_: $alexkorban$json_to_elm$ElmCodeGenerator$ExposingNone, fa: "Json.Decode.Extra" };
                    }
                }())
            },
            hM: options.hM,
            dK: {
                fQ: $alexkorban$json_to_elm$ElmCodeGenerator$perhapsQualified_fn("required", function () {
                    var _v1 = options.g2;
                    if (_v1.$ === 1) {
                        var importSpec = _v1.a;
                        return importSpec;
                    }
                    else {
                        return { e_: $alexkorban$json_to_elm$ElmCodeGenerator$ExposingNone, fa: "Json.Decode.Pipeline" };
                    }
                }())
            },
            h5: $elm$core$String$isEmpty(options.h5) ? "Root" : options.h5
        };
    };
    var $elm$json$Json$Decode$decodeString = _Json_runOnString;
    var $hrldcpr$elm_cons$Cons$Cons_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $hrldcpr$elm_cons$Cons$Cons = F2($hrldcpr$elm_cons$Cons$Cons_fn);
    var $hrldcpr$elm_cons$Cons$cons = $hrldcpr$elm_cons$Cons$Cons;
    var $hrldcpr$elm_cons$Cons$toList = function (_v0) {
        var first = _v0.a;
        var rest = _v0.b;
        return _List_Cons(first, rest);
    };
    var $hrldcpr$elm_cons$Cons$foldr_fn = function (f, x) {
        return A2($elm$core$Basics$composeR, $hrldcpr$elm_cons$Cons$toList, A2($elm$core$List$foldr, f, x));
    }, $hrldcpr$elm_cons$Cons$foldr = F2($hrldcpr$elm_cons$Cons$foldr_fn);
    var $hrldcpr$elm_cons$Cons$append_fn = function (c, d) {
        var step = F2(function (x, xs) {
            return $hrldcpr$elm_cons$Cons$Cons_fn(x, $hrldcpr$elm_cons$Cons$toList(xs));
        });
        return A3($hrldcpr$elm_cons$Cons$foldr, step, d, c);
    }, $hrldcpr$elm_cons$Cons$append = F2($hrldcpr$elm_cons$Cons$append_fn);
    var $hrldcpr$elm_cons$Cons$fromList = function (l) {
        if (!l.b) {
            return $elm$core$Maybe$Nothing;
        }
        else {
            var first = l.a;
            var rest = l.b;
            return $elm$core$Maybe$Just($hrldcpr$elm_cons$Cons$Cons_fn(first, rest));
        }
    };
    var $hrldcpr$elm_cons$Cons$appendList_fn = function (c, l) {
        var _v0 = $hrldcpr$elm_cons$Cons$fromList(l);
        if (_v0.$ === 1) {
            return c;
        }
        else {
            var d = _v0.a;
            return $hrldcpr$elm_cons$Cons$append_fn(c, d);
        }
    }, $hrldcpr$elm_cons$Cons$appendList = F2($hrldcpr$elm_cons$Cons$appendList_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$asStr = function (value) {
        switch (value.$) {
            case 3:
                return "Bool";
            case 2:
                return "Int";
            case 1:
                return "Float";
            case 0:
                return "String";
            case 6:
                return "()";
            case 4:
                var items = value.a;
                return "List [" + ($elm$core$String$join_fn(", ", $elm$core$List$map_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, items)) + "]");
            default:
                var items = value.a;
                return "{" + ($elm$core$String$join_fn(", ", $elm$core$List$map_fn(function (_v1) {
                    var label = _v1.a;
                    var item = _v1.b;
                    return label + (": " + $alexkorban$json_to_elm$ElmCodeGenerator$asStr(item));
                }, items)) + "}");
        }
    };
    var $elm$core$Maybe$withDefault_fn = function (_default, maybe) {
        if (!maybe.$) {
            var value = maybe.a;
            return value;
        }
        else {
            return _default;
        }
    }, $elm$core$Maybe$withDefault = F2($elm$core$Maybe$withDefault_fn);
    var $elm_community$string_extra$String$Extra$changeCase_fn = function (mutator, word) {
        return $elm$core$Maybe$withDefault_fn("", $elm$core$Maybe$map_fn(function (_v0) {
            var head = _v0.a;
            var tail = _v0.b;
            return _String_cons_fn(mutator(head), tail);
        }, $elm$core$String$uncons(word)));
    }, $elm_community$string_extra$String$Extra$changeCase = F2($elm_community$string_extra$String$Extra$changeCase_fn);
    var $elm$core$Char$toLower = _Char_toLower;
    var $elm_community$string_extra$String$Extra$decapitalize = function (word) {
        return $elm_community$string_extra$String$Extra$changeCase_fn($elm$core$Char$toLower, word);
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn = function (namingStyle, typeName) {
        return (namingStyle === 1) ? $elm_community$string_extra$String$Extra$decapitalize(typeName + "Decoder") : ("decode" + typeName);
    }, $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName = F2($alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$paren = function (t) {
        return _String_contains_fn(" ", t) ? ("(" + (t + ")")) : t;
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$indexNouns = $elm$core$Array$fromList(_List_fromArray(["Object", "Member", "Entity", "Thing", "Instance", "Constituent", "Specimen", "Gadget", "Widget", "Gizmo", "Part", "Chunk", "Piece", "Thingy", "Thingamajig", "Whatsit", "Doodad"]));
    var $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex = function (index) {
        return $elm$core$Maybe$withDefault_fn("Alias" + $elm$core$String$fromInt(index), $elm$core$Array$get_fn(index, $alexkorban$json_to_elm$ElmCodeGenerator$indexNouns));
    };
    var $elm$regex$Regex$Match_fn = function (match, index, number, submatches) {
        return { hu: index, a9: match, hN: number, f$: submatches };
    }, $elm$regex$Regex$Match = F4($elm$regex$Regex$Match_fn);
    var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
    var $elm$regex$Regex$fromString = function (string) {
        return _Regex_fromStringWith_fn({ eP: false, fu: false }, string);
    };
    var $elm$regex$Regex$never = _Regex_never;
    var $elm_community$string_extra$String$Extra$regexFromString_a0 = $elm$regex$Regex$fromString, $elm_community$string_extra$String$Extra$regexFromString_a1 = $elm$core$Maybe$withDefault($elm$regex$Regex$never), $elm_community$string_extra$String$Extra$regexFromString = A2($elm$core$Basics$composeR, $elm_community$string_extra$String$Extra$regexFromString_a0, $elm_community$string_extra$String$Extra$regexFromString_a1);
    var $elm$regex$Regex$replace_a0 = _Regex_infinity, $elm$regex$Regex$replace = _Regex_replaceAtMost($elm$regex$Regex$replace_a0);
    var $elm$core$String$toUpper = _String_toUpper;
    var $elm$core$String$trim = _String_trim;
    var $elm_community$string_extra$String$Extra$camelize = function (string) {
        return _Regex_replaceAtMost_fn($elm$regex$Regex$replace_a0, $elm$core$Basics$composeR_fn($elm_community$string_extra$String$Extra$regexFromString_a0, $elm_community$string_extra$String$Extra$regexFromString_a1, "[-_\\s]+(.)?"), function (_v0) {
            var submatches = _v0.f$;
            if (submatches.b && (!submatches.a.$)) {
                var match = submatches.a.a;
                return $elm$core$String$toUpper(match);
            }
            else {
                return "";
            }
        }, $elm$core$String$trim(string));
    };
    var $elm$core$Char$toUpper = _Char_toUpper;
    var $elm_community$string_extra$String$Extra$toSentenceCase = function (word) {
        return $elm_community$string_extra$String$Extra$changeCase_fn($elm$core$Char$toUpper, word);
    };
    var $elm_community$string_extra$String$Extra$classify = function (string) {
        return $elm_community$string_extra$String$Extra$toSentenceCase($elm$core$String$replace_fn(" ", "", $elm_community$string_extra$String$Extra$camelize(_Regex_replaceAtMost_fn($elm$regex$Regex$replace_a0, $elm$core$Basics$composeR_fn($elm_community$string_extra$String$Extra$regexFromString_a0, $elm_community$string_extra$String$Extra$regexFromString_a1, "[\\W_]"), $elm$core$Basics$always(" "), string))));
    };
    var $hrldcpr$elm_cons$Cons$head = function (_v0) {
        var first = _v0.a;
        return first;
    };
    var $hrldcpr$elm_cons$Cons$length_a0 = $hrldcpr$elm_cons$Cons$toList, $hrldcpr$elm_cons$Cons$length_a1 = $elm$core$List$length, $hrldcpr$elm_cons$Cons$length = A2($elm$core$Basics$composeR, $hrldcpr$elm_cons$Cons$length_a0, $hrldcpr$elm_cons$Cons$length_a1);
    var $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName = function (path) {
        return $elm_community$string_extra$String$Extra$classify(($elm$core$Basics$composeR_fn($hrldcpr$elm_cons$Cons$length_a0, $hrldcpr$elm_cons$Cons$length_a1, path) > 1) ? $elm$core$String$join_fn(" ", $hrldcpr$elm_cons$Cons$toList(path)) : $hrldcpr$elm_cons$Cons$head(path));
    };
    var $elm_community$list_extra$List$Extra$uniqueHelp_fn = function (f, existing, remaining, accumulator) {
        uniqueHelp: while (true) {
            if (!remaining.b) {
                return $elm$core$List$reverse(accumulator);
            }
            else {
                var first = remaining.a;
                var rest = remaining.b;
                var computedFirst = f(first);
                if ($elm$core$List$member_fn(computedFirst, existing)) {
                    var $temp$f = f, $temp$existing = existing, $temp$remaining = rest, $temp$accumulator = accumulator;
                    f = $temp$f;
                    existing = $temp$existing;
                    remaining = $temp$remaining;
                    accumulator = $temp$accumulator;
                    continue uniqueHelp;
                }
                else {
                    var $temp$f = f, $temp$existing = _List_Cons(computedFirst, existing), $temp$remaining = rest, $temp$accumulator = _List_Cons(first, accumulator);
                    f = $temp$f;
                    existing = $temp$existing;
                    remaining = $temp$remaining;
                    accumulator = $temp$accumulator;
                    continue uniqueHelp;
                }
            }
        }
    }, $elm_community$list_extra$List$Extra$uniqueHelp = F4($elm_community$list_extra$List$Extra$uniqueHelp_fn);
    var $elm_community$list_extra$List$Extra$uniqueBy_fn = function (f, list) {
        return $elm_community$list_extra$List$Extra$uniqueHelp_fn(f, _List_Nil, list, _List_Nil);
    }, $elm_community$list_extra$List$Extra$uniqueBy = F2($elm_community$list_extra$List$Extra$uniqueBy_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$withApplyArrow = function (s) {
        return _String_contains_fn(" ", s) ? ("<| " + s) : s;
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn = function (config, path, value) {
        switch (value.$) {
            case 2:
                return config.d.bX;
            case 1:
                return config.d.bV;
            case 0:
                return config.d.cd;
            case 3:
                return config.d.bC;
            case 4:
                var nodes = value.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$listDecoderName_fn(config, path, nodes);
            case 5:
                var nodeTuples = value.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn(config.hM, $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path));
            default:
                return config.d.ba + " ()";
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$decoderName = F3($alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$listDecoderName_fn = function (config, path, nodes) {
        var uniqueItems = $elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, nodes);
        var itemDecoderFuncName = (config.hM === 1) ? $elm_community$string_extra$String$Extra$decapitalize($alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path) + "ItemDecoder") : ("decode" + ($alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path) + "Item"));
        var isHeterogeneous = $elm$core$List$length(uniqueItems) > 1;
        return config.d.aG + (" " + function () {
            if (isHeterogeneous) {
                return itemDecoderFuncName;
            }
            else {
                var _v0 = $elm$core$List$head(uniqueItems);
                if (_v0.$ === 1) {
                    return $alexkorban$json_to_elm$ElmCodeGenerator$withApplyArrow(config.d.aQ + " ()");
                }
                else {
                    var node = _v0.a;
                    return $alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                        $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(0)
                    ])), node));
                }
            }
        }());
    }, $alexkorban$json_to_elm$ElmCodeGenerator$listDecoderName = F3($alexkorban$json_to_elm$ElmCodeGenerator$listDecoderName_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$applicativeObjFieldDecoders_fn = function (indent, config, path, nodeTuples) {
        return $elm$core$String$join_fn("\n", $elm$core$List$map_fn(function (_v0) {
            var label = _v0.a;
            var node = _v0.b;
            return $elm$core$String$repeat_fn(indent, " ") + ("|> " + (config.c7.eM + (" (" + (config.d.bU + (" \"" + (label + ("\" " + ($alexkorban$json_to_elm$ElmCodeGenerator$withApplyArrow($alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), node)) + ")"))))))));
        }, nodeTuples));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$applicativeObjFieldDecoders = F4($alexkorban$json_to_elm$ElmCodeGenerator$applicativeObjFieldDecoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$decoderSortOrder = function (node) {
        if ((node.$ === 4) && (!node.a.b)) {
            return 1;
        }
        else {
            return 0;
        }
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn = function (path, value) {
        switch (value.$) {
            case 3:
                return "Bool";
            case 1:
                return "Float";
            case 2:
                return "Int";
            case 0:
                return "String";
            case 5:
                return $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
            case 4:
                var nodes = value.a;
                var uniqueItems = $elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, nodes);
                return "List " + $alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName_fn(path, uniqueItems));
            default:
                return "()";
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$elmType = F2($alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName_fn = function (path, uniqueItems) {
        var isHeterogeneous = $elm$core$List$length(uniqueItems) > 1;
        if (isHeterogeneous) {
            return $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        }
        else {
            var _v0 = $elm$core$List$head(uniqueItems);
            if (_v0.$ === 1) {
                return "()";
            }
            else {
                var node = _v0.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn($hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                    $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(0)
                ])), node);
            }
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName = F2($alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName_fn);
    var $elm$core$List$filter_fn = function (f, xs) {
        var tmp = _List_Cons(undefined, _List_Nil);
        var end = tmp;
        for (; xs
            .b; xs = xs.b) {
            if (f(xs.a)) {
                var next = _List_Cons(xs.a, _List_Nil);
                end.b
                    =
                        next;
                end =
                    next;
            }
        }
        return tmp.
            b;
    }, $elm$core$List$filter = F2($elm$core$List$filter_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial = function (node) {
        var areHeterogeneous = function (nodes) {
            return $elm$core$List$length($elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, nodes)) > 1;
        };
        switch (node.$) {
            case 4:
                var nodes = node.a;
                return $elm$core$List$any_fn($alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial, nodes) || areHeterogeneous(nodes);
            case 5:
                return true;
            default:
                return false;
        }
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn = function (indent, config, path, nodeTuples) {
        return $elm$core$String$join_fn("\n", $elm$core$List$map_fn(function (_v0) {
            var label = _v0.a;
            var value = _v0.b;
            return $elm$core$String$repeat_fn(indent, " ") + ("(" + (config.d.bU + (" \"" + (label + ("\" " + ($alexkorban$json_to_elm$ElmCodeGenerator$withApplyArrow($alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), value)) + ")"))))));
        }, nodeTuples));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders = F4($alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$pipelineObjFieldDecoders_fn = function (indent, config, path, nodeTuples) {
        return $elm$core$String$join_fn("\n", $elm$core$List$map_fn(function (_v0) {
            var label = _v0.a;
            var node = _v0.b;
            return $elm$core$String$repeat_fn(indent, " ") + ("|> " + (config.dK.fQ + (" \"" + (label + ("\" " + $alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), node)))))));
        }, nodeTuples));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$pipelineObjFieldDecoders = F4($alexkorban$json_to_elm$ElmCodeGenerator$pipelineObjFieldDecoders_fn);
    var $elm$core$List$drop_fn = function (n, list) {
        drop: while (true) {
            if (n <= 0) {
                return list;
            }
            else {
                if (!list.b) {
                    return list;
                }
                else {
                    var x = list.a;
                    var xs = list.b;
                    var $temp$n = n - 1, $temp$list = xs;
                    n = $temp$n;
                    list = $temp$list;
                    continue drop;
                }
            }
        }
    }, $elm$core$List$drop = F2($elm$core$List$drop_fn);
    var $elm$core$List$takeReverse_fn = function (n, list, kept) {
        takeReverse: while (true) {
            if (n <= 0) {
                return kept;
            }
            else {
                if (!list.b) {
                    return kept;
                }
                else {
                    var x = list.a;
                    var xs = list.b;
                    var $temp$n = n - 1, $temp$list = xs, $temp$kept = _List_Cons(x, kept);
                    n = $temp$n;
                    list = $temp$list;
                    kept = $temp$kept;
                    continue takeReverse;
                }
            }
        }
    }, $elm$core$List$takeReverse = F3($elm$core$List$takeReverse_fn);
    var $elm$core$List$takeTailRec_fn = function (n, list) {
        return $elm$core$List$reverse($elm$core$List$takeReverse_fn(n, list, _List_Nil));
    }, $elm$core$List$takeTailRec = F2($elm$core$List$takeTailRec_fn);
    var $elm$core$List$takeFast_fn = function (ctr, n, list) {
        if (n <= 0) {
            return _List_Nil;
        }
        else {
            var _v0 = _Utils_Tuple2(n, list);
            _v0$1: while (true) {
                _v0$5: while (true) {
                    if (!_v0.b.b) {
                        return list;
                    }
                    else {
                        if (_v0.b.b.b) {
                            switch (_v0.a) {
                                case 1:
                                    break _v0$1;
                                case 2:
                                    var _v2 = _v0.b;
                                    var x = _v2.a;
                                    var _v3 = _v2.b;
                                    var y = _v3.a;
                                    return _List_fromArray([x, y]);
                                case 3:
                                    if (_v0.b.b.b.b) {
                                        var _v4 = _v0.b;
                                        var x = _v4.a;
                                        var _v5 = _v4.b;
                                        var y = _v5.a;
                                        var _v6 = _v5.b;
                                        var z = _v6.a;
                                        return _List_fromArray([x, y, z]);
                                    }
                                    else {
                                        break _v0$5;
                                    }
                                default:
                                    if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
                                        var _v7 = _v0.b;
                                        var x = _v7.a;
                                        var _v8 = _v7.b;
                                        var y = _v8.a;
                                        var _v9 = _v8.b;
                                        var z = _v9.a;
                                        var _v10 = _v9.b;
                                        var w = _v10.a;
                                        var tl = _v10.b;
                                        return (ctr > 1000) ? _List_Cons(x, _List_Cons(y, _List_Cons(z, _List_Cons(w, $elm$core$List$takeTailRec_fn(n - 4, tl))))) : _List_Cons(x, _List_Cons(y, _List_Cons(z, _List_Cons(w, $elm$core$List$takeFast_fn(ctr + 1, n - 4, tl)))));
                                    }
                                    else {
                                        break _v0$5;
                                    }
                            }
                        }
                        else {
                            if (_v0.a === 1) {
                                break _v0$1;
                            }
                            else {
                                break _v0$5;
                            }
                        }
                    }
                }
                return list;
            }
            var _v1 = _v0.b;
            var x = _v1.a;
            return _List_fromArray([x]);
        }
    }, $elm$core$List$takeFast = F3($elm$core$List$takeFast_fn);
    var $elm$core$List$take_fn = function (n, list) {
        return $elm$core$List$takeFast_fn(0, n, list);
    }, $elm$core$List$take = F2($elm$core$List$take_fn);
    var $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep_fn = function (size, step, xs) {
        var xs_ = $elm$core$List$drop_fn(step, xs);
        var okayXs = $elm$core$List$length(xs) > 0;
        var okayArgs = (size > 0) && (step > 0);
        return (okayArgs && okayXs) ? _List_Cons($elm$core$List$take_fn(size, xs), $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep_fn(size, step, xs_)) : _List_Nil;
    }, $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep = F3($elm_community$list_extra$List$Extra$greedyGroupsOfWithStep_fn);
    var $elm_community$list_extra$List$Extra$greedyGroupsOf_fn = function (size, xs) {
        return $elm_community$list_extra$List$Extra$greedyGroupsOfWithStep_fn(size, size, xs);
    }, $elm_community$list_extra$List$Extra$greedyGroupsOf = F2($elm_community$list_extra$List$Extra$greedyGroupsOf_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$stagedObjDecoders_fn = function (config, typeName, path, nodeTuples) {
        var mapN = function (i) {
            return function () {
                switch (i) {
                    case 1:
                        return function ($) {
                            return $.aH;
                        };
                    case 2:
                        return function ($) {
                            return $.fl;
                        };
                    case 3:
                        return function ($) {
                            return $.fm;
                        };
                    case 4:
                        return function ($) {
                            return $.fn;
                        };
                    case 5:
                        return function ($) {
                            return $.fo;
                        };
                    case 6:
                        return function ($) {
                            return $.fp;
                        };
                    case 7:
                        return function ($) {
                            return $.fq;
                        };
                    case 8:
                        return function ($) {
                            return $.b_;
                        };
                    default:
                        return function ($) {
                            return $.aH;
                        };
                }
            }()(config.d);
        };
        var initFieldSet = $elm$core$List$take_fn(8, nodeTuples);
        var fieldSets = $elm_community$list_extra$List$Extra$greedyGroupsOf_fn(7, $elm$core$List$drop_fn(8, nodeTuples));
        return "    let\n" + (($elm$core$String$repeat_fn(8, " ") + "fieldSet0 = \n") + (($elm$core$String$repeat_fn(12, " ") + (config.d.b_ + (" " + (typeName + "\n")))) + ($alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn(16, config, path, initFieldSet) + ("\n" + $elm$core$String$join_fn("\n", $elm$core$List$indexedMap_fn_unwrapped(function (index, fieldSet) {
            return (($elm$core$List$length(fieldSet) === 7) && (_Utils_cmp(index, $elm$core$List$length(fieldSets) - 1) < 0)) ? _Utils_ap("\n" + ($elm$core$String$repeat_fn(8, " ") + ("fieldSet" + ($elm$core$String$fromInt(index + 1) + " =\n"))), _Utils_ap($elm$core$String$repeat_fn(12, " ") + (config.d.b_ + " (<|)\n"), _Utils_ap($elm$core$String$repeat_fn(16, " ") + ("fieldSet" + ($elm$core$String$fromInt(index) + "\n")), $alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn(16, config, path, fieldSet)))) : ("    in\n" + (($elm$core$String$repeat_fn(4, " ") + (mapN(1 + $elm$core$List$length(fieldSet)) + " (<|)\n")) + (($elm$core$String$repeat_fn(8, " ") + ("fieldSet" + ($elm$core$String$fromInt($elm$core$List$length(fieldSets) - 1) + "\n"))) + $alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn(8, config, path, fieldSet))));
        }, fieldSets))))));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$stagedObjDecoders = F4($alexkorban$json_to_elm$ElmCodeGenerator$stagedObjDecoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$decoders_fn = function (config, path, node) {
        switch (node.$) {
            case 4:
                var nodes = node.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$listDecoders_fn(config, path, node, nodes);
            case 5:
                var nodeTuples = node.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$objDecoders_fn(config, path, nodeTuples);
            default:
                var funcName = $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn(config.hM, $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path));
                return _List_fromArray([
                    (funcName + (" : " + (config.d.a1 + (" " + ($alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn(path, node) + "\n"))))) + ((funcName + " = \n") + ("    " + $alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, path, node)))
                ]);
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$decoders = F3($alexkorban$json_to_elm$ElmCodeGenerator$decoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$listDecoders_fn = function (config, path, node, nodes) {
        var uniqueItems = _List_sortBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$decoderSortOrder, $elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, nodes));
        var typeName = $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        var itemFuncName = $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn(config.hM, typeName + "Item");
        var isHeterogeneous = $elm$core$List$length(uniqueItems) > 1;
        var itemDecoder = function () {
            if (isHeterogeneous) {
                return config.d.aG + ("  " + $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn(config.hM, typeName + "Item"));
            }
            else {
                var _v4 = $elm$core$List$head(uniqueItems);
                if (_v4.$ === 1) {
                    return config.d.aG + (" <| " + (config.d.aQ + " ()"));
                }
                else {
                    var childNode = _v4.a;
                    return $alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                        $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(0)
                    ])), childNode);
                }
            }
        }();
        var funcName = $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn(config.hM, typeName);
        var listDecoder = _Utils_ap(funcName + (" : " + (config.d.a1 + (" " + ($alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn(path, node)) + "\n")))), _Utils_ap(funcName + " = \n", _Utils_ap($elm$core$String$repeat_fn(4, " "), $alexkorban$json_to_elm$ElmCodeGenerator$listDecoderName_fn(config, path, uniqueItems))));
        var mainDecoders = _Utils_ap(($elm$core$Basics$composeR_fn($hrldcpr$elm_cons$Cons$length_a0, $hrldcpr$elm_cons$Cons$length_a1, path) === 1) ? _List_fromArray([listDecoder]) : _List_Nil, isHeterogeneous ? _List_fromArray([
            (itemFuncName + (" : " + (config.d.a1 + (" " + ($alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName_fn(path, uniqueItems)) + "\n"))))) + ((itemFuncName + " = \n") + ("    " + ((config.d.hT + "\n") + ($elm$core$String$repeat_fn(8, " ") + ("[ " + ($elm$core$String$join_fn("\n" + ($elm$core$String$repeat_fn(8, " ") + ", "), $elm$core$List$indexedMap_fn_unwrapped(function (i, n) {
                return config.d.aH + (" " + (typeName + ($elm$core$String$fromInt(i) + (" <| " + $alexkorban$json_to_elm$ElmCodeGenerator$decoderName_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                    $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(i)
                ])), n)))));
            }, uniqueItems)) + ("\n" + ($elm$core$String$repeat_fn(8, " ") + "]"))))))))
        ]) : _List_Nil);
        return _Utils_ap(mainDecoders, $elm$core$List$concat($elm$core$List$indexedMap_fn_unwrapped(function (i, n) {
            return $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial(n) ? $alexkorban$json_to_elm$ElmCodeGenerator$decoders_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(i)
            ])), n) : _List_Nil;
        }, uniqueItems)));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$listDecoders = F4($alexkorban$json_to_elm$ElmCodeGenerator$listDecoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$objDecoders_fn = function (config, path, nodeTuples) {
        var typeName = $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        var funcName = $alexkorban$json_to_elm$ElmCodeGenerator$decoderFuncName_fn(config.hM, typeName);
        var mainDecoder = _Utils_ap(funcName + (" : " + (config.d.a1 + (" " + (typeName + "\n")))), _Utils_ap(funcName + " = \n", function () {
            var _v1 = _Utils_Tuple2($elm$core$List$length(nodeTuples), config.g2);
            _v1$0: while (true) {
                switch (_v1.b.$) {
                    case 2:
                        switch (_v1.a) {
                            case 0:
                                break _v1$0;
                            case 1:
                                var _v2 = _v1.b;
                                return "    " + (config.d.aH + (" " + (typeName + ("\n" + $alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn(8, config, path, nodeTuples)))));
                            default:
                                var fieldCount = _v1.a;
                                var _v3 = _v1.b;
                                return (fieldCount > 8) ? $alexkorban$json_to_elm$ElmCodeGenerator$stagedObjDecoders_fn(config, typeName, path, nodeTuples) : ("    " + (config.d.aH + ($elm$core$String$fromInt($elm$core$List$length(nodeTuples)) + (" " + (typeName + ("\n" + $alexkorban$json_to_elm$ElmCodeGenerator$objFieldDecoders_fn(8, config, path, nodeTuples)))))));
                        }
                    case 1:
                        if (!_v1.a) {
                            break _v1$0;
                        }
                        else {
                            return "    " + (config.d.aQ + (" " + (typeName + ("\n" + $alexkorban$json_to_elm$ElmCodeGenerator$pipelineObjFieldDecoders_fn(8, config, path, nodeTuples)))));
                        }
                    default:
                        if (!_v1.a) {
                            break _v1$0;
                        }
                        else {
                            return "    " + (config.d.aQ + (" " + (typeName + ("\n" + $alexkorban$json_to_elm$ElmCodeGenerator$applicativeObjFieldDecoders_fn(8, config, path, nodeTuples)))));
                        }
                }
            }
            return "    " + (config.d.aQ + (" " + typeName));
        }()));
        return _List_Cons(mainDecoder, $elm$core$List$concat($elm$core$List$map_fn(function (_v0) {
            var label = _v0.a;
            var n = _v0.b;
            return $alexkorban$json_to_elm$ElmCodeGenerator$decoders_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), n);
        }, $elm$core$List$filter_fn(A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial), nodeTuples))));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$objDecoders = F3($alexkorban$json_to_elm$ElmCodeGenerator$objDecoders_fn);
    var $elm$core$String$any = _String_any;
    var $elm$core$String$filter = _String_filter;
    var $elm$core$Char$fromCode = _Char_fromCode;
    var $alexkorban$json_to_elm$ElmCodeGenerator$keywords = $elm$core$Set$fromList(_List_fromArray(["if", "then", "else", "case", "of", "let", "in", "type", "module", "where", "import", "exposing", "as", "port"]));
    var $elm$core$String$foldr = _String_foldr;
    var $elm$core$String$toList = function (string) {
        return _String_foldr_fn($elm$core$List$cons, _List_Nil, string);
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$adorn_fn = function (fieldIndex, fieldName) {
        var startsWithDigit = function (s) {
            return _String_any_fn($elm$core$Char$isDigit, $elm$core$String$left_fn(1, s));
        };
        var isAllowed = function (c) {
            return $elm$core$Char$isAlphaNum(c) || ((c === "-") || (c === "_"));
        };
        var _v0 = $elm$core$String$toInt(fieldName);
        if (!_v0.$) {
            return "field" + fieldName;
        }
        else {
            return function (name) {
                return $elm$core$Set$member_fn(name, $alexkorban$json_to_elm$ElmCodeGenerator$keywords) ? (name + "_") : name;
            }(function (name) {
                return $elm$core$String$isEmpty(name) ? ("field" + $elm$core$String$fromChar($elm$core$Char$fromCode(fieldIndex + 65))) : (startsWithDigit(name) ? ("field" + name) : name);
            }($elm_community$string_extra$String$Extra$decapitalize($elm_community$string_extra$String$Extra$classify($elm$core$String$concat($elm$core$List$map_fn(function (c) {
                return (!isAllowed(c)) ? ("U" + $elm$core$String$fromInt($elm$core$Char$toCode(c))) : $elm$core$String$fromChar(c);
            }, $elm$core$String$toList(_String_filter_fn(A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$Basics$eq(" ")), fieldName))))))));
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$adorn = F2($alexkorban$json_to_elm$ElmCodeGenerator$adorn_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix = function (namingStyle) {
        return (namingStyle === 1) ? "encoded" : "encode";
    };
    var $elm$core$String$trimRight = _String_trimRight;
    var $alexkorban$json_to_elm$ElmCodeGenerator$encoderName_fn = function (config, valueName, path, value) {
        return $elm$core$String$trimRight(function () {
            switch (value.$) {
                case 2:
                    return config.q.bX + (" " + valueName);
                case 1:
                    return config.q.bV + (" " + valueName);
                case 0:
                    return config.q.cd + (" " + valueName);
                case 3:
                    return config.q.bC + (" " + valueName);
                case 6:
                    return config.q.ba;
                case 4:
                    var nodes = value.a;
                    return $alexkorban$json_to_elm$ElmCodeGenerator$listEncoderName_fn(config, path, nodes) + (" " + valueName);
                default:
                    return $alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + ($alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path) + (" " + valueName));
            }
        }());
    }, $alexkorban$json_to_elm$ElmCodeGenerator$encoderName = F4($alexkorban$json_to_elm$ElmCodeGenerator$encoderName_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$listEncoderName_fn = function (config, path, nodes) {
        var uniqueItems = $elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, nodes);
        var isHeterogeneous = $elm$core$List$length(uniqueItems) > 1;
        return config.q.aG + (" " + function () {
            if (isHeterogeneous) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + ($alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path) + "Item");
            }
            else {
                var _v0 = $elm$core$List$head(uniqueItems);
                if (_v0.$ === 1) {
                    return "(\\_ -> " + (config.q.ba + ")");
                }
                else {
                    var node = _v0.a;
                    return $alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$encoderName_fn(config, "", $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                        $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(0)
                    ])), node));
                }
            }
        }());
    }, $alexkorban$json_to_elm$ElmCodeGenerator$listEncoderName = F3($alexkorban$json_to_elm$ElmCodeGenerator$listEncoderName_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$encoders_fn = function (config, path, node) {
        var typeName = $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        var namePrefix = (config.hM === 1) ? "encoded" : "encode";
        switch (node.$) {
            case 4:
                var nodes = node.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$listEncoders_fn(config, path, node, nodes);
            case 5:
                var nodes = node.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$objEncoders_fn(config, path, nodes);
            default:
                return _List_fromArray([
                    (namePrefix + (typeName + (" : " + ($alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn(path, node) + (" -> " + (config.q.bv + "\n")))))) + ((namePrefix + (typeName + (" " + ($elm_community$string_extra$String$Extra$decapitalize(typeName) + " =\n")))) + ("    " + $alexkorban$json_to_elm$ElmCodeGenerator$encoderName_fn(config, $elm_community$string_extra$String$Extra$decapitalize(typeName), path, node)))
                ]);
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$encoders = F3($alexkorban$json_to_elm$ElmCodeGenerator$encoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$listEncoders_fn = function (config, path, node, childNodes) {
        var uniqueItems = _List_sortBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$decoderSortOrder, $elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, childNodes));
        var typeName = $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        var listEncoder = ($alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + (typeName + " : ")) + (("List " + ($alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName_fn(path, uniqueItems)) + (" -> " + (config.q.bv + "\n")))) + (($alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + (typeName + (" " + ($elm_community$string_extra$String$Extra$decapitalize(typeName) + " =\n")))) + ($elm$core$String$repeat_fn(4, " ") + ($alexkorban$json_to_elm$ElmCodeGenerator$listEncoderName_fn(config, path, uniqueItems) + (" " + $elm_community$string_extra$String$Extra$decapitalize(typeName))))));
        var isHeterogeneous = $elm$core$List$length(uniqueItems) > 1;
        var mainEncoders = _Utils_ap(($elm$core$Basics$composeR_fn($hrldcpr$elm_cons$Cons$length_a0, $hrldcpr$elm_cons$Cons$length_a1, path) === 1) ? _List_fromArray([listEncoder]) : _List_Nil, isHeterogeneous ? _List_fromArray([
            _Utils_ap($alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + (typeName + "Item : "), _Utils_ap($alexkorban$json_to_elm$ElmCodeGenerator$listItemTypeName_fn(path, uniqueItems) + (" -> " + (config.q.bv + "\n")), _Utils_ap($alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + (typeName + ("Item " + ($elm_community$string_extra$String$Extra$decapitalize(typeName) + " =\n"))), _Utils_ap($elm$core$String$repeat_fn(4, " "), _Utils_ap("case " + ($elm_community$string_extra$String$Extra$decapitalize(typeName) + " of\n"), _Utils_ap($elm$core$String$repeat_fn(8, " "), $elm$core$String$join_fn("\n\n" + $elm$core$String$repeat_fn(8, " "), $elm$core$List$indexedMap_fn_unwrapped(function (i, n) {
                return _Utils_ap(typeName + ($elm$core$String$fromInt(i) + " value ->\n"), _Utils_ap($elm$core$String$repeat_fn(12, " "), $alexkorban$json_to_elm$ElmCodeGenerator$encoderName_fn(config, "value", $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                    $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(i)
                ])), n)));
            }, uniqueItems))))))))
        ]) : _List_Nil);
        return _Utils_ap(mainEncoders, $elm$core$List$concat($elm$core$List$indexedMap_fn_unwrapped(function (i, n) {
            return $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial(n) ? $alexkorban$json_to_elm$ElmCodeGenerator$encoders_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(i)
            ])), n) : _List_Nil;
        }, uniqueItems)));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$listEncoders = F4($alexkorban$json_to_elm$ElmCodeGenerator$listEncoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$objEncoders_fn = function (config, path, nodeTuples) {
        var typeName = $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        var fieldEncoders = $elm$core$String$join_fn("\n" + ($elm$core$String$repeat_fn(8, " ") + ", "), $elm$core$List$indexedMap_fn_unwrapped(function (i, _v1) {
            var label = _v1.a;
            var node = _v1.b;
            return "( \"" + (label + ("\", " + ($alexkorban$json_to_elm$ElmCodeGenerator$encoderName_fn(config, $elm_community$string_extra$String$Extra$decapitalize(typeName) + ("." + $alexkorban$json_to_elm$ElmCodeGenerator$adorn_fn(i, label)), $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), node) + " )")));
        }, nodeTuples));
        var mainEncoder = ($alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + (typeName + (" : " + (typeName + (" -> " + (config.q.bv + "\n")))))) + (($alexkorban$json_to_elm$ElmCodeGenerator$encoderNamePrefix(config.hM) + (typeName + (" " + ($elm_community$string_extra$String$Extra$decapitalize(typeName) + " = \n")))) + ("    " + (config.q.fy + ("\n" + ($elm$core$String$repeat_fn(8, " ") + ($elm$core$String$isEmpty(fieldEncoders) ? "[]" : ("[ " + (fieldEncoders + ("\n" + ($elm$core$String$repeat_fn(8, " ") + "]"))))))))));
        return _List_Cons(mainEncoder, $elm$core$List$concat($elm$core$List$map_fn(function (_v0) {
            var label = _v0.a;
            var n = _v0.b;
            return $alexkorban$json_to_elm$ElmCodeGenerator$encoders_fn(config, $hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), n);
        }, $elm$core$List$filter_fn(A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial), nodeTuples))));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$objEncoders = F3($alexkorban$json_to_elm$ElmCodeGenerator$objEncoders_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$imports = function (options) {
        var importStr = F2(function (moduleName, _v3) {
            var importAlias = _v3.fa;
            var exposingSpec = _v3.e_;
            return "import " + (importAlias + function () {
                switch (exposingSpec.$) {
                    case 0:
                        return " exposing (..)";
                    case 1:
                        return "";
                    default:
                        var symbols = exposingSpec.a;
                        return " exposing (" + ($elm$core$String$join_fn(", ", symbols) + ")");
                }
            }());
        });
        var importStrs = _Utils_ap(_List_fromArray([
            A2(importStr, "Json.Decode", options.g1),
            A2(importStr, "Json.Encode", options.ha)
        ]), function () {
            var _v1 = options.g2;
            switch (_v1.$) {
                case 0:
                    var extraImport = _v1.a;
                    return _List_fromArray([
                        A2(importStr, "Json.Decode.Extra", extraImport)
                    ]);
                case 1:
                    var pipelineImport = _v1.a;
                    return _List_fromArray([
                        A2(importStr, "Json.Decode.Pipeline", pipelineImport)
                    ]);
                default:
                    return _List_Nil;
            }
        }());
        var commentStrs = _Utils_ap(_List_fromArray(["-- Required packages:", "-- * elm/json"]), function () {
            var _v0 = options.g2;
            switch (_v0.$) {
                case 0:
                    return _List_fromArray(["-- * elm-community/json-extra"]);
                case 1:
                    return _List_fromArray(["-- * NoRedInk/elm-json-decode-pipeline"]);
                default:
                    return _List_Nil;
            }
        }());
        return _Utils_ap(importStrs, _Utils_ap(_List_fromArray(["\n"]), commentStrs));
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JBool = { $: 3 };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JFloat = { $: 1 };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JInt = { $: 2 };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JList = function (a) {
        return { $: 4, a: a };
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JNull = { $: 6 };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JObj = function (a) {
        return { $: 5, a: a };
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$JString = { $: 0 };
    var $elm$json$Json$Decode$bool = _Json_decodeBool;
    var $elm$json$Json$Decode$float = _Json_decodeFloat;
    var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
    var $elm$json$Json$Decode$lazy = function (thunk) {
        return _Json_andThen_fn(thunk, $elm$json$Json$Decode$succeed(0));
    };
    var $elm$json$Json$Decode$list = _Json_decodeList;
    var $elm$json$Json$Decode$null = _Json_decodeNull;
    var $elm$json$Json$Decode$oneOf = _Json_oneOf;
    var $elm$json$Json$Decode$string = _Json_decodeString;
    function $alexkorban$json_to_elm$ElmCodeGenerator$cyclic$jsonDecoder() {
        return $elm$json$Json$Decode$oneOf(_List_fromArray([
            _Json_map1_fn(function (_v0) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$JString;
            }, $elm$json$Json$Decode$string),
            _Json_map1_fn(function (_v1) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$JInt;
            }, $elm$json$Json$Decode$int),
            _Json_map1_fn(function (_v2) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$JFloat;
            }, $elm$json$Json$Decode$float),
            _Json_map1_fn(function (_v3) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$JBool;
            }, $elm$json$Json$Decode$bool),
            _Json_map1_fn($alexkorban$json_to_elm$ElmCodeGenerator$JList, $elm$json$Json$Decode$list($elm$json$Json$Decode$lazy(function (_v4) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$cyclic$jsonDecoder();
            }))),
            _Json_map1_fn(A2($elm$core$Basics$composeL, $alexkorban$json_to_elm$ElmCodeGenerator$JObj, $elm$core$List$sortBy(A2($elm$core$Basics$composeL, $alexkorban$json_to_elm$ElmCodeGenerator$adorn(0), $elm$core$Tuple$first))), $elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$lazy(function (_v5) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$cyclic$jsonDecoder();
            }))),
            $elm$json$Json$Decode$null($alexkorban$json_to_elm$ElmCodeGenerator$JNull)
        ]));
    }
    var $alexkorban$json_to_elm$ElmCodeGenerator$jsonDecoder = $alexkorban$json_to_elm$ElmCodeGenerator$cyclic$jsonDecoder();
    $alexkorban$json_to_elm$ElmCodeGenerator$cyclic$jsonDecoder = function () {
        return $alexkorban$json_to_elm$ElmCodeGenerator$jsonDecoder;
    };
    var $hrldcpr$elm_cons$Cons$singleton = function (x) {
        return $hrldcpr$elm_cons$Cons$Cons_fn(x, _List_Nil);
    };
    var $alexkorban$json_to_elm$ElmCodeGenerator$customType_fn = function (path, nodes) {
        var name = $alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path);
        return "type " + (name + ("\n    = " + $elm$core$String$join_fn("\n    | ", $elm$core$List$indexedMap_fn_unwrapped(function (i, node) {
            return name + ($elm$core$String$fromInt(i) + (" " + $alexkorban$json_to_elm$ElmCodeGenerator$paren($alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn($hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(i)
            ])), node))));
        }, nodes))));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$customType = F2($alexkorban$json_to_elm$ElmCodeGenerator$customType_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$listTypesAndAliases_fn = function (path, nodes) {
        var uniqueItems = _List_sortBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$decoderSortOrder, $elm_community$list_extra$List$Extra$uniqueBy_fn($alexkorban$json_to_elm$ElmCodeGenerator$asStr, nodes));
        var isHeterogeneous = $elm$core$List$length(uniqueItems) > 1;
        if (isHeterogeneous) {
            return _List_Cons($alexkorban$json_to_elm$ElmCodeGenerator$customType_fn(path, uniqueItems), $elm$core$List$concat($elm$core$List$indexedMap_fn_unwrapped(function (i, node) {
                return $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial(node) ? $alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases_fn($hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                    $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(i)
                ])), node) : _List_Nil;
            }, uniqueItems)));
        }
        else {
            var _v2 = $elm$core$List$head(uniqueItems);
            if (_v2.$ === 1) {
                return _List_Nil;
            }
            else {
                var childNode = _v2.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases_fn($hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([
                    $alexkorban$json_to_elm$ElmCodeGenerator$strFromIndex(0)
                ])), childNode);
            }
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$listTypesAndAliases = F2($alexkorban$json_to_elm$ElmCodeGenerator$listTypesAndAliases_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$objTypeAliases_fn = function (path, nodeTuples) {
        var fieldStr = $elm$core$String$join_fn("\n    , ", $elm$core$List$indexedMap_fn_unwrapped(function (i, node) {
            return $alexkorban$json_to_elm$ElmCodeGenerator$adorn_fn(i, node.a) + (" : " + $alexkorban$json_to_elm$ElmCodeGenerator$elmType_fn($hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([node.a])), node.b));
        }, nodeTuples));
        var mainAlias = ("type alias " + ($alexkorban$json_to_elm$ElmCodeGenerator$typeAliasName(path) + " =\n")) + ("    " + ($elm$core$String$isEmpty(fieldStr) ? "{}" : ("{ " + (fieldStr + "\n    }"))));
        return _List_Cons(mainAlias, $elm$core$List$concat($elm$core$List$map_fn(function (_v1) {
            var label = _v1.a;
            var n = _v1.b;
            return $alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases_fn($hrldcpr$elm_cons$Cons$appendList_fn(path, _List_fromArray([label])), n);
        }, $elm$core$List$filter_fn(A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $alexkorban$json_to_elm$ElmCodeGenerator$isNonTrivial), nodeTuples))));
    }, $alexkorban$json_to_elm$ElmCodeGenerator$objTypeAliases = F2($alexkorban$json_to_elm$ElmCodeGenerator$objTypeAliases_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases_fn = function (path, node) {
        switch (node.$) {
            case 4:
                var nodes = node.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$listTypesAndAliases_fn(path, nodes);
            case 5:
                var nodeTuples = node.a;
                return $alexkorban$json_to_elm$ElmCodeGenerator$objTypeAliases_fn(path, nodeTuples);
            default:
                return _List_Nil;
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases = F2($alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases_fn);
    var $alexkorban$json_to_elm$ElmCodeGenerator$fromJsonSample_fn = function (options, jsonStr) {
        var _v0 = _Json_runOnString_fn($alexkorban$json_to_elm$ElmCodeGenerator$jsonDecoder, jsonStr);
        if (_v0.$ === 1) {
            var err = _v0.a;
            return $elm$core$Result$Err($elm$json$Json$Decode$errorToString(err));
        }
        else {
            var tree = _v0.a;
            var rootPath = $hrldcpr$elm_cons$Cons$singleton(options.h5);
            var config = $alexkorban$json_to_elm$ElmCodeGenerator$configFromOptions(options);
            return $elm$core$Result$Ok({
                g3: $alexkorban$json_to_elm$ElmCodeGenerator$decoders_fn(config, rootPath, tree),
                hb: $alexkorban$json_to_elm$ElmCodeGenerator$encoders_fn(config, rootPath, tree),
                hs: $alexkorban$json_to_elm$ElmCodeGenerator$imports(options),
                iL: $alexkorban$json_to_elm$ElmCodeGenerator$typesAndAliases_fn(rootPath, tree)
            });
        }
    }, $alexkorban$json_to_elm$ElmCodeGenerator$fromJsonSample = F2($alexkorban$json_to_elm$ElmCodeGenerator$fromJsonSample_fn);
    var $author$project$GenerateurJson$parser_fn = function (nomObjet, sourceJson) {
        return $alexkorban$json_to_elm$ElmCodeGenerator$fromJsonSample_fn({
            g1: { e_: $alexkorban$json_to_elm$ElmCodeGenerator$ExposingNone, fa: "Json.Decode" },
            g2: $alexkorban$json_to_elm$ElmCodeGenerator$PlainDecoders,
            ha: { e_: $alexkorban$json_to_elm$ElmCodeGenerator$ExposingNone, fa: "Json.Encode" },
            hM: 1,
            h5: nomObjet
        }, sourceJson);
    }, $author$project$GenerateurJson$parser = F2($author$project$GenerateurJson$parser_fn);
    var $author$project$GenerateurJson$generateur_fn = function (nomObjet, sourceJson) {
        var _v0 = $author$project$GenerateurJson$parser_fn(nomObjet, sourceJson);
        if (!_v0.$) {
            var code = _v0.a;
            return $elm$core$String$join_fn("\n", _Utils_ap(code.hs, _Utils_ap(code.iL, _Utils_ap(code.g3, code.hb))));
        }
        else {
            var erreurs = _v0.a;
            return erreurs;
        }
    }, $author$project$GenerateurJson$generateur = F2($author$project$GenerateurJson$generateur_fn);
    var $author$project$GenerateurJson$update_fn = function (msg, model) {
        switch (msg.$) {
            case 0:
                var nom = msg.a;
                return _Utils_Tuple2(_Utils_update(model, {
                    aa: $author$project$GenerateurJson$generateur_fn(model.U, model.an),
                    U: nom
                }), $elm$core$Platform$Cmd$none);
            case 1:
                var source = msg.a;
                return _Utils_Tuple2(_Utils_update(model, {
                    aa: $author$project$GenerateurJson$generateur_fn(model.U, model.an),
                    an: source
                }), $elm$core$Platform$Cmd$none);
            case 2:
                return _Utils_Tuple2(_Utils_update(model, {
                    aa: $author$project$GenerateurJson$generateur_fn(model.U, model.an)
                }), $elm$core$Platform$Cmd$none);
            default:
                return _Utils_Tuple2(model, $elm$file$File$Download$string_fn(model.U + ".elm", "text/elm", model.aa));
        }
    }, $author$project$GenerateurJson$update = F2($author$project$GenerateurJson$update_fn);
    var $author$project$Prof$update_fn = function (msg, model) {
        var _v0 = _Utils_Tuple2(msg, model.V);
        _v0$6: while (true) {
            switch (_v0.a.$) {
                case 0:
                    var urlRequest = _v0.a.a;
                    if (!urlRequest.$) {
                        var url = urlRequest.a;
                        return _Utils_Tuple2(model, _Browser_pushUrl_fn(model.dq, $elm$url$Url$toString(url)));
                    }
                    else {
                        var href = urlRequest.a;
                        return _Utils_Tuple2(model, $elm$browser$Browser$Navigation$load(href));
                    }
                case 1:
                    var url = _v0.a.a;
                    var _v2 = url.aC;
                    _v2$4: while (true) {
                        if (!_v2.$) {
                            switch (_v2.a) {
                                case "CalculateurDeNotes":
                                    return _Utils_Tuple2(_Utils_update(model, { V: 1, aS: url }), $elm$core$Platform$Cmd$none);
                                case "GenerateurDeProblemes":
                                    return _Utils_Tuple2(_Utils_update(model, { V: 0, aS: url }), $elm$core$Platform$Cmd$none);
                                case "GenerateurH5P":
                                    return _Utils_Tuple2(_Utils_update(model, { V: 2, aS: url }), $elm$core$Platform$Cmd$none);
                                case "GenerateurJson":
                                    return _Utils_Tuple2(_Utils_update(model, { V: 3, aS: url }), $elm$core$Platform$Cmd$none);
                                default:
                                    break _v2$4;
                            }
                        }
                        else {
                            break _v2$4;
                        }
                    }
                    return _Utils_Tuple2(_Utils_update(model, {
                        V: 3,
                        aS: _Utils_update(url, {
                            aC: $elm$core$Maybe$Just("GenerateurJson")
                        })
                    }), _Browser_pushUrl_fn(model.dq, $elm$url$Url$toString(_Utils_update(url, {
                        aC: $elm$core$Maybe$Just("GenerateurJson")
                    }))));
                case 3:
                    if (!_v0.b) {
                        var message = _v0.a.a;
                        var _v3 = _v0.b;
                        var _v4 = $author$project$GenerateurDeProblemes$update_fn(message, model.b1);
                        var nouveauModele = _v4.a;
                        var commande = _v4.b;
                        return _Utils_Tuple2(_Utils_update(model, { b1: nouveauModele }), _Platform_map_fn($author$project$Prof$GenerateurDeProblemesMsg, commande));
                    }
                    else {
                        break _v0$6;
                    }
                case 2:
                    if (_v0.b === 1) {
                        var message = _v0.a.a;
                        var _v5 = _v0.b;
                        var _v6 = $author$project$CalculateurDeNotes$update_fn(message, model.b0);
                        var nouveauModele = _v6.a;
                        var commande = _v6.b;
                        return _Utils_Tuple2(_Utils_update(model, { b0: nouveauModele }), _Platform_map_fn($author$project$Prof$CalculateurDeNotesMsg, commande));
                    }
                    else {
                        break _v0$6;
                    }
                case 4:
                    if (_v0.b === 2) {
                        var message = _v0.a.a;
                        var _v7 = _v0.b;
                        var _v8 = $author$project$GenerateurH5P$update_fn(message, model.b2);
                        var nouveauModele = _v8.a;
                        var commande = _v8.b;
                        return _Utils_Tuple2(_Utils_update(model, { b2: nouveauModele }), _Platform_map_fn($author$project$Prof$GenerateurH5PMsg, commande));
                    }
                    else {
                        break _v0$6;
                    }
                default:
                    if (_v0.b === 3) {
                        var message = _v0.a.a;
                        var _v9 = _v0.b;
                        var _v10 = $author$project$GenerateurJson$update_fn(message, model.b3);
                        var nouveauModele = _v10.a;
                        var commande = _v10.b;
                        return _Utils_Tuple2(_Utils_update(model, { b3: nouveauModele }), _Platform_map_fn($author$project$Prof$GenerateurJsonMsg, commande));
                    }
                    else {
                        break _v0$6;
                    }
            }
        }
        return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
    }, $author$project$Prof$update = F2($author$project$Prof$update_fn);
    var $mdgriffith$elm_ui$Internal$Model$Colored_fn = function (a, b, c) {
        return { $: 4, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Internal$Model$Colored = F3($mdgriffith$elm_ui$Internal$Model$Colored_fn);
    var $mdgriffith$elm_ui$Internal$Model$StyleClass_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$StyleClass = F2($mdgriffith$elm_ui$Internal$Model$StyleClass_fn);
    var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
        return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
    };
    var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
    var $elm$core$Basics$round = _Basics_round;
    var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
        return $elm$core$String$fromInt($elm$core$Basics$round(x * 255));
    };
    var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
        var red = _v0.a;
        var green = _v0.b;
        var blue = _v0.c;
        var alpha = _v0.d;
        return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
    };
    var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$bgColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("bg-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr), "background-color", clr));
    };
    var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
    var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
    var $mdgriffith$elm_ui$Internal$Style$classes = { gf: "a", cs: "atv", gj: "ab", gk: "cx", gl: "cy", gm: "acb", gn: "accx", go: "accy", gp: "acr", eJ: "al", eK: "ar", gq: "at", cu: "ah", cv: "av", gv: "s", gz: "bh", gA: "b", gD: "w7", gF: "bd", gG: "bdt", bD: "bn", gH: "bs", bF: "cpe", gO: "cp", gP: "cpx", gQ: "cpy", eT: "c", bK: "ctr", bN: "cb", bO: "ccx", Q: "ccy", a0: "cl", bP: "cr", gU: "ct", gX: "cptr", gY: "ctxt", he: "fcs", e$: "focus-within", hg: "fs", hk: "g", dj: "hbh", dl: "hc", e5: "he", dm: "hf", e6: "hfp", ho: "hv", hq: "ic", ht: "fr", bW: "lbl", hw: "iml", hx: "imlf", hy: "imlp", hz: "implw", hA: "it", hD: "i", fj: "lnk", aJ: "nb", fv: "notxt", hO: "ol", hQ: "or", al: "oq", hV: "oh", V: "pg", fD: "p", hW: "ppe", h4: "ui", h6: "r", h9: "sb", ia: "sbx", ib: "sby", ic: "sbt", ig: "e", ih: "cap", ij: "sev", ip: "sk", ew: "t", is: "tc", it: "w8", iu: "w2", iv: "w9", iw: "tj", cg: "tja", ix: "tl", iy: "w3", iz: "w5", iA: "w4", iB: "tr", iC: "w6", iD: "w1", iE: "tun", f4: "ts", ar: "clr", iM: "u", eC: "wc", ga: "we", eD: "wf", gb: "wfp", eF: "wrp" };
    var $mdgriffith$elm_ui$Internal$Model$Generic = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
    var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.eT);
    var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.hk);
    var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.V);
    var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.fD);
    var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.h6);
    var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.ig);
    var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
        switch (context) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Model$rowClass;
            case 1:
                return $mdgriffith$elm_ui$Internal$Model$columnClass;
            case 2:
                return $mdgriffith$elm_ui$Internal$Model$singleClass;
            case 3:
                return $mdgriffith$elm_ui$Internal$Model$gridClass;
            case 4:
                return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
            default:
                return $mdgriffith$elm_ui$Internal$Model$pageClass;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$addChildren_fn = function (existing, nearbyChildren) {
        switch (nearbyChildren.$) {
            case 0:
                return existing;
            case 1:
                var behind = nearbyChildren.a;
                return _Utils_ap(behind, existing);
            case 2:
                var inFront = nearbyChildren.a;
                return _Utils_ap(existing, inFront);
            default:
                var behind = nearbyChildren.a;
                var inFront = nearbyChildren.b;
                return _Utils_ap(behind, _Utils_ap(existing, inFront));
        }
    }, $mdgriffith$elm_ui$Internal$Model$addChildren = F2($mdgriffith$elm_ui$Internal$Model$addChildren_fn);
    var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn = function (key, existing, nearbyChildren) {
        switch (nearbyChildren.$) {
            case 0:
                return existing;
            case 1:
                var behind = nearbyChildren.a;
                return _Utils_ap($elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, behind), existing);
            case 2:
                var inFront = nearbyChildren.a;
                return _Utils_ap(existing, $elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, inFront));
            default:
                var behind = nearbyChildren.a;
                var inFront = nearbyChildren.b;
                return _Utils_ap($elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, behind), _Utils_ap(existing, $elm$core$List$map_fn(function (x) {
                    return _Utils_Tuple2(key, x);
                }, inFront)));
        }
    }, $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn);
    var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
    var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
    var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
    var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
    var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
    var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
    var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
    var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
    var $elm$html$Html$Attributes$stringProperty_fn = function (key, string) {
        return _VirtualDom_property_fn(key, $elm$json$Json$Encode$string(string));
    }, $elm$html$Html$Attributes$stringProperty = F2($elm$html$Html$Attributes$stringProperty_fn);
    var $elm$html$Html$Attributes$class_a0 = "className", $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$class_a0);
    var $elm$html$Html$div = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "div"), $elm$html$Html$div_fn = $elm$html$Html$div.a2;
    var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
        switch (x.$) {
            case 0:
                var px = x.a;
                return $elm$core$String$fromInt(px) + "px";
            case 1:
                return "auto";
            case 2:
                var i = x.a;
                return $elm$core$String$fromInt(i) + "fr";
            case 3:
                var min = x.a;
                var len = x.b;
                return "min" + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
            default:
                var max = x.a;
                var len = x.b;
                return "max" + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
        switch (transform.$) {
            case 0:
                return $elm$core$Maybe$Nothing;
            case 1:
                var _v1 = transform.a;
                var x = _v1.a;
                var y = _v1.b;
                var z = _v1.c;
                return $elm$core$Maybe$Just("mv-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
            default:
                var _v2 = transform.a;
                var tx = _v2.a;
                var ty = _v2.b;
                var tz = _v2.c;
                var _v3 = transform.b;
                var sx = _v3.a;
                var sy = _v3.b;
                var sz = _v3.c;
                var _v4 = transform.c;
                var ox = _v4.a;
                var oy = _v4.b;
                var oz = _v4.c;
                var angle = transform.d;
                return $elm$core$Maybe$Just("tfrm-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
        switch (style.$) {
            case 13:
                var name = style.a;
                return name;
            case 12:
                var name = style.a;
                var o = style.b;
                return name;
            case 0:
                var _class = style.a;
                return _class;
            case 1:
                var name = style.a;
                return name;
            case 2:
                var i = style.a;
                return "font-size-" + $elm$core$String$fromInt(i);
            case 3:
                var _class = style.a;
                return _class;
            case 4:
                var _class = style.a;
                return _class;
            case 5:
                var cls = style.a;
                var x = style.b;
                var y = style.c;
                return cls;
            case 7:
                var cls = style.a;
                var top = style.b;
                var right = style.c;
                var bottom = style.d;
                var left = style.e;
                return cls;
            case 6:
                var cls = style.a;
                var top = style.b;
                var right = style.c;
                var bottom = style.d;
                var left = style.e;
                return cls;
            case 8:
                var template = style.a;
                return "grid-rows-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.h7)) + ("-cols-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.gS)) + ("-space-x-" + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ik.a) + ("-space-y-" + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ik.b)))))));
            case 9:
                var pos = style.a;
                return "gp grid-pos-" + ($elm$core$String$fromInt(pos.h6) + ("-" + ($elm$core$String$fromInt(pos.gR) + ("-" + ($elm$core$String$fromInt(pos.f9) + ("-" + $elm$core$String$fromInt(pos.e4)))))));
            case 11:
                var selector = style.a;
                var subStyle = style.b;
                var name = function () {
                    switch (selector) {
                        case 0:
                            return "fs";
                        case 1:
                            return "hv";
                        default:
                            return "act";
                    }
                }();
                return $elm$core$String$join_fn(" ", $elm$core$List$map_fn(function (sty) {
                    var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
                    if (_v1 === "") {
                        return "";
                    }
                    else {
                        var styleName = _v1;
                        return styleName + ("-" + name);
                    }
                }, subStyle));
            default:
                var x = style.a;
                return $elm$core$Maybe$withDefault_fn("", $mdgriffith$elm_ui$Internal$Model$transformClass(x));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$reduceStyles_fn = function (style, nevermind) {
        var cache = nevermind.a;
        var existing = nevermind.b;
        var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
        return $elm$core$Set$member_fn(styleName, cache) ? nevermind : _Utils_Tuple2($elm$core$Set$insert_fn(styleName, cache), _List_Cons(style, existing));
    }, $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2($mdgriffith$elm_ui$Internal$Model$reduceStyles_fn);
    var $mdgriffith$elm_ui$Internal$Model$Property_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Property = F2($mdgriffith$elm_ui$Internal$Model$Property_fn);
    var $mdgriffith$elm_ui$Internal$Model$Style_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Style = F2($mdgriffith$elm_ui$Internal$Model$Style_fn);
    var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
        return "." + c;
    };
    var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
        var red = _v0.a;
        var green = _v0.b;
        var blue = _v0.c;
        var alpha = _v0.d;
        return "rgba(" + ($elm$core$String$fromInt($elm$core$Basics$round(red * 255)) + (("," + $elm$core$String$fromInt($elm$core$Basics$round(green * 255))) + (("," + $elm$core$String$fromInt($elm$core$Basics$round(blue * 255))) + ("," + ($elm$core$String$fromFloat(alpha) + ")")))));
    };
    var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
        return $elm$core$String$join_fn(" ", $elm$core$List$filterMap_fn($elm$core$Basics$identity, _List_fromArray([
            shadow.fd ? $elm$core$Maybe$Just("inset") : $elm$core$Maybe$Nothing,
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.b6.a) + "px"),
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.b6.b) + "px"),
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.bB) + "px"),
            $elm$core$Maybe$Just($elm$core$String$fromFloat(shadow.cc) + "px"),
            $elm$core$Maybe$Just($mdgriffith$elm_ui$Internal$Model$formatColor(shadow.bI))
        ])));
    };
    var $elm$core$Tuple$mapFirst_fn = function (func, _v0) {
        var x = _v0.a;
        var y = _v0.b;
        return _Utils_Tuple2(func(x), y);
    }, $elm$core$Tuple$mapFirst = F2($elm$core$Tuple$mapFirst_fn);
    var $elm$core$Tuple$mapSecond_fn = function (func, _v0) {
        var x = _v0.a;
        var y = _v0.b;
        return _Utils_Tuple2(x, func(y));
    }, $elm$core$Tuple$mapSecond = F2($elm$core$Tuple$mapSecond_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$Style_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e$) + ":focus-within", $elm$core$List$filterMap_fn($elm$core$Basics$identity, _List_fromArray([
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("border-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.gE),
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("background-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.gx),
                $elm$core$Maybe$map_fn(function (shadow) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("box-shadow", $mdgriffith$elm_ui$Internal$Model$formatBoxShadow({
                        bB: shadow.bB,
                        bI: shadow.bI,
                        fd: false,
                        b6: $elm$core$Tuple$mapSecond_fn($elm$core$Basics$toFloat, $elm$core$Tuple$mapFirst_fn($elm$core$Basics$toFloat, shadow.b6)),
                        cc: shadow.cc
                    }));
                }, focus.ie),
                $elm$core$Maybe$Just($mdgriffith$elm_ui$Internal$Model$Property_fn("outline", "none"))
            ]))),
            $mdgriffith$elm_ui$Internal$Model$Style_fn(($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + ":focus .focusable, ") + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + ".focusable:focus, ") + (".ui-slide-bar:focus + " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + " .focusable-thumb"))), $elm$core$List$filterMap_fn($elm$core$Basics$identity, _List_fromArray([
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("border-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.gE),
                $elm$core$Maybe$map_fn(function (color) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("background-color", $mdgriffith$elm_ui$Internal$Model$formatColor(color));
                }, focus.gx),
                $elm$core$Maybe$map_fn(function (shadow) {
                    return $mdgriffith$elm_ui$Internal$Model$Property_fn("box-shadow", $mdgriffith$elm_ui$Internal$Model$formatBoxShadow({
                        bB: shadow.bB,
                        bI: shadow.bI,
                        fd: false,
                        b6: $elm$core$Tuple$mapSecond_fn($elm$core$Basics$toFloat, $elm$core$Tuple$mapFirst_fn($elm$core$Basics$toFloat, shadow.b6)),
                        cc: shadow.cc
                    }));
                }, focus.ie),
                $elm$core$Maybe$Just($mdgriffith$elm_ui$Internal$Model$Property_fn("outline", "none"))
            ])))
        ]);
    };
    var $elm$virtual_dom$VirtualDom$node = function (tag) {
        return _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, _VirtualDom_noScript(tag));
    };
    var $elm$virtual_dom$VirtualDom$property_fn = function (key, value) {
        return _VirtualDom_property_fn(_VirtualDom_noInnerHtmlOrFormAction(key), _VirtualDom_noJavaScriptOrHtmlUri(value));
    }, $elm$virtual_dom$VirtualDom$property = F2($elm$virtual_dom$VirtualDom$property_fn);
    var $mdgriffith$elm_ui$Internal$Style$AllChildren_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$AllChildren = F2($mdgriffith$elm_ui$Internal$Style$AllChildren_fn);
    var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
        return { $: 6, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Style$Child_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Child = F2($mdgriffith$elm_ui$Internal$Style$Child_fn);
    var $mdgriffith$elm_ui$Internal$Style$Class_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Class = F2($mdgriffith$elm_ui$Internal$Style$Class_fn);
    var $mdgriffith$elm_ui$Internal$Style$Descriptor_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Descriptor = F2($mdgriffith$elm_ui$Internal$Style$Descriptor_fn);
    var $mdgriffith$elm_ui$Internal$Style$Left = 3;
    var $mdgriffith$elm_ui$Internal$Style$Prop_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Prop = F2($mdgriffith$elm_ui$Internal$Style$Prop_fn);
    var $mdgriffith$elm_ui$Internal$Style$Right = 2;
    var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
    var $mdgriffith$elm_ui$Internal$Style$Supports_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Style$Supports = F2($mdgriffith$elm_ui$Internal$Style$Supports_fn);
    var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
    var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
    var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
    var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
    var $mdgriffith$elm_ui$Internal$Style$Top = 0;
    var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray([0, 1, 2, 3, 4, 5]);
    var $elm$core$List$concatMap_fn = function (f, list) {
        return $elm$core$List$concat($elm$core$List$map_fn(f, list));
    }, $elm$core$List$concatMap = F2($elm$core$List$concatMap_fn);
    var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
        switch (desc) {
            case 0:
                var _v1 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gU);
            case 1:
                var _v2 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bN);
            case 2:
                var _v3 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bP);
            case 3:
                var _v4 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a0);
            case 4:
                var _v5 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bO);
            default:
                var _v6 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.Q);
        }
    };
    var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
        switch (desc) {
            case 0:
                var _v1 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gq);
            case 1:
                var _v2 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gj);
            case 2:
                var _v3 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eK);
            case 3:
                var _v4 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eJ);
            case 4:
                var _v5 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gk);
            default:
                var _v6 = desc;
                return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gl);
        }
    };
    var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
        var createDescription = function (alignment) {
            var _v0 = values(alignment);
            var content = _v0.a;
            var indiv = _v0.b;
            return _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$contentName(alignment), content),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$selfName(alignment), indiv)
                ]))
            ]);
        };
        return $mdgriffith$elm_ui$Internal$Style$Batch($elm$core$List$concatMap_fn(createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
    };
    var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray([
        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "column"),
        $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre"),
        $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dj), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gz), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "-1")
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ic), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ew), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eD), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "auto !important")
                ]))
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dl), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "100000")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eD), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gb), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eC), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
        ])),
        $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
            switch (alignment) {
                case 0:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "0 !important")
                    ]));
                case 1:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "0 !important")
                    ]));
                case 2:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-end")
                    ]));
                case 3:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                    ]));
                case 4:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "center")
                    ]));
                default:
                    return _Utils_Tuple2(_List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto")
                        ]))
                    ]), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important")
                    ]));
            }
        })
    ]);
    var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
        var createDescription = function (alignment) {
            return _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$selfName(alignment), values(alignment))
                ]))
            ]);
        };
        return $mdgriffith$elm_ui$Internal$Style$Batch($elm$core$List$concatMap_fn(createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
    };
    var $mdgriffith$elm_ui$Internal$Style$Above = 0;
    var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
    var $mdgriffith$elm_ui$Internal$Style$Below = 1;
    var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
    var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
    var $mdgriffith$elm_ui$Internal$Style$Within = 4;
    var $mdgriffith$elm_ui$Internal$Style$locations = function () {
        var loc = 0;
        var _v0 = function () {
            switch (loc) {
                case 0:
                    return 0;
                case 1:
                    return 0;
                case 2:
                    return 0;
                case 3:
                    return 0;
                case 4:
                    return 0;
                default:
                    return 0;
            }
        }();
        return _List_fromArray([0, 1, 2, 3, 4, 5]);
    }();
    var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray([
        $mdgriffith$elm_ui$Internal$Style$Class_fn("html,body", _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("padding", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn(_Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ig), $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq))), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "block"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Child_fn("img", _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("max-height", "100%"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("object-fit", "cover")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Child_fn("img", _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("max-width", "100%"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("object-fit", "cover")
                ]))
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + ":focus", _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("outline", "none")
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h4), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("min-height", "100%"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(_Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm)), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ht), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aJ), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "fixed"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20")
                ]))
            ]))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aJ), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "relative"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "row"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ig), $mdgriffith$elm_ui$Internal$Style$elDescription),
            $mdgriffith$elm_ui$Internal$Style$Batch(function (fn) {
                return $elm$core$List$map_fn(fn, $mdgriffith$elm_ui$Internal$Style$locations);
            }(function (loc) {
                switch (loc) {
                    case 0:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gf), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("bottom", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto")
                            ])),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eD), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                            ])),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    case 1:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gA), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("bottom", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ])),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "auto")
                            ]))
                        ]));
                    case 2:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hQ), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    case 3:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hO), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("right", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "20"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    case 4:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ht), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                    default:
                        return $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gz), _List_fromArray([
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "absolute"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
                            $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none"),
                            $mdgriffith$elm_ui$Internal$Style$Child_fn("*", _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto")
                            ]))
                        ]));
                }
            }))
        ])),
        $mdgriffith$elm_ui$Internal$Style$Class_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "relative"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "row"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("resize", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-feature-settings", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("box-sizing", "border-box"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("padding", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-width", "0"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "solid"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-size", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("color", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-family", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("line-height", "1"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "none"),
            $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-style", "inherit"),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eF), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-wrap", "wrap")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fv), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("-moz-user-select", "none"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("-webkit-user-select", "none"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("-ms-user-select", "none"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("user-select", "none")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gX), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("cursor", "pointer")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("cursor", "text")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hW), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none !important")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bF), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "auto !important")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ar), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.al), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.ho, $mdgriffith$elm_ui$Internal$Style$classes.ar)) + ":hover", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.ho, $mdgriffith$elm_ui$Internal$Style$classes.al)) + ":hover", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.he, $mdgriffith$elm_ui$Internal$Style$classes.ar)) + ":focus", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.he, $mdgriffith$elm_ui$Internal$Style$classes.al)) + ":focus", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.ar)) + ":active", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot(_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.cs, $mdgriffith$elm_ui$Internal$Style$classes.al)) + ":active", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("opacity", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f4), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("transition", $elm$core$String$join_fn(", ", $elm$core$List$map_fn(function (x) {
                    return x + " 160ms";
                }, _List_fromArray(["transform", "opacity", "filter", "background-color", "color", "font-size"]))))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h9), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ia), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-x", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h6), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ib), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-y", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eT), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ig), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-shrink", "1")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow", "hidden")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gP), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-x", "hidden")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-y", "hidden")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eC), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "auto")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-width", "0")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gF), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "dashed")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gG), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "dotted")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gH), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-style", "solid")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ew), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-block")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hA), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("line-height", "1.05"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("background", "transparent"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "inherit")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ig), $mdgriffith$elm_ui$Internal$Style$elDescription),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h6), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "row"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "0%"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ga), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fj), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e6), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eD), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "100000")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bK), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.gp, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.gn, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gk), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-left", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.gn, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gk), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-right", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:only-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.gn, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gl), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.gn + " ~ u"), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.gp + (" ~ s." + $mdgriffith$elm_ui$Internal$Style$classes.gn)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                            ]));
                        case 1:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-end")
                            ]));
                        case 2:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                            ]), _List_Nil);
                        case 3:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                            ]), _List_Nil);
                        case 4:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "center")
                            ]), _List_Nil);
                        default:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "center")
                            ]));
                    }
                }),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ij), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "space-between")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bW), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "baseline")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eT), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-direction", "column"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "0px"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("min-height", "min-content"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e5), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dm), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "100000")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eD), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gb), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eC), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.gm, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:first-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.go, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gl), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "0 !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.go, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gl), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "0 !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:only-of-type." + $mdgriffith$elm_ui$Internal$Style$classes.go, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "1"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gl), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto !important"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto !important")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("s:last-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.go + " ~ u"), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn("u:first-of-type." + ($mdgriffith$elm_ui$Internal$Style$classes.gm + (" ~ s." + $mdgriffith$elm_ui$Internal$Style$classes.go)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-bottom", "auto")
                            ]));
                        case 1:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin-top", "auto")
                            ]));
                        case 2:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-end")
                            ]));
                        case 3:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "flex-start")
                            ]));
                        case 4:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                            ]), _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "center")
                            ]));
                        default:
                            return _Utils_Tuple2(_List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "center")
                            ]), _List_Nil);
                    }
                }),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bK), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-grow", "0"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-self", "stretch !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ij), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "space-between")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hk), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "-ms-grid"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn(".gp", _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Supports_fn(_Utils_Tuple2("display", "grid"), _List_fromArray([
                    _Utils_Tuple2("display", "grid")
                ])),
                $mdgriffith$elm_ui$Internal$Style$gridAlignments(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-start")
                            ]);
                        case 1:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "flex-end")
                            ]);
                        case 2:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-end")
                            ]);
                        case 3:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "flex-start")
                            ]);
                        case 4:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("align-items", "center")
                            ]);
                        default:
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("justify-content", "center")
                            ]);
                    }
                })
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.V), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "block"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv + ":first-child"), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (":first-child + ." + $mdgriffith$elm_ui$Internal$Style$classes.gv))), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (":first-child + ." + $mdgriffith$elm_ui$Internal$Style$classes.gv))), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("margin", "0 !important")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 1:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 2:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "right"),
                                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::after", _List_fromArray([
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "\"\""),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "table"),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("clear", "both")
                                ]))
                            ]));
                        case 3:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "left"),
                                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::after", _List_fromArray([
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "\"\""),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "table"),
                                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("clear", "both")
                                ]))
                            ]));
                        case 4:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        default:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                    }
                })
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hw), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre-wrap !important"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("background-color", "transparent")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hz), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ig), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("flex-basis", "auto")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hy), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre-wrap !important"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("cursor", "text"),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hx), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "pre-wrap !important"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("color", "transparent")
                ]))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "block"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("overflow-wrap", "break-word"),
                $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dj), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "0"),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gz), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("z-index", "-1")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$AllChildren_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ew), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal")
                ])),
                $mdgriffith$elm_ui$Internal$Style$AllChildren_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fD), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::after", _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "none")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn("::before", _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("content", "none")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$AllChildren_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ig), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal"),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ga), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-block")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ht), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gz), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gf), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gA), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hQ), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hO), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "flex")
                    ])),
                    $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ew), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline"),
                        $mdgriffith$elm_ui$Internal$Style$Prop_fn("white-space", "normal")
                    ]))
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h6), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eT), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-flex")
                ])),
                $mdgriffith$elm_ui$Internal$Style$Child_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hk), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "inline-grid")
                ])),
                $mdgriffith$elm_ui$Internal$Style$describeAlignment(function (alignment) {
                    switch (alignment) {
                        case 0:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 1:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        case 2:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "right")
                            ]));
                        case 3:
                            return _Utils_Tuple2(_List_Nil, _List_fromArray([
                                $mdgriffith$elm_ui$Internal$Style$Prop_fn("float", "left")
                            ]));
                        case 4:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                        default:
                            return _Utils_Tuple2(_List_Nil, _List_Nil);
                    }
                })
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(".hidden", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("display", "none")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "100")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iu), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "200")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iy), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "300")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iA), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "400")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iz), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "500")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iC), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "600")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "700")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.it), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "800")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iv), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-weight", "900")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hD), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-style", "italic")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ip), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "line-through")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iM), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "underline"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip-ink", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip", "ink")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(_Utils_ap($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iM), $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ip)), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration", "line-through underline"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip-ink", "auto"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-decoration-skip", "ink")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iE), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-style", "normal")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iw), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "justify")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "justify-all")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.is), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "center")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iB), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "right")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ix), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("text-align", "left")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Descriptor_fn(".modal", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("position", "fixed"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("left", "0"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("top", "0"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("width", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("height", "100%"),
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("pointer-events", "none")
            ]))
        ]))
    ]);
    var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-" + _var, _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-feature-settings", "\"" + (_var + "\""))
            ])),
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-" + (_var + "-off"), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-feature-settings", "\"" + (_var + "\" 0"))
            ]))
        ]);
    };
    var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(_List_fromArray([
        $elm$core$List$map_fn(function (x) {
            return $mdgriffith$elm_ui$Internal$Style$Class_fn(".border-" + $elm$core$String$fromInt(x), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("border-width", $elm$core$String$fromInt(x) + "px")
            ]));
        }, $elm$core$List$range_fn(0, 6)),
        $elm$core$List$map_fn(function (i) {
            return $mdgriffith$elm_ui$Internal$Style$Class_fn(".font-size-" + $elm$core$String$fromInt(i), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-size", $elm$core$String$fromInt(i) + "px")
            ]));
        }, $elm$core$List$range_fn(8, 32)),
        $elm$core$List$map_fn(function (i) {
            return $mdgriffith$elm_ui$Internal$Style$Class_fn(".p-" + $elm$core$String$fromInt(i), _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("padding", $elm$core$String$fromInt(i) + "px")
            ]));
        }, $elm$core$List$range_fn(0, 24)),
        _List_fromArray([
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-smcp", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-variant", "small-caps")
            ])),
            $mdgriffith$elm_ui$Internal$Style$Class_fn(".v-smcp-off", _List_fromArray([
                $mdgriffith$elm_ui$Internal$Style$Prop_fn("font-variant", "normal")
            ]))
        ]),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("zero"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("onum"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("liga"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("dlig"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("ordn"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("tnum"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("afrc"),
        $mdgriffith$elm_ui$Internal$Style$fontVariant("frac")
    ]));
    var $mdgriffith$elm_ui$Internal$Style$explainer = "\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > ." + ($mdgriffith$elm_ui$Internal$Style$classes.gv + (" {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > ." + ($mdgriffith$elm_ui$Internal$Style$classes.gv + " {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n")));
    var $mdgriffith$elm_ui$Internal$Style$inputTextReset = "\ninput[type=\"search\"],\ninput[type=\"search\"]::-webkit-search-decoration,\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-results-button,\ninput[type=\"search\"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$sliderReset = "\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$thumbReset = "\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$trackReset = "\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n";
    var $mdgriffith$elm_ui$Internal$Style$overrides = "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {" + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h6) + (" > " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + (" { flex-basis: auto !important; } " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h6) + (" > " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bK) + (" { flex-basis: auto !important; }}" + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
    var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
    var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn = function (selector, closing) {
        return { bH: closing, o: _List_Nil, Z: _List_Nil, J: selector };
    }, $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn);
    var $mdgriffith$elm_ui$Internal$Style$renderRules_fn = function (_v0, rulesToRender) {
        var parent = _v0;
        var generateIntermediates = F2(function (rule, rendered) {
            switch (rule.$) {
                case 0:
                    var name = rule.a;
                    var val = rule.b;
                    return _Utils_update(rendered, {
                        Z: _List_Cons(_Utils_Tuple2(name, val), rendered.Z)
                    });
                case 3:
                    var _v2 = rule.a;
                    var prop = _v2.a;
                    var value = _v2.b;
                    var props = rule.b;
                    return _Utils_update(rendered, {
                        o: _List_Cons({ bH: "\n}", o: _List_Nil, Z: props, J: "@supports (" + (prop + (":" + (value + (") {" + parent.J)))) }, rendered.o)
                    });
                case 5:
                    var selector = rule.a;
                    var adjRules = rule.b;
                    return _Utils_update(rendered, {
                        o: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.J + (" + " + selector), ""), adjRules), rendered.o)
                    });
                case 1:
                    var child = rule.a;
                    var childRules = rule.b;
                    return _Utils_update(rendered, {
                        o: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.J + (" > " + child), ""), childRules), rendered.o)
                    });
                case 2:
                    var child = rule.a;
                    var childRules = rule.b;
                    return _Utils_update(rendered, {
                        o: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.J + (" " + child), ""), childRules), rendered.o)
                    });
                case 4:
                    var descriptor = rule.a;
                    var descriptorRules = rule.b;
                    return _Utils_update(rendered, {
                        o: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(_Utils_ap(parent.J, descriptor), ""), descriptorRules), rendered.o)
                    });
                default:
                    var batched = rule.a;
                    return _Utils_update(rendered, {
                        o: _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(parent.J, ""), batched), rendered.o)
                    });
            }
        });
        return $elm$core$List$foldr_fn(generateIntermediates, parent, rulesToRender);
    }, $mdgriffith$elm_ui$Internal$Style$renderRules = F2($mdgriffith$elm_ui$Internal$Style$renderRules_fn);
    var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
        var renderValues = function (values) {
            return $elm$core$String$concat($elm$core$List$map_fn(function (_v3) {
                var x = _v3.a;
                var y = _v3.b;
                return x + (":" + (y + ";"));
            }, values));
        };
        var renderClass = function (rule) {
            var _v2 = rule.Z;
            if (!_v2.b) {
                return "";
            }
            else {
                return rule.J + ("{" + (renderValues(rule.Z) + (rule.bH + "}")));
            }
        };
        var renderIntermediate = function (_v0) {
            var rule = _v0;
            return _Utils_ap(renderClass(rule), $elm$core$String$concat($elm$core$List$map_fn(renderIntermediate, rule.o)));
        };
        return $elm$core$String$concat($elm$core$List$map_fn(renderIntermediate, $elm$core$List$foldr_fn(F2(function (_v1, existing) {
            var name = _v1.a;
            var styleRules = _v1.b;
            return _List_Cons($mdgriffith$elm_ui$Internal$Style$renderRules_fn($mdgriffith$elm_ui$Internal$Style$emptyIntermediate_fn(name, ""), styleRules), existing);
        }), _List_Nil, styleClasses)));
    };
    var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap($mdgriffith$elm_ui$Internal$Style$overrides, $mdgriffith$elm_ui$Internal$Style$renderCompact(_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
    var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
    var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
        var _v0 = opts.hK;
        switch (_v0) {
            case 0:
                return A3($elm$virtual_dom$VirtualDom$node, "div", _List_Nil, _List_fromArray([
                    A3($elm$virtual_dom$VirtualDom$node, "style", _List_Nil, _List_fromArray([
                        $elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
                    ]))
                ]));
            case 1:
                return $elm$virtual_dom$VirtualDom$text("");
            default:
                return A3($elm$virtual_dom$VirtualDom$node, "elm-ui-static-rules", _List_fromArray([
                    $elm$virtual_dom$VirtualDom$property_fn("rules", $elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
                ]), _List_Nil);
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
        switch (font.$) {
            case 0:
                return "serif";
            case 1:
                return "sans-serif";
            case 2:
                return "monospace";
            case 3:
                var name = font.a;
                return "\"" + (name + "\"");
            case 4:
                var name = font.a;
                var url = font.b;
                return "\"" + (name + "\"");
            default:
                var name = font.a.b4;
                return "\"" + (name + "\"");
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
        switch (_var.$) {
            case 0:
                var name = _var.a;
                return name === "smcp";
            case 1:
                var name = _var.a;
                return false;
            default:
                var name = _var.a;
                var index = _var.b;
                return (name === "smcp") && (index === 1);
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
        if (typeface.$ === 5) {
            var font = typeface.a;
            return $elm$core$List$any_fn($mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.f5);
        }
        else {
            return false;
        }
    };
    var $elm$core$Basics$min_fn = function (x, y) {
        return (_Utils_cmp(x, y) < 0) ? x : y;
    }, $elm$core$Basics$min = F2($elm$core$Basics$min_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderProps_fn = function (force, _v0, existing) {
        var key = _v0.a;
        var val = _v0.b;
        return force ? (existing + ("\n  " + (key + (": " + (val + " !important;"))))) : (existing + ("\n  " + (key + (": " + (val + ";")))));
    }, $mdgriffith$elm_ui$Internal$Model$renderProps = F3($mdgriffith$elm_ui$Internal$Model$renderProps_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderStyle_fn = function (options, maybePseudo, selector, props) {
        if (maybePseudo.$ === 1) {
            return _List_fromArray([
                selector + ("{" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props) + "\n}"))
            ]);
        }
        else {
            var pseudo = maybePseudo.a;
            switch (pseudo) {
                case 1:
                    var _v2 = options.ho;
                    switch (_v2) {
                        case 0:
                            return _List_Nil;
                        case 2:
                            return _List_fromArray([
                                selector + ("-hv {" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(true), "", props) + "\n}"))
                            ]);
                        default:
                            return _List_fromArray([
                                selector + ("-hv:hover {" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props) + "\n}"))
                            ]);
                    }
                case 0:
                    var renderedProps = $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props);
                    return _List_fromArray([
                        selector + ("-fs:focus {" + (renderedProps + "\n}")),
                        ("." + ($mdgriffith$elm_ui$Internal$Style$classes.gv + (":focus " + (selector + "-fs  {")))) + (renderedProps + "\n}"),
                        (selector + "-fs:focus-within {") + (renderedProps + "\n}"),
                        (".ui-slide-bar:focus + " + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gv) + (" .focusable-thumb" + (selector + "-fs {")))) + (renderedProps + "\n}")
                    ]);
                default:
                    return _List_fromArray([
                        selector + ("-act:active {" + ($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderProps(false), "", props) + "\n}"))
                    ]);
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$renderStyle = F4($mdgriffith$elm_ui$Internal$Model$renderStyle_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
        switch (_var.$) {
            case 0:
                var name = _var.a;
                return "\"" + (name + "\"");
            case 1:
                var name = _var.a;
                return "\"" + (name + "\" 0");
            default:
                var name = _var.a;
                var index = _var.b;
                return "\"" + (name + ("\" " + $elm$core$String$fromInt(index)));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
        if (typeface.$ === 5) {
            var font = typeface.a;
            return $elm$core$Maybe$Just($elm$core$String$join_fn(", ", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$renderVariant, font.f5)));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
        switch (transform.$) {
            case 0:
                return $elm$core$Maybe$Nothing;
            case 1:
                var _v1 = transform.a;
                var x = _v1.a;
                var y = _v1.b;
                var z = _v1.c;
                return $elm$core$Maybe$Just("translate3d(" + ($elm$core$String$fromFloat(x) + ("px, " + ($elm$core$String$fromFloat(y) + ("px, " + ($elm$core$String$fromFloat(z) + "px)"))))));
            default:
                var _v2 = transform.a;
                var tx = _v2.a;
                var ty = _v2.b;
                var tz = _v2.c;
                var _v3 = transform.b;
                var sx = _v3.a;
                var sy = _v3.b;
                var sz = _v3.c;
                var _v4 = transform.c;
                var ox = _v4.a;
                var oy = _v4.b;
                var oz = _v4.c;
                var angle = transform.d;
                var translate = "translate3d(" + ($elm$core$String$fromFloat(tx) + ("px, " + ($elm$core$String$fromFloat(ty) + ("px, " + ($elm$core$String$fromFloat(tz) + "px)")))));
                var scale = "scale3d(" + ($elm$core$String$fromFloat(sx) + (", " + ($elm$core$String$fromFloat(sy) + (", " + ($elm$core$String$fromFloat(sz) + ")")))));
                var rotate = "rotate3d(" + ($elm$core$String$fromFloat(ox) + (", " + ($elm$core$String$fromFloat(oy) + (", " + ($elm$core$String$fromFloat(oz) + (", " + ($elm$core$String$fromFloat(angle) + "rad)")))))));
                return $elm$core$Maybe$Just(translate + (" " + (scale + (" " + rotate))));
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn = function (options, rule, maybePseudo) {
        switch (rule.$) {
            case 0:
                var selector = rule.a;
                var props = rule.b;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, selector, props);
            case 13:
                var name = rule.a;
                var prop = rule.b;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + name, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("box-shadow", prop)
                ]));
            case 12:
                var name = rule.a;
                var transparency = rule.b;
                var opacity = $elm$core$Basics$max_fn(0, $elm$core$Basics$min_fn(1, 1 - transparency));
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + name, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("opacity", $elm$core$String$fromFloat(opacity))
                ]));
            case 2:
                var i = rule.a;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, ".font-size-" + $elm$core$String$fromInt(i), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-size", $elm$core$String$fromInt(i) + "px")
                ]));
            case 1:
                var name = rule.a;
                var typefaces = rule.b;
                var features = $elm$core$String$join_fn(", ", $elm$core$List$filterMap_fn($mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
                var families = _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-family", $elm$core$String$join_fn(", ", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-feature-settings", features),
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("font-variant", $elm$core$List$any_fn($mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? "small-caps" : "normal")
                ]);
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + name, families);
            case 3:
                var _class = rule.a;
                var prop = rule.b;
                var val = rule.c;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn(prop, val)
                ]));
            case 4:
                var _class = rule.a;
                var prop = rule.b;
                var color = rule.c;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn(prop, $mdgriffith$elm_ui$Internal$Model$formatColor(color))
                ]));
            case 5:
                var cls = rule.a;
                var x = rule.b;
                var y = rule.c;
                var yPx = $elm$core$String$fromInt(y) + "px";
                var xPx = $elm$core$String$fromInt(x) + "px";
                var single = "." + $mdgriffith$elm_ui$Internal$Style$classes.ig;
                var row = "." + $mdgriffith$elm_ui$Internal$Style$classes.h6;
                var wrappedRow = "." + ($mdgriffith$elm_ui$Internal$Style$classes.eF + row);
                var right = "." + $mdgriffith$elm_ui$Internal$Style$classes.eK;
                var paragraph = "." + $mdgriffith$elm_ui$Internal$Style$classes.fD;
                var page = "." + $mdgriffith$elm_ui$Internal$Style$classes.V;
                var left = "." + $mdgriffith$elm_ui$Internal$Style$classes.eJ;
                var halfY = $elm$core$String$fromFloat(y / 2) + "px";
                var halfX = $elm$core$String$fromFloat(x / 2) + "px";
                var column = "." + $mdgriffith$elm_ui$Internal$Style$classes.eT;
                var _class = "." + cls;
                var any = "." + $mdgriffith$elm_ui$Internal$Style$classes.gv;
                return $elm$core$List$concat(_List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (row + (" > " + (any + (" + " + any)))), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-left", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (wrappedRow + (" > " + any)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin", halfY + (" " + halfX))
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (column + (" > " + (any + (" + " + any)))), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-top", yPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (page + (" > " + (any + (" + " + any)))), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-top", yPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (page + (" > " + left)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-right", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (page + (" > " + right)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-left", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _Utils_ap(_class, paragraph), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("line-height", "calc(1em + " + ($elm$core$String$fromInt(y) + "px)"))
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "textarea" + (any + _class), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("line-height", "calc(1em + " + ($elm$core$String$fromInt(y) + "px)")),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("height", "calc(100% + " + ($elm$core$String$fromInt(y) + "px)"))
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + (" > " + left)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-right", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + (" > " + right)), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-left", xPx)
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + "::after"), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("content", "''"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("display", "block"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("height", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("width", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-top", $elm$core$String$fromInt((-1) * ((y / 2) | 0)) + "px")
                    ])),
                    $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class + (paragraph + "::before"), _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("content", "''"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("display", "block"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("height", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("width", "0"),
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("margin-bottom", $elm$core$String$fromInt((-1) * ((y / 2) | 0)) + "px")
                    ]))
                ]));
            case 7:
                var cls = rule.a;
                var top = rule.b;
                var right = rule.c;
                var bottom = rule.d;
                var left = rule.e;
                var _class = "." + cls;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("padding", $elm$core$String$fromFloat(top) + ("px " + ($elm$core$String$fromFloat(right) + ("px " + ($elm$core$String$fromFloat(bottom) + ("px " + ($elm$core$String$fromFloat(left) + "px")))))))
                ]));
            case 6:
                var cls = rule.a;
                var top = rule.b;
                var right = rule.c;
                var bottom = rule.d;
                var left = rule.e;
                var _class = "." + cls;
                return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, _class, _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Property_fn("border-width", $elm$core$String$fromInt(top) + ("px " + ($elm$core$String$fromInt(right) + ("px " + ($elm$core$String$fromInt(bottom) + ("px " + ($elm$core$String$fromInt(left) + "px")))))))
                ]));
            case 8:
                var template = rule.a;
                var toGridLengthHelper = F3(function (minimum, maximum, x) {
                    toGridLengthHelper: while (true) {
                        switch (x.$) {
                            case 0:
                                var px = x.a;
                                return $elm$core$String$fromInt(px) + "px";
                            case 1:
                                var _v2 = _Utils_Tuple2(minimum, maximum);
                                if (_v2.a.$ === 1) {
                                    if (_v2.b.$ === 1) {
                                        var _v3 = _v2.a;
                                        var _v4 = _v2.b;
                                        return "max-content";
                                    }
                                    else {
                                        var _v6 = _v2.a;
                                        var maxSize = _v2.b.a;
                                        return "minmax(max-content, " + ($elm$core$String$fromInt(maxSize) + "px)");
                                    }
                                }
                                else {
                                    if (_v2.b.$ === 1) {
                                        var minSize = _v2.a.a;
                                        var _v5 = _v2.b;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + "max-content)"));
                                    }
                                    else {
                                        var minSize = _v2.a.a;
                                        var maxSize = _v2.b.a;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + ($elm$core$String$fromInt(maxSize) + "px)")));
                                    }
                                }
                            case 2:
                                var i = x.a;
                                var _v7 = _Utils_Tuple2(minimum, maximum);
                                if (_v7.a.$ === 1) {
                                    if (_v7.b.$ === 1) {
                                        var _v8 = _v7.a;
                                        var _v9 = _v7.b;
                                        return $elm$core$String$fromInt(i) + "fr";
                                    }
                                    else {
                                        var _v11 = _v7.a;
                                        var maxSize = _v7.b.a;
                                        return "minmax(max-content, " + ($elm$core$String$fromInt(maxSize) + "px)");
                                    }
                                }
                                else {
                                    if (_v7.b.$ === 1) {
                                        var minSize = _v7.a.a;
                                        var _v10 = _v7.b;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + ($elm$core$String$fromInt(i) + ("fr" + "fr)"))));
                                    }
                                    else {
                                        var minSize = _v7.a.a;
                                        var maxSize = _v7.b.a;
                                        return "minmax(" + ($elm$core$String$fromInt(minSize) + ("px, " + ($elm$core$String$fromInt(maxSize) + "px)")));
                                    }
                                }
                            case 3:
                                var m = x.a;
                                var len = x.b;
                                var $temp$minimum = $elm$core$Maybe$Just(m), $temp$maximum = maximum, $temp$x = len;
                                minimum = $temp$minimum;
                                maximum = $temp$maximum;
                                x = $temp$x;
                                continue toGridLengthHelper;
                            default:
                                var m = x.a;
                                var len = x.b;
                                var $temp$minimum = minimum, $temp$maximum = $elm$core$Maybe$Just(m), $temp$x = len;
                                minimum = $temp$minimum;
                                maximum = $temp$maximum;
                                x = $temp$x;
                                continue toGridLengthHelper;
                        }
                    }
                });
                var toGridLength = function (x) {
                    return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
                };
                var xSpacing = toGridLength(template.ik.a);
                var ySpacing = toGridLength(template.ik.b);
                var rows = function (x) {
                    return "grid-template-rows: " + (x + ";");
                }($elm$core$String$join_fn(" ", $elm$core$List$map_fn(toGridLength, template.h7)));
                var msRows = function (x) {
                    return "-ms-grid-rows: " + (x + ";");
                }($elm$core$String$join_fn(ySpacing, $elm$core$List$map_fn(toGridLength, template.gS)));
                var msColumns = function (x) {
                    return "-ms-grid-columns: " + (x + ";");
                }($elm$core$String$join_fn(ySpacing, $elm$core$List$map_fn(toGridLength, template.gS)));
                var gapY = "grid-row-gap:" + (toGridLength(template.ik.b) + ";");
                var gapX = "grid-column-gap:" + (toGridLength(template.ik.a) + ";");
                var columns = function (x) {
                    return "grid-template-columns: " + (x + ";");
                }($elm$core$String$join_fn(" ", $elm$core$List$map_fn(toGridLength, template.gS)));
                var _class = ".grid-rows-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.h7)) + ("-cols-" + ($elm$core$String$join_fn("-", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$lengthClassName, template.gS)) + ("-space-x-" + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ik.a) + ("-space-y-" + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.ik.b)))))));
                var modernGrid = _class + ("{" + (columns + (rows + (gapX + (gapY + "}")))));
                var supports = "@supports (display:grid) {" + (modernGrid + "}");
                var base = _class + ("{" + (msColumns + (msRows + "}")));
                return _List_fromArray([base, supports]);
            case 9:
                var position = rule.a;
                var msPosition = $elm$core$String$join_fn(" ", _List_fromArray([
                    "-ms-grid-row: " + ($elm$core$String$fromInt(position.h6) + ";"),
                    "-ms-grid-row-span: " + ($elm$core$String$fromInt(position.e4) + ";"),
                    "-ms-grid-column: " + ($elm$core$String$fromInt(position.gR) + ";"),
                    "-ms-grid-column-span: " + ($elm$core$String$fromInt(position.f9) + ";")
                ]));
                var modernPosition = $elm$core$String$join_fn(" ", _List_fromArray([
                    "grid-row: " + ($elm$core$String$fromInt(position.h6) + (" / " + ($elm$core$String$fromInt(position.h6 + position.e4) + ";"))),
                    "grid-column: " + ($elm$core$String$fromInt(position.gR) + (" / " + ($elm$core$String$fromInt(position.gR + position.f9) + ";")))
                ]));
                var _class = ".grid-pos-" + ($elm$core$String$fromInt(position.h6) + ("-" + ($elm$core$String$fromInt(position.gR) + ("-" + ($elm$core$String$fromInt(position.f9) + ("-" + $elm$core$String$fromInt(position.e4)))))));
                var modernGrid = _class + ("{" + (modernPosition + "}"));
                var supports = "@supports (display:grid) {" + (modernGrid + "}");
                var base = _class + ("{" + (msPosition + "}"));
                return _List_fromArray([base, supports]);
            case 11:
                var _class = rule.a;
                var styles = rule.b;
                var renderPseudoRule = function (style) {
                    return $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn(options, style, $elm$core$Maybe$Just(_class));
                };
                return $elm$core$List$concatMap_fn(renderPseudoRule, styles);
            default:
                var transform = rule.a;
                var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
                var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
                var _v12 = _Utils_Tuple2(_class, val);
                if ((!_v12.a.$) && (!_v12.b.$)) {
                    var cls = _v12.a.a;
                    var v = _v12.b.a;
                    return $mdgriffith$elm_ui$Internal$Model$renderStyle_fn(options, maybePseudo, "." + cls, _List_fromArray([
                        $mdgriffith$elm_ui$Internal$Model$Property_fn("transform", v)
                    ]));
                }
                else {
                    return _List_Nil;
                }
        }
    }, $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3($mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$encodeStyles_fn = function (options, stylesheet) {
        return $elm$json$Json$Encode$object($elm$core$List$map_fn(function (style) {
            var styled = $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn(options, style, $elm$core$Maybe$Nothing);
            return _Utils_Tuple2($mdgriffith$elm_ui$Internal$Model$getStyleName(style), $elm$json$Json$Encode$list_fn($elm$json$Json$Encode$string, styled));
        }, stylesheet));
    }, $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2($mdgriffith$elm_ui$Internal$Model$encodeStyles_fn);
    var $mdgriffith$elm_ui$Internal$Model$bracket_fn = function (selector, rules) {
        var renderPair = function (_v0) {
            var name = _v0.a;
            var val = _v0.b;
            return name + (": " + (val + ";"));
        };
        return selector + (" {" + ($elm$core$String$join_fn("", $elm$core$List$map_fn(renderPair, rules)) + "}"));
    }, $mdgriffith$elm_ui$Internal$Model$bracket = F2($mdgriffith$elm_ui$Internal$Model$bracket_fn);
    var $mdgriffith$elm_ui$Internal$Model$fontRule_fn = function (name, modifier, _v0) {
        var parentAdj = _v0.a;
        var textAdjustment = _v0.b;
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + (modifier + (", " + ("." + (name + (" ." + modifier))))))), parentAdj),
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + (modifier + ("> ." + ($mdgriffith$elm_ui$Internal$Style$classes.ew + (", ." + (name + (" ." + (modifier + (" > ." + $mdgriffith$elm_ui$Internal$Style$classes.ew)))))))))), textAdjustment)
        ]);
    }, $mdgriffith$elm_ui$Internal$Model$fontRule = F3($mdgriffith$elm_ui$Internal$Model$fontRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule_fn = function (fontToAdjust, _v0, otherFontName) {
        var full = _v0.a;
        var capital = _v0.b;
        var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (" ." + fontToAdjust));
        return $elm$core$String$join_fn(" ", _Utils_ap($mdgriffith$elm_ui$Internal$Model$fontRule_fn(name, $mdgriffith$elm_ui$Internal$Style$classes.ih, capital), $mdgriffith$elm_ui$Internal$Model$fontRule_fn(name, $mdgriffith$elm_ui$Internal$Style$classes.hg, full)));
    }, $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule_fn = function (fontToAdjust, otherFontName) {
        var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (" ." + fontToAdjust));
        return $elm$core$String$join_fn(" ", _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.ih + (", " + ("." + (name + (" ." + $mdgriffith$elm_ui$Internal$Style$classes.ih))))))), _List_fromArray([
                _Utils_Tuple2("line-height", "1")
            ])),
            $mdgriffith$elm_ui$Internal$Model$bracket_fn("." + (name + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.ih + ("> ." + ($mdgriffith$elm_ui$Internal$Style$classes.ew + (", ." + (name + (" ." + ($mdgriffith$elm_ui$Internal$Style$classes.ih + (" > ." + $mdgriffith$elm_ui$Internal$Style$classes.ew)))))))))), _List_fromArray([
                _Utils_Tuple2("vertical-align", "0"),
                _Utils_Tuple2("line-height", "1")
            ]))
        ]));
    }, $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2($mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule_fn);
    var $mdgriffith$elm_ui$Internal$Model$adjust_fn = function (size, height, vertical) {
        return { e4: height / size, cc: size, f6: vertical };
    }, $mdgriffith$elm_ui$Internal$Model$adjust = F3($mdgriffith$elm_ui$Internal$Model$adjust_fn);
    var $elm$core$List$maximum = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just($elm$core$List$foldl_fn($elm$core$Basics$max, x, xs));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $elm$core$List$minimum = function (list) {
        if (list.b) {
            var x = list.a;
            var xs = list.b;
            return $elm$core$Maybe$Just($elm$core$List$foldl_fn($elm$core$Basics$min, x, xs));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
        var lines = _List_fromArray([adjustment.gL, adjustment.gy, adjustment.g4, adjustment.hH]);
        var lineHeight = 1.5;
        var normalDescender = (lineHeight - 1) / 2;
        var oldMiddle = lineHeight / 2;
        var descender = $elm$core$Maybe$withDefault_fn(adjustment.g4, $elm$core$List$minimum(lines));
        var newBaseline = $elm$core$Maybe$withDefault_fn(adjustment.gy, $elm$core$List$minimum($elm$core$List$filter_fn(function (x) {
            return !_Utils_eq(x, descender);
        }, lines)));
        var base = lineHeight;
        var ascender = $elm$core$Maybe$withDefault_fn(adjustment.gL, $elm$core$List$maximum(lines));
        var capitalSize = 1 / (ascender - newBaseline);
        var capitalVertical = 1 - ascender;
        var fullSize = 1 / (ascender - descender);
        var fullVertical = 1 - ascender;
        var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
        var newFullMiddle = ((ascender - descender) / 2) + descender;
        return {
            gL: $mdgriffith$elm_ui$Internal$Model$adjust_fn(capitalSize, ascender - newBaseline, capitalVertical),
            e0: $mdgriffith$elm_ui$Internal$Model$adjust_fn(fullSize, ascender - descender, fullVertical)
        };
    };
    var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
        return _Utils_Tuple2(_List_fromArray([
            _Utils_Tuple2("display", "block")
        ]), _List_fromArray([
            _Utils_Tuple2("display", "inline-block"),
            _Utils_Tuple2("line-height", $elm$core$String$fromFloat(converted.e4)),
            _Utils_Tuple2("vertical-align", $elm$core$String$fromFloat(converted.f6) + "em"),
            _Utils_Tuple2("font-size", $elm$core$String$fromFloat(converted.cc) + "em")
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
        return $elm$core$List$foldl_fn_unwrapped(function (face, found) {
            if (found.$ === 1) {
                if (face.$ === 5) {
                    var _with = face.a;
                    var _v2 = _with.gh;
                    if (_v2.$ === 1) {
                        return found;
                    }
                    else {
                        var adjustment = _v2.a;
                        return $elm$core$Maybe$Just(_Utils_Tuple2($mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(function ($) {
                            return $.e0;
                        }($mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))), $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(function ($) {
                            return $.gL;
                        }($mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
                    }
                }
                else {
                    return found;
                }
            }
            else {
                return found;
            }
        }, $elm$core$Maybe$Nothing, typefaces);
    };
    var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
        var withImport = function (font) {
            if (font.$ === 4) {
                var url = font.b;
                return $elm$core$Maybe$Just("@import url('" + (url + "');"));
            }
            else {
                return $elm$core$Maybe$Nothing;
            }
        };
        var fontImports = function (_v2) {
            var name = _v2.a;
            var typefaces = _v2.b;
            var imports = $elm$core$String$join_fn("\n", $elm$core$List$filterMap_fn(withImport, typefaces));
            return imports;
        };
        var allNames = $elm$core$List$map_fn($elm$core$Tuple$first, rules);
        var fontAdjustments = function (_v1) {
            var name = _v1.a;
            var typefaces = _v1.b;
            var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
            if (_v0.$ === 1) {
                return $elm$core$String$join_fn("", $elm$core$List$map_fn($mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name), allNames));
            }
            else {
                var adjustment = _v0.a;
                return $elm$core$String$join_fn("", $elm$core$List$map_fn(A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment), allNames));
            }
        };
        return _Utils_ap($elm$core$String$join_fn("\n", $elm$core$List$map_fn(fontImports, rules)), $elm$core$String$join_fn("\n", $elm$core$List$map_fn(fontAdjustments, rules)));
    };
    var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
        if (rule.$ === 1) {
            var name = rule.a;
            var typefaces = rule.b;
            return $elm$core$Maybe$Just(_Utils_Tuple2(name, typefaces));
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn = function (options, stylesheet) {
        var combine = F2(function (style, rendered) {
            return {
                ca: _Utils_ap(rendered.ca, $mdgriffith$elm_ui$Internal$Model$renderStyleRule_fn(options, style, $elm$core$Maybe$Nothing)),
                bs: function () {
                    var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
                    if (_v1.$ === 1) {
                        return rendered.bs;
                    }
                    else {
                        var topLevel = _v1.a;
                        return _List_Cons(topLevel, rendered.bs);
                    }
                }()
            };
        });
        var _v0 = $elm$core$List$foldl_fn(combine, { ca: _List_Nil, bs: _List_Nil }, stylesheet);
        var topLevel = _v0.bs;
        var rules = _v0.ca;
        return _Utils_ap($mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel), $elm$core$String$concat(rules));
    }, $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn);
    var $mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn = function (options, styleSheet) {
        var _v0 = options.hK;
        switch (_v0) {
            case 0:
                return A3($elm$virtual_dom$VirtualDom$node, "div", _List_Nil, _List_fromArray([
                    A3($elm$virtual_dom$VirtualDom$node, "style", _List_Nil, _List_fromArray([
                        $elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn(options, styleSheet))
                    ]))
                ]));
            case 1:
                return A3($elm$virtual_dom$VirtualDom$node, "div", _List_Nil, _List_fromArray([
                    A3($elm$virtual_dom$VirtualDom$node, "style", _List_Nil, _List_fromArray([
                        $elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Model$toStyleSheetString_fn(options, styleSheet))
                    ]))
                ]));
            default:
                return A3($elm$virtual_dom$VirtualDom$node, "elm-ui-rules", _List_fromArray([
                    $elm$virtual_dom$VirtualDom$property_fn("rules", $mdgriffith$elm_ui$Internal$Model$encodeStyles_fn(options, styleSheet))
                ]), _List_Nil);
        }
    }, $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2($mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn);
    var $mdgriffith$elm_ui$Internal$Model$embedKeyed_fn = function (_static, opts, styles, children) {
        var dynamicStyleSheet = $mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn(opts, $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$reduceStyles, _Utils_Tuple2($elm$core$Set$empty, $mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.he)), styles).b);
        return _static ? _List_Cons(_Utils_Tuple2("static-stylesheet", $mdgriffith$elm_ui$Internal$Model$staticRoot(opts)), _List_Cons(_Utils_Tuple2("dynamic-stylesheet", dynamicStyleSheet), children)) : _List_Cons(_Utils_Tuple2("dynamic-stylesheet", dynamicStyleSheet), children);
    }, $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4($mdgriffith$elm_ui$Internal$Model$embedKeyed_fn);
    var $mdgriffith$elm_ui$Internal$Model$embedWith_fn = function (_static, opts, styles, children) {
        var dynamicStyleSheet = $mdgriffith$elm_ui$Internal$Model$toStyleSheet_fn(opts, $elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$reduceStyles, _Utils_Tuple2($elm$core$Set$empty, $mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.he)), styles).b);
        return _static ? _List_Cons($mdgriffith$elm_ui$Internal$Model$staticRoot(opts), _List_Cons(dynamicStyleSheet, children)) : _List_Cons(dynamicStyleSheet, children);
    }, $mdgriffith$elm_ui$Internal$Model$embedWith = F4($mdgriffith$elm_ui$Internal$Model$embedWith_fn);
    var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
    var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
    var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
        return _VirtualDom_keyedNodeNS_fn(_VirtualDom_keyedNode_a0, _VirtualDom_noScript(tag));
    };
    var $elm$html$Html$p = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "p"), $elm$html$Html$p_fn = $elm$html$Html$p.a2;
    var $mdgriffith$elm_ui$Internal$Flag$present_fn = function (myFlag, _v0) {
        var fieldOne = _v0.a;
        var fieldTwo = _v0.b;
        if (!myFlag.$) {
            var first = myFlag.a;
            return _Utils_eq(first & fieldOne, first);
        }
        else {
            var second = myFlag.a;
            return _Utils_eq(second & fieldTwo, second);
        }
    }, $mdgriffith$elm_ui$Internal$Flag$present = F2($mdgriffith$elm_ui$Internal$Flag$present_fn);
    var $elm$html$Html$s = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "s"), $elm$html$Html$s_fn = $elm$html$Html$s.a2;
    var $elm$html$Html$u = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "u"), $elm$html$Html$u_fn = $elm$html$Html$u.a2;
    var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
    var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
    var $mdgriffith$elm_ui$Internal$Model$finalizeNode_fn = function (has, node, attributes, children, embedMode, parentContext) {
        var createNode = F2(function (nodeName, attrs) {
            if (children.$ === 1) {
                var keyed = children.a;
                return A3($elm$virtual_dom$VirtualDom$keyedNode, nodeName, attrs, function () {
                    switch (embedMode.$) {
                        case 0:
                            return keyed;
                        case 2:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedKeyed_fn(false, opts, styles, keyed);
                        default:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedKeyed_fn(true, opts, styles, keyed);
                    }
                }());
            }
            else {
                var unkeyed = children.a;
                return A2(function () {
                    switch (nodeName) {
                        case "div":
                            return $elm$html$Html$div;
                        case "p":
                            return $elm$html$Html$p;
                        default:
                            return $elm$virtual_dom$VirtualDom$node(nodeName);
                    }
                }(), attrs, function () {
                    switch (embedMode.$) {
                        case 0:
                            return unkeyed;
                        case 2:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedWith_fn(false, opts, styles, unkeyed);
                        default:
                            var opts = embedMode.a;
                            var styles = embedMode.b;
                            return $mdgriffith$elm_ui$Internal$Model$embedWith_fn(true, opts, styles, unkeyed);
                    }
                }());
            }
        });
        var html = function () {
            switch (node.$) {
                case 0:
                    return A2(createNode, "div", attributes);
                case 1:
                    var nodeName = node.a;
                    return A2(createNode, nodeName, attributes);
                default:
                    var nodeName = node.a;
                    var internal = node.b;
                    return A3($elm$virtual_dom$VirtualDom$node, nodeName, attributes, _List_fromArray([
                        A2(createNode, internal, _List_fromArray([
                            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.ig))
                        ]))
                    ]));
            }
        }();
        switch (parentContext) {
            case 0:
                return ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!$mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? $elm$html$Html$u_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.gv, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.bK, $mdgriffith$elm_ui$Internal$Style$classes.Q, $mdgriffith$elm_ui$Internal$Style$classes.gp])))
                ]), _List_fromArray([html])) : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$centerX, has) ? $elm$html$Html$s_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.gv, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.bK, $mdgriffith$elm_ui$Internal$Style$classes.Q, $mdgriffith$elm_ui$Internal$Style$classes.gn])))
                ]), _List_fromArray([html])) : html));
            case 1:
                return ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!$mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$centerY, has) ? $elm$html$Html$s_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.gv, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.bK, $mdgriffith$elm_ui$Internal$Style$classes.go])))
                ]), _List_fromArray([html])) : ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? $elm$html$Html$u_fn(_List_fromArray([
                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.gv, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.bK, $mdgriffith$elm_ui$Internal$Style$classes.gm])))
                ]), _List_fromArray([html])) : html));
            default:
                return html;
        }
    }, $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6($mdgriffith$elm_ui$Internal$Model$finalizeNode_fn);
    var $elm$core$List$isEmpty = function (xs) {
        if (!xs.b) {
            return true;
        }
        else {
            return false;
        }
    };
    var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
    var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.ew + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.eC + (" " + $mdgriffith$elm_ui$Internal$Style$classes.dl)))));
    var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
        return $elm$html$Html$div_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Model$textElementClasses)
        ]), _List_fromArray([
            $elm$html$Html$text(str)
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.gv + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.ew + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.eD + (" " + $mdgriffith$elm_ui$Internal$Style$classes.dm)))));
    var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
        return $elm$html$Html$div_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
        ]), _List_fromArray([
            $elm$html$Html$text(str)
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Model$createElement_fn = function (context, children, rendered) {
        var gatherKeyed = F2(function (_v8, _v9) {
            var key = _v8.a;
            var child = _v8.b;
            var htmls = _v9.a;
            var existingStyles = _v9.b;
            switch (child.$) {
                case 0:
                    var html = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, html(context)), htmls), existingStyles) : _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, html(context)), htmls), existingStyles);
                case 1:
                    var styled = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, A2(styled.hp, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.iq : _Utils_ap(styled.iq, existingStyles)) : _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, A2(styled.hp, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.iq : _Utils_ap(styled.iq, existingStyles));
                case 2:
                    var str = child.a;
                    return _Utils_Tuple2(_List_Cons(_Utils_Tuple2(key, _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)), htmls), existingStyles);
                default:
                    return _Utils_Tuple2(htmls, existingStyles);
            }
        });
        var gather = F2(function (child, _v6) {
            var htmls = _v6.a;
            var existingStyles = _v6.b;
            switch (child.$) {
                case 0:
                    var html = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(html(context), htmls), existingStyles) : _Utils_Tuple2(_List_Cons(html(context), htmls), existingStyles);
                case 1:
                    var styled = child.a;
                    return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(_List_Cons(A2(styled.hp, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.iq : _Utils_ap(styled.iq, existingStyles)) : _Utils_Tuple2(_List_Cons(A2(styled.hp, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context), htmls), $elm$core$List$isEmpty(existingStyles) ? styled.iq : _Utils_ap(styled.iq, existingStyles));
                case 2:
                    var str = child.a;
                    return _Utils_Tuple2(_List_Cons(_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str), htmls), existingStyles);
                default:
                    return _Utils_Tuple2(htmls, existingStyles);
            }
        });
        if (children.$ === 1) {
            var keyedChildren = children.a;
            var _v1 = $elm$core$List$foldr_fn(gatherKeyed, _Utils_Tuple2(_List_Nil, _List_Nil), keyedChildren);
            var keyed = _v1.a;
            var styles = _v1.b;
            var newStyles = $elm$core$List$isEmpty(styles) ? rendered.iq : _Utils_ap(rendered.iq, styles);
            if (!newStyles.b) {
                return $mdgriffith$elm_ui$Internal$Model$Unstyled(A5($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.ag, rendered.ak, rendered.cw, $mdgriffith$elm_ui$Internal$Model$Keyed($mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn("nearby-element-pls", keyed, rendered.bG)), $mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
            }
            else {
                var allStyles = newStyles;
                return $mdgriffith$elm_ui$Internal$Model$Styled({
                    hp: A4($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.ag, rendered.ak, rendered.cw, $mdgriffith$elm_ui$Internal$Model$Keyed($mdgriffith$elm_ui$Internal$Model$addKeyedChildren_fn("nearby-element-pls", keyed, rendered.bG))),
                    iq: allStyles
                });
            }
        }
        else {
            var unkeyedChildren = children.a;
            var _v3 = $elm$core$List$foldr_fn(gather, _Utils_Tuple2(_List_Nil, _List_Nil), unkeyedChildren);
            var unkeyed = _v3.a;
            var styles = _v3.b;
            var newStyles = $elm$core$List$isEmpty(styles) ? rendered.iq : _Utils_ap(rendered.iq, styles);
            if (!newStyles.b) {
                return $mdgriffith$elm_ui$Internal$Model$Unstyled(A5($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.ag, rendered.ak, rendered.cw, $mdgriffith$elm_ui$Internal$Model$Unkeyed($mdgriffith$elm_ui$Internal$Model$addChildren_fn(unkeyed, rendered.bG)), $mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
            }
            else {
                var allStyles = newStyles;
                return $mdgriffith$elm_ui$Internal$Model$Styled({
                    hp: A4($mdgriffith$elm_ui$Internal$Model$finalizeNode, rendered.ag, rendered.ak, rendered.cw, $mdgriffith$elm_ui$Internal$Model$Unkeyed($mdgriffith$elm_ui$Internal$Model$addChildren_fn(unkeyed, rendered.bG))),
                    iq: allStyles
                });
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$createElement = F3($mdgriffith$elm_ui$Internal$Model$createElement_fn);
    var $mdgriffith$elm_ui$Internal$Model$Single_fn = function (a, b, c) {
        return { $: 3, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Internal$Model$Single = F3($mdgriffith$elm_ui$Internal$Model$Single_fn);
    var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
        return { $: 10, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$Field_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Flag$Field = F2($mdgriffith$elm_ui$Internal$Flag$Field_fn);
    var $mdgriffith$elm_ui$Internal$Flag$add_fn = function (myFlag, _v0) {
        var one = _v0.a;
        var two = _v0.b;
        if (!myFlag.$) {
            var first = myFlag.a;
            return $mdgriffith$elm_ui$Internal$Flag$Field_fn(first | one, two);
        }
        else {
            var second = myFlag.a;
            return $mdgriffith$elm_ui$Internal$Flag$Field_fn(one, second | two);
        }
    }, $mdgriffith$elm_ui$Internal$Flag$add = F2($mdgriffith$elm_ui$Internal$Flag$add_fn);
    var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2($mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn);
    var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$nearbyElement_fn = function (location, elem) {
        return $elm$html$Html$div_fn(_List_fromArray([
            $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, function () {
                switch (location) {
                    case 0:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.aJ, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.gf]));
                    case 1:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.aJ, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.gA]));
                    case 2:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.aJ, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.hQ]));
                    case 3:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.aJ, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.hO]));
                    case 4:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.aJ, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.ht]));
                    default:
                        return $elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.aJ, $mdgriffith$elm_ui$Internal$Style$classes.ig, $mdgriffith$elm_ui$Internal$Style$classes.gz]));
                }
            }())
        ]), _List_fromArray([
            function () {
                switch (elem.$) {
                    case 3:
                        return $elm$virtual_dom$VirtualDom$text("");
                    case 2:
                        var str = elem.a;
                        return $mdgriffith$elm_ui$Internal$Model$textElement(str);
                    case 0:
                        var html = elem.a;
                        return html($mdgriffith$elm_ui$Internal$Model$asEl);
                    default:
                        var styled = elem.a;
                        return A2(styled.hp, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
                }
            }()
        ]));
    }, $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2($mdgriffith$elm_ui$Internal$Model$nearbyElement_fn);
    var $mdgriffith$elm_ui$Internal$Model$addNearbyElement_fn = function (location, elem, existing) {
        var nearby = $mdgriffith$elm_ui$Internal$Model$nearbyElement_fn(location, elem);
        switch (existing.$) {
            case 0:
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(_List_fromArray([nearby]));
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(_List_fromArray([nearby]));
                }
            case 1:
                var existingBehind = existing.a;
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(_List_Cons(nearby, existingBehind));
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(existingBehind, _List_fromArray([nearby]));
                }
            case 2:
                var existingInFront = existing.a;
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(_List_fromArray([nearby]), existingInFront);
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(_List_Cons(nearby, existingInFront));
                }
            default:
                var existingBehind = existing.a;
                var existingInFront = existing.b;
                if (location === 5) {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(_List_Cons(nearby, existingBehind), existingInFront);
                }
                else {
                    return $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront_fn(existingBehind, _List_Cons(nearby, existingInFront));
                }
        }
    }, $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3($mdgriffith$elm_ui$Internal$Model$addNearbyElement_fn);
    var $mdgriffith$elm_ui$Internal$Model$Embedded_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Embedded = F2($mdgriffith$elm_ui$Internal$Model$Embedded_fn);
    var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$addNodeName_fn = function (newNode, old) {
        switch (old.$) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
            case 1:
                var name = old.a;
                return $mdgriffith$elm_ui$Internal$Model$Embedded_fn(name, newNode);
            default:
                var x = old.a;
                var y = old.b;
                return $mdgriffith$elm_ui$Internal$Model$Embedded_fn(x, y);
        }
    }, $mdgriffith$elm_ui$Internal$Model$addNodeName = F2($mdgriffith$elm_ui$Internal$Model$addNodeName_fn);
    var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
        switch (align) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Style$classes.cu + (" " + $mdgriffith$elm_ui$Internal$Style$classes.eJ);
            case 2:
                return $mdgriffith$elm_ui$Internal$Style$classes.cu + (" " + $mdgriffith$elm_ui$Internal$Style$classes.eK);
            default:
                return $mdgriffith$elm_ui$Internal$Style$classes.cu + (" " + $mdgriffith$elm_ui$Internal$Style$classes.gk);
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
        switch (align) {
            case 0:
                return $mdgriffith$elm_ui$Internal$Style$classes.cv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.gq);
            case 2:
                return $mdgriffith$elm_ui$Internal$Style$classes.cv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.gj);
            default:
                return $mdgriffith$elm_ui$Internal$Style$classes.cv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.gl);
        }
    };
    var $elm$virtual_dom$VirtualDom$attribute_fn = function (key, value) {
        return _VirtualDom_attribute_fn(_VirtualDom_noOnOrFormAction(key), _VirtualDom_noJavaScriptOrHtmlUri(value));
    }, $elm$virtual_dom$VirtualDom$attribute = F2($elm$virtual_dom$VirtualDom$attribute_fn);
    var $mdgriffith$elm_ui$Internal$Model$FullTransform_fn = function (a, b, c, d) {
        return { $: 2, a: a, b: b, c: c, d: d };
    }, $mdgriffith$elm_ui$Internal$Model$FullTransform = F4($mdgriffith$elm_ui$Internal$Model$FullTransform_fn);
    var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$composeTransformation_fn = function (transform, component) {
        switch (transform.$) {
            case 0:
                switch (component.$) {
                    case 0:
                        var x = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(x, 0, 0));
                    case 1:
                        var y = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(0, y, 0));
                    case 2:
                        var z = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(0, 0, z));
                    case 3:
                        var xyz = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
                    case 4:
                        var xyz = component.a;
                        var angle = component.b;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(0, 0, 0), _Utils_Tuple3(1, 1, 1), xyz, angle);
                    default:
                        var xyz = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(0, 0, 0), xyz, _Utils_Tuple3(0, 0, 1), 0);
                }
            case 1:
                var moved = transform.a;
                var x = moved.a;
                var y = moved.b;
                var z = moved.c;
                switch (component.$) {
                    case 0:
                        var newX = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(newX, y, z));
                    case 1:
                        var newY = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(x, newY, z));
                    case 2:
                        var newZ = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(_Utils_Tuple3(x, y, newZ));
                    case 3:
                        var xyz = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
                    case 4:
                        var xyz = component.a;
                        var angle = component.b;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, _Utils_Tuple3(1, 1, 1), xyz, angle);
                    default:
                        var scale = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, scale, _Utils_Tuple3(0, 0, 1), 0);
                }
            default:
                var moved = transform.a;
                var x = moved.a;
                var y = moved.b;
                var z = moved.c;
                var scaled = transform.b;
                var origin = transform.c;
                var angle = transform.d;
                switch (component.$) {
                    case 0:
                        var newX = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(newX, y, z), scaled, origin, angle);
                    case 1:
                        var newY = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(x, newY, z), scaled, origin, angle);
                    case 2:
                        var newZ = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(_Utils_Tuple3(x, y, newZ), scaled, origin, angle);
                    case 3:
                        var newMove = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(newMove, scaled, origin, angle);
                    case 4:
                        var newOrigin = component.a;
                        var newAngle = component.b;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, scaled, newOrigin, newAngle);
                    default:
                        var newScale = component.a;
                        return $mdgriffith$elm_ui$Internal$Model$FullTransform_fn(moved, newScale, origin, angle);
                }
        }
    }, $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2($mdgriffith$elm_ui$Internal$Model$composeTransformation_fn);
    var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
    var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
    var $mdgriffith$elm_ui$Internal$Flag$merge_fn = function (_v0, _v1) {
        var one = _v0.a;
        var two = _v0.b;
        var three = _v1.a;
        var four = _v1.b;
        return $mdgriffith$elm_ui$Internal$Flag$Field_fn(one | three, two | four);
    }, $mdgriffith$elm_ui$Internal$Flag$merge = F2($mdgriffith$elm_ui$Internal$Flag$merge_fn);
    var $mdgriffith$elm_ui$Internal$Flag$none = $mdgriffith$elm_ui$Internal$Flag$Field_fn(0, 0);
    var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
        switch (h.$) {
            case 0:
                var px = h.a;
                var val = $elm$core$String$fromInt(px);
                var name = "height-px-" + val;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$none, $mdgriffith$elm_ui$Internal$Style$classes.e5 + (" " + name), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn(name, "height", val + "px")
                ]));
            case 1:
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.dl, _List_Nil);
            case 2:
                var portion = h.a;
                return (portion === 1) ? _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.dm, _List_Nil) : _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.e6 + (" height-fill-" + $elm$core$String$fromInt(portion)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.gv + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.eT + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("height-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000))
                ]));
            case 3:
                var minSize = h.a;
                var len = h.b;
                var cls = "min-height-" + $elm$core$String$fromInt(minSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "min-height", $elm$core$String$fromInt(minSize) + "px !important");
                var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
                var newFlag = _v1.a;
                var newAttrs = _v1.b;
                var newStyle = _v1.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
            default:
                var maxSize = h.a;
                var len = h.b;
                var cls = "max-height-" + $elm$core$String$fromInt(maxSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "max-height", $elm$core$String$fromInt(maxSize) + "px");
                var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
                var newFlag = _v2.a;
                var newAttrs = _v2.b;
                var newStyle = _v2.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
        }
    };
    var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
    var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
        switch (w.$) {
            case 0:
                var px = w.a;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$none, $mdgriffith$elm_ui$Internal$Style$classes.ga + (" width-px-" + $elm$core$String$fromInt(px)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn("width-px-" + $elm$core$String$fromInt(px), "width", $elm$core$String$fromInt(px) + "px")
                ]));
            case 1:
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.eC, _List_Nil);
            case 2:
                var portion = w.a;
                return (portion === 1) ? _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.eD, _List_Nil) : _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none), $mdgriffith$elm_ui$Internal$Style$classes.gb + (" width-fill-" + $elm$core$String$fromInt(portion)), _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.gv + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.h6 + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("width-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000))
                ]));
            case 3:
                var minSize = w.a;
                var len = w.b;
                var cls = "min-width-" + $elm$core$String$fromInt(minSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "min-width", $elm$core$String$fromInt(minSize) + "px");
                var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
                var newFlag = _v1.a;
                var newAttrs = _v1.b;
                var newStyle = _v1.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
            default:
                var maxSize = w.a;
                var len = w.b;
                var cls = "max-width-" + $elm$core$String$fromInt(maxSize);
                var style = $mdgriffith$elm_ui$Internal$Model$Single_fn(cls, "max-width", $elm$core$String$fromInt(maxSize) + "px");
                var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
                var newFlag = _v2.a;
                var newAttrs = _v2.b;
                var newStyle = _v2.c;
                return _Utils_Tuple3($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag), cls + (" " + newAttrs), _List_Cons(style, newStyle));
        }
    };
    var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
    var $mdgriffith$elm_ui$Internal$Model$skippable_fn = function (flag, style) {
        if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
            if (style.$ === 3) {
                var val = style.c;
                switch (val) {
                    case "0px":
                        return true;
                    case "1px":
                        return true;
                    case "2px":
                        return true;
                    case "3px":
                        return true;
                    case "4px":
                        return true;
                    case "5px":
                        return true;
                    case "6px":
                        return true;
                    default:
                        return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            switch (style.$) {
                case 2:
                    var i = style.a;
                    return (i >= 8) && (i <= 32);
                case 7:
                    var name = style.a;
                    var t = style.b;
                    var r = style.c;
                    var b = style.d;
                    var l = style.e;
                    return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
                default:
                    return false;
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$skippable = F2($mdgriffith$elm_ui$Internal$Model$skippable_fn);
    var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
    var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
    var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
    var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive_fn = function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
        gatherAttrRecursive: while (true) {
            if (!elementAttrs.b) {
                var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
                if (_v1.$ === 1) {
                    return {
                        cw: _List_Cons($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, classes), attrs),
                        bG: children,
                        ag: has,
                        ak: node,
                        iq: styles
                    };
                }
                else {
                    var _class = _v1.a;
                    return {
                        cw: _List_Cons($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, classes + (" " + _class)), attrs),
                        bG: children,
                        ag: has,
                        ak: node,
                        iq: _List_Cons($mdgriffith$elm_ui$Internal$Model$Transform(transform), styles)
                    };
                }
            }
            else {
                var attribute = elementAttrs.a;
                var remaining = elementAttrs.b;
                switch (attribute.$) {
                    case 0:
                        var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 3:
                        var flag = attribute.a;
                        var exactClassName = attribute.b;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn(flag, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            var $temp$classes = exactClassName + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                    case 1:
                        var actualAttribute = attribute.a;
                        var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons(actualAttribute, attrs), $temp$children = children, $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 4:
                        var flag = attribute.a;
                        var style = attribute.b;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn(flag, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            if ($mdgriffith$elm_ui$Internal$Model$skippable_fn(flag, style)) {
                                var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            }
                            else {
                                var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = transform, $temp$styles = _List_Cons(style, styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            }
                        }
                    case 10:
                        var flag = attribute.a;
                        var component = attribute.b;
                        var $temp$classes = classes, $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn(flag, has), $temp$transform = $mdgriffith$elm_ui$Internal$Model$composeTransformation_fn(transform, component), $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 7:
                        var width = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$width, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            switch (width.$) {
                                case 0:
                                    var px = width.a;
                                    var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.ga + (" width-px-" + $elm$core$String$fromInt(px))) + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn("width-px-" + $elm$core$String$fromInt(px), "width", $elm$core$String$fromInt(px) + "px"), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 1:
                                    var $temp$classes = classes + (" " + $mdgriffith$elm_ui$Internal$Style$classes.eC), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 2:
                                    var portion = width.a;
                                    if (portion === 1) {
                                        var $temp$classes = classes + (" " + $mdgriffith$elm_ui$Internal$Style$classes.eD), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                    else {
                                        var $temp$classes = classes + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.gb + (" width-fill-" + $elm$core$String$fromInt(portion)))), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.gv + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.h6 + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("width-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000)), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                default:
                                    var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
                                    var addToFlags = _v4.a;
                                    var newClass = _v4.b;
                                    var newStyles = _v4.c;
                                    var $temp$classes = classes + (" " + newClass), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$merge_fn(addToFlags, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$width, has)), $temp$transform = transform, $temp$styles = _Utils_ap(newStyles, styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                            }
                        }
                    case 8:
                        var height = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$height, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            switch (height.$) {
                                case 0:
                                    var px = height.a;
                                    var val = $elm$core$String$fromInt(px) + "px";
                                    var name = "height-px-" + val;
                                    var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.e5 + (" " + (name + (" " + classes))), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn(name, "height ", val), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 1:
                                    var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.dl + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                case 2:
                                    var portion = height.a;
                                    if (portion === 1) {
                                        var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.dm + (" " + classes), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                    else {
                                        var $temp$classes = classes + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.e6 + (" height-fill-" + $elm$core$String$fromInt(portion)))), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = _List_Cons($mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Style$classes.gv + ("." + ($mdgriffith$elm_ui$Internal$Style$classes.eT + (" > " + $mdgriffith$elm_ui$Internal$Style$dot("height-fill-" + $elm$core$String$fromInt(portion))))), "flex-grow", $elm$core$String$fromInt(portion * 100000)), styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                default:
                                    var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
                                    var addToFlags = _v6.a;
                                    var newClass = _v6.b;
                                    var newStyles = _v6.c;
                                    var $temp$classes = classes + (" " + newClass), $temp$node = node, $temp$has = $mdgriffith$elm_ui$Internal$Flag$merge_fn(addToFlags, $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$height, has)), $temp$transform = transform, $temp$styles = _Utils_ap(newStyles, styles), $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                            }
                        }
                    case 2:
                        var description = attribute.a;
                        switch (description.$) {
                            case 0:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("main", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 1:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("nav", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 2:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("footer", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 3:
                                var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("aside", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 4:
                                var i = description.a;
                                if (i <= 1) {
                                    var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("h1", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                    classes = $temp$classes;
                                    node = $temp$node;
                                    has = $temp$has;
                                    transform = $temp$transform;
                                    styles = $temp$styles;
                                    attrs = $temp$attrs;
                                    children = $temp$children;
                                    elementAttrs = $temp$elementAttrs;
                                    continue gatherAttrRecursive;
                                }
                                else {
                                    if (i < 7) {
                                        var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("h" + $elm$core$String$fromInt(i), node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                    else {
                                        var $temp$classes = classes, $temp$node = $mdgriffith$elm_ui$Internal$Model$addNodeName_fn("h6", node), $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                        classes = $temp$classes;
                                        node = $temp$node;
                                        has = $temp$has;
                                        transform = $temp$transform;
                                        styles = $temp$styles;
                                        attrs = $temp$attrs;
                                        children = $temp$children;
                                        elementAttrs = $temp$elementAttrs;
                                        continue gatherAttrRecursive;
                                    }
                                }
                            case 9:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 8:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("role", "button"), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 5:
                                var label = description.a;
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("aria-label", label), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            case 6:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("aria-live", "polite"), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                            default:
                                var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = _List_Cons($elm$virtual_dom$VirtualDom$attribute_fn("aria-live", "assertive"), attrs), $temp$children = children, $temp$elementAttrs = remaining;
                                classes = $temp$classes;
                                node = $temp$node;
                                has = $temp$has;
                                transform = $temp$transform;
                                styles = $temp$styles;
                                attrs = $temp$attrs;
                                children = $temp$children;
                                elementAttrs = $temp$elementAttrs;
                                continue gatherAttrRecursive;
                        }
                    case 9:
                        var location = attribute.a;
                        var elem = attribute.b;
                        var newStyles = function () {
                            switch (elem.$) {
                                case 3:
                                    return styles;
                                case 2:
                                    var str = elem.a;
                                    return styles;
                                case 0:
                                    var html = elem.a;
                                    return styles;
                                default:
                                    var styled = elem.a;
                                    return _Utils_ap(styles, styled.iq);
                            }
                        }();
                        var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = newStyles, $temp$attrs = attrs, $temp$children = $mdgriffith$elm_ui$Internal$Model$addNearbyElement_fn(location, elem, children), $temp$elementAttrs = remaining;
                        classes = $temp$classes;
                        node = $temp$node;
                        has = $temp$has;
                        transform = $temp$transform;
                        styles = $temp$styles;
                        attrs = $temp$attrs;
                        children = $temp$children;
                        elementAttrs = $temp$elementAttrs;
                        continue gatherAttrRecursive;
                    case 6:
                        var x = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (" " + classes), $temp$node = node, $temp$has = function (flags) {
                                switch (x) {
                                    case 1:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$centerX, flags);
                                    case 2:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
                                    default:
                                        return flags;
                                }
                            }($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$xAlign, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                    default:
                        var y = attribute.a;
                        if ($mdgriffith$elm_ui$Internal$Flag$present_fn($mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
                            var $temp$classes = classes, $temp$node = node, $temp$has = has, $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                        else {
                            var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (" " + classes), $temp$node = node, $temp$has = function (flags) {
                                switch (y) {
                                    case 1:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$centerY, flags);
                                    case 2:
                                        return $mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
                                    default:
                                        return flags;
                                }
                            }($mdgriffith$elm_ui$Internal$Flag$add_fn($mdgriffith$elm_ui$Internal$Flag$yAlign, has)), $temp$transform = transform, $temp$styles = styles, $temp$attrs = attrs, $temp$children = children, $temp$elementAttrs = remaining;
                            classes = $temp$classes;
                            node = $temp$node;
                            has = $temp$has;
                            transform = $temp$transform;
                            styles = $temp$styles;
                            attrs = $temp$attrs;
                            children = $temp$children;
                            elementAttrs = $temp$elementAttrs;
                            continue gatherAttrRecursive;
                        }
                }
            }
        }
    }, $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8($mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive_fn);
    var $mdgriffith$elm_ui$Internal$Model$Untransformed = { $: 0 };
    var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
    var $mdgriffith$elm_ui$Internal$Model$element_fn = function (context, node, attributes, children) {
        return $mdgriffith$elm_ui$Internal$Model$createElement_fn(context, children, $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive_fn($mdgriffith$elm_ui$Internal$Model$contextClasses(context), node, $mdgriffith$elm_ui$Internal$Flag$none, $mdgriffith$elm_ui$Internal$Model$untransformed, _List_Nil, _List_Nil, $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren, $elm$core$List$reverse(attributes)));
    }, $mdgriffith$elm_ui$Internal$Model$element = F4($mdgriffith$elm_ui$Internal$Model$element_fn);
    var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
        return { $: 8, a: a };
    };
    var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
    var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
        return $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, cls));
    };
    var $mdgriffith$elm_ui$Internal$Model$Content = { $: 1 };
    var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
    var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
        return { $: 7, a: a };
    };
    var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
    var $mdgriffith$elm_ui$Element$column_fn = function (attrs, children) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.gU + (" " + $mdgriffith$elm_ui$Internal$Style$classes.a0)), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), attrs))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
    }, $mdgriffith$elm_ui$Element$column = F2($mdgriffith$elm_ui$Element$column_fn);
    var $avh4$elm_color$Color$RgbaSpace_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $avh4$elm_color$Color$RgbaSpace = F4($avh4$elm_color$Color$RgbaSpace_fn);
    var $avh4$elm_color$Color$hsla_fn = function (hue, sat, light, alpha) {
        var _v0 = _Utils_Tuple3(hue, sat, light);
        var h = _v0.a;
        var s = _v0.b;
        var l = _v0.c;
        var m2 = (l <= 0.5) ? (l * (s + 1)) : ((l + s) - (l * s));
        var m1 = (l * 2) - m2;
        var hueToRgb = function (h__) {
            var h_ = (h__ < 0) ? (h__ + 1) : ((h__ > 1) ? (h__ - 1) : h__);
            return ((h_ * 6) < 1) ? (m1 + (((m2 - m1) * h_) * 6)) : (((h_ * 2) < 1) ? m2 : (((h_ * 3) < 2) ? (m1 + (((m2 - m1) * ((2 / 3) - h_)) * 6)) : m1));
        };
        var b = hueToRgb(h - (1 / 3));
        var g = hueToRgb(h);
        var r = hueToRgb(h + (1 / 3));
        return $avh4$elm_color$Color$RgbaSpace_fn(r, g, b, alpha);
    }, $avh4$elm_color$Color$hsla = F4($avh4$elm_color$Color$hsla_fn);
    var $elm$core$Basics$clamp_fn = function (low, high, number) {
        return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
    }, $elm$core$Basics$clamp = F3($elm$core$Basics$clamp_fn);
    var $noahzgordon$elm_color_extra$Color$Manipulate$limit_a0 = 0, $noahzgordon$elm_color_extra$Color$Manipulate$limit_a1 = 1, $noahzgordon$elm_color_extra$Color$Manipulate$limit = A2($elm$core$Basics$clamp, $noahzgordon$elm_color_extra$Color$Manipulate$limit_a0, $noahzgordon$elm_color_extra$Color$Manipulate$limit_a1);
    var $elm$core$Basics$isNaN = _Basics_isNaN;
    var $avh4$elm_color$Color$toHsla = function (_v0) {
        var r = _v0.a;
        var g = _v0.b;
        var b = _v0.c;
        var a = _v0.d;
        var minColor = $elm$core$Basics$min_fn(r, $elm$core$Basics$min_fn(g, b));
        var maxColor = $elm$core$Basics$max_fn(r, $elm$core$Basics$max_fn(g, b));
        var l = (minColor + maxColor) / 2;
        var s = _Utils_eq(minColor, maxColor) ? 0 : ((l < 0.5) ? ((maxColor - minColor) / (maxColor + minColor)) : ((maxColor - minColor) / ((2 - maxColor) - minColor)));
        var h1 = _Utils_eq(maxColor, r) ? ((g - b) / (maxColor - minColor)) : (_Utils_eq(maxColor, g) ? (2 + ((b - r) / (maxColor - minColor))) : (4 + ((r - g) / (maxColor - minColor))));
        var h2 = h1 * (1 / 6);
        var h3 = $elm$core$Basics$isNaN(h2) ? 0 : ((h2 < 0) ? (h2 + 1) : h2);
        return { gs: a, e8: h3, fh: l, fT: s };
    };
    var $noahzgordon$elm_color_extra$Color$Manipulate$darken_fn = function (offset, cl) {
        var _v0 = $avh4$elm_color$Color$toHsla(cl);
        var hue = _v0.e8;
        var saturation = _v0.fT;
        var lightness = _v0.fh;
        var alpha = _v0.gs;
        return $avh4$elm_color$Color$hsla_fn(hue, saturation, $elm$core$Basics$clamp_fn($noahzgordon$elm_color_extra$Color$Manipulate$limit_a0, $noahzgordon$elm_color_extra$Color$Manipulate$limit_a1, lightness - offset), alpha);
    }, $noahzgordon$elm_color_extra$Color$Manipulate$darken = F2($noahzgordon$elm_color_extra$Color$Manipulate$darken_fn);
    var $noahzgordon$elm_color_extra$Color$Manipulate$lighten_fn = function (offset, cl) {
        return $noahzgordon$elm_color_extra$Color$Manipulate$darken_fn(-offset, cl);
    }, $noahzgordon$elm_color_extra$Color$Manipulate$lighten = F2($noahzgordon$elm_color_extra$Color$Manipulate$lighten_fn);
    var $avh4$elm_color$Color$fromRgba = function (components) {
        return $avh4$elm_color$Color$RgbaSpace_fn(components.h_, components.hi, components.gB, components.gs);
    };
    var $author$project$Echologo$vertMante = $avh4$elm_color$Color$fromRgba({ gs: 255 / 255, gB: 155 / 255, hi: 194 / 255, h_: 100 / 255 });
    var $author$project$Style$vert = function (t) {
        return $noahzgordon$elm_color_extra$Color$Manipulate$lighten_fn(t, $author$project$Echologo$vertMante);
    };
    var $author$project$Style$couleurArrierePlan = $author$project$Style$vert(0.3);
    var $mdgriffith$elm_ui$Internal$Model$Rgba_fn = function (a, b, c, d) {
        return { $: 0, a: a, b: b, c: c, d: d };
    }, $mdgriffith$elm_ui$Internal$Model$Rgba = F4($mdgriffith$elm_ui$Internal$Model$Rgba_fn);
    var $mdgriffith$elm_ui$Element$fromRgb = function (clr) {
        return $mdgriffith$elm_ui$Internal$Model$Rgba_fn(clr.h_, clr.hi, clr.gB, clr.gs);
    };
    var $avh4$elm_color$Color$toRgba = function (_v0) {
        var r = _v0.a;
        var g = _v0.b;
        var b = _v0.c;
        var a = _v0.d;
        return { gs: a, gB: b, hi: g, h_: r };
    };
    var $author$project$Style$couleurUI_a0 = $mdgriffith$elm_ui$Element$fromRgb, $author$project$Style$couleurUI_a1 = $avh4$elm_color$Color$toRgba, $author$project$Style$couleurUI = A2($elm$core$Basics$composeL, $author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1);
    var $noahzgordon$elm_color_extra$Color$Convert$toRadix = function (n) {
        var getChr = function (c) {
            return (c < 10) ? $elm$core$String$fromInt(c) : $elm$core$String$fromChar($elm$core$Char$fromCode(87 + c));
        };
        return (n < 16) ? getChr(n) : _Utils_ap($noahzgordon$elm_color_extra$Color$Convert$toRadix((n / 16) | 0), getChr(_Basics_modBy_fn(16, n)));
    };
    var $noahzgordon$elm_color_extra$Color$Convert$toHex_a0 = $noahzgordon$elm_color_extra$Color$Convert$toRadix, $noahzgordon$elm_color_extra$Color$Convert$toHex_a1 = A2($elm$core$String$padLeft, 2, "0"), $noahzgordon$elm_color_extra$Color$Convert$toHex = A2($elm$core$Basics$composeR, $noahzgordon$elm_color_extra$Color$Convert$toHex_a0, $noahzgordon$elm_color_extra$Color$Convert$toHex_a1);
    var $noahzgordon$elm_color_extra$Color$Convert$colorToHex = function (cl) {
        var _v0 = $avh4$elm_color$Color$toRgba(cl);
        var red = _v0.h_;
        var green = _v0.hi;
        var blue = _v0.gB;
        return $elm$core$String$join_fn("", _List_Cons("#", $elm$core$List$map_fn(A2($elm$core$Basics$composeR, $elm$core$Basics$round, $noahzgordon$elm_color_extra$Color$Convert$toHex), _List_fromArray([red * 255, green * 255, blue * 255]))));
    };
    var $elm$svg$Svg$trustedNode_a0 = "http://www.w3.org/2000/svg", $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS($elm$svg$Svg$trustedNode_a0);
    var $elm$svg$Svg$defs = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "defs"), $elm$svg$Svg$defs_fn = $elm$svg$Svg$defs.a2;
    var $elm$svg$Svg$circle = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "circle"), $elm$svg$Svg$circle_fn = $elm$svg$Svg$circle.a2;
    var $elm$svg$Svg$Attributes$cx_a0 = "cx", $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute($elm$svg$Svg$Attributes$cx_a0);
    var $elm$svg$Svg$Attributes$cy_a0 = "cy", $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute($elm$svg$Svg$Attributes$cy_a0);
    var $elm$svg$Svg$Attributes$d_a0 = "d", $elm$svg$Svg$Attributes$d = _VirtualDom_attribute($elm$svg$Svg$Attributes$d_a0);
    var $elm$svg$Svg$Attributes$fill_a0 = "fill", $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute($elm$svg$Svg$Attributes$fill_a0);
    var $elm$svg$Svg$g = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "g"), $elm$svg$Svg$g_fn = $elm$svg$Svg$g.a2;
    var $elm$svg$Svg$path = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "path"), $elm$svg$Svg$path_fn = $elm$svg$Svg$path.a2;
    var $elm$svg$Svg$Attributes$r_a0 = "r", $elm$svg$Svg$Attributes$r = _VirtualDom_attribute($elm$svg$Svg$Attributes$r_a0);
    var $elm$svg$Svg$Attributes$strokeWidth_a0 = "stroke-width", $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute($elm$svg$Svg$Attributes$strokeWidth_a0);
    var $author$project$Echologo$echologo_fn = function (couleurArrierePlan, ombre) {
        return _List_fromArray([
            $elm$svg$Svg$circle_fn(_List_fromArray([
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$cx_a0, "15"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$cy_a0, "15"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$r_a0, "15"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$fill_a0, $noahzgordon$elm_color_extra$Color$Convert$colorToHex($author$project$Echologo$vertMante)),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$strokeWidth_a0, "0")
            ]), _List_Nil),
            $elm$svg$Svg$g_fn(_List_fromArray([
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$fill_a0, $noahzgordon$elm_color_extra$Color$Convert$colorToHex(couleurArrierePlan)),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$strokeWidth_a0, "0"),
                ombre
            ]), _List_fromArray([
                $elm$svg$Svg$circle_fn(_List_fromArray([
                    _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$cx_a0, "13.8"),
                    _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$cy_a0, "9"),
                    _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$r_a0, "2")
                ]), _List_Nil),
                $elm$svg$Svg$path_fn(_List_fromArray([
                    _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$d_a0, "M 12.3,6.4019238 A 3,3 0 0 0 11.201924,10.5 5,5 0 0 1 12.3,2.1592831 a 3,3 0 0 0 0,4.2426407")
                ]), _List_Nil),
                $elm$svg$Svg$path_fn(_List_fromArray([
                    _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$d_a0, "m13.8 6a3 3 0 0 1 3 3 6 6 0 0 1 8.485281 0 8 8 0 0 0-11.485281-3")
                ]), _List_Nil),
                $elm$svg$Svg$path_fn(_List_fromArray([
                    _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$d_a0, "M 12.3,11.598076 A 3,3 0 0 0 16.398076,10.5 13,13 0 0 1 12.3,28.568639 a 12,12 0 0 0 0,-16.970563")
                ]), _List_Nil)
            ]))
        ]);
    }, $author$project$Echologo$echologo = F2($author$project$Echologo$echologo_fn);
    var $elm$svg$Svg$Attributes$filter_a0 = "filter", $elm$svg$Svg$Attributes$filter = _VirtualDom_attribute($elm$svg$Svg$Attributes$filter_a0);
    var $elm$svg$Svg$Attributes$fontFamily_a0 = "font-family", $elm$svg$Svg$Attributes$fontFamily = _VirtualDom_attribute($elm$svg$Svg$Attributes$fontFamily_a0);
    var $elm$svg$Svg$Attributes$fontSize_a0 = "font-size", $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute($elm$svg$Svg$Attributes$fontSize_a0);
    var $mdgriffith$elm_ui$Internal$Model$unstyled_a0 = $mdgriffith$elm_ui$Internal$Model$Unstyled, $mdgriffith$elm_ui$Internal$Model$unstyled_a1 = $elm$core$Basics$always, $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$unstyled_a0, $mdgriffith$elm_ui$Internal$Model$unstyled_a1);
    var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
    var $elm$svg$Svg$Attributes$dx_a0 = "dx", $elm$svg$Svg$Attributes$dx = _VirtualDom_attribute($elm$svg$Svg$Attributes$dx_a0);
    var $elm$svg$Svg$Attributes$dy_a0 = "dy", $elm$svg$Svg$Attributes$dy = _VirtualDom_attribute($elm$svg$Svg$Attributes$dy_a0);
    var $elm$svg$Svg$feComposite = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "feComposite"), $elm$svg$Svg$feComposite_fn = $elm$svg$Svg$feComposite.a2;
    var $elm$svg$Svg$feFlood = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "feFlood"), $elm$svg$Svg$feFlood_fn = $elm$svg$Svg$feFlood.a2;
    var $elm$svg$Svg$feGaussianBlur = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "feGaussianBlur"), $elm$svg$Svg$feGaussianBlur_fn = $elm$svg$Svg$feGaussianBlur.a2;
    var $elm$svg$Svg$feMerge = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "feMerge"), $elm$svg$Svg$feMerge_fn = $elm$svg$Svg$feMerge.a2;
    var $elm$svg$Svg$feMergeNode = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "feMergeNode"), $elm$svg$Svg$feMergeNode_fn = $elm$svg$Svg$feMergeNode.a2;
    var $elm$svg$Svg$feOffset = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "feOffset"), $elm$svg$Svg$feOffset_fn = $elm$svg$Svg$feOffset.a2;
    var $elm$svg$Svg$filter = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "filter"), $elm$svg$Svg$filter_fn = $elm$svg$Svg$filter.a2;
    var $elm$svg$Svg$Attributes$floodColor_a0 = "flood-color", $elm$svg$Svg$Attributes$floodColor = _VirtualDom_attribute($elm$svg$Svg$Attributes$floodColor_a0);
    var $elm$svg$Svg$Attributes$floodOpacity_a0 = "flood-opacity", $elm$svg$Svg$Attributes$floodOpacity = _VirtualDom_attribute($elm$svg$Svg$Attributes$floodOpacity_a0);
    var $elm$svg$Svg$Attributes$id_a0 = "id", $elm$svg$Svg$Attributes$id = _VirtualDom_attribute($elm$svg$Svg$Attributes$id_a0);
    var $elm$svg$Svg$Attributes$in2_a0 = "in2", $elm$svg$Svg$Attributes$in2 = _VirtualDom_attribute($elm$svg$Svg$Attributes$in2_a0);
    var $elm$svg$Svg$Attributes$in__a0 = "in", $elm$svg$Svg$Attributes$in_ = _VirtualDom_attribute($elm$svg$Svg$Attributes$in__a0);
    var $elm$svg$Svg$Attributes$operator_a0 = "operator", $elm$svg$Svg$Attributes$operator = _VirtualDom_attribute($elm$svg$Svg$Attributes$operator_a0);
    var $elm$svg$Svg$Attributes$stdDeviation_a0 = "stdDeviation", $elm$svg$Svg$Attributes$stdDeviation = _VirtualDom_attribute($elm$svg$Svg$Attributes$stdDeviation_a0);
    var $author$project$Style$ombreInterne = $elm$svg$Svg$filter_fn(_List_fromArray([
        _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$id_a0, "ombreInterne")
    ]), _List_fromArray([
        $elm$svg$Svg$feFlood_fn(_List_fromArray([
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$floodColor_a0, "black"),
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$floodOpacity_a0, ".6")
        ]), _List_Nil),
        $elm$svg$Svg$feComposite_fn(_List_fromArray([
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$in2_a0, "SourceAlpha"),
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$operator_a0, "out")
        ]), _List_Nil),
        $elm$svg$Svg$feGaussianBlur_fn(_List_fromArray([
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$stdDeviation_a0, "1")
        ]), _List_Nil),
        $elm$svg$Svg$feOffset_fn(_List_fromArray([
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$dx_a0, ".1"),
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$dy_a0, ".5")
        ]), _List_Nil),
        $elm$svg$Svg$feComposite_fn(_List_fromArray([
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$in2_a0, "SourceAlpha"),
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$operator_a0, "in")
        ]), _List_Nil),
        $elm$svg$Svg$feMerge_fn(_List_Nil, _List_fromArray([
            $elm$svg$Svg$feMergeNode_fn(_List_fromArray([
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$in__a0, "SourceGraphic")
            ]), _List_Nil),
            $elm$svg$Svg$feMergeNode_fn(_List_Nil, _List_Nil)
        ]))
    ]));
    var $elm$svg$Svg$svg = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "svg"), $elm$svg$Svg$svg_fn = $elm$svg$Svg$svg.a2;
    var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
    var $elm$svg$Svg$text_ = _VirtualDom_nodeNS_fn($elm$svg$Svg$trustedNode_a0, "text"), $elm$svg$Svg$text__fn = $elm$svg$Svg$text_.a2;
    var $elm$svg$Svg$Attributes$viewBox_a0 = "viewBox", $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute($elm$svg$Svg$Attributes$viewBox_a0);
    var $elm$svg$Svg$Attributes$width_a0 = "width", $elm$svg$Svg$Attributes$width = _VirtualDom_attribute($elm$svg$Svg$Attributes$width_a0);
    var $elm$svg$Svg$Attributes$x_a0 = "x", $elm$svg$Svg$Attributes$x = _VirtualDom_attribute($elm$svg$Svg$Attributes$x_a0);
    var $elm$svg$Svg$Attributes$y_a0 = "y", $elm$svg$Svg$Attributes$y = _VirtualDom_attribute($elm$svg$Svg$Attributes$y_a0);
    var $author$project$Style$entete_fn = function (largeur, titre) {
        return $mdgriffith$elm_ui$Element$html($elm$svg$Svg$svg_fn(_List_fromArray([
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$viewBox_a0, "0 0 300 30"),
            _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$width_a0, $elm$core$String$fromInt(largeur))
        ]), _Utils_ap(_List_fromArray([
            $elm$svg$Svg$defs_fn(_List_Nil, _List_fromArray([$author$project$Style$ombreInterne]))
        ]), _Utils_ap($author$project$Echologo$echologo_fn($author$project$Style$couleurArrierePlan, _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$filter_a0, "url(#ombreInterne)")), _List_fromArray([
            $elm$svg$Svg$text__fn(_List_fromArray([
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$x_a0, "30"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$y_a0, "25"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$fontFamily_a0, "Verdana"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$fill_a0, $noahzgordon$elm_color_extra$Color$Convert$colorToHex($author$project$Style$couleurArrierePlan)),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$fontSize_a0, "20"),
                _VirtualDom_attribute_fn($elm$svg$Svg$Attributes$filter_a0, "url(#ombreInterne)")
            ]), _List_fromArray([
                $elm$svg$Svg$text(titre)
            ]))
        ])))));
    }, $author$project$Style$entete = F2($author$project$Style$entete_fn);
    var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
    var $author$project$Style$petitEspacement = 20;
    var $author$project$Style$grandEspacement = ((5 * $author$project$Style$petitEspacement) / 4) | 0;
    var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic_fn = function (a, b) {
        return { $: 2, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2($mdgriffith$elm_ui$Internal$Model$OnlyDynamic_fn);
    var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2($mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic_fn);
    var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
    var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
    var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
        gx: $elm$core$Maybe$Nothing,
        gE: $elm$core$Maybe$Nothing,
        ie: $elm$core$Maybe$Just({
            bB: 0,
            bI: $mdgriffith$elm_ui$Internal$Model$Rgba_fn(155 / 255, 203 / 255, 1, 1),
            b6: _Utils_Tuple2(0, 0),
            cc: 3
        })
    };
    var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
        var combine = F2(function (opt, record) {
            switch (opt.$) {
                case 0:
                    var hoverable = opt.a;
                    var _v4 = record.ho;
                    if (_v4.$ === 1) {
                        return _Utils_update(record, {
                            ho: $elm$core$Maybe$Just(hoverable)
                        });
                    }
                    else {
                        return record;
                    }
                case 1:
                    var focusStyle = opt.a;
                    var _v5 = record.he;
                    if (_v5.$ === 1) {
                        return _Utils_update(record, {
                            he: $elm$core$Maybe$Just(focusStyle)
                        });
                    }
                    else {
                        return record;
                    }
                default:
                    var renderMode = opt.a;
                    var _v6 = record.hK;
                    if (_v6.$ === 1) {
                        return _Utils_update(record, {
                            hK: $elm$core$Maybe$Just(renderMode)
                        });
                    }
                    else {
                        return record;
                    }
            }
        });
        var andFinally = function (record) {
            return {
                he: function () {
                    var _v0 = record.he;
                    if (_v0.$ === 1) {
                        return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
                    }
                    else {
                        var focusable = _v0.a;
                        return focusable;
                    }
                }(),
                ho: function () {
                    var _v1 = record.ho;
                    if (_v1.$ === 1) {
                        return 1;
                    }
                    else {
                        var hoverable = _v1.a;
                        return hoverable;
                    }
                }(),
                hK: function () {
                    var _v2 = record.hK;
                    if (_v2.$ === 1) {
                        return 0;
                    }
                    else {
                        var actualMode = _v2.a;
                        return actualMode;
                    }
                }()
            };
        };
        return andFinally($elm$core$List$foldr_fn(combine, { he: $elm$core$Maybe$Nothing, ho: $elm$core$Maybe$Nothing, hK: $elm$core$Maybe$Nothing }, options));
    };
    var $mdgriffith$elm_ui$Internal$Model$toHtml_fn = function (mode, el) {
        switch (el.$) {
            case 0:
                var html = el.a;
                return html($mdgriffith$elm_ui$Internal$Model$asEl);
            case 1:
                var styles = el.a.iq;
                var html = el.a.hp;
                return A2(html, mode(styles), $mdgriffith$elm_ui$Internal$Model$asEl);
            case 2:
                var text = el.a;
                return $mdgriffith$elm_ui$Internal$Model$textElement(text);
            default:
                return $mdgriffith$elm_ui$Internal$Model$textElement("");
        }
    }, $mdgriffith$elm_ui$Internal$Model$toHtml = F2($mdgriffith$elm_ui$Internal$Model$toHtml_fn);
    var $mdgriffith$elm_ui$Internal$Model$renderRoot_fn = function (optionList, attributes, child) {
        var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
        var embedStyle = function () {
            var _v0 = options.hK;
            if (_v0 === 1) {
                return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
            }
            else {
                return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
            }
        }();
        return $mdgriffith$elm_ui$Internal$Model$toHtml_fn(embedStyle, $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, attributes, $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([child]))));
    }, $mdgriffith$elm_ui$Internal$Model$renderRoot = F3($mdgriffith$elm_ui$Internal$Model$renderRoot_fn);
    var $mdgriffith$elm_ui$Internal$Model$FontFamily_fn = function (a, b) {
        return { $: 1, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$FontFamily = F2($mdgriffith$elm_ui$Internal$Model$FontFamily_fn);
    var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
        return { $: 2, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$SansSerif = { $: 1 };
    var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
        return { $: 3, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
    var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
    var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
    var $elm$core$String$toLower = _String_toLower;
    var $elm$core$String$words = _String_words;
    var $mdgriffith$elm_ui$Internal$Model$renderFontClassName_fn = function (font, current) {
        return _Utils_ap(current, function () {
            switch (font.$) {
                case 0:
                    return "serif";
                case 1:
                    return "sans-serif";
                case 2:
                    return "monospace";
                case 3:
                    var name = font.a;
                    return $elm$core$String$join_fn("-", $elm$core$String$words($elm$core$String$toLower(name)));
                case 4:
                    var name = font.a;
                    var url = font.b;
                    return $elm$core$String$join_fn("-", $elm$core$String$words($elm$core$String$toLower(name)));
                default:
                    var name = font.a.b4;
                    return $elm$core$String$join_fn("-", $elm$core$String$words($elm$core$String$toLower(name)));
            }
        }());
    }, $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2($mdgriffith$elm_ui$Internal$Model$renderFontClassName_fn);
    var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
        var families = _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$Typeface("Open Sans"),
            $mdgriffith$elm_ui$Internal$Model$Typeface("Helvetica"),
            $mdgriffith$elm_ui$Internal$Model$Typeface("Verdana"),
            $mdgriffith$elm_ui$Internal$Model$SansSerif
        ]);
        return _List_fromArray([
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$bgColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("bg-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass($mdgriffith$elm_ui$Internal$Model$Rgba_fn(1, 1, 1, 0)), "background-color", $mdgriffith$elm_ui$Internal$Model$Rgba_fn(1, 1, 1, 0))),
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("fc-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass($mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 1)), "color", $mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 1))),
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontSize, $mdgriffith$elm_ui$Internal$Model$FontSize(20)),
            $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontFamily, $mdgriffith$elm_ui$Internal$Model$FontFamily_fn($elm$core$List$foldl_fn($mdgriffith$elm_ui$Internal$Model$renderFontClassName, "font-", families), families))
        ]);
    }();
    var $mdgriffith$elm_ui$Element$layoutWith_fn = function (_v0, attrs, child) {
        var options = _v0.fB;
        return $mdgriffith$elm_ui$Internal$Model$renderRoot_fn(options, _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($elm$core$String$join_fn(" ", _List_fromArray([$mdgriffith$elm_ui$Internal$Style$classes.h4, $mdgriffith$elm_ui$Internal$Style$classes.gv, $mdgriffith$elm_ui$Internal$Style$classes.ig]))), _Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)), child);
    }, $mdgriffith$elm_ui$Element$layoutWith = F3($mdgriffith$elm_ui$Element$layoutWith_fn);
    var $mdgriffith$elm_ui$Element$layout_a0 = { fB: _List_Nil }, $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith($mdgriffith$elm_ui$Element$layout_a0);
    var $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn = function (a, b, c, d, e) {
        return { $: 7, a: a, b: b, c: c, d: d, e: e };
    }, $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5($mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn);
    var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
    var $mdgriffith$elm_ui$Element$padding = function (x) {
        var f = x;
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + $elm$core$String$fromInt(x), f, f, f, f));
    };
    var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
    var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$borderRound, $mdgriffith$elm_ui$Internal$Model$Single_fn("br-" + $elm$core$String$fromInt(radius), "border-radius", $elm$core$String$fromInt(radius) + "px"));
    };
    var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
    var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
    var $mdgriffith$elm_ui$Element$row_fn = function (attrs, children) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asRow, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.a0 + (" " + $mdgriffith$elm_ui$Internal$Style$classes.Q)), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), attrs))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
    }, $mdgriffith$elm_ui$Element$row = F2($mdgriffith$elm_ui$Element$row_fn);
    var $author$project$Style$tresGrandEspacement = ((25 * $author$project$Style$petitEspacement) / 16) | 0;
    var $author$project$Style$designGeneral_fn = function (largeur, titre, elmt) {
        return $mdgriffith$elm_ui$Element$layoutWith_fn($mdgriffith$elm_ui$Element$layout_a0, _List_fromArray([
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$padding($author$project$Style$tresGrandEspacement),
            $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan))
        ]), $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$vert(0))),
            $mdgriffith$elm_ui$Element$Border$rounded(13)
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$row_fn(_List_Nil, _List_fromArray([
                $author$project$Style$entete_fn(largeur - (2 * ($author$project$Style$petitEspacement + $author$project$Style$grandEspacement)), titre)
            ])),
            elmt
        ])));
    }, $author$project$Style$designGeneral = F3($author$project$Style$designGeneral_fn);
    var $mdgriffith$elm_ui$Internal$Model$Empty = { $: 3 };
    var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
        return { $: 2, a: a };
    };
    var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
    var $mdgriffith$elm_ui$Internal$Model$map_fn = function (fn, el) {
        switch (el.$) {
            case 1:
                var styled = el.a;
                return $mdgriffith$elm_ui$Internal$Model$Styled({
                    hp: F2(function (add, context) {
                        return _VirtualDom_map_fn(fn, A2(styled.hp, add, context));
                    }),
                    iq: styled.iq
                });
            case 0:
                var html = el.a;
                return $mdgriffith$elm_ui$Internal$Model$Unstyled(A2($elm$core$Basics$composeL, $elm$virtual_dom$VirtualDom$map(fn), html));
            case 2:
                var str = el.a;
                return $mdgriffith$elm_ui$Internal$Model$Text(str);
            default:
                return $mdgriffith$elm_ui$Internal$Model$Empty;
        }
    }, $mdgriffith$elm_ui$Internal$Model$map = F2($mdgriffith$elm_ui$Internal$Model$map_fn);
    var $mdgriffith$elm_ui$Element$map = $mdgriffith$elm_ui$Internal$Model$map;
    var $author$project$CalculateurDeNotes$titre = "Calculateur de notes";
    var $author$project$GenerateurDeProblemes$titre = "G\u00E9n\u00E9rateur de probl\u00E8mes";
    var $author$project$GenerateurH5P$titre = "G\u00E9n\u00E9rateur d'archives H5P";
    var $author$project$GenerateurJson$titre = "G\u00E9n\u00E9rateur Json";
    var $author$project$CalculateurDeNotes$NouveauBareme = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$CalculateurDeNotes$NouvellesReponsesCorrectes = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$CalculateurDeNotes$NouvellesReponsesEleves = function (a) {
        return { $: 2, a: a };
    };
    var $author$project$CalculateurDeNotes$TelechargerNotes = { $: 3 };
    var $mdgriffith$elm_ui$Internal$Model$Button = { $: 8 };
    var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
        return { $: 2, a: a };
    };
    var $elm$html$Html$Attributes$boolProperty_fn = function (key, bool) {
        return _VirtualDom_property_fn(key, $elm$json$Json$Encode$bool(bool));
    }, $elm$html$Html$Attributes$boolProperty = F2($elm$html$Html$Attributes$boolProperty_fn);
    var $elm$html$Html$Attributes$disabled_a0 = "disabled", $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty($elm$html$Html$Attributes$disabled_a0);
    var $mdgriffith$elm_ui$Element$Input$enter = "Enter";
    var $mdgriffith$elm_ui$Internal$Model$NoAttribute = { $: 0 };
    var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
        if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
            var _v1 = attr.b;
            var _v2 = _v1.a;
            return true;
        }
        else {
            return false;
        }
    };
    var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
        return $elm$core$List$any_fn($mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass("focusable");
    };
    var $elm$virtual_dom$VirtualDom$Normal = function (a) {
        return { $: 0, a: a };
    };
    var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
    var $elm$html$Html$Events$on_fn = function (event, decoder) {
        return _VirtualDom_on_fn(event, $elm$virtual_dom$VirtualDom$Normal(decoder));
    }, $elm$html$Html$Events$on = F2($elm$html$Html$Events$on_fn);
    var $elm$html$Html$Events$onClick = function (msg) {
        return $elm$html$Html$Events$on_fn("click", $elm$json$Json$Decode$succeed(msg));
    };
    var $mdgriffith$elm_ui$Element$Events$onClick_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Events$onClick_a1 = $elm$html$Html$Events$onClick, $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Events$onClick_a0, $mdgriffith$elm_ui$Element$Events$onClick_a1);
    var $elm$json$Json$Decode$fail = _Json_fail;
    var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
        return { $: 2, a: a };
    };
    var $elm$html$Html$Events$preventDefaultOn_fn = function (event, decoder) {
        return _VirtualDom_on_fn(event, $elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
    }, $elm$html$Html$Events$preventDefaultOn = F2($elm$html$Html$Events$preventDefaultOn_fn);
    var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
        var decode = function (code) {
            var _v0 = lookup(code);
            if (_v0.$ === 1) {
                return $elm$json$Json$Decode$fail("No key matched");
            }
            else {
                var msg = _v0.a;
                return $elm$json$Json$Decode$succeed(msg);
            }
        };
        var isKey = _Json_andThen_fn(decode, _Json_decodeField_fn("key", $elm$json$Json$Decode$string));
        return $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Events$preventDefaultOn_fn("keydown", _Json_map1_fn(function (fired) {
            return _Utils_Tuple2(fired, true);
        }, isKey)));
    };
    var $mdgriffith$elm_ui$Internal$Model$Class_fn = function (a, b) {
        return { $: 3, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Class = F2($mdgriffith$elm_ui$Internal$Model$Class_fn);
    var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
    var $mdgriffith$elm_ui$Element$pointer = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.gX);
    var $mdgriffith$elm_ui$Element$Input$space = " ";
    var $elm$html$Html$Attributes$tabindex = function (n) {
        return _VirtualDom_attribute_fn("tabIndex", $elm$core$String$fromInt(n));
    };
    var $mdgriffith$elm_ui$Element$Input$button_fn = function (attrs, _v0) {
        var onPress = _v0.hP;
        var label = _v0.dv;
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bO + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.Q + (" " + ($mdgriffith$elm_ui$Internal$Style$classes.ic + (" " + $mdgriffith$elm_ui$Internal$Style$classes.fv)))))), _List_Cons($mdgriffith$elm_ui$Element$pointer, _List_Cons($mdgriffith$elm_ui$Element$Input$focusDefault(attrs), _List_Cons($mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button), _List_Cons($mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$tabindex(0)), function () {
            if (onPress.$ === 1) {
                return _List_Cons($mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$boolProperty_fn($elm$html$Html$Attributes$disabled_a0, true)), attrs);
            }
            else {
                var msg = onPress.a;
                return _List_Cons($elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Events$onClick_a0, $mdgriffith$elm_ui$Element$Events$onClick_a1, msg), _List_Cons($mdgriffith$elm_ui$Element$Input$onKeyLookup(function (code) {
                    return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
                }), attrs));
            }
        }()))))))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([label])));
    }, $mdgriffith$elm_ui$Element$Input$button = F2($mdgriffith$elm_ui$Element$Input$button_fn);
    var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
        return { $: 5, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$CenterY = 1;
    var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY(1);
    var $mdgriffith$elm_ui$Element$rgb255_fn = function (red, green, blue) {
        return $mdgriffith$elm_ui$Internal$Model$Rgba_fn(red / 255, green / 255, blue / 255, 1);
    }, $mdgriffith$elm_ui$Element$rgb255 = F3($mdgriffith$elm_ui$Element$rgb255_fn);
    var $mdgriffith$elm_ui$Internal$Model$boxShadowClass = function (shadow) {
        return $elm$core$String$concat(_List_fromArray([
            shadow.fd ? "box-inset" : "box-",
            $mdgriffith$elm_ui$Internal$Model$floatClass(shadow.b6.a) + "px",
            $mdgriffith$elm_ui$Internal$Model$floatClass(shadow.b6.b) + "px",
            $mdgriffith$elm_ui$Internal$Model$floatClass(shadow.bB) + "px",
            $mdgriffith$elm_ui$Internal$Model$floatClass(shadow.cc) + "px",
            $mdgriffith$elm_ui$Internal$Model$formatColorClass(shadow.bI)
        ]));
    };
    var $mdgriffith$elm_ui$Internal$Flag$shadows = $mdgriffith$elm_ui$Internal$Flag$flag(19);
    var $mdgriffith$elm_ui$Element$Border$shadow = function (almostShade) {
        var shade = { bB: almostShade.bB, bI: almostShade.bI, fd: false, b6: almostShade.b6, cc: almostShade.cc };
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$shadows, $mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Model$boxShadowClass(shade), "box-shadow", $mdgriffith$elm_ui$Internal$Model$formatBoxShadow(shade)));
    };
    var $mdgriffith$elm_ui$Element$text = function (content) {
        return $mdgriffith$elm_ui$Internal$Model$Text(content);
    };
    var $author$project$Style$bouton_fn = function (fonction, label) {
        return $mdgriffith$elm_ui$Element$Input$button_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$centerY,
            $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
            $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$vert(-0.2))),
            $mdgriffith$elm_ui$Element$Border$rounded(8),
            $mdgriffith$elm_ui$Element$Border$shadow({
                bB: 10,
                bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                b6: _Utils_Tuple2(0.3, 0.4),
                cc: 2
            })
        ]), {
            dv: $mdgriffith$elm_ui$Element$text(label),
            hP: $elm$core$Maybe$Just(fonction)
        });
    }, $author$project$Style$bouton = F2($author$project$Style$bouton_fn);
    var $author$project$CalculateurDeNotes$expurgerNotesManquantes = function (nts) {
        expurgerNotesManquantes: while (true) {
            if (!nts.b) {
                return _List_Nil;
            }
            else {
                if (nts.a.$ === 1) {
                    var _v1 = nts.a;
                    var ntss = nts.b;
                    var $temp$nts = ntss;
                    nts = $temp$nts;
                    continue expurgerNotesManquantes;
                }
                else {
                    var nt = nts.a.a;
                    var ntss = nts.b;
                    return _List_Cons(nt, $author$project$CalculateurDeNotes$expurgerNotesManquantes(ntss));
                }
            }
        }
    };
    var $elm$core$Basics$sqrt = _Basics_sqrt;
    var $author$project$CalculateurDeNotes$ecartType = function (elvs) {
        var moy = function (nts) {
            return $elm$core$List$sum(nts) / $elm$core$List$length(nts);
        };
        var moyCarre = A2($elm$core$Basics$composeL, moy, $elm$core$List$map(function (x) {
            return _Basics_pow_fn(x, 2);
        }));
        var ecTp = function (nts) {
            return $elm$core$Basics$sqrt(moyCarre(nts) - _Basics_pow_fn(moy(nts), 2));
        };
        return ecTp($author$project$CalculateurDeNotes$expurgerNotesManquantes($elm$core$List$map_fn(function ($) {
            return $.aK;
        }, elvs)));
    };
    var $mdgriffith$elm_ui$Element$Border$innerShadow = function (almostShade) {
        var shade = { bB: almostShade.bB, bI: almostShade.bI, fd: true, b6: almostShade.b6, cc: almostShade.cc };
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$shadows, $mdgriffith$elm_ui$Internal$Model$Single_fn($mdgriffith$elm_ui$Internal$Model$boxShadowClass(shade), "box-shadow", $mdgriffith$elm_ui$Internal$Model$formatBoxShadow(shade)));
    };
    var $mdgriffith$elm_ui$Element$Input$Above = 2;
    var $mdgriffith$elm_ui$Element$Input$Label_fn = function (a, b, c) {
        return { $: 0, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Element$Input$Label = F3($mdgriffith$elm_ui$Element$Input$Label_fn);
    var $mdgriffith$elm_ui$Element$Input$labelAbove_a0 = 2, $mdgriffith$elm_ui$Element$Input$labelAbove = $mdgriffith$elm_ui$Element$Input$Label($mdgriffith$elm_ui$Element$Input$labelAbove_a0);
    var $mdgriffith$elm_ui$Internal$Model$Max_fn = function (a, b) {
        return { $: 4, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Max = F2($mdgriffith$elm_ui$Internal$Model$Max_fn);
    var $mdgriffith$elm_ui$Element$maximum_fn = function (i, l) {
        return $mdgriffith$elm_ui$Internal$Model$Max_fn(i, l);
    }, $mdgriffith$elm_ui$Element$maximum = F2($mdgriffith$elm_ui$Element$maximum_fn);
    var $author$project$CalculateurDeNotes$moyenne = function (elvs) {
        var moy = function (nts) {
            return $elm$core$List$sum(nts) / $elm$core$List$length(nts);
        };
        return moy($author$project$CalculateurDeNotes$expurgerNotesManquantes($elm$core$List$map_fn(function ($) {
            return $.aK;
        }, elvs)));
    };
    var $mdgriffith$elm_ui$Element$Input$TextArea = { $: 1 };
    var $mdgriffith$elm_ui$Internal$Model$LivePolite = { $: 6 };
    var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
    var $mdgriffith$elm_ui$Element$Input$applyLabel_fn = function (attrs, label, input) {
        if (label.$ === 1) {
            var labelText = label.a;
            return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), attrs, $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([input])));
        }
        else {
            var position = label.a;
            var labelAttrs = label.b;
            var labelChild = label.c;
            var labelElement = $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, labelAttrs, $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([labelChild])));
            switch (position) {
                case 2:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bW), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([labelElement, input])));
                case 3:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asColumn, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bW), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([input, labelElement])));
                case 0:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asRow, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bW), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([input, labelElement])));
                default:
                    return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asRow, $mdgriffith$elm_ui$Internal$Model$NodeName("label"), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.bW), attrs), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([labelElement, input])));
            }
        }
    }, $mdgriffith$elm_ui$Element$Input$applyLabel = F3($mdgriffith$elm_ui$Element$Input$applyLabel_fn);
    var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
    var $mdgriffith$elm_ui$Element$Input$autofill_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Input$autofill_a1 = $elm$html$Html$Attributes$attribute("autocomplete"), $mdgriffith$elm_ui$Element$Input$autofill = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Input$autofill_a0, $mdgriffith$elm_ui$Element$Input$autofill_a1);
    var $mdgriffith$elm_ui$Internal$Model$Behind = 5;
    var $mdgriffith$elm_ui$Internal$Model$Nearby_fn = function (a, b) {
        return { $: 9, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Nearby = F2($mdgriffith$elm_ui$Internal$Model$Nearby_fn);
    var $mdgriffith$elm_ui$Element$createNearby_fn = function (loc, element) {
        if (element.$ === 3) {
            return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
        }
        else {
            return $mdgriffith$elm_ui$Internal$Model$Nearby_fn(loc, element);
        }
    }, $mdgriffith$elm_ui$Element$createNearby = F2($mdgriffith$elm_ui$Element$createNearby_fn);
    var $mdgriffith$elm_ui$Element$behindContent = function (element) {
        return $mdgriffith$elm_ui$Element$createNearby_fn(5, element);
    };
    var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$TransformComponent_fn = function (a, b) {
        return { $: 10, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2($mdgriffith$elm_ui$Internal$Model$TransformComponent_fn);
    var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
    var $mdgriffith$elm_ui$Element$moveUp = function (y) {
        return $mdgriffith$elm_ui$Internal$Model$TransformComponent_fn($mdgriffith$elm_ui$Internal$Flag$moveY, $mdgriffith$elm_ui$Internal$Model$MoveY(-y));
    };
    var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
        var gatherSpacing = F2(function (attr, found) {
            if ((attr.$ === 4) && (attr.b.$ === 5)) {
                var _v2 = attr.b;
                var x = _v2.b;
                var y = _v2.c;
                if (found.$ === 1) {
                    return $elm$core$Maybe$Just(y);
                }
                else {
                    return found;
                }
            }
            else {
                return found;
            }
        });
        var _v0 = $elm$core$List$foldr_fn(gatherSpacing, $elm$core$Maybe$Nothing, attrs);
        if (_v0.$ === 1) {
            return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
        }
        else {
            var vSpace = _v0.a;
            return $mdgriffith$elm_ui$Element$moveUp($elm$core$Basics$floor(vSpace / 2));
        }
    };
    var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
    var $mdgriffith$elm_ui$Element$clip = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.gO);
    var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
    var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$borderColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("bc-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr), "border-color", clr));
    };
    var $mdgriffith$elm_ui$Element$rgb_fn = function (r, g, b) {
        return $mdgriffith$elm_ui$Internal$Model$Rgba_fn(r, g, b, 1);
    }, $mdgriffith$elm_ui$Element$rgb = F3($mdgriffith$elm_ui$Element$rgb_fn);
    var $mdgriffith$elm_ui$Element$Input$darkGrey = $mdgriffith$elm_ui$Element$rgb_fn(186 / 255, 189 / 255, 182 / 255);
    var $mdgriffith$elm_ui$Element$paddingXY_fn = function (x, y) {
        if (_Utils_eq(x, y)) {
            var f = x;
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + $elm$core$String$fromInt(x), f, f, f, f));
        }
        else {
            var yFloat = y;
            var xFloat = x;
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + ($elm$core$String$fromInt(x) + ("-" + $elm$core$String$fromInt(y))), yFloat, xFloat, yFloat, xFloat));
        }
    }, $mdgriffith$elm_ui$Element$paddingXY = F2($mdgriffith$elm_ui$Element$paddingXY_fn);
    var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = $mdgriffith$elm_ui$Element$paddingXY_fn(12, 12);
    var $mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn = function (a, b, c) {
        return { $: 5, a: a, b: b, c: c };
    }, $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3($mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn);
    var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
    var $mdgriffith$elm_ui$Internal$Model$spacingName_fn = function (x, y) {
        return "spacing-" + ($elm$core$String$fromInt(x) + ("-" + $elm$core$String$fromInt(y)));
    }, $mdgriffith$elm_ui$Internal$Model$spacingName = F2($mdgriffith$elm_ui$Internal$Model$spacingName_fn);
    var $mdgriffith$elm_ui$Element$spacing = function (x) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$spacing, $mdgriffith$elm_ui$Internal$Model$SpacingStyle_fn($mdgriffith$elm_ui$Internal$Model$spacingName_fn(x, x), x, x));
    };
    var $mdgriffith$elm_ui$Element$Input$white = $mdgriffith$elm_ui$Element$rgb_fn(1, 1, 1);
    var $mdgriffith$elm_ui$Internal$Model$BorderWidth_fn = function (a, b, c, d, e) {
        return { $: 6, a: a, b: b, c: c, d: d, e: e };
    }, $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5($mdgriffith$elm_ui$Internal$Model$BorderWidth_fn);
    var $mdgriffith$elm_ui$Element$Border$width = function (v) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$borderWidth, $mdgriffith$elm_ui$Internal$Model$BorderWidth_fn("b-" + $elm$core$String$fromInt(v), v, v, v, v));
    };
    var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray([
        $mdgriffith$elm_ui$Element$Input$defaultTextPadding,
        $mdgriffith$elm_ui$Element$Border$rounded(3),
        $mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
        $mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
        $mdgriffith$elm_ui$Element$Border$width(1),
        $mdgriffith$elm_ui$Element$spacing(5),
        $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
        $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
    ]);
    var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
        if (attr.$ === 8) {
            var h = attr.a;
            return $elm$core$Maybe$Just(h);
        }
        else {
            return $elm$core$Maybe$Nothing;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
        return { $: 5, a: a };
    };
    var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
        if (label.$ === 1) {
            var textLabel = label.a;
            return $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Label(textLabel));
        }
        else {
            return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
    var $mdgriffith$elm_ui$Element$inFront = function (element) {
        return $mdgriffith$elm_ui$Element$createNearby_fn(4, element);
    };
    var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
        isConstrained: while (true) {
            switch (len.$) {
                case 1:
                    return false;
                case 0:
                    return true;
                case 2:
                    return true;
                case 3:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isConstrained;
                default:
                    var l = len.b;
                    return true;
            }
        }
    };
    var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
        if (label.$ === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
        if (!label.$) {
            var loc = label.a;
            switch (loc) {
                case 0:
                    return false;
                case 1:
                    return false;
                case 2:
                    return true;
                default:
                    return true;
            }
        }
        else {
            return true;
        }
    };
    var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
        return { gI: -box.gI, hE: -box.hE, h3: -box.h3, iH: -box.iH };
    };
    var $elm$html$Html$Events$alwaysStop = function (x) {
        return _Utils_Tuple2(x, true);
    };
    var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
        return { $: 1, a: a };
    };
    var $elm$html$Html$Events$stopPropagationOn_fn = function (event, decoder) {
        return _VirtualDom_on_fn(event, $elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
    }, $elm$html$Html$Events$stopPropagationOn = F2($elm$html$Html$Events$stopPropagationOn_fn);
    var $elm$json$Json$Decode$at_fn = function (fields, decoder) {
        return $elm$core$List$foldr_fn($elm$json$Json$Decode$field, decoder, fields);
    }, $elm$json$Json$Decode$at = F2($elm$json$Json$Decode$at_fn);
    var $elm$html$Html$Events$targetValue = $elm$json$Json$Decode$at_fn(_List_fromArray(["target", "value"]), $elm$json$Json$Decode$string);
    var $elm$html$Html$Events$onInput = function (tagger) {
        return $elm$html$Html$Events$stopPropagationOn_fn("input", _Json_map1_fn($elm$html$Html$Events$alwaysStop, _Json_map1_fn(tagger, $elm$html$Html$Events$targetValue)));
    };
    var $mdgriffith$elm_ui$Internal$Model$paddingName_fn = function (top, right, bottom, left) {
        return "pad-" + ($elm$core$String$fromInt(top) + ("-" + ($elm$core$String$fromInt(right) + ("-" + ($elm$core$String$fromInt(bottom) + ("-" + $elm$core$String$fromInt(left)))))));
    }, $mdgriffith$elm_ui$Internal$Model$paddingName = F4($mdgriffith$elm_ui$Internal$Model$paddingName_fn);
    var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
        var top = _v0.iH;
        var right = _v0.h3;
        var bottom = _v0.gI;
        var left = _v0.hE;
        if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
            var topFloat = top;
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn("p-" + $elm$core$String$fromInt(top), topFloat, topFloat, topFloat, topFloat));
        }
        else {
            return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn($mdgriffith$elm_ui$Internal$Model$paddingName_fn(top, right, bottom, left), top, right, bottom, left));
        }
    };
    var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
    var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
        isFill: while (true) {
            switch (len.$) {
                case 2:
                    return true;
                case 1:
                    return false;
                case 0:
                    return false;
                case 3:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isFill;
                default:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isFill;
            }
        }
    };
    var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
        isPixel: while (true) {
            switch (len.$) {
                case 1:
                    return false;
                case 0:
                    return true;
                case 2:
                    return false;
                case 3:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isPixel;
                default:
                    var l = len.b;
                    var $temp$len = l;
                    len = $temp$len;
                    continue isPixel;
            }
        }
    };
    var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat_fn = function (top, right, bottom, left) {
        return "pad-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ("-" + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ("-" + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
    }, $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat_fn);
    var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
    var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
    var $mdgriffith$elm_ui$Element$Input$redistributeOver_fn = function (isMultiline, stacked, attr, els) {
        switch (attr.$) {
            case 9:
                return _Utils_update(els, {
                    b: _List_Cons(attr, els.b)
                });
            case 7:
                var width = attr.a;
                return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h),
                    x: _List_Cons(attr, els.x),
                    b: _List_Cons(attr, els.b)
                }) : (stacked ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h)
                }) : _Utils_update(els, {
                    b: _List_Cons(attr, els.b)
                }));
            case 8:
                var height = attr.a;
                return (!stacked) ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h),
                    b: _List_Cons(attr, els.b)
                }) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(els, {
                    h: _List_Cons(attr, els.h),
                    b: _List_Cons(attr, els.b)
                }) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(els, {
                    b: _List_Cons(attr, els.b)
                }) : _Utils_update(els, {
                    b: _List_Cons(attr, els.b)
                })));
            case 6:
                return _Utils_update(els, {
                    h: _List_Cons(attr, els.h)
                });
            case 5:
                return _Utils_update(els, {
                    h: _List_Cons(attr, els.h)
                });
            case 4:
                switch (attr.b.$) {
                    case 5:
                        var _v1 = attr.b;
                        return _Utils_update(els, {
                            h: _List_Cons(attr, els.h),
                            x: _List_Cons(attr, els.x),
                            b: _List_Cons(attr, els.b),
                            aV: _List_Cons(attr, els.aV)
                        });
                    case 7:
                        var cls = attr.a;
                        var _v2 = attr.b;
                        var pad = _v2.a;
                        var t = _v2.b;
                        var r = _v2.c;
                        var b = _v2.d;
                        var l = _v2.e;
                        if (isMultiline) {
                            return _Utils_update(els, {
                                u: _List_Cons(attr, els.u),
                                b: _List_Cons(attr, els.b)
                            });
                        }
                        else {
                            var newTop = t - $elm$core$Basics$min_fn(t, b);
                            var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(_VirtualDom_style_fn("line-height", "calc(1.0em + " + ($elm$core$String$fromFloat(2 * $elm$core$Basics$min_fn(t, b)) + "px)")));
                            var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(_VirtualDom_style_fn("height", "calc(1.0em + " + ($elm$core$String$fromFloat(2 * $elm$core$Basics$min_fn(t, b)) + "px)")));
                            var newBottom = b - $elm$core$Basics$min_fn(t, b);
                            var reducedVerticalPadding = $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$padding, $mdgriffith$elm_ui$Internal$Model$PaddingStyle_fn($mdgriffith$elm_ui$Internal$Model$paddingNameFloat_fn(newTop, r, newBottom, l), newTop, r, newBottom, l));
                            return _Utils_update(els, {
                                u: _List_Cons(attr, els.u),
                                x: _List_Cons(newHeight, _List_Cons(newLineHeight, els.x)),
                                b: _List_Cons(reducedVerticalPadding, els.b)
                            });
                        }
                    case 6:
                        var _v3 = attr.b;
                        return _Utils_update(els, {
                            u: _List_Cons(attr, els.u),
                            b: _List_Cons(attr, els.b)
                        });
                    case 10:
                        return _Utils_update(els, {
                            u: _List_Cons(attr, els.u),
                            b: _List_Cons(attr, els.b)
                        });
                    case 2:
                        return _Utils_update(els, {
                            h: _List_Cons(attr, els.h)
                        });
                    case 1:
                        var _v4 = attr.b;
                        return _Utils_update(els, {
                            h: _List_Cons(attr, els.h)
                        });
                    default:
                        var flag = attr.a;
                        var cls = attr.b;
                        return _Utils_update(els, {
                            b: _List_Cons(attr, els.b)
                        });
                }
            case 0:
                return els;
            case 1:
                var a = attr.a;
                return _Utils_update(els, {
                    x: _List_Cons(attr, els.x)
                });
            case 2:
                return _Utils_update(els, {
                    x: _List_Cons(attr, els.x)
                });
            case 3:
                return _Utils_update(els, {
                    b: _List_Cons(attr, els.b)
                });
            default:
                return _Utils_update(els, {
                    x: _List_Cons(attr, els.x)
                });
        }
    }, $mdgriffith$elm_ui$Element$Input$redistributeOver = F4($mdgriffith$elm_ui$Element$Input$redistributeOver_fn);
    var $mdgriffith$elm_ui$Element$Input$redistribute_fn = function (isMultiline, stacked, attrs) {
        return function (redist) {
            return {
                u: $elm$core$List$reverse(redist.u),
                h: $elm$core$List$reverse(redist.h),
                x: $elm$core$List$reverse(redist.x),
                b: $elm$core$List$reverse(redist.b),
                aV: $elm$core$List$reverse(redist.aV)
            };
        }($elm$core$List$foldl_fn(A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked), { u: _List_Nil, h: _List_Nil, x: _List_Nil, b: _List_Nil, aV: _List_Nil }, attrs));
    }, $mdgriffith$elm_ui$Element$Input$redistribute = F3($mdgriffith$elm_ui$Element$Input$redistribute_fn);
    var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
        var top = _v0.iH;
        var right = _v0.h3;
        var bottom = _v0.gI;
        var left = _v0.hE;
        return $elm$core$String$fromInt(top) + ("px " + ($elm$core$String$fromInt(right) + ("px " + ($elm$core$String$fromInt(bottom) + ("px " + ($elm$core$String$fromInt(left) + "px"))))));
    };
    var $mdgriffith$elm_ui$Internal$Model$Transparency_fn = function (a, b) {
        return { $: 12, a: a, b: b };
    }, $mdgriffith$elm_ui$Internal$Model$Transparency = F2($mdgriffith$elm_ui$Internal$Model$Transparency_fn);
    var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
    var $mdgriffith$elm_ui$Element$alpha = function (o) {
        var transparency = function (x) {
            return 1 - x;
        }($elm$core$Basics$min_fn(1, $elm$core$Basics$max_fn(0, o)));
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$transparency, $mdgriffith$elm_ui$Internal$Model$Transparency_fn("transparency-" + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency), transparency));
    };
    var $mdgriffith$elm_ui$Element$Input$charcoal = $mdgriffith$elm_ui$Element$rgb_fn(136 / 255, 138 / 255, 133 / 255);
    var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
        return $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$fontColor, $mdgriffith$elm_ui$Internal$Model$Colored_fn("fc-" + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor), "color", fontColor));
    };
    var $mdgriffith$elm_ui$Element$el_fn = function (attrs, child) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink), attrs)), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([child])));
    }, $mdgriffith$elm_ui$Element$el = F2($mdgriffith$elm_ui$Element$el_fn);
    var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
    var $mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn = function (_v0, forPlaceholder, on) {
        var placeholderAttrs = _v0.a;
        var placeholderEl = _v0.b;
        return $mdgriffith$elm_ui$Element$el_fn(_Utils_ap(forPlaceholder, _Utils_ap(_List_fromArray([
            $mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
            $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fv + (" " + $mdgriffith$elm_ui$Internal$Style$classes.hW)),
            $mdgriffith$elm_ui$Element$clip,
            $mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 0)),
            $mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Internal$Model$Rgba_fn(0, 0, 0, 0)),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$alpha(on ? 1 : 0)
        ]), placeholderAttrs)), placeholderEl);
    }, $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3($mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn);
    var $mdgriffith$elm_ui$Element$scrollbarY = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.ib);
    var $elm$html$Html$span = _VirtualDom_nodeNS_fn(_VirtualDom_node_a0, "span"), $elm$html$Html$span_fn = $elm$html$Html$span.a2;
    var $elm$html$Html$Attributes$spellcheck_a0 = "spellcheck", $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty($elm$html$Html$Attributes$spellcheck_a0);
    var $mdgriffith$elm_ui$Element$Input$spellcheck_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Input$spellcheck_a1 = $elm$html$Html$Attributes$spellcheck, $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Input$spellcheck_a0, $mdgriffith$elm_ui$Element$Input$spellcheck_a1);
    var $elm$html$Html$Attributes$type__a0 = "type", $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$type__a0);
    var $elm$html$Html$Attributes$value_a0 = "value", $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty($elm$html$Html$Attributes$value_a0);
    var $mdgriffith$elm_ui$Element$Input$value_a0 = $mdgriffith$elm_ui$Internal$Model$Attr, $mdgriffith$elm_ui$Element$Input$value_a1 = $elm$html$Html$Attributes$value, $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Element$Input$value_a0, $mdgriffith$elm_ui$Element$Input$value_a1);
    var $mdgriffith$elm_ui$Element$Input$textHelper_fn = function (textInput, attrs, textOptions) {
        var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
        var redistributed = $mdgriffith$elm_ui$Element$Input$redistribute_fn(_Utils_eq(textInput.ci, $mdgriffith$elm_ui$Element$Input$TextArea), $mdgriffith$elm_ui$Element$Input$isStacked(textOptions.dv), withDefaults);
        var onlySpacing = function (attr) {
            if ((attr.$ === 4) && (attr.b.$ === 5)) {
                var _v9 = attr.b;
                return true;
            }
            else {
                return false;
            }
        };
        var heightConstrained = function () {
            var _v7 = textInput.ci;
            if (!_v7.$) {
                var inputType = _v7.a;
                return false;
            }
            else {
                return $elm$core$Maybe$withDefault_fn(false, $elm$core$Maybe$map_fn($mdgriffith$elm_ui$Element$Input$isConstrained, $elm$core$List$head($elm$core$List$reverse($elm$core$List$filterMap_fn($mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
            }
        }();
        var getPadding = function (attr) {
            if ((attr.$ === 4) && (attr.b.$ === 7)) {
                var cls = attr.a;
                var _v6 = attr.b;
                var pad = _v6.a;
                var t = _v6.b;
                var r = _v6.c;
                var b = _v6.d;
                var l = _v6.e;
                return $elm$core$Maybe$Just({
                    gI: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(b - 3)),
                    hE: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(l - 3)),
                    h3: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(r - 3)),
                    iH: $elm$core$Basics$max_fn(0, $elm$core$Basics$floor(t - 3))
                });
            }
            else {
                return $elm$core$Maybe$Nothing;
            }
        };
        var parentPadding = $elm$core$Maybe$withDefault_fn({ gI: 0, hE: 0, h3: 0, iH: 0 }, $elm$core$List$head($elm$core$List$reverse($elm$core$List$filterMap_fn(getPadding, withDefaults))));
        var inputElement = $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, function () {
            var _v3 = textInput.ci;
            if (!_v3.$) {
                var inputType = _v3.a;
                return $mdgriffith$elm_ui$Internal$Model$NodeName("input");
            }
            else {
                return $mdgriffith$elm_ui$Internal$Model$NodeName("textarea");
            }
        }(), _Utils_ap(function () {
            var _v4 = textInput.ci;
            if (!_v4.$) {
                var inputType = _v4.a;
                return _List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$type__a0, inputType)),
                    $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hA)
                ]);
            }
            else {
                return _List_fromArray([
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hw),
                    $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
                    $mdgriffith$elm_ui$Element$paddingEach(parentPadding),
                    $mdgriffith$elm_ui$Internal$Model$Attr(_VirtualDom_style_fn("margin", $mdgriffith$elm_ui$Element$Input$renderBox($mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
                    $mdgriffith$elm_ui$Internal$Model$Attr(_VirtualDom_style_fn("box-sizing", "content-box"))
                ]);
            }
        }(), _Utils_ap(_List_fromArray([
            $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Input$value_a0, $mdgriffith$elm_ui$Element$Input$value_a1, textOptions.ew),
            $mdgriffith$elm_ui$Internal$Model$Attr($elm$html$Html$Events$onInput(textOptions.dI)),
            $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.dv),
            $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Element$Input$spellcheck_a0, $mdgriffith$elm_ui$Element$Input$spellcheck_a1, textInput.K),
            $elm$core$Maybe$withDefault_fn($mdgriffith$elm_ui$Internal$Model$NoAttribute, $elm$core$Maybe$map_fn($mdgriffith$elm_ui$Element$Input$autofill, textInput.C))
        ]), redistributed.x)), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
        var wrappedInput = function () {
            var _v0 = textInput.ci;
            if (_v0.$ === 1) {
                return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _Utils_ap((heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $elm$core$List$any_fn($mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.e$),
                    $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hz)
                ])), redistributed.b), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([
                    $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asParagraph, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons($mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill), _List_Cons($mdgriffith$elm_ui$Element$inFront(inputElement), _List_Cons($mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hy), redistributed.aV)))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(function () {
                        if (textOptions.ew === "") {
                            var _v1 = textOptions.dL;
                            if (_v1.$ === 1) {
                                return _List_fromArray([
                                    $mdgriffith$elm_ui$Element$text("\u00A0")
                                ]);
                            }
                            else {
                                var place = _v1.a;
                                return _List_fromArray([
                                    $mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn(place, _List_Nil, textOptions.ew === "")
                                ]);
                            }
                        }
                        else {
                            return _List_fromArray([
                                $elm$core$Basics$composeL_fn($mdgriffith$elm_ui$Internal$Model$unstyled_a0, $mdgriffith$elm_ui$Internal$Model$unstyled_a1, $elm$html$Html$span_fn(_List_fromArray([
                                    $elm$html$Html$Attributes$stringProperty_fn($elm$html$Html$Attributes$class_a0, $mdgriffith$elm_ui$Internal$Style$classes.hx)
                                ]), _List_fromArray([
                                    $elm$html$Html$text(textOptions.ew + "\u00A0")
                                ])))
                            ]);
                        }
                    }()))
                ])));
            }
            else {
                var inputType = _v0.a;
                return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons($elm$core$List$any_fn($mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.e$), $elm$core$List$concat(_List_fromArray([
                    redistributed.b,
                    function () {
                        var _v2 = textOptions.dL;
                        if (_v2.$ === 1) {
                            return _List_Nil;
                        }
                        else {
                            var place = _v2.a;
                            return _List_fromArray([
                                $mdgriffith$elm_ui$Element$behindContent($mdgriffith$elm_ui$Element$Input$renderPlaceholder_fn(place, redistributed.u, textOptions.ew === ""))
                            ]);
                        }
                    }()
                ])))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([inputElement])));
            }
        }();
        return $mdgriffith$elm_ui$Element$Input$applyLabel_fn(_List_Cons($mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.gY), _List_Cons($mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.dv) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5), _List_Cons($mdgriffith$elm_ui$Element$Region$announce, redistributed.h))), textOptions.dv, wrappedInput);
    }, $mdgriffith$elm_ui$Element$Input$textHelper = F3($mdgriffith$elm_ui$Element$Input$textHelper_fn);
    var $mdgriffith$elm_ui$Element$Input$multiline_fn = function (attrs, multi) {
        return $mdgriffith$elm_ui$Element$Input$textHelper_fn({ C: $elm$core$Maybe$Nothing, K: multi.el, ci: $mdgriffith$elm_ui$Element$Input$TextArea }, attrs, { dv: multi.dv, dI: multi.dI, dL: multi.dL, ew: multi.ew });
    }, $mdgriffith$elm_ui$Element$Input$multiline = F2($mdgriffith$elm_ui$Element$Input$multiline_fn);
    var $mdgriffith$elm_ui$Element$Input$Placeholder_fn = function (a, b) {
        return { $: 0, a: a, b: b };
    }, $mdgriffith$elm_ui$Element$Input$Placeholder = F2($mdgriffith$elm_ui$Element$Input$Placeholder_fn);
    var $mdgriffith$elm_ui$Element$Input$placeholder = $mdgriffith$elm_ui$Element$Input$Placeholder;
    var $mdgriffith$elm_ui$Element$scrollbars = $mdgriffith$elm_ui$Internal$Model$Class_fn($mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.h9);
    var $mdgriffith$elm_ui$Element$InternalColumn = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$GridPosition = function (a) {
        return { $: 9, a: a };
    };
    var $mdgriffith$elm_ui$Internal$Model$GridTemplateStyle = function (a) {
        return { $: 8, a: a };
    };
    var $elm$core$List$all_fn = function (isOkay, list) {
        return !$elm$core$List$any_fn(A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay), list);
    }, $elm$core$List$all = F2($elm$core$List$all_fn);
    var $mdgriffith$elm_ui$Internal$Model$AsGrid = 3;
    var $mdgriffith$elm_ui$Internal$Model$asGrid = 3;
    var $mdgriffith$elm_ui$Internal$Model$getSpacing_fn = function (attrs, _default) {
        return $elm$core$Maybe$withDefault_fn(_default, $elm$core$List$foldr_fn(F2(function (attr, acc) {
            if (!acc.$) {
                var x = acc.a;
                return $elm$core$Maybe$Just(x);
            }
            else {
                if ((attr.$ === 4) && (attr.b.$ === 5)) {
                    var _v2 = attr.b;
                    var x = _v2.b;
                    var y = _v2.c;
                    return $elm$core$Maybe$Just(_Utils_Tuple2(x, y));
                }
                else {
                    return $elm$core$Maybe$Nothing;
                }
            }
        }), $elm$core$Maybe$Nothing, attrs));
    }, $mdgriffith$elm_ui$Internal$Model$getSpacing = F2($mdgriffith$elm_ui$Internal$Model$getSpacing_fn);
    var $mdgriffith$elm_ui$Internal$Flag$gridPosition = $mdgriffith$elm_ui$Internal$Flag$flag(35);
    var $mdgriffith$elm_ui$Internal$Flag$gridTemplate = $mdgriffith$elm_ui$Internal$Flag$flag(34);
    var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
        return { $: 0, a: a };
    };
    var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
    var $elm$core$List$repeatHelp_fn = function (result, n, value) {
        repeatHelp: while (true) {
            if (n <= 0) {
                return result;
            }
            else {
                var $temp$result = _List_Cons(value, result), $temp$n = n - 1, $temp$value = value;
                result = $temp$result;
                n = $temp$n;
                value = $temp$value;
                continue repeatHelp;
            }
        }
    }, $elm$core$List$repeatHelp = F3($elm$core$List$repeatHelp_fn);
    var $elm$core$List$repeat_fn = function (n, value) {
        return $elm$core$List$repeatHelp_fn(_List_Nil, n, value);
    }, $elm$core$List$repeat = F2($elm$core$List$repeat_fn);
    var $mdgriffith$elm_ui$Element$tableHelper_fn = function (attrs, config) {
        var onGrid = F3(function (rowLevel, columnLevel, elem) {
            return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asEl, $mdgriffith$elm_ui$Internal$Model$div, _List_fromArray([
                $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$gridPosition, $mdgriffith$elm_ui$Internal$Model$GridPosition({ gR: columnLevel, e4: 1, h6: rowLevel, f9: 1 }))
            ]), $mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_fromArray([elem])));
        });
        var columnWidth = function (col) {
            if (!col.$) {
                var colConfig = col.a;
                return colConfig.f9;
            }
            else {
                var colConfig = col.a;
                return colConfig.f9;
            }
        };
        var columnHeader = function (col) {
            if (!col.$) {
                var colConfig = col.a;
                return colConfig.e2;
            }
            else {
                var colConfig = col.a;
                return colConfig.e2;
            }
        };
        var maybeHeaders = function (headers) {
            return $elm$core$List$all_fn($elm$core$Basics$eq($mdgriffith$elm_ui$Internal$Model$Empty), headers) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just($elm$core$List$indexedMap_fn_unwrapped(function (col, header) {
                return A3(onGrid, 1, col + 1, header);
            }, headers));
        }($elm$core$List$map_fn(columnHeader, config.gS));
        var add = F3(function (cell, columnConfig, cursor) {
            if (!columnConfig.$) {
                var col = columnConfig.a;
                return _Utils_update(cursor, {
                    eT: cursor.eT + 1,
                    cT: _List_Cons(A3(onGrid, cursor.h6, cursor.eT, A2(col.f7, _Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? (cursor.h6 - 1) : (cursor.h6 - 2), cell)), cursor.cT)
                });
            }
            else {
                var col = columnConfig.a;
                return {
                    eT: cursor.eT + 1,
                    cT: _List_Cons(A3(onGrid, cursor.h6, cursor.eT, col.f7(cell)), cursor.cT),
                    h6: cursor.h6
                };
            }
        });
        var build = F3(function (columns, rowData, cursor) {
            var newCursor = $elm$core$List$foldl_fn(add(rowData), cursor, columns);
            return { eT: 1, cT: newCursor.cT, h6: cursor.h6 + 1 };
        });
        var children = $elm$core$List$foldl_fn(build(config.gS), {
            eT: 1,
            cT: _List_Nil,
            h6: _Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? 1 : 2
        }, config.g_);
        var _v0 = $mdgriffith$elm_ui$Internal$Model$getSpacing_fn(attrs, _Utils_Tuple2(0, 0));
        var sX = _v0.a;
        var sY = _v0.b;
        var template = $mdgriffith$elm_ui$Internal$Model$StyleClass_fn($mdgriffith$elm_ui$Internal$Flag$gridTemplate, $mdgriffith$elm_ui$Internal$Model$GridTemplateStyle({
            gS: $elm$core$List$map_fn(columnWidth, config.gS),
            h7: $elm$core$List$repeat_fn($elm$core$List$length(config.g_), $mdgriffith$elm_ui$Internal$Model$Content),
            ik: _Utils_Tuple2($mdgriffith$elm_ui$Element$px(sX), $mdgriffith$elm_ui$Element$px(sY))
        }));
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asGrid, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons(template, attrs)), $mdgriffith$elm_ui$Internal$Model$Unkeyed(function () {
            if (maybeHeaders.$ === 1) {
                return children.cT;
            }
            else {
                var renderedHeaders = maybeHeaders.a;
                return _Utils_ap(renderedHeaders, $elm$core$List$reverse(children.cT));
            }
        }()));
    }, $mdgriffith$elm_ui$Element$tableHelper = F2($mdgriffith$elm_ui$Element$tableHelper_fn);
    var $mdgriffith$elm_ui$Element$table_fn = function (attrs, config) {
        return $mdgriffith$elm_ui$Element$tableHelper_fn(attrs, {
            gS: $elm$core$List$map_fn($mdgriffith$elm_ui$Element$InternalColumn, config.gS),
            g_: config.g_
        });
    }, $mdgriffith$elm_ui$Element$table = F2($mdgriffith$elm_ui$Element$table_fn);
    var $author$project$CalculateurDeNotes$voirNotes = function (rpnsEleves) {
        return $mdgriffith$elm_ui$Element$table_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$clip,
            $mdgriffith$elm_ui$Element$scrollbars,
            $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
            $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
            $mdgriffith$elm_ui$Element$Border$rounded(8),
            $mdgriffith$elm_ui$Element$Border$innerShadow({
                bB: 10,
                bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                b6: _Utils_Tuple2(0.3, 0.4),
                cc: 2
            })
        ]), {
            gS: _List_fromArray([
                {
                    e2: $mdgriffith$elm_ui$Element$text("Num\u00E9ro \u00E9tudiant"),
                    f7: function (rpns) {
                        return $mdgriffith$elm_ui$Element$text(rpns.b5);
                    },
                    f9: $mdgriffith$elm_ui$Element$fill
                },
                {
                    e2: $mdgriffith$elm_ui$Element$text("Note"),
                    f7: function (rpns) {
                        var _v0 = rpns.aK;
                        if (_v0.$ === 1) {
                            return $mdgriffith$elm_ui$Element$text("");
                        }
                        else {
                            var nt = _v0.a;
                            return $mdgriffith$elm_ui$Element$text($elm$core$String$fromFloat(nt));
                        }
                    },
                    f9: $mdgriffith$elm_ui$Element$fill
                }
            ]),
            g_: rpnsEleves
        });
    };
    var $author$project$CalculateurDeNotes$view = function (model) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$spacing($author$project$Style$grandEspacement),
            $mdgriffith$elm_ui$Element$padding($author$project$Style$tresGrandEspacement),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing($author$project$Style$petitEspacement),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$scrollbars
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$maximum_fn(300, $mdgriffith$elm_ui$Element$fill)),
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), {
                    dv: $mdgriffith$elm_ui$Element$Input$Label_fn($mdgriffith$elm_ui$Element$Input$labelAbove_a0, _List_Nil, $mdgriffith$elm_ui$Element$text("Bar\u00E8me")),
                    dI: $author$project$CalculateurDeNotes$NouveauBareme,
                    dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("Entrer le bar\u00E8me sous la forme +3 -1, +2 -1"))),
                    el: false,
                    ew: model.a_
                }),
                $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$maximum_fn(300, $mdgriffith$elm_ui$Element$fill)),
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), {
                    dv: $mdgriffith$elm_ui$Element$Input$Label_fn($mdgriffith$elm_ui$Element$Input$labelAbove_a0, _List_Nil, $mdgriffith$elm_ui$Element$text("R\u00E9ponses correctes")),
                    dI: $author$project$CalculateurDeNotes$NouvellesReponsesCorrectes,
                    dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("Entrer les r\u00E9ponses correctes pour chaque sujet"))),
                    el: false,
                    ew: model.bd
                }),
                $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$maximum_fn(300, $mdgriffith$elm_ui$Element$fill)),
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), {
                    dv: $mdgriffith$elm_ui$Element$Input$Label_fn($mdgriffith$elm_ui$Element$Input$labelAbove_a0, _List_Nil, $mdgriffith$elm_ui$Element$text("R\u00E9ponses des \u00E9l\u00E8ves")),
                    dI: $author$project$CalculateurDeNotes$NouvellesReponsesEleves,
                    dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("Entrer les r\u00E9ponses des \u00E9l\u00E8ves"))),
                    el: false,
                    ew: model.be
                })
            ])),
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing($author$project$Style$petitEspacement),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$scrollbars
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$text("Moyenne : " + ($elm$core$String$fromFloat($author$project$CalculateurDeNotes$moyenne(model.L)) + (" \u00C9cart type : " + $elm$core$String$fromFloat($author$project$CalculateurDeNotes$ecartType(model.L))))),
                $author$project$Style$bouton_fn($author$project$CalculateurDeNotes$TelechargerNotes, "T\u00E9l\u00E9charger le fichier de notes"),
                $author$project$CalculateurDeNotes$voirNotes(model.L)
            ]))
        ]));
    };
    var $author$project$GenerateurDeProblemes$GenererSujetAleatoire = { $: 1 };
    var $author$project$GenerateurDeProblemes$GenererVariantesSujet = { $: 2 };
    var $author$project$GenerateurDeProblemes$StructureDuSujet = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$GenerateurDeProblemes$TelechargerSujet = { $: 4 };
    var $mdgriffith$elm_ui$Element$Input$HiddenLabel = function (a) {
        return { $: 1, a: a };
    };
    var $mdgriffith$elm_ui$Element$Input$labelHidden = $mdgriffith$elm_ui$Element$Input$HiddenLabel;
    var $mdgriffith$elm_ui$Internal$Model$Paragraph = { $: 9 };
    var $mdgriffith$elm_ui$Element$paragraph_fn = function (attrs, children) {
        return $mdgriffith$elm_ui$Internal$Model$element_fn($mdgriffith$elm_ui$Internal$Model$asParagraph, $mdgriffith$elm_ui$Internal$Model$div, _List_Cons($mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph), _List_Cons($mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill), _List_Cons($mdgriffith$elm_ui$Element$spacing(5), attrs))), $mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
    }, $mdgriffith$elm_ui$Element$paragraph = F2($mdgriffith$elm_ui$Element$paragraph_fn);
    var $author$project$GenerateurDeProblemes$view = function (model) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$spacing($author$project$Style$grandEspacement),
            $mdgriffith$elm_ui$Element$padding($author$project$Style$tresGrandEspacement),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$scrollbars
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$clip,
                $mdgriffith$elm_ui$Element$scrollbars,
                $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                $mdgriffith$elm_ui$Element$Border$rounded(8),
                $mdgriffith$elm_ui$Element$Border$innerShadow({
                    bB: 10,
                    bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                    b6: _Utils_Tuple2(0.3, 0.4),
                    cc: 2
                })
            ]), {
                dv: $mdgriffith$elm_ui$Element$Input$labelHidden("chose"),
                dI: $author$project$GenerateurDeProblemes$StructureDuSujet,
                dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("Structure du sujet"))),
                el: true,
                ew: model.aP
            }),
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing($author$project$Style$petitEspacement),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$scrollbars
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$paragraph_fn(_List_Nil, _List_fromArray([
                    $mdgriffith$elm_ui$Element$text("\n                            Pour g\u00E9n\u00E9rer 89 sujets al\u00E9toires appuyer sur QuizScan et\n                            pour g\u00E9n\u00E9rer toutes les variantes du sujet appuyer sur EvalBox.\n                            ")
                ])),
                $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
                    $mdgriffith$elm_ui$Element$spacing($author$project$Style$tresGrandEspacement)
                ]), _List_fromArray([
                    $author$project$Style$bouton_fn($author$project$GenerateurDeProblemes$GenererSujetAleatoire, "QuizScan"),
                    $author$project$Style$bouton_fn($author$project$GenerateurDeProblemes$GenererVariantesSujet, "EvalBox"),
                    $author$project$Style$bouton_fn($author$project$GenerateurDeProblemes$TelechargerSujet, "T\u00E9l\u00E9charger")
                ])),
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), $mdgriffith$elm_ui$Element$text(model.aR))
            ]))
        ]));
    };
    var $author$project$GenerateurH5P$GenererContenu = { $: 1 };
    var $author$project$GenerateurH5P$StructureDuContenu = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$GenerateurH5P$TelechargerContenu = { $: 2 };
    var $author$project$GenerateurH5P$view = function (model) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$spacing($author$project$Style$grandEspacement),
            $mdgriffith$elm_ui$Element$padding($author$project$Style$tresGrandEspacement),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$scrollbars
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$clip,
                $mdgriffith$elm_ui$Element$scrollbars,
                $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                $mdgriffith$elm_ui$Element$Border$rounded(8),
                $mdgriffith$elm_ui$Element$Border$innerShadow({
                    bB: 10,
                    bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                    b6: _Utils_Tuple2(0.3, 0.4),
                    cc: 2
                })
            ]), {
                dv: $mdgriffith$elm_ui$Element$Input$labelHidden("chose"),
                dI: $author$project$GenerateurH5P$StructureDuContenu,
                dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("Structure du contenu"))),
                el: true,
                ew: model.aO
            }),
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing($author$project$Style$petitEspacement),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$scrollbars
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
                    $mdgriffith$elm_ui$Element$spacing($author$project$Style$tresGrandEspacement)
                ]), _List_fromArray([
                    $author$project$Style$bouton_fn($author$project$GenerateurH5P$GenererContenu, "G\u00E9n\u00E9rer le contenu"),
                    $author$project$Style$bouton_fn($author$project$GenerateurH5P$TelechargerContenu, "T\u00E9l\u00E9charger")
                ])),
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), $mdgriffith$elm_ui$Element$text(model.aA))
            ]))
        ]));
    };
    var $author$project$GenerateurJson$GenererCodeElm = { $: 2 };
    var $author$project$GenerateurJson$NomObjet = function (a) {
        return { $: 0, a: a };
    };
    var $author$project$GenerateurJson$SourceJson = function (a) {
        return { $: 1, a: a };
    };
    var $author$project$GenerateurJson$TelechargerCodeElm = { $: 3 };
    var $author$project$GenerateurJson$view = function (model) {
        return $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
            $mdgriffith$elm_ui$Element$spacing($author$project$Style$grandEspacement),
            $mdgriffith$elm_ui$Element$padding($author$project$Style$tresGrandEspacement),
            $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
            $mdgriffith$elm_ui$Element$scrollbars
        ]), _List_fromArray([
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing($author$project$Style$petitEspacement),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$scrollbars
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), {
                    dv: $mdgriffith$elm_ui$Element$Input$labelHidden("truc"),
                    dI: $author$project$GenerateurJson$NomObjet,
                    dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("NomDeLobjet"))),
                    el: false,
                    ew: model.U
                }),
                $mdgriffith$elm_ui$Element$Input$multiline_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), {
                    dv: $mdgriffith$elm_ui$Element$Input$labelHidden("chose"),
                    dI: $author$project$GenerateurJson$SourceJson,
                    dL: $elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Input$Placeholder_fn(_List_Nil, $mdgriffith$elm_ui$Element$text("Code source Json \u00E0 int\u00E9grer dans un projet Elm"))),
                    el: false,
                    ew: model.an
                })
            ])),
            $mdgriffith$elm_ui$Element$column_fn(_List_fromArray([
                $mdgriffith$elm_ui$Element$spacing($author$project$Style$petitEspacement),
                $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                $mdgriffith$elm_ui$Element$scrollbars
            ]), _List_fromArray([
                $mdgriffith$elm_ui$Element$row_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
                    $mdgriffith$elm_ui$Element$spacing($author$project$Style$tresGrandEspacement)
                ]), _List_fromArray([
                    $author$project$Style$bouton_fn($author$project$GenerateurJson$GenererCodeElm, "G\u00E9n\u00E9rer le code source Elm"),
                    $author$project$Style$bouton_fn($author$project$GenerateurJson$TelechargerCodeElm, "T\u00E9l\u00E9charger")
                ])),
                $mdgriffith$elm_ui$Element$el_fn(_List_fromArray([
                    $mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
                    $mdgriffith$elm_ui$Element$clip,
                    $mdgriffith$elm_ui$Element$scrollbars,
                    $mdgriffith$elm_ui$Element$padding($author$project$Style$petitEspacement),
                    $mdgriffith$elm_ui$Element$Background$color($elm$core$Basics$composeL_fn($author$project$Style$couleurUI_a0, $author$project$Style$couleurUI_a1, $author$project$Style$couleurArrierePlan)),
                    $mdgriffith$elm_ui$Element$Border$rounded(8),
                    $mdgriffith$elm_ui$Element$Border$innerShadow({
                        bB: 10,
                        bI: $mdgriffith$elm_ui$Element$rgb255_fn(10, 10, 10),
                        b6: _Utils_Tuple2(0.3, 0.4),
                        cc: 2
                    })
                ]), $mdgriffith$elm_ui$Element$text(model.aa))
            ]))
        ]));
    };
    var $author$project$Prof$view = function (model) {
        var _v0 = model.V;
        switch (_v0) {
            case 1:
                return {
                    au: _List_fromArray([
                        $author$project$Style$designGeneral_fn(model.a8, $author$project$CalculateurDeNotes$titre, $mdgriffith$elm_ui$Internal$Model$map_fn($author$project$Prof$CalculateurDeNotesMsg, $author$project$CalculateurDeNotes$view(model.b0)))
                    ]),
                    ch: $author$project$CalculateurDeNotes$titre
                };
            case 0:
                return {
                    au: _List_fromArray([
                        $author$project$Style$designGeneral_fn(model.a8, $author$project$GenerateurDeProblemes$titre, $mdgriffith$elm_ui$Internal$Model$map_fn($author$project$Prof$GenerateurDeProblemesMsg, $author$project$GenerateurDeProblemes$view(model.b1)))
                    ]),
                    ch: $author$project$GenerateurDeProblemes$titre
                };
            case 2:
                return {
                    au: _List_fromArray([
                        $author$project$Style$designGeneral_fn(model.a8, $author$project$GenerateurH5P$titre, $mdgriffith$elm_ui$Internal$Model$map_fn($author$project$Prof$GenerateurH5PMsg, $author$project$GenerateurH5P$view(model.b2)))
                    ]),
                    ch: $author$project$GenerateurH5P$titre
                };
            default:
                return {
                    au: _List_fromArray([
                        $author$project$Style$designGeneral_fn(model.a8, $author$project$GenerateurJson$titre, $mdgriffith$elm_ui$Internal$Model$map_fn($author$project$Prof$GenerateurJsonMsg, $author$project$GenerateurJson$view(model.b3)))
                    ]),
                    ch: $author$project$GenerateurJson$titre
                };
        }
    };
    var $author$project$Prof$main = $elm$browser$Browser$application({ hv: $author$project$Prof$init, hR: $author$project$Prof$UrlChanged, hS: $author$project$Prof$LinkClicked, ir: $author$project$Prof$subscriptions, iN: $author$project$Prof$update, f7: $author$project$Prof$view });
    _Platform_export({ "Prof": { "init": $author$project$Prof$main(_Json_andThen_fn(function (l) {
                return _Json_andThen_fn(function (h) {
                    return $elm$json$Json$Decode$succeed({ af: h, ai: l });
                }, _Json_decodeField_fn("h", $elm$json$Json$Decode$int));
            }, _Json_decodeField_fn("l", $elm$json$Json$Decode$int)))(0) } });
}(this));
