import classNames from 'classnames';
import React from 'react';


// TODO: This should be `<Pagination.Item>`.

// TODO: This should use `componentClass` like other components.

const propTypes = {
  className: React.PropTypes.string,
  eventKey: React.PropTypes.any,
  onSelect: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  active: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

const defaultProps = {
  active: false,
  disabled: false
};

class PaginationButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { disabled, onSelect, eventKey } = this.props;

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      componentClass: Component,
      active,
      disabled,
      onClick,
      className,
      style,
      ...props
    } = this.props;


    delete props.onSelect;

    return (
      <li
        className={classNames(className, { active, disabled })}
        style={style}
      >
        <a href="#"
          {...props}
          disabled={disabled}
          onClick={ this.handleClick }
        />
      </li>
    );
  }
}

PaginationButton.propTypes = propTypes;
PaginationButton.defaultProps = defaultProps;

export default PaginationButton;
