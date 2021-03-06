import * as React from "react";
import PropTypes from 'prop-types';

/**
 * Form column.
 */
export const Column = () => {
  return <div>Test</div>;
}

Column.propTypes = {

  /**
   * prop1 description
   */
  prop1: PropTypes.string,
  /** prop2 description */
  prop2: PropTypes.number.isRequired,
  /**
   * prop3 description a | b
   */
  prop3: PropTypes.func().isRequired,
  /** prop4 description 中文 */
  prop4: PropTypes.isRequired.oneOf(["option1", "option2" ,"option3"]),
};

Column.defaultProps = {
  prop1: "red",
  prop5: "default",
};
