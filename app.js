const $=s=>document.querySelector(s);
let chats=JSON.parse(localStorage.getItem("coviChats")||"null")||[{id:Date.now(),name:"New Chat",messages:[]}];
let current=chats[0].id;

function save(){localStorage.setItem("coviChats",JSON.stringify(chats))}
function currentChat(){return chats.find(c=>c.id===current)}
function renderList(){
  $("#chatList").innerHTML="";
  chats.forEach(c=>{
    const b=document.createElement("button"); b.className="chat-item"+(c.id===current?" active":"");
    b.textContent=c.name; b.onclick=()=>{current=c.id;render()};
    $("#chatList").appendChild(b);
  });
}
function render(){
  const c=currentChat(); $("#chatTitle").textContent=c.name; renderList();
  const box=$("#messages"); box.innerHTML="";
  if(!c.messages.length){box.innerHTML='<div class="welcome"><div class="big-avatar">C</div><h2>Hi! I’m Covi 👋</h2><p>I’m your AI friend. Start a conversation below!</p></div>';return}
  c.messages.forEach(m=>{const d=document.createElement("div");d.className="bubble "+m.role;d.textContent=m.text;box.appendChild(d)});
  box.scrollTop=box.scrollHeight;
}
function rename(){
  const c=currentChat(), n=prompt("Name this chat:",c.name);
  if(n&&n.trim()){c.name=n.trim().slice(0,60);save();render()}
}
$("#newChat").onclick=()=>{const name=prompt("Name your new chat:","New Chat");chats.unshift({id:Date.now(),name:(name||"New Chat").trim().slice(0,60)||"New Chat",messages:[]});current=chats[0].id;save();render()};
$("#renameBtn").onclick=rename;
$("#composer").onsubmit=e=>{e.preventDefault();const input=$("#messageInput"),t=input.value.trim();if(!t)return;const c=currentChat();c.messages.push({role:"user",text:t});c.messages.push({role:"covi",text:"Thanks for your message! 🤖 I’m ready to chat. The AI connection isn’t connected yet in this demo, but the chat system is working."});input.value="";save();render()};
$("#termsBtn").onclick=()=>$("#modal").classList.remove("hidden");
$("#closeModal").onclick=()=>$("#modal").classList.add("hidden");
$("#acceptTerms").onclick=()=>$("#modal").classList.add("hidden");
$("#menuBtn").onclick=()=>$(".sidebar").classList.toggle("open");
render();
