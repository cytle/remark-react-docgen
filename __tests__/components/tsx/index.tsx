import * as React from "react";

/**
 * Column properties.
 */
export interface IColumnProps {
  /**
   * prop1 description
   */
  prop1?: string;
  /** prop2 description */
  prop2: number;
  /**
   * prop3 description a | b
   */
  prop3: () => void;
  /** prop4 description 中文 */
  prop4: "option1" | "option2" | "option3";
}

/**
 * Form column.
 */
export class Column extends React.Component<IColumnProps> {
  static defaultProps = {
    prop1: "red",
  };

  render() {
    return <div>Test</div>;
  }
}
