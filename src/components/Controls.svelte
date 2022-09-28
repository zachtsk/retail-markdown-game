<script>
	import { incrementPrice } from "$lib/controls";
	import { cost, price, wave_round,coef, intercept } from "$lib/game";
</script>
<div class="bg-gray-100 border-b border-gray-200">
    <div class="px-4 py-1 text-gray-700 font-semibold text-lg">Control Center</div>
    <div class="flex px-4 py-1 items-start">
        <!-- Price Container -->
        <div>
            <!-- Top -->
            <div class="mx-auto w-20 text-center py-0.5 text-emerald-700 rounded-t border-t border-r border-l border-emerald-400 bg-emerald-50 text-lg font-semibold">Price</div>
            <div class="mx-auto w-20 text-center py-0.5 text-gray-700 rounded-b border border-emerald-400 bg-white text-xl font-semibold">${$price.toFixed(2)}</div>
            <!-- Bottom -->
            <div class="flex justify-center gap-2 py-1">
                <button on:click={()=>{$price = incrementPrice($price,-.50)}}
                class="bg-emerald-100 text-emerald-800 px-1 border border-emerald-400 rounded hover:bg-emerald-200 active:translate-y-[1px]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <button on:click={()=>{$price = incrementPrice($price,+.50)}}
                class="bg-emerald-100 text-emerald-800 px-1 border border-emerald-400 rounded hover:bg-emerald-200 active:translate-y-[1px]">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                </button>
            </div>
        </div>     
        <!-- Product Cost -->
        <div class="pl-3">
            <!-- Top -->
            <div class="w-20 text-center text-gray-600 rounded-t border-t border-r border-l border-gray-400 bg-gray-50 text-md font-semibold">Unit Cost</div>
            <div class="w-20 text-center text-gray-600 rounded-b border-l border-r border-b border-gray-400 bg-gray-50 text-md font-semibold">${$cost.toFixed(2)}</div>
        </div>   
        <div class="pl-3">
            <!-- Top -->
            <div class="w-20 text-center text-gray-600 rounded-t border-t border-r border-l border-gray-400 bg-gray-50 text-md font-semibold">Round</div>
            <div class="w-20 text-center text-gray-600 rounded-b border-l border-r border-b border-gray-400 bg-gray-50 text-md font-semibold">Wave {$wave_round}</div>
        </div>   
        <div>Coef: {$coef} </div>
        <div>Coef: {$intercept} </div>
    </div>    
</div>