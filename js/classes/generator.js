class Generator
{
    constructor(layer, id, generates, name, initPrice, priceIncrease, baseProd = new Decimal(1))
    {
        this.layer = layer;
        this.id = id; //nth generator, needed for upgrades
        this.generates = generates;
        this.amount = new Decimal(0);
        this.bought = new Decimal(0);
        this.name = name;
        this.initPrice = initPrice;
        this.priceIncrease = priceIncrease;
        this.baseProduction = baseProd;
    }

    tick(dt)
    {
        if(this.generates !== null)
        {
            this.generates.amount = this.generates.amount.add(this.getProductionPS().mul(dt));
        }
        else
        {
            this.layer.addResource(this.getProductionPS().mul(dt));
        }
    }

    getProductionMulti()
    {
        let multi = new Decimal(1);
        //resource and simple boost
        if(this.id === 0)
        {
            for(const l of game.layers)
            {
                for(const upg of l.getAllUpgrades().filter(upg => upg.type === UPGRADE_RESOURCE || upg.type === UPGRADE_RESOURCE_TIMELAYER))
                {
                    multi = multi.mul(upg.apply());
                }
                if(this.layer.layer === 0)
                {
                    multi = multi.mul(l.getSimpleBoost());
                }
            }
        }
        //individual generator boosts and multi boost
        let f = new Decimal(3);
        for(const l of game.layers)
        {
            for(const upg of l.getAllUpgrades().filter(upg => (upg.type === UPGRADE_GENERATOR && upg.cfg.generators.includes(this.id)) || upg.type === UPGRADE_GENERATOR_TIMELAYER))
            {
                multi = multi.mul(upg.apply());
            }
            for(const upg of l.getAllUpgrades().filter(upg => upg.type === UPGRADE_GENMULTI))
            {
                f = f.add(upg.apply());
            }
            if(l.hasPower() && l.powerTargetLayer === this.layer && l.powerTargetType === TARGET_GENERATORS)
            {
                multi = multi.mul(l.getPowerBoost());
            }
            if(l.hasChallenges())
            {
                for(const c of l.challenges.filter(ch => ch.rewardType === CHALLENGE_REWARD_GENMULTI))
                {
                    f = f.add(c.applyReward());
                }
                for(const c of l.challenges.filter(ch => ch.rewardType === CHALLENGE_REWARD_GENMULTI_ABS))
                {
                    multi = multi.mul(c.applyReward());
                }
            }
        }
        const challengePow = game.currentChallenge && game.currentChallenge.effectType === CHALLENGE_EFFECT_GENMULTI ? game.currentChallenge.applyEffect() : 1;
        return (Decimal.pow(f, Decimal.floor(this.bought.div(10))).mul(multi)).pow(challengePow);
    }

    getProductionPS()
    {
        return this.amount.mul(this.getProductionMulti()).mul(this.baseProduction);
    }

    getPrice(bought)
    {
        const power = game.currentChallenge && game.currentChallenge.effectType === CHALLENGE_EFFECT_PRICES_POWER ? game.currentChallenge.applyEffect() : new Decimal(1);
        const base = new Decimal(this.initPrice).mul(Decimal.pow(this.priceIncrease, Decimal.floor(bought.div(10))));
        return Utils.createValueDilation(base, 0.0075).pow(power);
    }

    currentPrice()
    {
        return this.getPrice(this.bought);
    }

    getPriceUntil10()
    {
        return this.currentPrice().mul(10 - this.bought.toNumber() % 10);
    }

    buy()
    {
        if(this.layer.resource.gte(this.currentPrice()))
        {
            this.layer.resource = this.layer.resource.sub(this.currentPrice());
            this.bought = this.bought.add(1);
            this.amount = this.amount.add(1);
        }
    }

    buyUntil10()
    {
        if(this.layer.resource.gte(this.getPriceUntil10()))
        {
            this.layer.resource = this.layer.resource.sub(this.getPriceUntil10());
            const toAdd = 10 - this.bought.toNumber() % 10;
            this.bought = this.bought.add(toAdd);
            this.amount = this.amount.add(toAdd);
        }
    }

    buyMax()
    {
        const oldBought = this.bought;
        this.bought = new Decimal(Utils.determineMaxLevel(this.layer.resource, this));
        const boughtLevels = this.bought.sub(oldBought);
        this.amount = this.amount.add(boughtLevels);
        if(boughtLevels.gt(0) && this.bought.lt(1e9))
        {
            this.layer.resource = this.layer.resource.sub(this.getPrice(this.bought.sub(1)));
        }
        if(game.settings.buyMaxAlways10)
        {
            while(this.getPriceUntil10().lte(this.layer.resource) && this.bought.lt(1e9))
            {
                this.buyUntil10();
            }
        }
        else
        {
            while(this.currentPrice().lte(this.layer.resource) && this.bought.lt(1e9))
            {
                this.buy();
            }
        }
    }
}