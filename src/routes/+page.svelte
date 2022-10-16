<script>
	import { browser } from "$app/environment";
	import WindowResults from "../components/WindowResults.svelte";
	import Controls from "../components/Controls.svelte";
	import Heading from "../components/Heading.svelte";
	import WindowBuyers from "../components/WindowBuyers.svelte";

    if (browser){
        document.title = 'Retail Markdown Game'
    }
    
</script>
<main>
    <div class="flex border-b border-gray-500 shadow-md gap-2 items-center">
        <div class="ml-3 mt-1 w-8 self-center text-gray-600 antialiased">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
            </svg>
        </div>
        <h1 class="py-3 text-3xl antialiased font-medium text-gray-600">Markdown Simulation</h1>
    </div>
    <Controls/>
    <Heading/>
    <div class="flex flex-wrap items-start">
        <WindowBuyers/>
        <!-- WindowPrices -->
        <WindowResults/>
    </div>
</main>