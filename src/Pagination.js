import classNames from 'classnames';
import React from 'react';
import PaginationButton from 'bee-pagination-button';


const propTypes = {
  /**
   * 当前激活状态页
   */
  activePage: React.PropTypes.number,
  /**
   * 总页数
   */
  items: React.PropTypes.number,
  /**
   * 显示按钮从1到maxButton的按钮数
   */
  maxButtons: React.PropTypes.number,

  /**
   * 当为true,不管切换到多少页都显示第一页和最后一页的按钮
   */
  boundaryLinks: React.PropTypes.bool,

  /**
   * 当为true,显示省略号，否则
   * 
   */
  ellipsis: React.PropTypes.oneOfType([
    React.PropTypes.bool, 
    React.PropTypes.node,
  ]),

  /**
   *  当为true,显示点击到第一页的按钮
   */
  first: React.PropTypes.oneOfType([
    React.PropTypes.bool, 
    React.PropTypes.node,
  ]),

  /**
   *  当为true,显示点击到最后一页的按钮
   */
  last: React.PropTypes.oneOfType([
    React.PropTypes.bool, 
    React.PropTypes.node,
  ]),

  /**
   * 当为true,显示前一页按钮
   */
  prev: React.PropTypes.oneOfType([
    React.PropTypes.bool, 
    React.PropTypes.node,
  ]),

  /**
   * 当为true,显示下一页按钮
   */
  next: React.PropTypes.oneOfType([
    React.PropTypes.bool, 
    React.PropTypes.node,
  ]),

  /**
   * 暴露给用户的切换页的方法
   */
  onSelect: React.PropTypes.func,

  /**
   * You can use a custom element for the buttons
   */
  buttonComponentClass: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string
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
};

class Pagination extends React.Component {
  renderPageButtons(
    activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps
  ) {
    const pageButtons = [];

    let startPage;
    let endPage;
    let hasHiddenPagesAfter;

    if (maxButtons) {
      //根据max很当前activepage计算出应隐藏activeButton之前的页数
      let hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
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

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(
        <PaginationButton
          key="ellipsisFirst"
          disabled
          componentClass={buttonProps.componentClass}
        >
          <span aria-label="More">
            {ellipsis === true ? '\u2026' : ellipsis}
          </span>
        </PaginationButton>
      );

      pageButtons.unshift(
        <PaginationButton
          {...buttonProps}
          key={1}
          eventKey={1}
          active={false}
        >
          1
        </PaginationButton>
      );
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(
        <PaginationButton
          key="ellipsis"
          disabled
          componentClass={buttonProps.componentClass}
        >
          <span aria-label="More">
            {ellipsis === true ? '\u2026' : ellipsis}
          </span>
        </PaginationButton>
      );

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
      className,
      ...others
    } = this.props;


    const classes = {
      "u-pagination": true
    };

    const buttonProps = {
      onSelect,
      componentClass: buttonComponentClass,
    };

    return (
      <ul
        {...others}
        className={classNames(className, classes)}
      >
        {first && (
          <PaginationButton
            {...buttonProps}
            eventKey={1}
            disabled={activePage === 1}
          >
            <span aria-label="First">
              {first === true ? '\u00ab' : first}
            </span>
          </PaginationButton>
        )}
        {prev && (
          <PaginationButton
            {...buttonProps}
            eventKey={activePage - 1}
            disabled={activePage === 1}
          >
            <span aria-label="Previous">
              {prev === true ? '\u2039' : prev}
            </span>
          </PaginationButton>
        )}

        {this.renderPageButtons(
          activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps
        )}

        {next && (
          <PaginationButton
            {...buttonProps}
            eventKey={activePage + 1}
            disabled={activePage >= items}
          >
            <span aria-label="Next">
              {next === true ? '\u203a' : next}
            </span>
          </PaginationButton>
        )}
        {last && (
          <PaginationButton
            {...buttonProps}
            eventKey={items}
            disabled={activePage >= items}
          >
            <span aria-label="Last">
              {last === true ? '\u00bb' : last}
            </span>
          </PaginationButton>
        )}
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
