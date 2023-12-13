import React from 'react';
import { IEarnings } from '../interfaces/earnings';
import { fetchEarning } from '../services/earning.service';

export default async function Budget (){
	const earningsData: Promise<IEarnings[]> = fetchEarning();
	const earnings = await earningsData;
	return (
		<div className='alert alert-secondary'>
			<span>Budget: 2000 LKR</span>
		</div>
	);
};