import React, { forwardRef } from 'react';
import classNames from 'classnames';
const Flex = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames('flex flex-1 overflow-hidden', props?.className)}
        style={props?.style}
      >
        {props.children}
      </div>
    );
  },
);
export default Flex;
