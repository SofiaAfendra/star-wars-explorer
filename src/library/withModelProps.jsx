import { useMemo } from "react";
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
    // Add 'shallowEqual' to useSelector to prevent unnecessary re-renders of components
    // https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
    const mappedStateProps = useSelector(
      stateProps(props, componentProps),
      shallowEqual
    );

    // Add 'useMemo' to prevent the bound action creators from being re-created on every render
    // https://redux.js.org/api/bindactioncreators
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

  return EnhancedComponent;
};
