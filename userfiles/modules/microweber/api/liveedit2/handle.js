var Draggable = function (options) {
    var defaults = {
        handle: null,
        element: null,
        target: document.body,
        helper: true
    };
    var scope = this;

    var _e = {};

    this.on = function (e, f) { _e[e] ? _e[e].push(f) : (_e[e] = [f]) };
    this.dispatch = function (e, f) { _e[e] ? _e[e].forEach(function (c){ c.call(this, f); }) : ''; };

    this.config = function () {
        this.settings = mw.object.extend({}, defaults, options);
        this.setElement(this.settings.element);
    };
    this.setElement = function (node) {
        this.element = node;
        if(!this.settings.handle) {
            this.settings.handle = this.settings.element;
        }
        this.handle = this.settings.handle;
    };

    this.setTargets = function (targets) {
        this.targets = mw.element(targets);
    };

    this.addTarget = function (target) {
        this.targets.push(target);
    };

    this.init = function () {
        this.config();
        this.draggable();
    };

    this.helper = function (e) {
        if (e === 'create') {
            var el = mw.element(this.element.outerHTML);
            el.removeAttr('id').find('[id]').removeAttr('id');
            document.body.appendChild(el.get(0));
            this._helper = el.get(0);
        } else if(e === 'remove' && this._helper) {
            this._helper.remove();
            this._helper = null;
        } else if(this.settings.helper && this._helper && e) {
            this._helper.style.top = e.pageY + 'px';
            this._helper.style.left = e.pageX + 'px';
        }
        return this._helper;
    };

    this.isDragging = false;


    this.draggable = function () {
        this.handle.draggable = true;
        mw.element(this.settings.target).on('dragover', function (e) {
            if (scope.isDragging) {
                scope.dispatch('dragOver', {element: scope.element, event: e});
                e.preventDefault();
            }

        }).on('drop', function (e) {
            if (scope.isDragging) {
                e.preventDefault();
                scope.dispatch('drop', {element: scope.element, event: e});
            }
        });
        mw.element(this.settings.handle)
            .on('dragstart', function (e) {
                scope.isDragging = true;
                if(!scope.element.id) {
                    scope.element.id = ('mw-element-' + new Date().getTime());
                }
                scope.element.classList.add('mw-element-is-dragged');
                e.dataTransfer.setData("text", scope.element.id);
                scope.helper('create');
                scope.dispatch('dragStart',{element: scope.element, event: e});
            })
            .on('drag', function (e) {
                scope.helper(e);
                scope.dispatch('drag',{element: scope.element, event: e});
            })
            .on('dragend', function (e) {
                scope.isDragging = false;
                scope.element.classList.remove('mw-element-is-dragged');
                scope.helper();
                scope.helper('remove');
                scope.dispatch('dragEnd',{element: scope.element, event: e});
            });
    };
    this.init();
};



var Handle = function (options) {

    var defaults = {

    };


    var scope = this;

    this.settings = mw.object.extend({}, defaults, options);

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

    this.initDraggable = function () {
      this.draggable = new Draggable({
          handle: this.wrapper
      });
    };
    this.set = function (target) {
        if (!target) {
            _currentTarget = null;
            return;
        }
        var off = target.getBoundingClientRect();
        this.wrapper.css({
            top: off.top,
            left: off.left,
            width: off.width,
            height: off.height,
        });
        this.show();
        this.draggable.setElement(target);
        _currentTarget = target;
    };

    this.createWrapper = function() {
        this.wrapper = mw.element({
            tag: 'div',
            props: {
                className: 'mw-defaults mw-handle-item ' + (this.settings.className || 'mw-handle-type-default'),
                contentEditable: false,
                id: this.settings.id || ('mw-handle-' + new Date().getTime())
            }
        });

        this.wrapper.on('mousedown', function () {
            mw.tools.addClass(this, 'mw-handle-item-mouse-down');
        });
        mw.$(document).on('mouseup', function () {
            mw.tools.removeClass(scope.wrapper, 'mw-handle-item-mouse-down');
        });

        document.body.appendChild(this.wrapper);
    };



};
