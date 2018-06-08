"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PaginationButton = require("./PaginationButton");

var _PaginationButton2 = _interopRequireDefault(_PaginationButton);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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
    activePage: _propTypes2["default"].number,
    /**
     * 总页数
     */
    items: _propTypes2["default"].number,
    /**
     * 显示按钮从1到maxButton的按钮数
     */
    maxButtons: _propTypes2["default"].number,

    /**
     * 当为true,不管切换到多少页都显示第一页和最后一页的按钮
     */
    boundaryLinks: _propTypes2["default"].bool,

    /**
     * 当为true,显示省略号，否则
     *
     */
    ellipsis: _propTypes2["default"].oneOfType([_propTypes2["default"].bool, _propTypes2["default"].node]),

    /**
     *  当为true,显示点击到第一页的按钮
     */
    first: _propTypes2["default"].oneOfType([_propTypes2["default"].bool, _propTypes2["default"].node]),

    /**
     *  当为true,显示点击到最后一页的按钮
     */
    last: _propTypes2["default"].oneOfType([_propTypes2["default"].bool, _propTypes2["default"].node]),

    /**
     * 当为true,显示前一页按钮
     */
    prev: _propTypes2["default"].oneOfType([_propTypes2["default"].bool, _propTypes2["default"].node]),

    /**
     * 当为true,显示下一页按钮
     */
    next: _propTypes2["default"].oneOfType([_propTypes2["default"].bool, _propTypes2["default"].node]),

    /**
     * 暴露给用户的切换页的方法
     */
    onSelect: _propTypes2["default"].func,

    /**
     * You can use a custom element for the buttons
     */
    buttonComponentClass: _propTypes2["default"].oneOfType([_propTypes2["default"].element, _propTypes2["default"].string]),
    dataNumSelect: _propTypes2["default"].array,
    dataNum: _propTypes2["default"].number,
    showJump: _propTypes2["default"].bool
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
    boundaryLinks: false,
    clsPrefix: "u-pagination",
    gap: false,
    noBorder: false,
    dataNumSelect: ['5条/页', '10条/页', '15条/页', '20条/页'],
    dataNum: 1,
    showJump: false
};

var Pagination = function (_React$Component) {
    _inherits(Pagination, _React$Component);

    function Pagination(props, context) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.onKeyup = function (e) {
            e.keyCode === 13 && _this.setPageJump(e);
        };

        _this.setPageJump = function (e) {
            var value = e.target.value;
            if (value < 1 && value !== '' || value > _this.props.items || value == 0 && value !== '') {
                return false;
            } else {
                //注意这里要将下拉的数据还原
                _this.setState({ activePage: value }, function () {
                    if (value !== '') this.props.onSelect(value * 1);
                });
            }
        };

        _this.dataNumSelect = function (e) {
            var value = e.target.value * 1;
            var dataNumValue = _this.props.dataNumSelect[value];
            _this.setState({
                dataNum: value
            });
            if (_this.props.onDataNumSelect) {
                _this.props.onDataNumSelect(value, dataNumValue);
            }
        };

        _this.state = {
            activePage: _this.props.activePage, //当前的页码
            dataNum: 1
        };
        return _this;
    }

    Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this.state.activePage !== nextProps.activePage) {
            this.setState({
                activePage: nextProps.activePage
            });
        }
        if (nextProps.dataNum && this.state.dataNum !== nextProps.dataNum) {
            this.setState({
                dataNum: nextProps.dataNum
            });
        }
    };

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
            hasHiddenPagesAfter = startPage + maxButtons < items + 1;

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
        //将所有的button循环渲染出来
        for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
            pageButtons.push(_react2["default"].createElement(
                _PaginationButton2["default"],
                _extends({}, buttonProps, {
                    key: pagenumber,
                    eventKey: pagenumber,
                    active: pagenumber === activePage
                }),
                pagenumber
            ));
        }
        //如果boundaryLinks和eclipsis且startPage!=1 需要加上before More Button
        if (boundaryLinks && ellipsis && startPage !== 1) {
            pageButtons.unshift(_react2["default"].createElement(
                _PaginationButton2["default"],
                {
                    key: "ellipsisFirst",
                    disabled: true,
                    componentClass: buttonProps.componentClass
                },
                _react2["default"].createElement(
                    "span",
                    { "aria-label": "More" },
                    ellipsis === true ? "\u2026" : ellipsis
                )
            ));
            //加上最小边界 Button
            pageButtons.unshift(_react2["default"].createElement(
                _PaginationButton2["default"],
                _extends({}, buttonProps, { key: 1, eventKey: 1, active: false }),
                "1"
            ));
        }
        //如果maxButtons和eclipsis且hasHiddenPagesAfter 需加上after More Button
        if (maxButtons && hasHiddenPagesAfter && ellipsis) {
            pageButtons.push(_react2["default"].createElement(
                _PaginationButton2["default"],
                {
                    key: "ellipsis",
                    disabled: true,
                    componentClass: buttonProps.componentClass
                },
                _react2["default"].createElement(
                    "span",
                    { "aria-label": "More" },
                    ellipsis === true ? "\u2026" : ellipsis
                )
            ));
            //如果最后一个页数按钮不等于总页数 且 边界为true 需加上最大边界按钮
            if (boundaryLinks && endPage !== items) {
                pageButtons.push(_react2["default"].createElement(
                    _PaginationButton2["default"],
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
        var _props = this.props,
            items = _props.items,
            maxButtons = _props.maxButtons,
            boundaryLinks = _props.boundaryLinks,
            ellipsis = _props.ellipsis,
            first = _props.first,
            last = _props.last,
            prev = _props.prev,
            next = _props.next,
            onSelect = _props.onSelect,
            buttonComponentClass = _props.buttonComponentClass,
            noBorder = _props.noBorder,
            className = _props.className,
            clsPrefix = _props.clsPrefix,
            size = _props.size,
            gap = _props.gap,
            onDataNumSelect = _props.onDataNumSelect,
            dataNumSelect = _props.dataNumSelect,
            dataNum = _props.dataNum,
            activePage = _props.activePage,
            showJump = _props.showJump,
            others = _objectWithoutProperties(_props, ["items", "maxButtons", "boundaryLinks", "ellipsis", "first", "last", "prev", "next", "onSelect", "buttonComponentClass", "noBorder", "className", "clsPrefix", "size", "gap", "onDataNumSelect", "dataNumSelect", "dataNum", "activePage", "showJump"]);

        var activePageState = this.state.activePage;

        var classes = {};
        if (noBorder) {
            classes[clsPrefix + "-no-border"] = true;
        }
        if (size) {
            classes[clsPrefix + "-" + size] = true;
        }
        if (gap) {
            classes[clsPrefix + "-gap"] = true;
        }

        var classNames = (0, _classnames2["default"])(clsPrefix + "-list", classes);

        /**
         *  页按钮属性
         *  onSelect:暴露在外层交互动作，也是与父组件Pagination的交流接口
         *  componentClass: 用户定义的按钮dom元素类型
         */
        var buttonProps = {
            onSelect: onSelect,
            componentClass: buttonComponentClass
        };

        return _react2["default"].createElement(
            "div",
            { className: clsPrefix },
            _react2["default"].createElement(
                "ul",
                _extends({}, others, { className: (0, _classnames2["default"])(className, classNames) }),
                first && _react2["default"].createElement(
                    _PaginationButton2["default"],
                    _extends({}, buttonProps, {
                        eventKey: 1,
                        disabled: activePageState === 1
                    }),
                    _react2["default"].createElement(
                        "span",
                        { "aria-label": "First" },
                        first === true ? "\xAB" : first
                    )
                ),
                prev && _react2["default"].createElement(
                    _PaginationButton2["default"],
                    _extends({}, buttonProps, {
                        eventKey: activePageState - 1,
                        disabled: activePageState === 1
                    }),
                    _react2["default"].createElement(
                        "span",
                        { "aria-label": "Previous" },
                        prev === true ? "\u2039" : prev
                    )
                ),
                this.renderPageButtons(activePageState, items, maxButtons, boundaryLinks, ellipsis, buttonProps),
                next && _react2["default"].createElement(
                    _PaginationButton2["default"],
                    _extends({}, buttonProps, {
                        eventKey: activePageState + 1,
                        disabled: activePageState >= items }),
                    _react2["default"].createElement(
                        "span",
                        { "aria-label": "Next" },
                        next === true ? "\u203A" : next
                    )
                ),
                last && _react2["default"].createElement(
                    _PaginationButton2["default"],
                    _extends({}, buttonProps, {
                        eventKey: items,
                        disabled: activePageState >= items }),
                    _react2["default"].createElement(
                        "span",
                        { "aria-label": "Last" },
                        last === true ? "\xBB" : last
                    )
                )
            ),
            showJump ? _react2["default"].createElement(
                "div",
                { className: "data_per_select" },
                _react2["default"].createElement(
                    "select",
                    {
                        name: "data-select",
                        className: "data_select",
                        value: this.state.dataNum,
                        onChange: this.dataNumSelect },
                    dataNumSelect.length > 0 && dataNumSelect.map(function (item, i) {
                        return _react2["default"].createElement(
                            "option",
                            { key: i, value: i },
                            item
                        );
                    })
                )
            ) : null,
            showJump ? _react2["default"].createElement(
                "div",
                { className: "page_jump" },
                "\u8DF3\u81F3",
                _react2["default"].createElement("input", {
                    className: "page_jump_value",
                    type: "number",
                    value: activePageState,
                    onKeyDown: this.onKeyup,
                    onChange: this.setPageJump
                }),
                "\u9875"
            ) : null
        );
    };

    return Pagination;
}(_react2["default"].Component);

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

exports["default"] = Pagination;
module.exports = exports["default"];