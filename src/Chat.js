import{useEffect, useRef, useState} from "react"
 export default function Chat(){
    const [userlist,setuserlist]=useState();
    let messageinput = useRef()
  

    const getapiIntegration= async()=>{
  
      //await will hold the execution till it gets the response.
        let serverResponse = await fetch("http://localhost:8080/getdata" ,
        {method:"GET"})

        let response = await serverResponse.json(); 

        setuserlist(response);  //userlist from the server response.
     
    }
    
  const  getMessage=()=>{
        setInterval(() => {
      
     //   getapiIntegration()
      }, 1000);
    }
   // useEffect(()=>{getapiIntegration();getMessage()},[]);
   

    const postapiIntegration=async()=>{
        console.log(messageinput);
       if(messageinput.current.value == ""){
        alert("enter the message")
        return
       }

        let params = {
            "name": "user1@",
            "message": messageinput.current.value
        }
        let serverResponse = await fetch("http://localhost:8080/storedata",
        {
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(params)

        })

        let response = await serverResponse.json();
        console.log(response)

        // responseRef.current.innerHTML = JSON.stringify(response);

        // setuserResponse(response);

      

    }

  return(
    <>
    <h1>Adium Concept</h1>
<div class="window">
  <aside class="conv-list-view">
    <header class="conv-list-view__header">
      <div class="cf">
        <ul class="close-button-list">
          <li></li><li></li><li></li>
        </ul>
        <ul class="function-list">
          <li class="icon-lupe"></li>
        </ul>
      </div>
    </header>
    <ul class="conv-list">
      <li>
        <div class="status">
          <i class="status__indicator--unread-message"></i>    
          <figure class="status__avatar">
            <img src="http://1.gravatar.com/avatar/7ec0cac01b6d505b2bbb2951a722e202?size=80"/>
          </figure>
          <div class="meta">
            <div class="meta__name">Mads Cordes</div>
            <div class="meta__sub--dark">Hi there :)</div>
          </div>
        </div>
      </li>      
      <li class="selected">
        <div class="status">
          <i class="status__indicator--replied-message"></i>    
          <figure class="status__avatar">
            <img src="http://1.gravatar.com/avatar/34735b367f6bf8d5d2f38cb3d20d5e36?size=80"/>
          </figure>
          <div class="meta">
            <div class="meta__name">Tim Pietrusky</div>
            <div class="meta__sub--dark">Browserhacks looks great!</div>
          </div>
        </div>
      </li>     
      <li>
        <div class="status">
          <i class="status__indicator--read-message"></i>    
          <figure class="status__avatar">
            <img src="http://0.gravatar.com/avatar/729edf889ced7863dedba95452272bca?size=80"/>
          </figure>
          <div class="meta">
            <div class="meta__name">HugoGiraudel</div>
            <div class="meta__sub--dark">Ok!</div>
          </div>
        </div>
      </li>
    </ul>
  </aside>


  <section class="chat-view">
    <header class="chat-view__header">
      <div class="cf">
        <div class="status">
          <i class="status__indicator--online"></i>  
          <div class="meta">
            <div class="meta__name">Tim Pietrusky</div>
            <div class="meta__sub--light">Adium that ass!</div>
          </div>
        </div>
        <ul class="function-list">
          <li class="icon-cloud"></li>
          <li class="icon-clock"></li>
          <li class="icon-dots"></li>
        </ul>
      </div>
    </header>
    <section class="message-view">

     <div>
      { userlist && userlist.map((obj,index)=>{
                return <>  <div className="message--send">
                <div className="message__bubble--send">
                  {
                    obj.message
                  }-
                    {
                    obj.name
                  }
                </div>
               
              </div>
              <div className="cf"></div> </>
             })}
    
     
   
    
     
      
     </div>
  
       
      
    </section>  
      <footer class="chat-view__input">
      <div class="input"><span class="input__emoticon"></span>
      <input type="text" ref={messageinput}/>
   
      
      </div>
      <div class="status">

      <button onClick={postapiIntegration}> send </button>
        <figure class="status__avatar--small">
       
          {/* <img src="http://1.gravatar.com/avatar/89b9501f0f9e3020aab173f9a5a47683?size=80"/> */}
        </figure>
      </div>
    </footer>
    </section>
    </div>
  </>
  )
}