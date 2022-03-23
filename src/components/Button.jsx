import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   const { onClick, children, disabled } = props;

   const buttonClass = classNames({"button": true, "button--confirm": props.confirm, "button--danger": props.danger});

   return (
   
      <button
         onClick={onClick}
         disabled={disabled}
         className={buttonClass}
      >
         {children}
      </button>

   );
}
