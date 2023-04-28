import {useEffect, useRef, useState} from "react";
import axios from "axios";

export function Sourcing () {
  let refEventSource = useRef();
  let [input, setInput] = useState('');
  let [message, setMessage] = useState([]);

  let onSubmit = (e) => {
    e.preventDefault();
    sendMessage({text: input, date: Date.now()}).then(() => setInput(''));
  }

  let onChangeInput = (e) => setInput(e.target.value);

  let sendMessage = async (message) => {
    try{
      return await axios.post(`http://localhost:5000/sourcing/new-message`, message);
    }catch (err) {
      console.log(err)
    }
  }

  let subscribeToMessage = async () => {
    if(!refEventSource.url) refEventSource = new EventSource('http://localhost:5000/sourcing/connect');

    refEventSource.onmessage = (event) => {
      let toMessage = JSON.parse(event.data);
      setMessage(prev => [toMessage, ...prev]);
    }
  }

  useEffect(() => {
    subscribeToMessage().then();
  }, [])

  return (
    <>
      <h1 className="h1">Sourcing</h1>

      <h3 className="h3"> Form </h3>
      <form onSubmit={onSubmit} className="form" >
        <input onChange={onChangeInput} className="form__input" type='text' name='message' value={input}/>
        <button type='submit' disabled={!input} className="form__button">Send</button>
      </form>

      <h3 className="h3"> Message </h3>
      <div className="message">
        {
          !!message.length
          && <>
            { message.map((message=> <span key={message.date} className="message__span">{message.text}</span>)) }
          </>
        }
      </div>
    </>
  )
}