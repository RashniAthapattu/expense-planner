import Budget from "../components/Budget";
import Remaining from "../components/Remaining";
import ExpenseTotal from "../components/ExpenseTotal";
import ExpenseList from "../components/ExpenseList";
import "bootstrap/dist/css/bootstrap.min.css";
import EarningList from "../components/EarningList";
import AddAmountForm from "../components/AddAmountForm";

export default function Home() {
  return (
    <div className="container">
      <h1 className="mt-3">Expense Planner</h1>
      <div className="row mt-3">
        <div className="col-sm">
          <Budget />
        </div>
        <div className="col-sm">
          <ExpenseTotal />
        </div>
        <div className="col-sm">
          <Remaining />
        </div>
      </div>
      <h3 className="mt-3">Add Amount</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <AddAmountForm />
        </div>
      </div>
      <h3 className="mt-3">Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <ExpenseList />
        </div>
      </div>
      <h3 className="mt-3">Earnings</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <EarningList />
        </div>
      </div>
    </div>
  );
}
