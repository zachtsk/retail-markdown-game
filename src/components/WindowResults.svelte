<script>
	import { wave_results } from '$lib/game_definition';
	/**
	 * @type {number[]}
	 */
	let results = [];
    let mostProfitableIndex = 0;
    let mostProfit = 0;
	$: {
		results = [];
		for (let i = 0; i < $wave_results.length; i++) {
			const values = $wave_results[i].calculateShopperStats();
			results = [...results, values];
			// @ts-ignore
			if (values.profit > mostProfit) {
                mostProfitableIndex = i;
                mostProfit = values.profit;
			}
		}
	}
</script>

<div class="ml-5 mt-14 w-[500px] border border-gray-400 rounded overflow-hidden">
	<div class="">
		<table class="min-w-full divide-y divide-gray-300">
			<thead class="bg-gray-100 border-b border-gray-400">
				<tr>
					<th
						scope="col"
						class="whitespace-nowrap pl-1 py-3.5 text-left text-sm text-center font-semibold text-gray-900"
						>Round</th>
					<th
						scope="col"
						class="whitespace-nowrap px-2 py-3.5 text-left text-sm text-center font-semibold text-gray-900"
						>Price</th>
					<th
						scope="col"
						class="whitespace-nowrap px-2 py-3.5 text-left text-sm text-center font-semibold text-gray-900"
						>Units<br>Sold</th>
					<th
						scope="col"
						class="whitespace-nowrap px-2 py-3.5 text-left text-sm text-center font-semibold text-gray-900"
						>Total<br>Revenue</th>
					<th
						scope="col"
						class="whitespace-nowrap px-2 py-3.5 text-left text-sm text-center font-semibold text-gray-900"
						>Total<br>Cost</th>
					<th
						scope="col"
						class="whitespace-nowrap py-3.5 text-left text-sm text-center font-semibold text-gray-900"
						>Profit</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each results as rd, idx}
					<tr>
						<td class="{idx==mostProfitableIndex ? 'font-bold' : ''} whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">{idx}</td>
						<td class="{idx==mostProfitableIndex ? 'font-bold' : ''} whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">${rd.price.toFixed(2)}</td>
						<td class="{idx==mostProfitableIndex ? 'font-bold' : ''} whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">{rd.units}</td>
						<td class="{idx==mostProfitableIndex ? 'font-bold' : ''} whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">${rd.revenue.toFixed(2)}</td>
						<td class="{idx==mostProfitableIndex ? 'font-bold' : ''} whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">${rd.cost.toFixed(2)}</td>
						<td class="{idx==mostProfitableIndex ? 'font-bold' : ''} whitespace-nowrap px-2 py-2 text-sm text-gray-500 text-center">${rd.profit.toFixed(2)}</td>
					</tr>
				{/each}

				<!-- More transactions... -->
			</tbody>
		</table>
	</div>
</div>
