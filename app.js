const app = Vue.createApp({
    data(){
        return {
            monshealth: 100,
            yourhealth: 100,
            round: 0,
            winner: null,
            log: [],
        }
    },
    methods: {
        start(){
            this.monshealth = 100;
            this.yourhealth = 100;
            this.round = 0;
            this.winner = null;
            this.log = [];
        },
        attack(){
            this.round++;
            const youAttack = Math.floor(Math.random()*15);
            this.monshealth = this.monshealth - youAttack;
            this.addlog("You", "Attack", youAttack)
            const monAttack = Math.floor(Math.random()*15);
            this.yourhealth = this.yourhealth - monAttack;
            this.addlog("Monster", "Attacks", monAttack)
        },
        specattack(){
            this.round++;
            const youAttack = Math.floor(Math.random()*30);
            this.monshealth = this.monshealth - youAttack;
            this.addlog("You", "Attack", youAttack)
            const monAttack = Math.floor(Math.random()*30);
            this.yourhealth = this.yourhealth - monAttack;
            this.addlog("Monster", "Attacks", monAttack)
        },
        heal(){
            this.round++;
            const youheal = Math.floor(Math.random()*15);
            if(this.yourhealth + youheal > 100){
                this.yourhealth = 100;
            }else{
                this.yourhealth += youheal;
            }
            this.addlog("You", "Heal", youheal)
            const monAttack = Math.floor(Math.random()*20);
            this.yourhealth = this.yourhealth - monAttack;
            this.addlog("Monster", "Attacks", monAttack)
        },
        addlog(who, what, value){
            this.log.unshift({
                who: who,
                what: what,
                value: value,
            });
        }
    },
    watch: {
        yourhealth(val){
            if(val <=0 && this.monshealth <= 0){
                this.winner = "d"
            }else if (val <= 0){
                this.winner = "m"
            }
        },
        monshealth(val){
            if(val <=0 && this.yourhealth <= 0){
                this.winner = "d"
            }else if (val <= 0){
                this.winner = "y"
            }
        },
    },
    computed: {
        monsbar(){
            if(this.monshealth <0){
                return {width: "0%"};
            }
           return {width: this.monshealth + '%'} 
        }, 
        yourbar(){
            if(this.yourhealth <0){
                return {width: "0%"};
            }
            return {width: this.yourhealth + '%'} 
         }, 
         usespecial(){
             return this.round % 3 !== 0;
         }
    },
});

app.mount("#game");