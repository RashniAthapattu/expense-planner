import React from "react";
import { TiDelete } from "react-icons/ti";
import { Earning } from "../interfaces/earnings";

export default async function EarningItem(props: Earning) {
  return (
	<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.description}
			<div>
				<label className='mr-3'>
					{props.amount} LKR
				</label>
				<TiDelete size='1.5em'></TiDelete>
			</div>
		</li>
  );
}

