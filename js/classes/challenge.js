const CHALLENGE_EFFECT_UPGRADESTRENGTH_SIMPLEBOOST = 0, CHALLENGE_EFFECT_PRICES_POWER = 1, CHALLENGE_EFFECT_GENMULTI = 2,
    CHALLENGE_EFFECT_PRESTIGEREWARD = 3;
const CHALLENGE_REWARD_POWERGENERATORS = 0, CHALLENGE_REWARD_GENMULTI = 1, CHALLENGE_REWARD_PRESTIGEREWARD = 2,
    CHALLENGE_REWARD_GENMULTI_ABS = 3, CHALLENGE_REWARD_RESTACK = 4;

class Challenge
{
    constructor(layer, name, getEffect, getReward, effectType, rewardType, goalLayer, goalResource, maxLevel = 10, cfg)
    {
        this.layer = layer;
        this.name = name;
        this.getEffect = getEffect;
        this.getReward = getReward;
        this.effectType = effectType;
        this.rewardType = rewardType;
        this.goalLayer = goalLayer;
        this.goalResource = goalResource;
        this.level = 0;
        this.maxLevel = maxLevel;
        this.cfg = cfg;
    }

    applyEffect()
    {
        return this.getEffect(this.level);
    }

    applyReward()
    {
        return this.getReward(this.level);
    }

    getDescription()
    {
        switch (this.effectType)
        {
            case CHALLENGE_EFFECT_UPGRADESTRENGTH_SIMPLEBOOST:
                return "All Upgrade and Simple Boost Effects are raised to the Power of " + this.applyEffect().toFixed(2);
            case CHALLENGE_EFFECT_PRICES_POWER:
                return "All Generator and Upgrade Prices are raised to the Power of " + this.applyEffect().toFixed(2) + ". " +
                    "Power Effects are raised to the Power of " + this.applyEffect().pow(-1).toFixed(2);
            case CHALLENGE_EFFECT_GENMULTI:
                return "All Generator Multipliers are raised to the Power of " + this.applyEffect().toFixed(2);
            case CHALLENGE_EFFECT_PRESTIGEREWARD:
                return "All Prestige Rewards are raised to the Power of " + this.applyEffect().toFixed(2);
            default:
                return "That's weird. Something's different..."
        }
    }

    getRewardDescription()
    {
        switch (this.rewardType)
        {
            case CHALLENGE_REWARD_POWERGENERATORS:
                return "All Power Generators are x" + functions.formatNumber(this.applyReward(), 2, 2) + " stronger";
            case CHALLENGE_REWARD_GENMULTI:
                return "All Generator Multiplicators per 10 Levels are +" + functions.formatNumber(this.applyReward(), 3, 3) + " better";
            case CHALLENGE_REWARD_PRESTIGEREWARD:
                return "Prestige Reward of Layer " + PrestigeLayer.getNameForLayer(this.cfg.layerid) + " is x" + functions.formatNumber(this.applyReward(), 2, 2) + " higher";
            case CHALLENGE_REWARD_GENMULTI_ABS:
                return "All Alpha Generators are x" + functions.formatNumber(this.applyReward(), 2, 2) + " stronger";
            case CHALLENGE_REWARD_RESTACK:
                return "Restack gain is multiplied by x" + functions.formatNumber(this.applyReward(), 2, 2);
            default:
                return "A Cake."
        }
    }

    resetPreviousLayers()
    {
        for(let i = 0; i < game.layers.length; i++)
        {
            if(game.layers[i].isNonVolatile())
            {
                game.layers[i].resource = new Decimal(0);
                continue;
            }
            if(game.layers[i] === this.layer)
            {
                break;
            }
            game.layers[i].reset();
        }
    }

    getResourceGoal()
    {
        return Decimal.pow(this.goalResource, 1 + 0.2 * this.level);
    }

    canEnter()
    {
        return !game.currentChallenge && this.level < this.maxLevel;
    }

    isCompleted()
    {
        return this.goalLayer.resource.gte(this.getResourceGoal());
    }

    enter()
    {
        if(this.canEnter())
        {
            this.resetPreviousLayers();
            game.currentChallenge = this;
        }
    }

    leave()
    {
        this.resetPreviousLayers();
        game.currentChallenge = null;
    }

    succeed()
    {
        game.currentChallenge = null;
        this.level++;
    }

    tick(dt)
    {
        if(this.goalLayer.resource.gte(this.goalResource))
        {
            this.succeed();
        }
    }
}