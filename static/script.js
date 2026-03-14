function translateText(){

let text=document.getElementById("text").value
let language=document.getElementById("language").value

fetch("/translate",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:"text="+text+"&language="+language
})
.then(res=>res.json())
.then(data=>{

document.getElementById("result").innerText=data.translated

loadHistory()

})

}

function loadHistory(){

fetch("/history")
.then(res=>res.json())
.then(data=>{

let list=document.getElementById("history")

list.innerHTML=""

data.forEach(item=>{

let li=document.createElement("li")

li.innerText=item.input+" → "+item.output

list.appendChild(li)

})

})

}

function copyText(){

let text=document.getElementById("result").innerText

navigator.clipboard.writeText(text)

alert("Copied!")

}

function clearHistory(){

fetch("/clear")
.then(()=>loadHistory())

}

function toggleMode(){

document.body.classList.toggle("dark")

}

let textarea=document.getElementById("text")

textarea.addEventListener("input",function(){

document.getElementById("count").innerText=
textarea.value.length+" characters"

})

function startVoice(){

const recognition = new webkitSpeechRecognition()

recognition.lang="en-US"

recognition.onresult=function(event){

document.getElementById("text").value=event.results[0][0].transcript

}

recognition.start()

}