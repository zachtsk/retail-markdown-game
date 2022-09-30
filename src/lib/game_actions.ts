import { evaluateElasticity } from "./game_definition";

export class Stage {
    width = 0
    height = 0

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export class Person {
    color = "#6b7280";
    colorPurchase = "#10b981";
    width = 0;
    height = 0;
    speed = 1;
    x = -15;
    y = 0;
    r = 10;
    completed = false;
    willPurchase: boolean = false;
    madePurchase: boolean = false;

    constructor(stage: Stage, willPurchase: boolean) {
        this.next = this.next.bind(this);
        this.speed = 2.5 + (Math.random() * .5)
        this.willPurchase = willPurchase
        this.width = stage.width;
        if (willPurchase) {
            this.height = stage.height * .95;
        }
        else {
            this.height = stage.height * .25;
        }
    }

    checkPurchase() {
        if (this.x > this.width / 2 - this.r && this.willPurchase) {
            this.color = this.colorPurchase
            this.madePurchase = true
        }
    }

    nextX() {
        this.x = this.x + this.speed;
    }

    nextY() {
        let piDenom = (this.width) / Math.PI;
        this.y = Math.sin((this.x / piDenom)) * this.height;
    }

    next() {
        if (this.x < this.width) {
            this.nextX()
            this.nextY()
            this.checkPurchase()
        } else {
            this.completed = true
        }
    };
}


export class Round {
    stage!: Stage;
    cost!: number;
    price!: number;
    coef!: number;
    intercept!: number;
    roundComplete:boolean = false;
    shoppers: Person[] = [];

    constructor(coef: number, intercept: number, cost: number, price: number, stage: Stage) {
        this.coef = coef;
        this.intercept = intercept;
        this.cost = cost;
        this.price = price;
        this.stage = stage;
    }

    createShoppers() {
        let counter = 0;
        let counterMax = 50
        let i = setInterval(() => {
            // Check if shopper will buy the product at the selected price
            let purchaseProbability = evaluateElasticity(this.price, this.coef, this.intercept)
            let willPurchase = purchaseProbability > Math.random() ? true : false;
            this.shoppers = [new Person(this.stage, willPurchase), ...this.shoppers]
            // Check if total shoppers have all been generated
            counter++;
            if (counter >= counterMax) {
                clearInterval(i);
            }
        }, 100);
    }

    waveStep() {
        // Increment each shopper
        this.shoppers.forEach(e => {
            e.next()
        })
        // Check that all shoppers have finished their animation
        let countCompleted = this.shoppers.filter((e)=>e.completed).length
        if (countCompleted==this.shoppers.length && countCompleted>0){
            this.roundComplete=true
        }
    }
 
    // Costs, Revenue, Profit
    calculateShopperStats() {
        const units = this.shoppers.filter((e) => e.madePurchase).length
        const revenue = units * this.price;
        const costs = units * this.cost;
        const profit = revenue - costs
        return [units, revenue, costs, profit]
    }
}