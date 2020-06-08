import React from "react";

import BusinessList from "./BusinessList";

const Businesses = (props) => {
  return (
    <div>
      <BusinessList
        updateMoneyCount={props.updateMoneyCount}
        updateBusiness={props.updateBusiness}
        moneyCount={props.moneyCount}
        businessList={props.businessList}
      />
    </div>
  );
};

export default Businesses;
