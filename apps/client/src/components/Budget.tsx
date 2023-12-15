import React from "react";
import { EarningsData } from "../interfaces/earnings";
import { fetchEarning } from "../services/earning.service";

export default async function Budget() {
  const earningData: Promise<EarningsData> = fetchEarning();
  const earnings = await earningData;
  //total amount = addition of all earnings
  const totalAmount = earnings.earningData.reduce(
    (total, earning) => total + earning.amount,
    0
  );
  return (
    <div className="alert alert-secondary">
      <span>Budget: {totalAmount} LKR</span>
    </div>
  );
}
