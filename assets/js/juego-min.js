(()=>{"use strict";let e=[],t=["C","D","H","S"],a=["J","Q","K","A"],r=[],l=document.querySelector("#btnNuevo"),d=document.querySelector("#btnDetener"),n=document.querySelector("#btnPedir"),s=document.querySelectorAll(".divCartas"),i=document.querySelectorAll("small"),o=(t=2)=>{e=c(),r=[];for(let a=0;a<t;a++)r.push(0);i.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),n.disabled=!1,d.disabled=!1},c=()=>{let e=[];for(let r=2;r<=10;r++)for(let l of t)e.push(r+l);for(let d of t)for(let n of a)e.push(n+d);return _.shuffle(e)},$=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},u=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},p=(e,t)=>(r[t]=r[t]+u(e),i[t].innerText=r[t],r[t]),f=(e,t)=>{let a=document.createElement("img");a.src=`assets/cartas/${e}.png`,a.classList.add("carta"),s[t].append(a)},h=()=>{let[e,t]=r;setTimeout(()=>{t===e?alert("Empate"):e>21?alert("computadora gana la partida"):t>21?alert("Jugador gana la partida"):alert("Computadora gana la partida")},100)},b=e=>{let t=0;do{let a=$();t=p(a,r.length-1),f(a,r.length-1)}while(t<e&&e<=21);h()};n.addEventListener("click",()=>{let e=$(),t=p(e,0);f(e,0),t>=21?(n.disabled=!0,d.disabled=!0,b(t)):21===t&&(n.disabled=!0,d.btnPedir=!0,b(t))}),d.addEventListener("click",()=>{n.disabled=!0,d.disabled=!0,b(r[0])}),l.addEventListener("click",()=>{o()})})();