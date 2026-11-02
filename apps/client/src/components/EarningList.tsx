import React from "react";
import AmountItem from "./AmountItem";
import { EarningsData } from "../interfaces/earnings";
import { fetchEarning } from "../services/earning.service";

export default async function EarningList() {
  const earnings: EarningsData = await fetchEarning();
  return (
    <ul className="list-group">
      {earnings.earningData.map((earning) => (
        <AmountItem
          key={earning._id}
          id={earning._id}
          type="earning"
          description={earning.description}
          amount={earning.amount}
        />
      ))}
    </ul>
  );
}
