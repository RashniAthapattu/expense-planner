import React from 'react'
import { EarningsData } from '../interfaces/earnings';
import { fetchEarning } from '../services/earning.service';
import EarningItem from './EarningItem';

export default async function EarningList (){
	const EarningsData: Promise<EarningsData> = fetchEarning();
	const earnings = await EarningsData;
    return (
		<ul className='list-group'>
			{earnings.earningData.map((earning) => (
				<EarningItem key={earning._id} description={earning.description} amount={earning.amount} _id={earning._id}  __v={0} />
			))}
		</ul>
    )
}
