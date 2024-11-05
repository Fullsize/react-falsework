import React, { forwardRef } from 'react';
import classNames from 'classnames';
/**
 * 定义了一个名为FlexRow的React组件，该组件通过forwardRef将ref传递给底层的HTMLDivElement。
 * Flex组件用于创建一个具有灵活布局属性的容器，它可以占据父元素的全部宽度和高度，
 * 并且其子元素会在水平方向上均匀分布。
 *
 */
const Flex = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          'flex w-full h-full justify-between overflow-hidden',
          props?.className,
        )}
        style={props?.style}
      >
        {props.children}
      </div>
    );
  },
);
export default Flex;
