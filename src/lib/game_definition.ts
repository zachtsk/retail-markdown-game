import { derived, writable } from "svelte/store";

// Probability that a purchase will be made
export function evaluateElasticity(price: number, coef: number, intercept: number) {
    return Math.exp(Math.log(price) * coef + intercept)
}

// Fine appropriate intercept so that if you set the price
// near unit cost then you get ~100% probability of buying.
function findIntercept(low_price: number, coef: number) {
    let intercept = -10;
    let i = 1;
    try {
        let result = evaluateElasticity(low_price, coef, intercept);
        while (result < .99 && i < 1000000) {
            intercept = (intercept + .01);
            result = evaluateElasticity(low_price, coef, intercept);
            i = i + 1;
        }
        return intercept;
    } catch (e) {
        return 0;
    }
}

// Elasticity Parameters
export const cost = writable((Math.random() * 8.99) + 5.00)
export const price = writable(15);
export const coef = writable(-2.01 + (Math.random() * -1.99));
export const intercept = derived(
    [cost, coef], ([$cost, $coef]) => findIntercept($cost, $coef)
);

// Gameplay
export const wave_size = 100
export const wave_round = writable(0)
export const wave_shoppers = writable({})
export const wave_results = writable({})

// Stage
export let stageHeight = writable(0);
export let stageWidth = writable(0);


