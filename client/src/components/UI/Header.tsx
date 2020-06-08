import React from "react";

import MoneyCounter from "./MoneyCounter";

const Header = (props) => {
  return (
    <div>
      <p>id: {props.id}</p>
      <MoneyCounter moneyCount={props.moneyCount} />
    </div>
  );
};

export default Header;
