import React from "react";

import Business from "./Business";

const BusinessList = (props) => {
  return (
    <div>
      {props.businessList.map((businessListItem: any, index: number) => {
        return (
          <Business
            key={index}
            updateMoneyCount={props.updateMoneyCount}
            updateBusiness={props.updateBusiness}
            moneyCount={props.moneyCount}
            business={businessListItem}
          />
        );
      })}
    </div>
  );
};

export default BusinessList;
