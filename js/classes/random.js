class Random
{
    static get INT_MAX()
    {
        return 2147483647;
    }

    static get SEQ()
    {
        return "31415926535897932384626433832795028841971693993751" //use pi digits to make it work for seeds -1, 0, 1
    }

    constructor(seed)
    {
        this.seed = seed;
        this.generation = 0;
        if(seed === undefined)
        {
            this.seed = Date.now();
        }
        this.n = this.seed;
        for(let i = 0; i < 10; i++) this.next();
    }

    next()
    {
        const increment = this.seed + parseInt(Random.SEQ[this.generation % Random.SEQ.length]);
        this.n = (this.n + increment) * increment;
        this.n %= Random.INT_MAX;
        this.generation++;
    }

    nextInt(bound = Random.INT_MAX)
    {
        this.next();
        return this.n % bound;
    }

    nextDouble()
    {
        this.next();
        return this.n / Random.INT_MAX;
    }
}