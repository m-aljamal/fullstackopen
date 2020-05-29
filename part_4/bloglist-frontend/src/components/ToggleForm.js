import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from 'prop-types'
const ToggleForm = forwardRef(({ children, label,hideLabel }, ref) => {
  const [visible, setVisible] = useState(false);
  const hide = { display: visible ? "none" : "", margin: "20px 0px" };
  const show = { display: visible ? "" : "none", margin: "20px 0px" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    };
  });
  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisible}>{label}</button>
      </div>
      <div style={show}>
        {children}
  <button onClick={toggleVisible}>{hideLabel}</button>
      </div>
    </div>
  );
});

ToggleForm.propTypes = {
  label: PropTypes.string.isRequired,
}
export default ToggleForm;
