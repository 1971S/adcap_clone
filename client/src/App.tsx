import React, { useState, useEffect } from "react";

import Header from "./components/UI/Header";
import Businesses from "./components/Businesses/Businesses";

enum UserPropertiesToUpdate {
  NONE = "NONE",
  BOTH = "BOTH",
  MONEY = "MONEY",
  BUSINESSES = "BUSINESSES",
}

const App = (props) => {
  const [hasToken, setHasToken] = useState(false);
  const [autoSaveCounter, setAutoSaveCounter] = useState(7);
  const [moneyCount, setMoneyCount] = useState(0);
  const [businessList, setBusinessList] = useState([]);
  const [shouldUpdateUserData, setShouldUpdateUserData] = useState(
    UserPropertiesToUpdate.NONE
  );
  const [userId, setUserId] = useState("");

  async function getUserData() {
    const res = await fetch(`http://localhost:3010/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    res
      .json()
      .then((res) => {
        updateMoneyCount(res["money"]);
        setBusinessList(res["businesses"]);
        setUserId(res["_id"]);
      })
      .catch((err) => console.log(err));
  }

  async function updateUserData(propertiesToUpdate: UserPropertiesToUpdate) {
    const requestBody: any = {
      money: moneyCount,
      businesses: businessList,
    };

    if (propertiesToUpdate === UserPropertiesToUpdate.MONEY) {
      delete requestBody.businesses;
    }

    if (propertiesToUpdate === UserPropertiesToUpdate.BUSINESSES) {
      delete requestBody.money;
    }

    const res = await fetch(`http://localhost:3010/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(requestBody),
    });

    res
      .json()
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  async function getToken() {
    const res = await fetch(`http://localhost:3010/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    res
      .json()
      .then((res) => {
        localStorage.setItem("token", res);

        setHasToken(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    autoSaveCounter > 0
      ? setTimeout(() => {
          setAutoSaveCounter(autoSaveCounter - 1);
        }, 1000)
      : (() => {
          setShouldUpdateUserData(UserPropertiesToUpdate.MONEY);
          setAutoSaveCounter(7);
        })();
  }, [autoSaveCounter]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      getToken();
    }
  }, [hasToken]);

  useEffect(() => {
    if (shouldUpdateUserData !== UserPropertiesToUpdate.NONE) {
      updateUserData(shouldUpdateUserData);

      setShouldUpdateUserData(UserPropertiesToUpdate.NONE);
    }
  }, [shouldUpdateUserData]);

  function updateMoneyCount(quantity) {
    setMoneyCount(quantity + moneyCount);
  }

  function updateBusiness(updatedBusiness) {
    const outdatedBusinessIndex = businessList.findIndex(
      (businessListItem) => businessListItem.name === updatedBusiness.name
    );

    const businessListClone = JSON.parse(JSON.stringify(businessList));

    businessListClone[outdatedBusinessIndex] = updatedBusiness;

    setBusinessList(businessListClone);

    setShouldUpdateUserData(UserPropertiesToUpdate.BOTH);
  }

  return (
    <div>
      <Header moneyCount={moneyCount} id={userId} />
      <Businesses
        updateMoneyCount={updateMoneyCount}
        updateBusiness={updateBusiness}
        moneyCount={moneyCount}
        businessList={businessList}
      />
    </div>
  );
};

export default App;
