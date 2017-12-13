import classnames from "classnames";
import React from "react";
import PaginationButton from "./PaginationButton";
import PropTypes from "prop-types";

const propTypes = {
  /**
   * 当前激活状态页
   */
  activePage: PropTypes.number,
  /**
   * 总页数
   */
  items: PropTypes.number,
  /**
   * 显示按钮从1到maxButton的按钮数
   */
  maxButtons: PropTypes.number,

  /**
   * 当为true,不管切换到多少页都显示第一页和最后一页的按钮
   */
  boundaryLinks: PropTypes.bool,

  /**
   * 当为true,显示省略号，否则
   *
   */
  ellipsis: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

  /**
   *  当为true,显示点击到第一页的按钮
   */
  first: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

  /**
   *  当为true,显示点击到最后一页的按钮
   */
  last: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

  /**
   * 当为true,显示前一页按钮
   */
  prev: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

  /**
   * 当为true,显示下一页按钮
   */
  next: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),

  /**
   * 暴露给用户的切换页的方法
   */
  onSelect: PropTypes.func,

  /**
   * You can use a custom element for the buttons
   */
  buttonComponentClass: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ])
};

const defaultProps = {
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
  noBorder: false
};

class Pagination extends React.Component {
  renderPageButtons(
    activePage,
    items,
    maxButtons,
    boundaryLinks,
    ellipsis,
    buttonProps
  ) {
    let pageButtons = [];

    let startPage;
    let endPage;
    let hasHiddenPagesAfter;

    if (maxButtons) {
      //根据max很当前activepage计算出应隐藏activeButton之前的页数
      let hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
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
    for (let pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      pageButtons.push(
        <PaginationButton
          {...buttonProps}
          key={pagenumber}
          eventKey={pagenumber}
          active={pagenumber === activePage}
        >
          {pagenumber}
        </PaginationButton>
      );
    }
    //如果boundaryLinks和eclipsis且startPage!=1 需要加上before More Button
    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(
        <PaginationButton
          key="ellipsisFirst"
          disabled
          componentClass={buttonProps.componentClass}
        >
          <span aria-label="More">
            {ellipsis === true ? "\u2026" : ellipsis}
          </span>
        </PaginationButton>
      );
      //加上最小边界 Button
      pageButtons.unshift(
        <PaginationButton {...buttonProps} key={1} eventKey={1} active={false}>
          1
        </PaginationButton>
      );
    }
    //如果maxButtons和eclipsis且hasHiddenPagesAfter 需加上after More Button
    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(
        <PaginationButton
          key="ellipsis"
          disabled
          componentClass={buttonProps.componentClass}
        >
          <span aria-label="More">
            {ellipsis === true ? "\u2026" : ellipsis}
          </span>
        </PaginationButton>
      );
      //如果最后一个页数按钮不等于总页数 且 边界为true 需加上最大边界按钮
      if (boundaryLinks && endPage !== items) {
        pageButtons.push(
          <PaginationButton
            {...buttonProps}
            key={items}
            eventKey={items}
            active={false}
          >
            {items}
          </PaginationButton>
        );
      }
    }

    return pageButtons;
  }

  render() {
    const {
      activePage,
      items,
      maxButtons,
      boundaryLinks,
      ellipsis,
      first,
      last,
      prev,
      next,
      onSelect,
      buttonComponentClass,
      noBorder,
      className,
      clsPrefix,
      size,
      gap,
      ...others
    } = this.props;

    const classes = {};
    if (noBorder) {
      classes[`${clsPrefix}-no-border`] = true;
    }
    if (size) {
      classes[`${clsPrefix}-${size}`] = true;
    }
    if (gap) {
      classes[`${clsPrefix}-gap`] = true;
    }
    let classNames = classnames(clsPrefix, classes);

    /**
     *  页按钮属性
     *  onSelect:暴露在外层交互动作，也是与父组件Pagination的交流接口
     *  componentClass: 用户定义的按钮dom元素类型
     */
    const buttonProps = {
      onSelect,
      componentClass: buttonComponentClass
    };

    return (
      <ul {...others} className={classnames(className, classNames)}>
        {first && (
          <PaginationButton
            {...buttonProps}
            eventKey={1}
            disabled={activePage === 1}
          >
            <span aria-label="First">{first === true ? "\u00ab" : first}</span>
          </PaginationButton>
        )}
        {prev && (
          <PaginationButton
            {...buttonProps}
            eventKey={activePage - 1}
            disabled={activePage === 1}
          >
            <span aria-label="Previous">{prev === true ? "\u2039" : prev}</span>
          </PaginationButton>
        )}

        {this.renderPageButtons(
          activePage,
          items,
          maxButtons,
          boundaryLinks,
          ellipsis,
          buttonProps
        )}

        {next && (
          <PaginationButton
            {...buttonProps}
            eventKey={activePage + 1}
            disabled={activePage >= items}
          >
            <span aria-label="Next">{next === true ? "\u203a" : next}</span>
          </PaginationButton>
        )}
        {last && (
          <PaginationButton
            {...buttonProps}
            eventKey={items}
            disabled={activePage >= items}
          >
            <span aria-label="Last">{last === true ? "\u00bb" : last}</span>
          </PaginationButton>
        )}
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
