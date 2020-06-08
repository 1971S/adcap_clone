import React, { useEffect, useState } from "react";

const Business = (props) => {
  const { business, moneyCount, updateMoneyCount, updateBusiness } = props;

  const [counter, setCounter] = useState(0);
  const [isEarning, setIsEarning] = useState(false);
  const [hasManager, setHasManager] = useState(business.hasManager);
  const [isUnlocked, setIsUnlocked] = useState(business.isUnlocked);

  function startEarningMoney() {
    setCounter(business.rateWaitTime);

    setIsEarning(true);
  }

  function finishEarningMoney() {
    setIsEarning(false);

    updateMoneyCount(business.rateQuantity * (1 + business.upgradeLevel * 0.1));

    if (hasManager) {
      startEarningMoney();
    }
  }

  function buyManager() {
    setHasManager(true);

    updateMoneyCount(-business.managerCost);

    updateBusiness({ ...business, hasManager: true });
  }

  function buyBusiness() {
    setIsUnlocked(true);

    updateMoneyCount(-business.unlockCost);

    updateBusiness({ ...business, isUnlocked: true });
  }

  function upgradeBusiness() {
    updateMoneyCount(-(business.upgradeCost * business.upgradeLevel));

    updateBusiness({ ...business, upgradeLevel: business.upgradeLevel + 1 });
  }

  useEffect(() => {
    if (!isEarning) {
      return;
    }

    counter > 0
      ? setTimeout(() => {
          setCounter(counter - 0.1);
        }, 100)
      : finishEarningMoney();
  }, [counter]);

  useEffect(() => {
    if (hasManager) {
      startEarningMoney();
    }
  }, [hasManager]);

  return (
    <div>
      {isUnlocked ? (
        <div>
          <p>{business.name}</p>
          <p>Payout in {isEarning ? counter : business.rateWaitTime}</p>
          <button
            disabled={moneyCount < business.upgradeCost * business.upgradeLevel}
            onClick={() => upgradeBusiness()}
          >
            {business.upgradeLevel}/{50 * Math.ceil(business.upgradeLevel / 50)}{" "}
            Upgrade for {business.upgradeCost * business.upgradeLevel}
          </button>
          <button disabled={isEarning} onClick={() => startEarningMoney()}>
            Earn {business.rateQuantity * (1 + business.upgradeLevel * 0.1)}
          </button>
          <button
            disabled={hasManager || moneyCount < business.managerCost}
            onClick={() => buyManager()}
          >
            Buy Manager for {business.managerCost}
          </button>
        </div>
      ) : (
        <div>
          <p>{business.name}</p>
          <button
            disabled={moneyCount < business.unlockCost}
            onClick={() => buyBusiness()}
          >
            Unlock for {business.unlockCost}
          </button>
        </div>
      )}
    </div>
  );
};

export default Business;
