<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';


	/**
	 * @type {number}
	 */
	let stageWidth;
    /**
	 * @type {number}
	 */
    let stageHeight;
	onMount(() => {
		if (browser) {
			// @ts-ignore
			let box = document.getElementById('stage').getBoundingClientRect();
			stageWidth = box.width;
			stageHeight = box.height;
		}
	});
</script>

<div class="ml-5 mt-3 flex">
	<div class="shadow">
		<!-- Top -->
		<div
			class="w-[400px] bg-gray-100 py-2 text-center text-gray-700 font-semibold text-xl border-t border-r border-l rounded-t border-gray-400">
			Potential Buyers
		</div>
		<!-- Stage -->
		<svg id="stage" class="h-48 w-[400px] border border-gray-400 rounded-b">
			<!-- Shoppers -->
            <svg class="text-gray-900" fill="#CCCCCC" x="50" y="50"
                    viewBox="0 0 {stageWidth*.65} {stageHeight*.65}" stroke="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            <!-- Purchase Line -->
            {#if stageWidth && stageHeight}
				<line
					x1="0"
					x2={stageWidth}
					y1={stageHeight - 75}
					y2={stageHeight - 75}
					stroke="#34D399"
					stroke-width="2"
					stroke-linecap="round"
					stroke-dasharray="1, 5" />
			{/if}
		</svg>
	</div>
</div>
