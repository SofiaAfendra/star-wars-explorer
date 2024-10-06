import { useMemo, memo } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { bindActionCreators } from "redux";

const isAction = (prop) => prop?.type;

const actionProps = (props) =>
  Object.entries(props).reduce((result, [key, value]) => {
    if (isAction(value)) result[key] = value;
    return result;
  }, {});

const stateProps = (props, ownProps) => (state) =>
  Object.entries(props).reduce((result, [key, value]) => {
    if (!isAction(value)) result[key] = value(state, ownProps);
    return result;
  }, {});

export const withModelProps = (props) => (WrappedComponent) => {
  const EnhancedComponent = (componentProps) => {
    const dispatch = useDispatch();

    const mappedStateProps = useSelector(
      stateProps(props, componentProps),
      shallowEqual
    );

    const boundActionProps = useMemo(
      () => bindActionCreators(actionProps(props), dispatch),
      [dispatch]
    );

    return (
      <WrappedComponent
        {...componentProps}
        {...mappedStateProps}
        {...boundActionProps}
      />
    );
  };

  return memo(EnhancedComponent);
};
