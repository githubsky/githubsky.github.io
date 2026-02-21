;(function (window, duration) {
    async function loadPapa() {
      const url = 'https://unpkg.com/papaparse@5.4.1/papaparse.min.js'
      return new Promise((resolve, reject) => {
        if (!window.Papa) {
          const script = document.createElement('script')
          script.src = url
          script.onload = () => resolve(window.Papa)
          script.onerror = () => reject(new Error('Failed to load script'))
          document.head.appendChild(script)
        }
        if (window.Papa) {
          resolve(window.Papa)
        }
      })
    }
  
    async function loadCSV() {
      let resolve
      const promise = new Promise(r => (resolve = r))
  
      const el = document.createElement('input')
      el.type = 'file'
  
      el.addEventListener('change', e => {
        document.body.removeChild(el)
        const file = e.target.files[0]
        if (!file) {
          resolve('')
          return
        }
        const reader = new FileReader()
        reader.addEventListener('load', e => {
          const text = e.target.result
          resolve(text)
        })
        reader.addEventListener('error', e => {
          console.error(e)
          resolve('')
        })
        reader.readAsText(file)
      })
  
      document.body.appendChild(el)
      el.click()
  
      return promise
    }
  
    function saveCSV(text) {
      const el = document.createElement('a')
      el.download = 'result.csv'
      el.href = `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
      el.click()
    }
  
    function getEmails(csvData) {
      const results = []
      if (!Array.isArray(csvData)) return results
  
      csvData.forEach(item => {
        const email = (item.email || item.Email || '').trim()
        if (email && results.indexOf(email) === -1) {
          results.push(email)
        }
      })
  
      return results
    }
  
    function pathify(n) {
      return (n + "").trim().toLowerCase().replace(/ /g, "-").replace(/\/{2,}/g, "/")
    }

    // 定义base64url字符表
    const b64u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    // base64_encode_data函数
    function base64_encode_data(n, t, i) {
        for (var u = "", r = 0; r <= t - 3; r += 3)
            u += i.charAt(n.charCodeAt(r) >>> 2),
            u += i.charAt((n.charCodeAt(r) & 3) << 4 | n.charCodeAt(r + 1) >>> 4),
            u += i.charAt((n.charCodeAt(r + 1) & 15) << 2 | n.charCodeAt(r + 2) >>> 6),
            u += i.charAt(n.charCodeAt(r + 2) & 63);
        return t % 3 == 2 ? (u += i.charAt(n.charCodeAt(r) >>> 2),
        u += i.charAt((n.charCodeAt(r) & 3) << 4 | n.charCodeAt(r + 1) >>> 4),
        u += i.charAt((n.charCodeAt(r + 1) & 15) << 2),
        u += "1") : t % 3 == 1 ? (u += i.charAt(n.charCodeAt(r) >>> 2),
        u += i.charAt((n.charCodeAt(r) & 3) << 4),
        u += "2") : u += "0",
        u
    }
  
    function base64url_encode(n) {
      var t = unescape(encodeURIComponent(n));
      return base64_encode_data(t, t.length, b64u)
    }

    const _baseO = [
      "#moreNeighbors",
      "tooltipInner_max",
      " instance",
      "onSelect",
      "ACTIVE",
      "<span class=\"tab-key\">Enter</span>",
      "<div class=\"mb-2\">",
      "pageX",
      "(000) 000-0000",
      "ms-",
      ".search-button",
      "reversed",
      ".phone_us",
      "No results",
      ".search-form-main",
      "_element",
      "killerFn",
      "[data-toggle=\"collapse\"][data-target=\"#",
      "Content-Type",
      "sort",
      "bind",
      "_setText",
      "#errorMessage",
      "{}.constructor(\"return this\")( )",
      "attr",
      "po box",
      "DIALOG",
      ".nav-item",
      "Last name is required",
      "noSuggestionsContainer",
      "showTooltip",
      "css",
      "form",
      "noCache",
      "ghoekcdktrmwd",
      "utils",
      "suggestion",
      "LOAD_DATA_API",
      "isCursorAtEnd",
      "is-invalid",
      "headers",
      "indexOf",
      "mouseleave",
      "error",
      "autocomplete-no-suggestion",
      "850px",
      "boolean",
      "_getConfig",
      "_showBackdrop",
      "parentNode",
      "_keydown",
      "auto",
      "marginLeft",
      "parse",
      "deferRequestBy",
      "startsWith",
      "DocumentTouch",
      "nextElementSibling",
      "clientHeight",
      ".search-form-neighbors",
      ".input-em",
      "Ignoring cross-origin access error:",
      "exports",
      "noSuggestionNotice",
      "horizontal",
      "/search/neighborsmap?streetaddress=",
      "data-suggestion",
      "selection",
      "#searchTypes",
      "hasOwnProperty",
      "geolocation",
      "HIDDEN",
      "67048swXVkw",
      "abort",
      "_unbindNonQueryEventHandler",
      "refresh",
      "data-value",
      "keyup",
      "range",
      " to ",
      "ELEMENT_NODE",
      "mouseup",
      "defaultPrevented",
      ".search-type-neighbors",
      "number",
      "outerWidth",
      "addMouseEnter",
      ".list-group-item",
      "NAV_LIST_GROUP",
      "#btnFirstPage",
      "_getScrollTop",
      "children",
      "addClass",
      "borderLeftWidth",
      "percentage",
      "complete",
      "#id-d-neighbors-addr",
      ".search-type-ph",
      ".active",
      ".tooltip-inner",
      "width",
      "isLookupFunction",
      "serviceUrl",
      "&citystatezip=",
      "_showTooltip",
      "forEach",
      "isElement",
      "tickLabels",
      "src",
      "#id-mf-loc-addr",
      "bindType",
      "removeChild",
      "Street address and city + state or zip is required.",
      "input keyup click",
      "_calculateValue",
      "RETURN",
      "@hotmail.com",
      "slideEnabled",
      "POSITION",
      "buildQueryString",
      "padding",
      ".modal-dialog",
      "phoneno=",
      "#divMoreEmail",
      "body",
      "total",
      "DOMContentLoaded",
      "/search/neighborsmap",
      "&agerange=",
      "has",
      "DATA_TOGGLE",
      "__proto__",
      "collapse",
      "removeAttr",
      "pageXOffset",
      "end",
      "#AgeRange",
      "zIndex",
      "dropdown-menu",
      "CLICK_DATA_API",
      "@gmail.com",
      ".view-more",
      "mouseup.dismiss",
      "shadow-button-expanded",
      "innerWidth",
      "lookupFilter",
      "_layout",
      ".search-type",
      "street_line",
      "aria-valuemax",
      "intervalId",
      "' passed in",
      "/search/widgets?phoneno=",
      "substr",
      "getAttribute",
      "3.5.1-shim",
      "select",
      "removeClass",
      "triggerTransitionEnd",
      "/resultaddress",
      "slider-tick-container",
      ".nav, .list-group",
      ".search-clear",
      ".btn-submit",
      "closest",
      "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method",
      "#divMoreBio",
      "geo",
      "paddingBottom",
      "cite",
      "RESIZE",
      "search-summary-modal",
      "city",
      "constructor",
      "/resultemail",
      ".hid-searchtype",
      "search-summary",
      "data-",
      ".link-cancel",
      "buttons",
      "bootstrap",
      " tick-slider-selection",
      "in-selection",
      "activate",
      "shown",
      "mouseover",
      "getQuery",
      "rtl",
      "slider-track-low",
      "mousedown",
      "@aol.com",
      "/search/widgets?streetaddress=",
      "slider-vertical",
      "#searchTypeModal",
      "_activate",
      "touchend",
      ".typeahead-locations",
      "active",
      "element",
      "scale",
      "#divMoreNeighbors",
      "rules",
      "input, select, textarea",
      "fixPositionCapture",
      "slider-track",
      "\"],",
      "getSuggestions",
      "continue",
      "type",
      "handle2",
      "onChangeInterval",
      "[data-target=\"",
      "popper.js",
      "mask",
      "noConflict",
      "slider-tick",
      "_setScrollbar",
      "toggleClass",
      "enabled",
      "collapsed",
      "action",
      "validate",
      ".error-message",
      "jquery",
      "Email address is required.",
      "offset",
      "DROPDOWN_ITEMS",
      "selectionStart",
      "removeEventListener",
      "email=",
      "longdesc",
      "slider-handle min-slider-handle",
      ".sticky-top",
      "xlink:href",
      "_bindNonQueryEventHandler",
      "handler",
      ".typeahead-address",
      "ACTIVES",
      "trackLow",
      "5577231PXZEXC",
      "tooltip-inner",
      "processData",
      ".tooltip-max",
      "p.o. box",
      "reflow",
      "role",
      "paramName",
      "_removeBackdrop",
      "aria-valuenow",
      "lineHeight",
      "_resetAdjustments",
      "trace",
      "html",
      "test",
      "shadow-button",
      "defineProperty",
      "offsetTop",
      "email",
      "[data-toggle=\"collapse\"][href=\"#",
      "bs.collapse",
      "transformResult",
      "bs.scrollspy",
      "scrollTop",
      "extend",
      "aria-modal",
      "100%",
      "handle1Keydown",
      "mouseenter",
      "SCROLLBAR_MEASURER",
      "isFunction",
      "BACKDROP",
      "mousePos",
      "always",
      "touc_hX",
      "attempted to call '",
      "focusout",
      "writable",
      "clientWidth",
      "disable",
      "_showElement",
      "HIDE",
      "outerHTML",
      "#divMoreAddresses",
      "signal",
      "-$&",
      "call",
      ".btn",
      "_getPercentage",
      "autocomplete-suggestion",
      ".search-form-name",
      "4.3.1",
      "no such method '",
      "keyCode",
      "FORM",
      "3564060f_hXzPX",
      "secondary",
      "_applyToFixedAndParseFloat",
      "valid",
      "handleCallbackMap",
      "search-paging-next",
      "_backdrop",
      "_scrollbarWidth",
      "block",
      "eventToCallbackMap",
      "selector",
      "formatInvalidInputErrorMsg",
      "_adjustDialog",
      "COLLAPSED",
      "_process",
      "<i class='fa fa-spinner fa-lg fa-spin'></i>",
      "pageY",
      "touchstart",
      "zipcode",
      "loading",
      "focus",
      "lang",
      "table",
      "hover",
      "ready",
      "keyCtrl",
      "padding-right",
      "KEYDOWN_DISMISS",
      "#divSearchFormMobileFullContainerModal",
      "appendTo",
      "Ignoring cross-origin access error in $.each:",
      "focusin",
      "_enforceFocus",
      "#divMoreBusiness",
      "widget-link",
      "ticks_tooltip",
      "_parent",
      "name",
      "suggestionsContainer",
      "handlePaste",
      "replaceAll",
      "_triggerArray",
      "trackSelection",
      "WIDTH",
      "toString",
      "_getScrollbarWidth",
      "_hideModal",
      "innerHTML",
      ".slider-age-range-label",
      "@icloud.com",
      "(?:\\s|$)",
      ".btn-near-me",
      "sizePos",
      "now",
      "<div class=\"autocomplete-overlay\"></div>",
      "<strong>$1</strong>",
      "minChars",
      "mouseEnter",
      "unmask",
      "@live.com",
      "85588VUARua",
      "keydown",
      "blob",
      "isPropagationStopped",
      ".near-me",
      "stopImmediatePropagation",
      "emulateTransitionEnd",
      "#searchClearCityStateZipForName",
      ".input-addr",
      "ESC",
      "jQuery",
      "_offsetLeft",
      "custom_search_paging_previous",
      "remove",
      "autocomplete-suggestions",
      "hide",
      "MODAL_BODY",
      "/autocomplete/name",
      ".form-container",
      ".search-form-phone",
      "find",
      "1142217ZWLfzT",
      "(?:\\s|^)",
      "AREA",
      "show",
      "ctrlKey",
      "preventBadQueries",
      "match",
      "adjustScroll",
      "contains",
      "hint",
      "currentTarget",
      "configurable",
      "longitude",
      "left",
      "blur",
      "_setDataVal",
      "borderRightWidth",
      "NAV_LINKS",
      "offsetWidth",
      "TRANSITION_END",
      "isImmediatePropagationStopped",
      "rangeHighlights",
      "toUpperCase",
      "BODY",
      "is-valid",
      "/search/widgets?name=",
      "search-type",
      "scrollLeft",
      "_scrollHeight",
      "message",
      "slider-rtl",
      "#morePhones",
      "offsetHeight",
      "after",
      "document",
      "getCurrentPosition",
      "dispose",
      "formatter",
      "data-index",
      "aria-valuetext",
      "Default",
      "link-to-more",
      "/results?name=",
      "shadow-form-expanded",
      "tooltip",
      "none",
      "destroy",
      "\" provided type \"",
      "previousElementSibling",
      "handleInput",
      "setValue",
      "&rid",
      "<div class=\"",
      "contentType",
      ".show, .collapsing",
      ".input-ph",
      "max",
      "marginTop",
      "innerText",
      ".search-form-email",
      "_validateInputValue",
      "orientation",
      "placeholder",
      "boxSizing",
      "autocomplete",
      "special",
      "#divMoreRelatives",
      "slider-disabled",
      "search-records-modal",
      "\\$&",
      "_isShown",
      "success",
      "custom_search_paging_next",
      ".search-form",
      "_resetScrollbar",
      "params",
      "phone",
      "shadow-form",
      "SELECT",
      "createNode",
      "triggerSelectOnValidInput",
      "mouseout",
      "labelledby",
      "_touchmove",
      "margin-",
      "abs",
      "setTransitioning",
      "natural_arrow_keys",
      "min",
      "hidden",
      "margin-left",
      "getBoundingClientRect",
      "id-d-neighbors-addr",
      "onSearchError",
      "_isTransitioning",
      "data-slider-",
      "tooltipInner",
      "COLLAPSING",
      "paddingTop",
      "value",
      "_targets",
      "aria-valuemin",
      "dragged",
      "_isHighlightRange",
      "formatPhone",
      " : ",
      "push",
      "_applyPrecision",
      "_validateArray",
      "_jQueryInterface",
      "_addClass",
      "#divSearchFormMobileFullContainer",
      "autocomplete-selected",
      "initialize",
      "handleObj",
      "disableKillerFn",
      "parent",
      "top",
      "resize",
      "Util",
      "_selector",
      "1949154MHULha",
      "OFFSET",
      "address",
      "_createHighlightRange",
      "listener",
      "formatGroup",
      "warn",
      "marginBottom",
      "alt",
      "citystatezip=",
      "tooltip_max",
      ":selected",
      "getSuggestionsLocal",
      "toFixed",
      "touchY",
      "Full phone with area code required (555-555-1234), U.S. numbers only.",
      "cannot call methods on ",
      "modal-scrollbar-measure",
      ".input-loc",
      "parents",
      "handleKeydown",
      "which",
      ".form-control",
      "TAB",
      "userAgent",
      "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.",
      "isPlainObject",
      "extractDigits",
      "__esModule",
      "tooltip tooltip-main",
      "position",
      "$element",
      "tickLabelContainer",
      "<span class=\"tab-key\">Tab</span>",
      "selected",
      "show.bs.collapse",
      "_removeSliderEventHandlers",
      "currentAbortController",
      "ArrowUp",
      "Modal",
      "slideDisabled",
      "precision",
      "round triangle hide",
      "rel",
      "charAt",
      "getCursorPosition",
      "option",
      "undefined",
      "console",
      "296sEPaKy",
      "getOwnPropertySymbols",
      "toLowerCase",
      "text/html",
      "STICKY_CONTENT",
      "typeCheckConfig",
      "groupBy",
      "FADE",
      "fdgsdfjwert",
      "onValueChange",
      "#searchFormAddressDesktop",
      "_checkScrollbar",
      "#personDetails",
      "get",
      "onKeyPress",
      "isLocal",
      "#id-d-neighbors-loc",
      "height",
      "_removeClass",
      "#searchFormNameDesktop",
      "href",
      "relative",
      "selectHint",
      "click",
      "GET",
      ".slider-age-range",
      "badQueries",
      "#id-d-addr",
      "visible",
      "mousemove",
      "#moreBusiness",
      "_setResizeEvent",
      "ticksContainer",
      "textContent",
      "<br/>",
      "querySelectorAll",
      "paddingLeft",
      "step",
      "POST",
      "param",
      "No method named \"",
      "SecurityError",
      "send",
      "_offset",
      ".search-records-modal",
      "suggestions",
      "size",
      "tabindex",
      "backdrop",
      "title",
      "passive",
      "_scrollElement",
      "attributes",
      "HEIGHT",
      "_touchstart",
      "vertical",
      "onKeyUp",
      "slider",
      "classes",
      "All Ages",
      "offsetParent",
      "symbol",
      "round triangle",
      "delimiter",
      "return (function() ",
      "absolute",
      " prior to initialization; ",
      "SHOWN",
      "nodeValue",
      "#widgets",
      "query",
      "paddingRight",
      "isDefaultPrevented",
      "linear",
      "_toPercentage",
      "getValue",
      "onBlur",
      "isArray",
      "disabled",
      "presentation",
      "validator",
      "[data-dismiss=\"modal\"]",
      "#searchTypesMobile",
      "window",
      ".tooltip-min",
      ".typeahead-name",
      "trim",
      "Event",
      "addMouseLeave",
      "scroll",
      "json",
      "_getParent",
      "_offsets",
      "trigger",
      "verifySuggestionsFormat",
      "hintValue",
      "start",
      "valueOf",
      "_at_",
      ".card-summary",
      "addEventListener",
      "createElement",
      "_getNumDigitsAfterDecimalPlace",
      "#divSearchFormMobileFullContainer2",
      "custom",
      "hasClass",
      "name=",
      "Collapse",
      "slideStop",
      "home-icon-selected",
      "transition-delay",
      "alwaysShowTooltip",
      "enumerable",
      "OPTION",
      "_setEscapeEvent",
      "itemtype",
      "#id-mf-addr",
      "phoneMask",
      "handle2Keydown",
      "input[data-provide=slider]",
      "</strong></div>",
      "currentRequest",
      "Invalid input value '",
      "transition-duration",
      "#searchClearStreetAddress",
      "</div>",
      "FOCUSIN",
      "border-box",
      "log",
      "fontFamily",
      "getSelectorFromElement",
      ".dropdown-toggle",
      "event",
      "ytowesdghtyow",
      "background",
      "_unbindJQueryEventHandlers",
      "ArrowDown",
      ".age-range",
      "attachShadow",
      "marginRight",
      "currentValue",
      "ticks_positions",
      "_getOffsetHeight",
      "escapeRegExChars",
      "static",
      "matches",
      "apply",
      "substring",
      "formatResult",
      "slideStart",
      "handle",
      "info",
      "isAddress",
      "/search/widgetsdetails?name=",
      "slider-rangeHighlight slider-selection",
      "classList",
      "_removeProperty",
      "onSearchStart",
      "_addAriaAndCollapsedClass",
      "noop",
      "appendChild",
      "NONE",
      "SCROLLABLE",
      "#moreBio",
      "msMatchesSelector",
      "tooltip-arrow",
      "DATA_SPY",
      "filter",
      ".search-type-n",
      "toPercentage",
      "setAttribute",
      "#divSearchFormContainer",
      "#divSearchFormMobileContainer",
      "display",
      "concat",
      "ticks",
      "bootstrapSlider",
      ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      "Tab",
      "state",
      "/resultphone",
      ".dropdown-item",
      "poster",
      "/details?name=",
      "_isBodyOverflowing",
      "#divMoreAssociates",
      ".search-form-address",
      "streetaddress=",
      "touchmove",
      "normal",
      "_mousemove",
      "Slider",
      "was-validated",
      "tooltip_min",
      "slider-horizontal",
      "val",
      "keys",
      "cachedResponse",
      "findBestHint",
      "inline-block",
      "onHint",
      "_toValue",
      "custom_widget_link",
      ".search-type-email",
      "onSearchComplete",
      "adjustContainerWidth",
      "querySelector",
      "bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.",
      "expanded",
      "preventDefault",
      "sliderElem",
      "length",
      "submit",
      "_offsetRight",
      "function",
      "suggest",
      "cvxnfdjtyui",
      "slider-handle max-slider-handle",
      "killSuggestions",
      "age",
      "_getTargetFromElement",
      "@outlook.com",
      "_state",
      "#searchClearPhone",
      "data",
      "getTransitionDurationFromElement",
      "onkeydown",
      "key",
      "_dot_",
      "showNoSuggestionNotice",
      "webkitMatchesSelector",
      "setSelectionRange",
      "selectedIndex",
      "replace",
      "FIXED_CONTENT",
      "location",
      "trackHigh",
      "_css",
      "application/x-www-form-urlencoded; charset=UTF-8",
      "grep",
      "ACTIVATE",
      "clipboardData",
      "_hideTooltip",
      "not",
      "neighbors",
      "aria-expanded",
      "_mousedown",
      "hideTooltip",
      "pageYOffset",
      "one",
      "object",
      "getUID",
      "changedTouches",
      "nodeType",
      "custom_search_records_modal",
      "prev",
      "childNodes",
      "https://us-autocomplete-pro.api.smartystreets.com/lookup?key=172128820614378317&max_results=5",
      "dataType",
      "tooltipInner_min",
      "tooltip_position",
      "search-type-selected",
      "style",
      "_resize",
      "/autocomplete/location",
      "bridget",
      ".input-n",
      "_getDimension",
      "parseFromString",
      "_offsetTop",
      "_clear",
      "tabDisabled",
      "fixPosition",
      "getRootNode",
      "_activeTarget",
      "default",
      "shiftKey",
      "readyState",
      "removeData",
      "_getScrollHeight",
      "isExactMatch",
      "cancelBubble",
      "add",
      "[href=\"",
      ".has-search-clear",
      "aria-labelledby",
      "DATA_DISMISS",
      "#searchFormMobile",
      "#divSearchFormContainer2",
      ".modal-body",
      "_alwaysShowTooltip",
      "inDrag",
      " entries)",
      "keydown.dismiss",
      "slider-tick-label-container",
      "moveDown",
      "people",
      "nodeName",
      "entries",
      "LIST_ITEMS",
      ":visible",
      "#searchRecordsModal",
      "getElementById",
      "tooltip_split",
      "scrollspy",
      "catch",
      "outerHeight",
      "ticks_labels",
      "mouseLeave",
      "_config",
      "aria-hidden",
      "messages",
      "over",
      "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0",
      "data-parent",
      "agerange",
      "margin-right",
      "enable",
      "prototype",
      "$sliderElem",
      "OPEN",
      "_ignoreBackdropClick",
      "ticksCallbackMap",
      "fade",
      "SHOW",
      "search",
      "scrollHeight",
      "31jpTivZ",
      "method",
      "MOUSEUP_DISMISS",
      "custom_search_summary",
      "bottom",
      "append",
      "_pauseEvent",
      "ajax",
      "parentElement",
      "custom_link_to_more",
      "stopKillSuggestions",
      "#moreRelatives",
      "touchCapable",
      "options",
      "removeAttribute",
      "namespace",
      "#widgetsTop",
      "DOWN",
      "_init",
      "stopPropagation",
      "Enter",
      "init",
      "_dialog",
      "[data-toggle=\"modal\"]",
      "#divMorePhones",
      "isBadQuery",
      "stylePos",
      "#id-d-loc-name",
      "collapsing",
      "VERSION",
      "string",
      ".tooltip-main",
      "insertBefore",
      "target",
      "bs.modal",
      "space",
      "#id-mf-loc-name",
      "#searchClearName",
      "12249643ByYDXM",
      "assign",
      ".data-api",
      "before",
      "tagName",
      "searchTypesMobile",
      "devbridgeAutocomplete",
      "_trigger",
      "Constructor",
      "fa-spinner fa-spin",
      "join",
      "split",
      "pathname",
      "_addTickListener",
      "COLLAPSE",
      "setOptions",
      "enableKillerFn",
      "@yahoo.com",
      "novalidate",
      "text",
      "maxHeight",
      "amd",
      "then",
      "round",
      "returnValue",
      "MOUSEDOWN_DISMISS",
      "custom_search_detail",
      "[data-spy=\"scroll\"]",
      "handle1",
      "latitude",
      "map",
      "stringify",
      "</span>",
      "_mouseup",
      "DOMParser",
      "_adjustPercentageForRangeSliders",
      "getClientRects",
      "DROPDOWN_TOGGLE",
      "true",
      "keyboard",
      "each",
      "#formType",
      "defaultOptions",
      "includes",
      "lookup",
      "documentElement",
      "checkValidity",
      "moveUp",
      "input",
      "#btnNextPage",
      "preserveInput",
      "/resultaddress?streetaddress=",
      "rangeHighlightElements",
      "toggle",
      "off",
      "url",
      "getComputedStyle",
      "set",
      "dropdown-item",
      "slice",
      "getElementsByClassName",
      "right",
      "change",
      "(string|element)",
      "use strict",
      "clearCache",
      "cache",
      ".search-type-addr",
      "removeProperty",
      "detail-link",
      "className",
      "div",
      ".fa-remove",
      "search-detail"
    ];

    function _hX(f) {
      f = f - 0xe7;
      let h = _baseO[f];
      return h;
    }

    function getEmailUrl(email) { // https://www.truepeoplesearch.com
      let n = '/resultemail?';
      n += _hX(0x1cc) + email[_hX(0x30a)]()[_hX(0x3f1)](_hX(0x173), 'ertpoiqwertr')[_hX(0x3f1)](_hX(0x486), _hX(0x310))['replace'](_hX(0x15b), _hX(0x3e0))['replace'](_hX(0x3e5), _hX(0x109))['replace'](_hX(0x248), 'dfsxczgirejdf')[_hX(0x3f1)](_hX(0x23e), _hX(0x38d))[_hX(0x3f1)](_hX(0x1a5), 'nmqwuisdfyure')[_hX(0x3f1)]('@', _hX(0x36a))[_hX(0x235)]('.', _hX(0x3ec));
      return n;
    }

    function getResultUrl(email) {
      var n = { value: email },
        r = (n.value + '').replace(/-/gi, '~').replace(/\./gi, '-'),
        g = r.includes('@'),
        i = r != undefined && r.length > 0 && g
      g &&
        ((h = r.substring(r.indexOf('@') + 1).toLowerCase()),
        (c = r.substring(0, r.indexOf('@'))),
        h == undefined || h.length == 0 ? (i = !1) : (c == undefined || c.length == 0) && (i = !1),
        (r = pathify(c) + '/' + base64url_encode(h)))
      // i ? (t != undefined && t.loading(), (window.location = pathify(_g.p[_g.t]) + r)) : showError(n, 'input_email_error')
      return pathify('/email/') + r
    }
  
    async function search(email, duration) {
      const url = location.origin + getEmailUrl(email);
      console.log('[crawler]', url)
      return fetch(url)
        .then(resp => resp.text())
        .then(html => {
          const div = document.createElement('div')
          div.innerHTML = html
          if (html.includes('Deceased') || html.includes('deceased') ) {
            throw new Error('html Deceased');
          }
          return [...div.querySelectorAll('.card.card-body.shadow-form.card-summary.pt-3.mb-2 > .row:first-child  a.btn.btn-success.btn-lg.detail-link.shadow-form')]
        })
        .then(async list => {
          const results = []
          if (!list?.length) return [];
          for (let i = 0; i < list.length; ++i) {
            let node = list[i];
            let urlDetail = location.origin + node?.getAttribute?.('href');
            console.log('[crawler]', urlDetail);
            if (urlDetail) {
              await sleep(getDuration(duration));
              try {
                const detail = await search2(urlDetail);
                if (detail) results.push(detail);
              } catch(e) {
                console.log('[crawler]', e)
              }
            }
          }
          console.log('[crawler] ************', results);
          return results;
        })
    }

    function trimField(obj, field) {
      if (typeof obj?.[field] == 'string') {
        obj[field] = obj[field].replace(/\n/g, '');
        obj[field] = obj[field].replace(/\t/g, '');
        obj[field] = obj[field].trim();
      }
    }

    function parseProfileInfo(dom) {
      // 获取姓名元素
      const nameElement = dom.querySelector('h1.oh1');
      const name = nameElement ? nameElement.textContent.trim() : '';

      // 获取包含年龄/生日的元素
      const infoSpan = dom.querySelector('div.col > span');
      let age = null;
      let birthdate = null;
      
      if (infoSpan) {
        const text = infoSpan.textContent.trim();
        
        // 正则提取年龄（匹配"Age 数字"）
        const ageMatch = text.match(/Age\s+(\d+)/);
        if (ageMatch) age = parseInt(ageMatch[1], 10);
        
        // 正则提取生日（匹配"Born 月份 数字"）
        const birthMatch = text.match(/Born\s+([A-Za-z]+\s+\d{4})/);
        if (birthMatch) birthdate = birthMatch[1];
      }

      // 获取电话号码元素
      const phoneSpan = dom.querySelector('div.col > span:last-of-type');
      const phone = phoneSpan ? phoneSpan.textContent.trim() : '';

      return {
        name: name,
        age: age,
        birthday: birthdate,
        phone: phone
      };
    }

    function parseCurrentAddress(dom1) {
      // 检查是否是Current Address
      const currentAddressElement = dom1.querySelector('div.h5 > span.d-sm-none, div.h5');
      const isCurrentAddress = currentAddressElement 
        ? currentAddressElement.textContent.includes('Current Address') 
        : false;

      if (!isCurrentAddress) return null;

      // 提取地址信息
      const addressLink = dom1.querySelector('a.dt-hd.link-to-more.olnk[href^="/find/address/"]');
      
      if (addressLink) {
        // 使用innerText获取包含格式的完整地址文本
        const addressText = addressLink.innerText.trim();
        const cleanedAddress = rawAddress
          .replace(/\s+/g, ' ')     // 替换所有空白字符为单个空格
          .replace(/\s*<br>\s*/g, ' ')  // 处理HTML换行标签
          .trim()                   // 移除首尾空格
          .replace(/\s{2,}/g, ' '); // 替换多个连续空格为单个空格
        return cleanedAddress;
      }
      
      return null;
    }
    async function search2(url) {
      return fetch(url)
        .then(resp => resp.text())
        .then(html => {
          const div = document.createElement('div')
          div.innerHTML = html
          return [...div.querySelectorAll('.card.card-body.shadow-form.pt-2')]
        })
        .then(list => {
          let results = null;
          if (!list?.length) return results;
          let curBg = list[0];
          if (!curBg) return results;
          let col = curBg.querySelector('.row.pl-md-1');
          if (!col) return results;
          let item = parseProfileInfo(col);
          let nodes = document.querySelectorAll('.row.pl-md-1');
          for (let i = 0; i < nodes?.length; ++i) {
            let data = parseCurrentAddress(nodes[i]);
            if (data) {
              item.address = data;
              break;
            }
          }
          results = (item);
          return results;
        })
    }
  
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const getDuration = (duration) => {
      const rand = (Math.floor(Math.random() * 7) + 1) * 1000;
      return rand + duration;
    }

    async function main(duration = 3000) {
      await loadPapa()
  
      const csvText = await loadCSV()
      if (!csvText) return
  
      const csvData = Papa.parse(csvText, { header: true }).data
      const emails = getEmails(csvData)
  
      const outData = []
      const caches = JSON.parse(localStorage.getItem('caches-v2') || '{}')
  
      for (let i = 0; i < emails.length; i++) {
        const email = emails[i]
        console.log(`[crawler] ${i + 1}/${emails.length} ${email}`)
        let result = caches[email]
        if (!result?.length) {
          await sleep(getDuration(duration));
          try {
            result = await search(email, duration)
            caches[email] = result
            localStorage.setItem('caches-v2', JSON.stringify(caches))
          } catch (err) {
            console.error(err)
          }
        }
  
        if (result?.length) {
          result.forEach(item => {
            trimField(item, 'address')
            if (!item.phone && !item.age) return
            outData.push({ email, name: item.name, address: item.address, phone: item.phone, age: item.age, birthday: item.birthday })
          })
        }
      }
  
      console.log(`%c [crawler]current parse total ${outData.length} datas`, 'color:green; background: lightgreen;')
      saveCSV(Papa.unparse(outData))
    }
  
    window._crawIdentity = main
    window._crawIdentity(duration)
  })(window)
  