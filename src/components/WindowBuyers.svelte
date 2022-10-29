<script>
	import { browser } from '$app/environment';
	import { coef, cost, price, intercept, stageHeight, stageWidth, wave_round, wave_results } from '$lib/game_definition';
	import { onMount } from 'svelte';
	import { Person, Round, Stage } from '$lib/game_actions';

	
	/**
	 * @type {any[]}
	 */
	let shoppers = [];
	let stage;

	onMount(() => {
		if (browser) {
			// @ts-ignore
			let box = document.getElementById('stage').getBoundingClientRect();
			$stageWidth = box.width;
			$stageHeight = box.height;
		}
	});

    const startRound = () => {
		$wave_round += 1
        stage = new Stage($stageWidth, $stageHeight);
        let round = new Round($coef, $intercept, $cost, $price, stage);
		$wave_results = [...$wave_results, round]
		$wave_results[$wave_round-1].createShoppers();
        const animate = () => {
			$wave_results[$wave_round-1].waveStep()
			$wave_results[$wave_round-1] = $wave_results[$wave_round-1]
            shoppers = round.shoppers;
            if(!round.roundComplete){
                window.requestAnimationFrame(animate)
            }            
        }
        animate()
	};

	const reset = () => {
		$wave_results = [];
		shoppers = [];
		$wave_round = 0;
		$cost = (Math.random() * 8.99) + 5.00;
		$price = Math.round($cost * 2);
		$coef = -2.01 + (Math.random() * -1.99);
	}
</script>
<div>
	<button on:click={startRound} class="ml-12 mt-2 px-3 py-1 rounded-lg bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 active:translate-y-[1px]">Start Round</button>
	<button on:click={reset} class="ml-3 mt-2 px-3 py-1 rounded-lg bg-gray-500 text-white text-lg font-semibold hover:bg-gray-600 active:translate-y-[1px]">Reset Game</button>
	<div class="ml-12 mt-3 flex">
		<div class="shadow">
			<!-- Top -->
			<div
				class="w-[500px] bg-gray-100 py-2 text-center text-gray-700 font-semibold text-xl border-t border-r border-l rounded-t border-gray-400">
				Potential Buyers
			</div>
			<!-- Stage -->
			<svg id="stage" class="h-64 w-[500px] border border-gray-400 rounded-b">
				<!-- Shoppers -->
				{#each shoppers as person}
					<svg
						class="text-gray-900"
						fill="{person.color}"
						x={person.x}
						y={person.y}
						viewBox="0 0 {$stageWidth * 0.65} {$stageHeight * 0.65}"
						stroke="currentColor">
						<path
							d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
					</svg>
				{/each}
				<!-- Purchase Line -->
				{#if $stageWidth && $stageHeight}
					<line
						x1="0"
						x2={$stageWidth}
						y1={$stageHeight - 75}
						y2={$stageHeight - 75}
						stroke="#34D399"
						stroke-width="2"
						stroke-linecap="round"
						stroke-dasharray="1, 5" />
				{/if}
			</svg>
		</div>
	</div>
	
</div>