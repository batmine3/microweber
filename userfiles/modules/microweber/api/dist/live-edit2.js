/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./userfiles/modules/microweber/api/liveedit2/analizer.js":
/*!****************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/analizer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DroppableElementAnalyzerService": () => (/* binding */ DroppableElementAnalyzerService)
/* harmony export */ });
/* harmony import */ var _element_analizer_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-analizer.service */ "./userfiles/modules/microweber/api/liveedit2/element-analizer.service.js");


class DroppableElementAnalyzerService extends _element_analizer_service__WEBPACK_IMPORTED_MODULE_0__.ElementAnalyzerServiceBase  {

    constructor(settings) {
        super(settings);
        this.settings = settings;
        this._tagsCanAccept = ['DIV', 'ARTICLE', 'ASIDE', 'FOOTER', 'HEADER', 'MAIN', 'SECTION', 'DD', 'LI', 'TD', 'FORM'];
        this.init();
    }

    isConfigurable (target) {
        return this.isElement(target) || this.isModule(target) || this.isRow(target);
    }

    isEditableLayout (node) {
        return this.this.isLayout(node) && this.isInEdit(node);
    }

    canMoveModule (node) {
        return this.isModule(node) && this.isInEdit(node);
    }


    canAcceptByClass (node) {
        return this.tools.hasAnyOfClasses(node, this.dropableElements());
    }

    canAcceptByTag (node) {
        if(!node || node.nodeType !== 1) return false;
        return this._tagsCanAccept.indexOf(node.nodeName) !== -1;
    }

    allowDrop (node) {
        return this.tools.parentsOrCurrentOrderMatchOrOnlyFirstOrNone(node, [this.settings.allowDrop, this.settings.nodrop]);
    }

    canInsertBeforeOrAfter (node) {
        return this.canAccept(node.parentNode);
    }

    canAccept (target) {
        // whether or not "target" can accept elements
        return !!(
            this.canAcceptByClass(target) &&
            this.isEditOrInEdit(target) &&
            this.allowDrop(target));

    }

    canReceiveElements(target) {
        return this.isEdit(target) && this.canAcceptByTag(target);
    }

    dropableElements (){
        return this._dropableElements;
    }

    getIteractionTarget(node) {
        return this.tools.firstWithAyOfClassesOnNodeOrParent(node, [
            this.settings.elementClass,
            this.settings.editClass,
            this.settings.moduleClass,
        ]);
    }

    getTarget (node) {

        const target = this.getIteractionTarget(node);
        if(!target || !this.isEditOrInEdit(node) || !this.allowDrop(node)) {
            return null;
        }
        const res = {
            target,
            canInsert: false,
            beforeAfter: false
        }
        if (this.isEdit(target)) {
            res.canInsert = true;
        } else if(this.isElement(target)) {
            if(this.canAcceptByTag(target)) {
                res.canInsert = true;
            }
            //if(this.canInsertBeforeOrAfter(target)) {
                res.beforeAfter = true;
            //}
        } else if(this.isModule(target)) {
            if(this.canInsertBeforeOrAfter(target)) {
                res.beforeAfter = true;
            } else {
                return null;
            }
        }
        return res;
    }

    init () {
        this._dropableElements = [
            this.settings.elementClass,
            this.settings.cloneableClass,
            this.settings.editClass,
            this.settings.moduleClass,
            this.settings.colClass,
            this.settings.allowDrop,
        ];
    }
}







/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/dom.js":
/*!***********************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/dom.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DomService": () => (/* binding */ DomService)
/* harmony export */ });

let matches;
const el = document.documentElement;
if(!!el.matches) matches = 'matches';
else if (!!el.matchesSelector) matches = 'matchesSelector';
else if (!!el.mozMatchesSelector) matches = 'mozMatchesSelector';
else if (!!el.webkitMatchesSelector) matches = 'webkitMatchesSelector';

class DomService {

    static matches(node, selector) {
        return node[matches](selector)
    }

    static firstWithBackgroundImage (node) {
        if (!node) {
            return null;
        }
        while(node && node.nodeName !== 'BODY') {
            if (!!node.style.backgroundImage) {
                return node;
            }
            node = node.parentElement;
        }
        return null;
    }

    static hasAnyOfClassesOnNodeOrParent(node, arr) {
        while (node && node.nodeName !== 'BODY') {
            let i = 0, l = arr.length;
            for ( ; i < l ; i++ ) {
                if (node.classList.contains(arr[i])) {
                    return true;
                }
            }
            node = node.parentElement;
        }
        return false;
    }

    static hasParentWithId (el, id) {
        if (!el) return;
        var curr = el.parentNode;
        while (curr && curr !== document.body) {
            if (curr.id === id) {
                return true;
            }
            curr = curr.parentNode;
        }
        return false;
    }

    static firstWithAyOfClassesOnNodeOrParent(node, arr) {
        while (node && node.nodeName !== 'BODY') {
            let i = 0, l = arr.length;
            for ( ; i < l ; i++ ) {
                if (node.classList.contains(arr[i])) {
                    return node;
                }
            }
            node = node.parentElement;
        }
        return null;
    }

    static parentsOrCurrentOrderMatchOrOnlyFirst (node, arr) {
        let curr = node;
        while (curr && curr !== document.body) {
            const h1 = curr.classList.contains(arr[0]);
            const h2 = curr.classList.contains(arr[1]);
            if (h1 && h2) {
                return false;
            }
            else {
                if (h1) {
                    return true;
                }
                else if (h2) {
                    return false;
                }
            }
            curr = curr.parentNode;
        }
        return false;
    }

    static parentsOrCurrentOrderMatchOrOnlyFirstOrNone (node, arr) {
        let curr = node;
        while (curr && curr !== document.body) {
            const h1 = curr.classList.contains(arr[0]);
            const h2 = curr.classList.contains(arr[1]);
            if (h1 && h2) {
                return false;
            } else {
                if (h1) {
                    return true;
                } else if (h2) {
                    return false;
                }
            }
            curr = curr.parentNode;
        }
        return true;
    }

    static hasAnyOfClasses (node, arr) {
        if (!node) return;
        let i = 0, l = arr.length;
        for (; i < l; i++) {
            if (node.classList.contains(arr[i])) {
                return true;
            }
        }
        return false;
    }

    static offset (node) {
        if(!node) return;
        var off = node.getBoundingClientRect();
        var res = {top: off.top, left: off.left, width: off.width, height: off.height, bottom: off.bottom, right: off.right};;
        res.top += scrollY;
        res.bottom += scrollY;
        res.left += scrollX;
        res.right += scrollX;
        return res;
    }
    static parentsOrder (node, arr) {
        var only_first = [];
        var obj = {}, l = arr.length, i = 0, count = -1;
        for (; i < l; i++) {
            obj[arr[i]] = -1;
        }
        if (!node) return obj;

        var curr = node.parentNode;
        while (curr && curr.nodeName !== 'BODY') {
            count++;
            i = 0;
            for ( ; i < l; i++) {
                if (curr.classList.contains(arr[i]) && only_first.indexOf(arr[i]) === -1) {
                    obj[arr[i]] = count;
                    only_first.push(arr[i]);
                }
            }
            curr = curr.parentNode;
        }
        return obj;
    }


}


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/draggable.js":
/*!*****************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/draggable.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Draggable": () => (/* binding */ Draggable)
/* harmony export */ });
/* harmony import */ var _object_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.service */ "./userfiles/modules/microweber/api/liveedit2/object.service.js");
/* harmony import */ var _analizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./analizer */ "./userfiles/modules/microweber/api/liveedit2/analizer.js");
/* harmony import */ var _drop_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drop-position */ "./userfiles/modules/microweber/api/liveedit2/drop-position.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./element */ "./userfiles/modules/microweber/api/liveedit2/element.js");



 


const Draggable = function (options, rootSettings) {
    var defaults = {
        handle: null,
        element: null,
        document: document,
        helper: true
    };

    var scope = this;

    var _e = {};

    this.on = function (e, f) { _e[e] ? _e[e].push(f) : (_e[e] = [f]) };
    this.dispatch = function (e, f) { _e[e] ? _e[e].forEach(function (c){ c.call(this, f); }) : ''; };

    var stop = true;

    var scroll = function (step) {
        scope.settings.document.body.style.scrollBehavior = 'smooth';
        scope.settings.document.defaultView.scrollTo(0,scope.settings.document.defaultView.scrollY + step);
    }

    this.config = function () {
        this.settings = _object_service__WEBPACK_IMPORTED_MODULE_0__.ObjectService.extend({}, defaults, options);
        if(!this.settings.target) {
            this.settings.target = this.settings.document.body;
        }
        this.setElement(this.settings.element);
        this.dropIndicator = this.settings.dropIndicator;
    };
    this.setElement = function (node) {
        this.element = (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)(node)/*.prop('draggable', true)*/.get(0);
        if(!this.settings.handle) {
            this.settings.handle = this.settings.element;
        }
        this.handle = this.settings.handle;
        this.handle.attr('draggable', 'true')
    };

    this.setTargets = function (targets) {
        this.targets = (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)(targets);
    };

    this.addTarget = function (target) {
        this.targets.push(target);
    };

    this.init = function () {
        this.config();
        this.draggable();
    };

    this.helper = function (e) {
        if(!this._helper) {
            this._helper = (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)().get(0);
            this._helper.className = 'mw-draggable-helper';
            this.settings.document.body.appendChild(this._helper);
        }
        if (e === 'create') {
            this._helper.style.top = e.pageY + 'px';
            this._helper.style.left = e.pageX + 'px';
            this._helper.style.width = scope.element.offsetWidth + 'px';
            this._helper.style.height = scope.element.offsetHeight + 'px';

            this._helper.style.display = 'block';
        } else if(e === 'remove' && this._helper) {
            this._helper.style.display = 'none';
        } else if(this.settings.helper && e) {
            this._helper.style.top = e.pageY + 'px';
            this._helper.style.left = e.pageX + 'px';
            this._helper.style.maxWidth = (scope.settings.document.defaultView.innerWidth - e.pageX - 40) + 'px';
        }
        return this._helper;
    };

    this.isDragging = false;
    this.dropableService = new _analizer__WEBPACK_IMPORTED_MODULE_1__.DroppableElementAnalyzerService(rootSettings);


    this.dropPosition = _drop_position__WEBPACK_IMPORTED_MODULE_2__.DropPosition;

    this.draggable = function () {
         (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)(this.settings.target).on('dragleave', function (e) {
             scope.dropIndicator.hide()
         })
         ;(0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)(this.settings.target).on('dragover', function (e) {
             scope.target = null;
             scope.action = null;
             if(e.target !== scope.element || !scope.element.contains(e.target)) {
                 var targetAction = scope.dropableService.getTarget(e.target)
                 if(targetAction && targetAction !== scope.element) {
                     const pos = scope.dropPosition(e, targetAction);
                      if(pos) {
                         scope.target = targetAction.target;
                         scope.action = pos.action;
                         scope.dropIndicator.position(scope.target, pos.action + '-' + pos.position)
                     } else {

                         scope.dropIndicator.hide()
                     }

                 } else {
                     scope.dropIndicator.hide()
                 }
                 if (scope.isDragging) {
                     scope.dispatch('dragOver', {element: scope.element, event: e});
                     e.preventDefault();
                 }
             }


        }).on('drop', function (e) {
            if (scope.isDragging) {
                e.preventDefault();
                if (scope.target && scope.action) {
                    (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)(scope.target)[scope.action](scope.element);
                }
                scope.dropIndicator.hide();
                scope.dispatch('drop', {element: scope.element, event: e});
            }
             scope.dropIndicator.hide();
        });
        this.handle
            .on('dragstart', function (e) {
                scope.isDragging = true;
                if(!scope.element.id) {
                    scope.element.id = ('mw-element-' + new Date().getTime());
                }
                scope.element.classList.add('mw-element-is-dragged');
                e.dataTransfer.setData("text", scope.element.id);
                e.dataTransfer.effectAllowed = "move";

                scope.helper('create');
                scope.dispatch('dragStart',{element: scope.element, event: e});
            })
            .on('drag', function (e) {
                var scrlStp = 90;
                var step = 5;
                if (e.clientY < scrlStp) {
                    scroll(-step)
                }
                if (e.clientY > (innerHeight - (scrlStp + ( this._helper ? this._helper.offsetHeight + 10 : 0)))) {
                    scroll(step)
                }
                e.dataTransfer.dropEffect = "copy";
                scope.dispatch('drag',{element: scope.element, event: e});
                scope.helper(e)

            })
            .on('dragend', function (e) {
                scope.isDragging = false;
                scope.element.classList.remove('mw-element-is-dragged');
                scope.helper('remove');
                scope.dispatch('dragEnd',{element: scope.element, event: e});
                stop = true;
            });
    };
    this.init();
};


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/drop-position.js":
/*!*********************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/drop-position.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropPosition": () => (/* binding */ DropPosition)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");



let prevY = -1;
let prev = null;

const DropPosition = (e, conf) => {
    if(!e || !conf) {
        return false
    }
    const target = conf.target;
    if( !target || target.nodeType !== 1) return false;
    const x = e.pageX;
    const y = e.pageY;

    /*
    *  conf { canInsert: boolean,  beforeAfter: boolean }
    * */


    //  if(x%2 !== 0) return false;
    const rect = _dom__WEBPACK_IMPORTED_MODULE_0__.DomService.offset(target);
    const res = {};
    const distance = 15;
    if( prevY  === y || !conf || (!conf.canInsert && !conf.beforeAfter)) return false;
    if(conf.canInsert && conf.beforeAfter) {
        if (y >= (rect.top - distance) && y <= (rect.top + distance)) {
            res.position = 'top';
            res.action = 'before';
        } else if ( y >= (rect.top + distance) && y <= (rect.top  + (rect.height/2))) {
            res.position = 'top';
            res.action = 'prepend';
        } else if ( y >= (rect.top + (rect.height/2)) && y <= (rect.bottom - distance)) {
            res.position = 'bottom';
            res.action = 'append';
        }  else if ( y >= (rect.top + (rect.height/2)) && y >= (rect.bottom - distance)) {
            res.position = 'bottom';
            res.action = 'after';
        } else {
            return false;
        }
    } else if(conf.beforeAfter) {
        if ( y >= (rect.top - distance) && y <= (rect.top  + (rect.height/2))) {
            res.position = 'top';
            res.action = 'before';
        } else if ( y >= (rect.top + (rect.height/2)) && y <= (rect.bottom + distance)) {
            res.position = 'bottom';
            res.action = 'after';
        } else {
            return false;
        }
    }  else if(conf.canInsert) {
        if ( y >= (rect.top - distance) && y <= (rect.top  + (rect.height/2))) {
            res.position = 'top';
            res.action = 'prepend';
        } else if ( y >= (rect.top + (rect.height/2)) && y <= (rect.bottom + distance)) {
            res.position = 'bottom';
            res.action = 'append';
        } else {
            return false;
        }
    }

    return res
};


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/element-analizer.service.js":
/*!********************************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/element-analizer.service.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ElementAnalyzerServiceBase": () => (/* binding */ ElementAnalyzerServiceBase)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");



class ElementAnalyzerServiceBase {

    constructor(settings) {
        this.settings = settings;
        this.tools = _dom__WEBPACK_IMPORTED_MODULE_0__.DomService;
    }

    isRow (node) {
        return node.classList.contains(this.settings.rowClass);
    }

    isModule (node) {
        return node.classList.contains(this.settings.moduleClass) && node.dataset.type !== 'layouts';
    }

    isLayout (node) {
        return node.classList.contains(this.settings.moduleClass) && node.dataset.type === 'layouts';
    }

    isElement (node) {
        return node.classList.contains(this.settings.elementClass);
    }

    isEmptyElement (node) {
        return node.classList.contains(this.settings.emptyElementClass);
    }

    isEdit (node) {
        return node.classList.contains(this.settings.editClass);
    }

    isInEdit (node) {
        var order = [
            this.settings.editClass,
            this.settings.moduleClass,
        ];
        return this.tools.parentsOrCurrentOrderMatchOrOnlyFirst(node.parentNode, order);
    }

    isEditOrInEdit (node) {
        return this.isEdit(node) || this.isInEdit(node);
    }

    isPlainText (node) {
        return node.classList.contains(this.settings.plainElementClass);
    }

    getType(node) {
        if(this.isEdit(node)) {
            return 'edit';
        } else if(this.isElement(node)) {
            return 'element';
        } else if(this.isModule(node)) {
            return 'module';
        }  else if(this.isLayout(node)) {
            return 'layout';
        }
    }
}


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/element.js":
/*!***************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/element.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateElement": () => (/* binding */ CreateElement)
/* harmony export */ });
/* harmony import */ var _object_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.service */ "./userfiles/modules/microweber/api/liveedit2/object.service.js");


const nodeName = 'mw-le-element';
if (window.customElements) {
    customElements.define( nodeName,
        class extends HTMLElement {
            constructor() {
                super();
            }
        }
    );
}
const CreateElement = (config) => {
    if (config instanceof Object && !config.nodeType) {
        config = _object_service__WEBPACK_IMPORTED_MODULE_0__.ObjectService.extend({}, config || {}, { tag: nodeName });
    }
    return mw.element(config)
}


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/handle-menu.js":
/*!*******************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/handle-menu.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HandleMenu": () => (/* binding */ HandleMenu)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./userfiles/modules/microweber/api/liveedit2/element.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tooltip */ "./userfiles/modules/microweber/api/liveedit2/tooltip.js");




const HandleMenu = function(options) {

    this.options = options || {};

    var scope = this;

    this._visible = true;
    this.isVisible = function () {
        return this._visible;
    };

    this.show = function (){
        this._visible = true;
        this.root.addClass("mw-le-handle-menu-visible")
    }

    this.hide = function (){
        this._visible = false;
        this.root.removeClass("mw-le-handle-menu-visible")
    }

    this.create = function(){
        this.root = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
            props: {
                className: 'mw-le-handle-menu',
                id: scope.options.id || 'mw-le-handle-menu-' + new Date().getTime()
            }
        })
        this.buttonsHolder = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
            props: {
                className: 'mw-le-handle-menu-buttons'
            }
        })

        this.root.append(this.buttonsHolder);
    }
    var _title, titleText, titleIcon;

    var createTitle = function () {
        _title = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
            props: {
                className: 'mw-le-handle-menu-title'
            }
        });
        titleText = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
            props: {
                className: 'mw-le-handle-menu-title-text'
            }
        });
        titleIcon = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
            props: {
                className: 'mw-le-handle-menu-title-icon'
            }
        });
        _title.append(titleText);
        _title.append(titleIcon);
        scope.root.prepend(_title);
        scope.title = _title
    }
    var _target = null;

    this.setTarget = function (target) {
        _target = target;
        var i = 0;
        for ( ; i < this.buttons.length; i++) {
            if(this.buttons[i].config.onTarget) {
                this.buttons[i].config.onTarget(target, this.buttons[i].button)
            }
        }
    }



    this.setTitle = function (title, icon){
        titleText.html(title || '');
        titleIcon.html( icon || '');
    }
    this.buttons = [];

    this.buildButtons = function (menu, btnHolder){
        btnHolder = btnHolder || this.buttonsHolder;
        menu = menu || this.options.buttons;
        menu.forEach(function (btn){
            btnHolder.append(scope.button(btn));
        })
    }
    this.button = function (conf){
        /*
        * {
                title: mw.lang('Settings1212'),
                text: '',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" /></svg>',
                className: 'mw-handle-insert-button',
                menu: [

                ],
            },
        *
        * */
        var btn = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
            props: {
                className: 'mw-le-handle-menu-button' + (conf.className ? ' ' + conf.className : '')
            }
        });
        var btnContenConf = {
            props: {
                className: 'mw-le-handle-menu-button-content'
            }
        };
        var btnContent = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)(btnContenConf);

        if(conf.title) {
            (0,_tooltip__WEBPACK_IMPORTED_MODULE_2__.Tooltip)(btnContent, conf.title);
        }

        if(conf.icon) {
            var icon = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
                props: {
                    className: 'mw-le-handle-menu-button-icon',
                    innerHTML: conf.icon
                }
            })
            btnContent.append(icon);
        }
        if(conf.text) {
            var text = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
                props: {
                    className: 'mw-le-handle-menu-button-text',
                    innerHTML: conf.text
                }
            })
            btnContent.append(text);
        }


        btn.append(btnContent);
        this.buttons.push({
            button: btn,
            config: conf,
        });
        if(conf.menu) {
            var submenu = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
                props: {
                    className: 'mw-le-handle-menu-button-sub-menu'
                }
            });
            btn.append(submenu);
            scope.buildButtons(conf.menu, submenu)
            btn.on('click', function(){
                this.classList.toggle('sub-menu-active')
            })
        }
        return btn;
    }

    this.init = function () {
        this.create()
        createTitle();
        this.setTitle(scope.options.title, scope.options.icon);
        this.buildButtons();
        this.hide();

    }
    this.init()


}


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/handle.js":
/*!**************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/handle.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Handle": () => (/* binding */ Handle)
/* harmony export */ });
/* harmony import */ var _object_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.service */ "./userfiles/modules/microweber/api/liveedit2/object.service.js");
/* harmony import */ var _draggable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draggable */ "./userfiles/modules/microweber/api/liveedit2/draggable.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./element */ "./userfiles/modules/microweber/api/liveedit2/element.js");





const Handle = function (options) {

    var defaults = {

    };


    var scope = this;

    this.settings = _object_service__WEBPACK_IMPORTED_MODULE_0__.ObjectService.extend({}, defaults, options);

    const _e = {};
    this.on = (e, f) => { _e[e] ? _e[e].push(f) : (_e[e] = [f]) };
    this.dispatch = (e, f) => { _e[e] ? _e[e].forEach( (c) => { c.call(this, f); }) : ''; };

    var _visible = true;
    var _currentTarget = null;

    this.isVisible = function () {
        return _visible;
    };

    this.show = function () {
        _visible = true;
        this.wrapper.removeClass('mw-handle-item-hidden');
    };
    this.hide = function () {
        _visible = false;
        this.wrapper.addClass('mw-handle-item-hidden');
    };
    let _content = null;
    this.setContent = function (content) {
        if(_content){
            _content.remove()
        }
        _content = content;
        this.wrapper.append(_content);
    }


    this.initDraggable = function () {
      this.draggable = new _draggable__WEBPACK_IMPORTED_MODULE_1__.Draggable({
          handle: this.handle,
          element: null,
          helper: true,
          dropIndicator: this.settings.dropIndicator,
          document: this.settings.document,
          target: this.settings.root
      }, options);
        this.draggable.on('dragStart', function () {
            scope.wrapper.addClass('mw-handle-item-dragging');
        })
        this.draggable.on('dragEnd', function () {
            scope.wrapper.removeClass('mw-handle-item-dragging');
        })
    };

    this.set = function (target) {
        if (!target) {
            _currentTarget = null;
            return;
        }
        var off = _dom__WEBPACK_IMPORTED_MODULE_2__.DomService.offset(target);
         this.wrapper.css({
            top: off.top,
            left: off.left,
            width: off.width,
            height: off.height,
        });
        this.show();
        this.draggable.setElement(target);
        if(_currentTarget !== target) {
            _currentTarget = target;
            this.dispatch('targetChange', target);
        }

    };

    this.createHandle = function () {
        if(this.settings.handle) {
            this.handle = this.settings.handle;
        } else {
            this.handle = (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)({
                tag: 'div',
                props: {
                    className: 'mw-handle-item-handle',
                    contentEditable: false,
                    draggable: true,
                }
            });
            this.wrapper.append(this.handle);

        }

    }

    this.createWrapper = function() {
        this.wrapper = (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)({
            tag: 'div',
            props: {
                className: 'mw-handle-item ' + (this.settings.className || 'mw-handle-type-default'),
                id: this.settings.id || ('mw-handle-' + new Date().getTime()),
                contentEditable: false
            }
        });

        this.wrapper.on('mousedown', function () {
            mw.tools.addClass(this, 'mw-handle-item-mouse-down');
        });
        (0,_element__WEBPACK_IMPORTED_MODULE_3__.CreateElement)(document.body).on('mouseup touchend', function () {
            mw.tools.removeClass(scope.wrapper, 'mw-handle-item-mouse-down');
        });
        this.settings.document.body.appendChild(this.wrapper.get(0));
    };

    this.createWrapper();
    this.createHandle();
    this.initDraggable();
    if(this.settings.content) {
        this.setContent(this.settings.content)
    }




};


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/handles-content/element.js":
/*!*******************************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/handles-content/element.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ElementHandleContent": () => (/* binding */ ElementHandleContent)
/* harmony export */ });
/* harmony import */ var _handle_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handle-menu */ "./userfiles/modules/microweber/api/liveedit2/handle-menu.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../element */ "./userfiles/modules/microweber/api/liveedit2/element.js");



const ElementHandleContent = function () {
    this.root = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
        props: {
            id: 'mw-handle-item-element-root'
        }
    });
    this.menu = new _handle_menu__WEBPACK_IMPORTED_MODULE_0__.HandleMenu({
        id: 'mw-handle-item-element-menu',
        title: 'Element',
        buttons: [
            {
                title: mw.lang('Settings'),
                text: '',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" /></svg>',
                className: 'mw-handle-insert-button',
                onTarget: function (target, selfNode) {
                },
                menu: [
                    {
                        title: mw.lang('Add something'),
                        text: mw.lang('Add something'),
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" /></svg>',
                        className: 'mw-handle-insert-button',
                    },
                    {
                        title: mw.lang('Settings1212'),
                        text: 'Do alert 1212',
                        className: 'mw-handle-insert-button',
                        menu: [

                        ],
                    },
                ],
            },
            {
                title: mw.lang('Delete'),
                text: '',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0000" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>',
                className: 'mw-handle-insert-button',
                action: function (el) {

                }
            }
        ],
    });

    this.menu.show()

    this.root.append(this.menu.root)

}



/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/handles-content/layout.js":
/*!******************************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/handles-content/layout.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutHandleContent": () => (/* binding */ LayoutHandleContent)
/* harmony export */ });
/* harmony import */ var _handle_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handle-menu */ "./userfiles/modules/microweber/api/liveedit2/handle-menu.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../element */ "./userfiles/modules/microweber/api/liveedit2/element.js");



const LayoutHandleContent = function (scope) {
    this.root = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
        props: {
            id: 'mw-handle-item-layout-root'
        }
    });
    this.menu = new _handle_menu__WEBPACK_IMPORTED_MODULE_0__.HandleMenu({
        id: 'mw-handle-item-layout-menu',
        title: scope.lang('Layout'),
        buttons: [
            {
                title: scope.lang('Settings'),
                text: '',
                icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 13.3 15.9" xml:space="preserve"><path d="M8.2,2.4L11,5.1l-8.2,8.2H0v-2.8L8.2,2.4z M11.8,4.3L9,1.6l1.4-1.4C10.5,0.1,10.7,0,10.9,0c0.2,0,0.4,0.1,0.5,0.2l1.7,1.7c0.1,0.1,0.2,0.3,0.2,0.5S13.3,2.8,13.1,3L11.8,4.3z"/><rect y="14.5" width="12" height="1.4"/></svg>',
                className: 'mw-handle-insert-button',
                onTarget: function (target, selfNode) {

                },
                menu: [
                    {
                        title: mw.lang('Add something'),
                        text: mw.lang('Add something'),
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" /></svg>',
                        className: 'mw-handle-insert-button',
                    },
                    {
                        title: mw.lang('Settings1212'),
                        text: 'Do alert 1212',
                        className: 'mw-handle-insert-button',
                        menu: [

                        ],
                    },
                ],
            },

            {
                title: mw.lang('Copy'),
                text: '',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg>',
                className: 'mw-handle-insert-button',
                action: function (el) {

                }
            },

            {
                title: mw.lang('Move Down'),
                text: '',
                icon: '<svg  width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /></svg>',
                className: 'mw-handle-insert-button',
                action: function (el) {

                }
            },
            {
                title: mw.lang('Move up'),
                text: '',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>',
                className: 'mw-handle-insert-button',
                action: function (el) {

                }
            },


            {
                title: mw.lang('Delete'),
                text: '',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0000" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>',
                className: 'mw-handle-insert-button',
                action: function (el) {

                }
            },


        ],
    });

    var plusLabel = 'Add Layout';

    this.plusTop = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
        props: {
            className: 'mw-handle-item-layout-plus mw-handle-item-layout-plus-top'
        }
    });

    this.plusBottom = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
        props: {
            className: 'mw-handle-item-layout-plus mw-handle-item-layout-plus-bottom'
        }
    });

    this.menu.show()

    this.root.append(this.plusTop)
    this.root.append(this.plusBottom)
    this.root.append(this.menu.root)

}



/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/handles-content/module.js":
/*!******************************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/handles-content/module.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModuleHandleContent": () => (/* binding */ ModuleHandleContent)
/* harmony export */ });
/* harmony import */ var _handle_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../handle-menu */ "./userfiles/modules/microweber/api/liveedit2/handle-menu.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../element */ "./userfiles/modules/microweber/api/liveedit2/element.js");



const ModuleHandleContent = function () {
    this.root = (0,_element__WEBPACK_IMPORTED_MODULE_1__.CreateElement)({
        props: {
            id: 'mw-handle-item-module-root',
            contentEditable: false,
        }
    });
    this.menu = new _handle_menu__WEBPACK_IMPORTED_MODULE_0__.HandleMenu({
        id: 'mw-handle-item-element-menu',
        title: 'Element',
        buttons: [
            {
                title: mw.lang('Settings'),
                text: '',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" /></svg>',
                className: 'mw-handle-insert-button',
                onTarget: function (target, selfNode) {
                },
                menu: [
                    {
                        title: mw.lang('Add something'),
                        text: mw.lang('Add something'),
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" /></svg>',
                        className: 'mw-handle-insert-button',
                    },
                    {
                        title: mw.lang('Settings1212'),
                        text: 'Do alert 1212',
                        className: 'mw-handle-insert-button',
                        menu: [

                        ],
                    },
                ],
            },
            {
                title: mw.lang('Delete'),
                text: '',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0000" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>',
                className: 'mw-handle-insert-button',
                action: function (el) {

                }
            }
        ],
    });

    this.menu.show()

    this.root.append(this.menu.root)

}



/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/handles.js":
/*!***************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/handles.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Handles": () => (/* binding */ Handles)
/* harmony export */ });
const Handles = function (handles) {

    this.handles = handles;
    this.dragging = false;
    var scope = this;

    this.get = function (handle) {
        return this.handles[handle];
    }

    this.set = function (handle, target){
         this.get(handle).set(target)
    }

    this.hide = function(handle) {
        if(handle && this.handles[handle]) {
            this.handles[handle].hide();
        } else {
            this.each(function (name, h){
                h.hide()
            });
        }
    };

    this.hideAllBut = function(handle) {
        this.each(function (name, h){
            if(name !== handle) {
                h.hide()
            }
        });
    };

    this.show = function(handle) {
        if (handle && this.handles[handle]) {
            this.handles[handle].show();
        } else {
            this.each(function (name, handle){
                handle.show();
            });
        }
    };

    this.each = function (c) {
        if(!c) return;
        var i;
        for (i in this.handles) {
            c.call(scope, i, this.handles[i]);
        }
    };

    this.init = function (){
        this.each(function (name, handle){
            handle.draggable.on('dragStart', function (){
                scope.dragging = true;
                scope.hideAllBut(name)
            })
            handle.draggable.on('dragEnd', function (){
                scope.dragging = false;
                handle.show()
            })
        })
    }

    this.init();
};


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/i18n.js":
/*!************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/i18n.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i18n": () => (/* binding */ i18n)
/* harmony export */ });
const i18n =  {
    en: {
        "Layout": "Layout",
        "Title": "Title",
        "Settings": "Settings",
        "Paragraph": "Paragraph",
        "Text": "Text",
    },
    bg: {

    }
}


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/interact.js":
/*!****************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/interact.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropIndicator": () => (/* binding */ DropIndicator)
/* harmony export */ });
/* harmony import */ var _object_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.service */ "./userfiles/modules/microweber/api/liveedit2/object.service.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./element */ "./userfiles/modules/microweber/api/liveedit2/element.js");





const DropIndicator = function (options) {

    options = options || {};

    var defaults = {
        template: 'default'
    };

    this.settings = _object_service__WEBPACK_IMPORTED_MODULE_0__.ObjectService.extend({}, defaults, options);

    this._indicator = null;

    var _e = {};
    this.on = function (e, f) { _e[e] ? _e[e].push(f) : (_e[e] = [f]) };
    this.dispatch = function (e, f) { _e[e] ? _e[e].forEach(function (c){ c.call(this, f); }) : ''; };

    this.hide = function () {
        this._indicator.addClass('mw-drop-indicator-hidden');
    };

    this.show = function () {
        this._indicator.removeClass('mw-drop-indicator-hidden');
    };

    var positions = [
        'before-top', 'prepend-top',
        'after-bottom', 'append-bottom'
    ];


    const positionsPrefix = 'mw-drop-indicator-position-';

    var positionsClasses = positions.map(function (cls){ return positionsPrefix + cls });

    var currentPositionClass = null; // do not set if same to prevent animation stop

    this.position = function (rect, position) {
        if(currentPositionClass !== position) {
            this._indicator.removeClass(positionsClasses);
            currentPositionClass = position
        }

        if(!rect || !position) return;
            if(rect.nodeType === 1) {
                rect = _dom__WEBPACK_IMPORTED_MODULE_1__.DomService.offset(rect);
            }
        this._indicator.addClass(positionsPrefix + position);
        this._indicator.css({
            height: rect.height,
            left: rect.left,
            top: rect.top,
            width: rect.width,
        });
        this.show();
    };

    this.make = function () {
        this._indicator = (0,_element__WEBPACK_IMPORTED_MODULE_2__.CreateElement)();
        this._indicator.html('<div class="mw-drop-indicator-block"><div class="mw-drop-indicator-pin"></div></div>');
        this._indicator.addClass('mw-drop-indicator mw-drop-indicator-template-' + this.settings.template);
        this.hide();
        this.settings.document.body.appendChild(this._indicator.get(0));
    };

    this.init = function (){
        this.make();
    };

    this.init();

};


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/mode-auto.js":
/*!*****************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/mode-auto.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModeAuto": () => (/* binding */ ModeAuto)
/* harmony export */ });
/* harmony import */ var _analizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analizer */ "./userfiles/modules/microweber/api/liveedit2/analizer.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");





const isRowLike = function (node) {
    return _dom__WEBPACK_IMPORTED_MODULE_1__.DomService.matches(node, '.row,[class*="row-"]');
}

const isColumnLIke = function (node) {
    return _dom__WEBPACK_IMPORTED_MODULE_1__.DomService.matches(node, '.col,[class*="col-"]');
}
let _fragment;
const fragment = function(){
    if(!_fragment){
        _fragment = document.createElement('div');
        _fragment.style.visibility = 'hidden';
        _fragment.style.position = 'absolute';
        _fragment.style.width = '1px';
        _fragment.style.height = '1px';
        document.body.appendChild(_fragment);
    }
    return _fragment;
}
const _isBlockCache = {};
const isBlockLevel = function (node) {
    if(!node || node.nodeType === 3){
        return false;
    }
    var name = node.nodeName;
    if(typeof _isBlockCache[name] !== 'undefined'){
        return _isBlockCache[name];
    }
    var test = document.createElement(name);
    fragment().appendChild(test);
    _isBlockCache[name] = getComputedStyle(test).display === 'block';
    fragment().removeChild(test);
    return _isBlockCache[name];
}




const getElementsLike = (selector, root, scope) => {

    selector = selector || '*';
    var all = root.querySelectorAll(selector), i = 0, final = [];
    for( ; i<all.length; i++){
        if(!isColumnLIke(all[i]) &&
            !isRowLike(all[i]) &&
            !scope.elementAnalyzer.isEdit(all[i]) &&
            isBlockLevel(all[i])){
            final.push(all[i]);
        }
    }
    console.log(final)
    return final;
};

const ModeAuto = (scope) => {



    const {
        backgroundImageHolder,
        editClass,
        moduleClass,
        elementClass,
        allowDrop
    } = scope.settings;
    const root = scope.root;
    var selector = '*';
    var bgHolders = root.querySelectorAll('.' + editClass + '.' + backgroundImageHolder + ', .' + editClass + ' .' + backgroundImageHolder + ', .'+editClass+'[style*="background-image"], .'+editClass+' [style*="background-image"]');
    var noEditModules = root.querySelectorAll('.' + moduleClass + scope.settings.unEditableModules.join(',.' + moduleClass));
    var edits = root.querySelectorAll('.' + editClass);
    var i = 0, i1 = 0, i2 = 0;
    for ( ; i < bgHolders.length; i++ ) {
        var curr = bgHolders[i];
        var po = mw.tools.parentsOrder(curr, [editClass, moduleClass]);
        if(po.module === -1 || (po.edit < po.module && po.edit !== -1)){
            if(!mw.tools.hasClass(curr, moduleClass)){
                mw.tools.addClass(curr, editClass);
            }
            curr.style.backgroundImage = curr.style.backgroundImage || 'none';
        }
    }
    for ( ; i1<noEditModules.length; i1++ ) {
        noEditModules[i].classList.remove(moduleClass);
    }
    for ( ; i2 < edits.length; i2++ ) {
        var all = getElementsLike(':not(.' + elementClass + ')', edits[i2], scope), i2a = 0;

        var allAllowDrops = edits[i2].querySelectorAll('.' + allowDrop), i3a = 0;
        for( ; i3a < allAllowDrops.length; i3a++){
            allAllowDrops[i3a].classList.add(elementClass);
        }
        for( ; i2a<all.length; i2a++) {
            if(!all[i2a].classList.contains(moduleClass)){
                if(scope.elementAnalyzer.isInEdit(all[i2a])){
                    all[i2a].classList.add( elementClass );
                }
            }
        }
    }
};


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/object.service.js":
/*!**********************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/object.service.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectService": () => (/* binding */ ObjectService)
/* harmony export */ });
class ObjectService {
    static extend () {
        const extended = {};
        let deep = false;
        let i = 0;
        const l = arguments.length;

        if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
            deep = arguments[0];
            i++;
        }
        const merge = function (obj) {
            for ( const prop in obj ) {
                if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                    if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                        extended[prop] = ObjectService.extend( true, extended[prop], obj[prop] );
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };
        for ( ; i < l; i++ ) {
            const obj = arguments[i];
            merge(obj);
        }
        return extended;

    }
}


/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/pointer.js":
/*!***************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/pointer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetPointerTargets": () => (/* binding */ GetPointerTargets)
/* harmony export */ });
/* harmony import */ var _object_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.service */ "./userfiles/modules/microweber/api/liveedit2/object.service.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./userfiles/modules/microweber/api/liveedit2/dom.js");



const GetPointerTargets = function(options)  {

    options = options || {};

    this.tools = _dom__WEBPACK_IMPORTED_MODULE_1__.DomService;

    var scope = this;

    var defaults = {
        exceptions: ['mw-handle-item']
    };

    this.settings = _object_service__WEBPACK_IMPORTED_MODULE_0__.ObjectService.extend({}, defaults, options);

    if ( this.settings.root.nodeType === 9 ) {
        this.document = this.settings.root;
    } else {
        this.document = this.settings.root.ownerDocument;
    }
    this.body = this.document.body;

    var distanceMax = 20;

    function distance(x1, y1, x2, y2) {
        return Math.hypot(x2-x1, y2-y1);
    }

    function isInRange(el1, el2) {
        return distance(el1, el2) <= distanceMax;
    }

    var validateNode = function (node) {
        return node.type === 1;
    };




    var round5 = function (x){
        return (x % 5) >= 2.5 ? (x / 5) * 5 + 5 : (x / 5) * 5;
    };

    var getNearCoordinates = function (x, y) {
        x = round5(x);
        y = round5(y);
        var res = [];
        var x1 = x - distanceMax;
        var x1Max = x + distanceMax;
        var y1 = y - distanceMax;
        var y1Max = y + distanceMax;
        for ( ; x1 < x1Max; x1 += 5) {
            for ( ; y1 <= y1Max; y1 += 5 ) {
                res.push([x1, y1]);
            }
        }
        return res;
    };

    var addNode = function (el, res) {
        if(el && !!el.parentElement && res.indexOf(el) === -1 && scope.body !== el) {
            res.push(el);
        }
    };

    this.fromEvent = function (e) {
        if(!scope.tools.hasAnyOfClassesOnNodeOrParent(e.target, this.settings.exceptions)) {
            return this.fromPoint(e.pageX, e.pageY - scrollY);
        }
        return []
    }
    this.fromPoint = function (x, y) {
        var res = [];
        var el = scope.document.elementFromPoint(x, y);
        if (!el ) return [];
        addNode(el, res);
        var dots = getNearCoordinates(x, y);
        dots.forEach(function (coords){
            addNode(scope.document.elementFromPoint(coords[0], coords[1]), res);
        });
        return res;
    };
};




/***/ }),

/***/ "./userfiles/modules/microweber/api/liveedit2/tooltip.js":
/*!***************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/tooltip.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
const Tooltip = (node, content, position) => {
    if(!node || !content) return;
    node = node.isMWElement ? node.get(0) : node;
    node.dataset.tooltip = content;
    node.title = content;
    node.dataset.tooltipposition = position || 'top-center';
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************************************!*\
  !*** ./userfiles/modules/microweber/api/liveedit2/@live.js ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LiveEdit": () => (/* binding */ LiveEdit)
/* harmony export */ });
/* harmony import */ var _handle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handle */ "./userfiles/modules/microweber/api/liveedit2/handle.js");
/* harmony import */ var _pointer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pointer */ "./userfiles/modules/microweber/api/liveedit2/pointer.js");
/* harmony import */ var _mode_auto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mode-auto */ "./userfiles/modules/microweber/api/liveedit2/mode-auto.js");
/* harmony import */ var _handles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handles */ "./userfiles/modules/microweber/api/liveedit2/handles.js");
/* harmony import */ var _object_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./object.service */ "./userfiles/modules/microweber/api/liveedit2/object.service.js");
/* harmony import */ var _analizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./analizer */ "./userfiles/modules/microweber/api/liveedit2/analizer.js");
/* harmony import */ var _interact__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./interact */ "./userfiles/modules/microweber/api/liveedit2/interact.js");
/* harmony import */ var _handles_content_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handles-content/element */ "./userfiles/modules/microweber/api/liveedit2/handles-content/element.js");
/* harmony import */ var _handles_content_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./handles-content/module */ "./userfiles/modules/microweber/api/liveedit2/handles-content/module.js");
/* harmony import */ var _handles_content_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./handles-content/layout */ "./userfiles/modules/microweber/api/liveedit2/handles-content/layout.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./element */ "./userfiles/modules/microweber/api/liveedit2/element.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./i18n */ "./userfiles/modules/microweber/api/liveedit2/i18n.js");

















class LiveEdit {

    constructor(options) {

        const scope = this;
        const _e = {};
        this.on = (e, f) => { _e[e] ? _e[e].push(f) : (_e[e] = [f]) };
        this.dispatch = (e, f) => { _e[e] ? _e[e].forEach( (c) => { c.call(this, f); }) : ''; };

        var defaults = {
            elementClass: 'element',
            backgroundImageHolder: 'background-image-holder',
            cloneableClass: 'cloneable',
            editClass: 'edit',
            moduleClass: 'module',
/*            rowClass: 'mw-row',
            colClass: 'mw-col',
            safeElementClass: 'safe-element',
            plainElementClass: 'plain-text',
            emptyElementClass: 'empty-element',*/
            nodrop: 'nodrop',
            allowDrop: 'allow-drop',
            unEditableModules: [
                '[type="template_settings"]'
            ],
            frameworksClasses: {
                col: ['col', 'mw-col']
            },
            document: document,
            mode: 'manual', // 'auto' | 'manual'
            lang: 'en',
            strict: false // todo: element and modules should be dropped only in layouts
        };




        this.settings = _object_service__WEBPACK_IMPORTED_MODULE_4__.ObjectService.extend({}, defaults, options);



        this.lang = function (key) {
            if(!_i18n__WEBPACK_IMPORTED_MODULE_11__.i18n[this.settings]) return key;
            return _i18n__WEBPACK_IMPORTED_MODULE_11__.i18n[this.settings][key] || _i18n__WEBPACK_IMPORTED_MODULE_11__.i18n[this.settings][key.toLowerCase()] || key;
        }


        if(!this.settings.root) {
            this.settings.root = this.settings.document.body
        }

        this.root = this.settings.root;

        this.elementAnalyzer = new _analizer__WEBPACK_IMPORTED_MODULE_5__.DroppableElementAnalyzerService(this.settings);

        this.dropIndicator = new _interact__WEBPACK_IMPORTED_MODULE_6__.DropIndicator(this.settings);


        const elementHandleContent = new _handles_content_element__WEBPACK_IMPORTED_MODULE_7__.ElementHandleContent(this);
        const moduleHandleContent = new _handles_content_module__WEBPACK_IMPORTED_MODULE_8__.ModuleHandleContent(this);
        const layoutHandleContent = new _handles_content_layout__WEBPACK_IMPORTED_MODULE_9__.LayoutHandleContent(this);

        var elementHandle = new _handle__WEBPACK_IMPORTED_MODULE_0__.Handle({
            ...this.settings,
            dropIndicator: this.dropIndicator,
            content: elementHandleContent.root,
            handle: elementHandleContent.menu.title,
            document: this.settings.document
        })
        elementHandle.on('targetChange', function (target){
            elementHandleContent.menu.setTarget(target);
            var title = '';
            if(target.nodeName === 'P') {
                title = scope.lang('Paragraph')
            } else if(/(H[1-6])/.test(target.nodeName)) {
                title = scope.lang('Title') + ' ' + target.nodeName.replace( /^\D+/g, '')
            } else {
                title = scope.lang('Text')
            }
            elementHandleContent.menu.setTitle(title)
        });


        var moduleHandle = new _handle__WEBPACK_IMPORTED_MODULE_0__.Handle({
            ...this.settings,
            dropIndicator: this.dropIndicator,
            content: moduleHandleContent.root,
            handle: moduleHandleContent.menu.title,
            document: this.settings.document
        })

        var layoutHandle = new _handle__WEBPACK_IMPORTED_MODULE_0__.Handle({
            ...this.settings,
            dropIndicator: this.dropIndicator,
            content: layoutHandleContent.root,
            handle: layoutHandleContent.menu.title,
            document: this.settings.document
        });
        var title = scope.lang('Layout');
        layoutHandleContent.menu.setTitle(title)
        layoutHandle.on('targetChange', function (target){
            layoutHandleContent.menu.setTarget(target);
             layoutHandleContent.menu.setTitle(title)
        });

        this.handles = new _handles__WEBPACK_IMPORTED_MODULE_3__.Handles({
            element: elementHandle,
            module: moduleHandle,
            layout: layoutHandle
        });

        this.handles.get('element').on('targetChange', function (target) {

         })

        this.handles.get('module').on('targetChange', function (target) {

        })

        this.observe = new _pointer__WEBPACK_IMPORTED_MODULE_1__.GetPointerTargets(this.settings);
        //this.dropIndicator = new DropIndicator();

        this.init();
    }

    init() {
        if(this.settings.mode === 'auto') {
            (0,_mode_auto__WEBPACK_IMPORTED_MODULE_2__.ModeAuto)(this);
        }
         (0,_element__WEBPACK_IMPORTED_MODULE_10__.CreateElement)(this.root).on('mousemove touchmove', (e) => {
                if (e.pageX % 2 === 0) {
                    const elements = this.observe.fromEvent(e);
                    const first = elements[0];
                    if(first) {
                       const type = this.elementAnalyzer.getType(first);
                       if(type && type !== 'edit') {
                           this.handles.set(type, elements[0])
                           if(type === 'element') {
                               this.handles.hide('module')
                           } else if(type === 'module') {
                               this.handles.hide('element')
                           }
                       }
                    }
                }
         });
    };



}

globalThis.LiveEdit = LiveEdit;

})();

/******/ })()
;
//# sourceMappingURL=live-edit2.js.map