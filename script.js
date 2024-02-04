const Api_key = "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"
let Input = document.getElementById('input')
let Search_btn = document.getElementById('search_btn')


// document.querySelector('#history').innerHTML=""
Search_btn.addEventListener('click', () => {
    // console.log(Input.value);
    if (Input.value != "") {
        Input.style.boxShadow = ` inset 2px 2px 5px rgb(0, 0, 0,0.3)`;
        document.getElementsByClassName('loading')[0].style.display = `flex`
        runMessage(Input.value)
        
        Search_btn.style.cursor = ` not-allowed `
    } else {

        document.getElementsByClassName('loading')[0].style.display = `none`
        Input.style.boxShadow = " inset 0px 0px 5px red";
    }
})

function offButton() {
    Array.from(document.getElementsByClassName('button')).forEach((el) => {
        el.classList.remove('lang')

    })
}

Array.from(document.getElementsByClassName('button')).forEach((el) => {
    el.addEventListener('click', () => {
        offButton()
        el.classList.add('lang')

    })
})


let runMessage = async (message) => {
    let lang = document.getElementsByClassName('lang')[0].textContent
    try {
        let fetchApi = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Api_key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": `${message}+'in`+lang }],
                // prompt:message+'in'+lang,
                "temperature": 0.7,
                max_tokens: 3000
            })
        })
        let response = await fetchApi.json()
        let result = await response
        // console.log(result);
       let finalResult=(result.choices[0].message.content);
        messageBx(Input.value,finalResult)
        document.getElementsByClassName('loading')[0].style.display = `none`
    } catch (error) {
        console.log("this is an error");
        document.getElementsByClassName('loading')[0].innerHTML = `Not Found`
    }
    finally {
        Search_btn.style.cursor = `pointer `
        Input.value = ''
    }
    console.log(Input.value);
}
let count=0;
function messageBx(message,finalResult) {
    // console.log(message,finalResult);

    let myMessageBx=document.createElement('pre')
    myMessageBx.classList.add('question')
    let myMessage=document.createElement('p')
    myMessage.innerHTML=`${message}`
    myMessageBx.append(myMessage)
    document.getElementById('history').append(myMessageBx)
    let myAnswerBx=document.createElement('pre')
    myAnswerBx.classList.add('answer')
    let myAnswer=document.createElement('p')
    myAnswer.innerHTML=`${finalResult}`
   
    myAnswer.id="ans"+count;
    let copyBtn=document.createElement('i')
    copyBtn.className=`fa-solid fa-copy`
   
    copyBtn.id='ansCopy'+count;
   
    console.log(copyBtn.id,myAnswer.id);
    myAnswer.append(copyBtn)
    count++;
    myAnswerBx.append(myAnswer)
    copyBtn.onclick=()=>{
        copyBtn.classList.remove("fa-copy")
        copyBtn.classList.add("fa-clipboard")
        messageCopy(myAnswer.id)
        setTimeout(()=>{
            copyBtn.classList.add("fa-copy")
            copyBtn.classList.remove("fa-clipboard")
        },3000)
        

    }
    document.getElementById('history').append(myAnswerBx)
}

let messageCopy=(id)=>{
    let message=document.getElementById(id).innerText
    navigator.clipboard.writeText(message)

}

