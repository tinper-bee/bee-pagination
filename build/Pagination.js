'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beePaginationButton = require('bee-pagination-button');

var _beePaginationButton2 = _interopRequireDefault(_beePaginationButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  /**
   * 当前激活状态页
   */
  activePage: _react2["default"].PropTypes.number,
  /**
   * 总页数
   */
  items: _react2["default"].PropTypes.number,
  /**
   * 显示按钮从1到maxButton的按钮数
   */
  maxButtons: _react2["default"].PropTypes.number,

  /**
   * 当为true,不管切换到多少页都显示第一页和最后一页的按钮
   */
  boundaryLinks: _react2["default"].PropTypes.bool,

  /**
   * 当为true,显示省略号，否则
   * 
   */
  ellipsis: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.node]),

  /**
   *  当为true,显示点击到第一页的按钮
   */
  first: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.node]),

  /**
   *  当为true,显示点击到最后一页的按钮
   */
  last: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.node]),

  /**
   * 当为true,显示前一页按钮
   */
  prev: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.node]),

  /**
   * 当为true,显示下一页按钮
   */
  next: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.bool, _react2["default"].PropTypes.node]),

  /**
   * 暴露给用户的切换页的方法
   */
  onSelect: _react2["default"].PropTypes.func,

  /**
   * You can use a custom element for the buttons
   */
  buttonComponentClass: _react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.element, _react2["default"].PropTypes.string])
};

var defaultProps = {
  activePage: 1,
  items: 1,
  maxButtons: 0,
  first: false,
  last: false,
  prev: false,
  next: false,
  ellipsis: true,
  boundaryLinks: false
};

var Pagination = function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Pagination.prototype.renderPageButtons = function renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps) {
    var pageButtons = [];

    var startPage = void 0;
    var endPage = void 0;
    var hasHiddenPagesAfter = void 0;

    if (maxButtons) {
      //根据max很当前activepage计算出应隐藏activeButton之前的页数
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      startPage = hiddenPagesBefore > 2 ? hiddenPagesBefore : 1;
      //计算出是否存在隐藏activeButton之后的页数
      hasHiddenPagesAfter = startPage + maxButtons < items;

      if (!hasHiddenPagesAfter) {
        endPage = items;
        startPage = items - maxButtons + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = items;
    }

    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      pageButtons.push(_react2["default"].createElement(
        _beePaginationButton2["default"],
        _extends({}, buttonProps, {
          key: pagenumber,
          eventKey: pagenumber,
          active: pagenumber === activePage
        }),
        pagenumber
      ));
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(_react2["default"].createElement(
        _beePaginationButton2["default"],
        {
          key: 'ellipsisFirst',
          disabled: true,
          componentClass: buttonProps.componentClass
        },
        _react2["default"].createElement(
          'span',
          { 'aria-label': 'More' },
          ellipsis === true ? '\u2026' : ellipsis
        )
      ));

      pageButtons.unshift(_react2["default"].createElement(
        _beePaginationButton2["default"],
        _extends({}, buttonProps, {
          key: 1,
          eventKey: 1,
          active: false
        }),
        '1'
      ));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(_react2["default"].createElement(
        _beePaginationButton2["default"],
        {
          key: 'ellipsis',
          disabled: true,
          componentClass: buttonProps.componentClass
        },
        _react2["default"].createElement(
          'span',
          { 'aria-label': 'More' },
          ellipsis === true ? '\u2026' : ellipsis
        )
      ));

      if (boundaryLinks && endPage !== items) {
        pageButtons.push(_react2["default"].createElement(
          _beePaginationButton2["default"],
          _extends({}, buttonProps, {
            key: items,
            eventKey: items,
            active: false
          }),
          items
        ));
      }
    }

    return pageButtons;
  };

  Pagination.prototype.render = function render() {
    var _props = this.props;
    var activePage = _props.activePage;
    var items = _props.items;
    var maxButtons = _props.maxButtons;
    var boundaryLinks = _props.boundaryLinks;
    var ellipsis = _props.ellipsis;
    var first = _props.first;
    var last = _props.last;
    var prev = _props.prev;
    var next = _props.next;
    var onSelect = _props.onSelect;
    var buttonComponentClass = _props.buttonComponentClass;
    var className = _props.className;

    var others = _objectWithoutProperties(_props, ['activePage', 'items', 'maxButtons', 'boundaryLinks', 'ellipsis', 'first', 'last', 'prev', 'next', 'onSelect', 'buttonComponentClass', 'className']);

    var classes = {
      "u-pagination": true
    };

    var buttonProps = {
      onSelect: onSelect,
      componentClass: buttonComponentClass
    };

    return _react2["default"].createElement(
      'ul',
      _extends({}, others, {
        className: (0, _classnames2["default"])(className, classes)
      }),
      first && _react2["default"].createElement(
        _beePaginationButton2["default"],
        _extends({}, buttonProps, {
          eventKey: 1,
          disabled: activePage === 1
        }),
        _react2["default"].createElement(
          'span',
          { 'aria-label': 'First' },
          first === true ? '\xAB' : first
        )
      ),
      prev && _react2["default"].createElement(
        _beePaginationButton2["default"],
        _extends({}, buttonProps, {
          eventKey: activePage - 1,
          disabled: activePage === 1
        }),
        _react2["default"].createElement(
          'span',
          { 'aria-label': 'Previous' },
          prev === true ? '\u2039' : prev
        )
      ),
      this.renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps),
      next && _react2["default"].createElement(
        _beePaginationButton2["default"],
        _extends({}, buttonProps, {
          eventKey: activePage + 1,
          disabled: activePage >= items
        }),
        _react2["default"].createElement(
          'span',
          { 'aria-label': 'Next' },
          next === true ? '\u203A' : next
        )
      ),
      last && _react2["default"].createElement(
        _beePaginationButton2["default"],
        _extends({}, buttonProps, {
          eventKey: items,
          disabled: activePage >= items
        }),
        _react2["default"].createElement(
          'span',
          { 'aria-label': 'Last' },
          last === true ? '\xBB' : last
        )
      )
    );
  };

  return Pagination;
}(_react2["default"].Component);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

exports["default"] = Pagination;
module.exports = exports['default'];