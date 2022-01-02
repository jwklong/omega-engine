class PowerGenerator extends Generator
{
    tick(dt)
    {
        if(this.generates !== null)
        {
            this.generates.amount = this.generates.amount.add(this.getProductionPS().mul(dt));
        }
        else
        {
            this.layer.power = this.layer.power.add(this.getProductionPS().mul(dt));
        }
    }

    getProductionMulti()
    {
        let multi = new Decimal(1);
        for(const l of game.layers)
        {
            for(const upg of l.getAllUpgrades().filter(u => u.type === UPGRADE_POWERGENERATOR_TIMELAYER && u.layerBoost === this.layer || (u.type === UPGRADE_POWERGENERATOR && u.layerBoost === this.layer && u.cfg.generators.includes(this.id))))
            {
                multi = multi.mul(upg.apply());
            }
            if(l.hasPower() && l.powerTargetLayer === this.layer && l.powerTargetType === TARGET_POWERGENERATORS)
            {
                multi = multi.mul(l.getPowerBoost());
            }
            if(l.hasChallenges())
            {
                for(const ch of l.challenges.filter(c => c.level > 0 && c.rewardType === CHALLENGE_REWARD_POWERGENERATORS))
                {
                    multi = multi.mul(ch.applyReward());
                }
            }
        }
        multi = multi.mul(game.alephLayer.upgrades.powerGenerators.apply());
        const power = game.restackLayer.permUpgrades.powerGenerators.apply();
        return Decimal.pow(2, Decimal.floor(this.bought.div(10))).mul(multi).pow(power);
    }
}