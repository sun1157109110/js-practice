let num = parseInt(readline());
// for(let i = 0;i<num;i++){
//     if(i%2===1){
//         print('Kalpas yame te!')
//     }else{
//         print('I love V2V forever!')
//     }
// }
// I love V2V forever!
// Kalpas yame te!
while(num>0){
//     let V2V = readline().split(' ').map(Number)
//     let qj = readline().split(' ').map(Number);
    let [Vhp,Vatt,Vdef,Vspd] = readline().split(' ').map(Number)
    let [Qhp,Qatt,Qdef,Qspd] = readline().split(' ').map(Number);
    let Qstarthp = Qhp;
    let flag = true;
    let isEle = false;//元素
    let ischaos = false//混乱
    let isRest = false;//休息
    let count = 1
    function Vinit(){
        if(flag&&Vhp<31){
            Vhp+=20;
            Vatt+=15;
            Qhp+=20;
            flag = false
        }
    }
    function VnormalAtt(){
        Qhp -= Vatt - Qdef>0?Vatt - Qdef:0
    }
    function VdriveAtt(){
        Qhp -= Vatt - Qdef>0?Vatt - Qdef:0;
        ischaos = true
    }
    function Qinit(){
        if(!isRest){
            Qatt += Math.floor((Qstarthp-Qhp)/5)
        }
    }
    function QnormalAtt(){
       if(!isRest){
           if(!ischaos){
             Vhp -= Qatt - Vdef>0?Qatt - Vdef:0
           }else{
               Qhp -= Qatt - Qdef>0? Qatt - Qdef:0
               ischaos = false
           }
       }else{
           isRest = false
       }
    }
    function QdriveAtt(){
        if(Qhp>=11){
            Qhp -= 10;
            Vhp-=45-Vdef>0?45-Vdef:0+20;
            isRest = true
        }else{
            QnormalAtt()
        }
    }
    while(Vhp>0&&Qhp>0){
        if(count%3!==0){
//             Vspd>Qspd?VnormalAtt(): QnormalAtt()
            if(Vspd>Qspd){
                Vinit();
                VnormalAtt()
                 Qinit();
                QnormalAtt()
            }else{
                 Qinit();
                QnormalAtt()
                Vinit();
                VnormalAtt()
            }
        }else{
//             Vspd>Qspd?VdriveAtt():QdriveAtt()
            if(Vspd>Qspd){
                Vinit();
                VdriveAtt()
                 Qinit();
               QdriveAtt()
            }else{
                Qinit();
               QdriveAtt()
               Vinit();
                VdriveAtt()
            }
        }
//         print(Vhp)
        count++
    }
    if(Vhp<0){
        print('Kalpas yame te!')
    }else{
        print('I love V2V forever!')
    }
    num--;
}