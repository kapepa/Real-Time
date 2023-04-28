import {useEffect, useState} from "react";
import axios from "axios";

export function Polling () {
  let [input, setInput] = useState('');
  let [message, setMessage] = useState([]);

  let onSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({text: input, date: Date.now()}).then(() => setInput(''));
  };

  let onChangeInput = (e) => setInput(e.target.value);

  let sendMessage = async (message) => {
    try{
      return await axios.post(`http://localhost:5000/polling/new-message`, message);
    }catch (err) {
      console.log(err)
    }
  }

  let subscribeToMessage = async () => {
    try {
      let {data} = await axios.get('http://localhost:5000/polling/get-message');
      setMessage( prev => [data, ...prev]);
      await subscribeToMessage();
    } catch (err) {
      setTimeout(async () => await subscribeToMessage(), 500)
    }
  }

  useEffect(  () => {
    subscribeToMessage().then();
  }, [])

  return (
    <>
      <h1 className="h1">Sourcing</h1>

      <h3 className="h3"> Form </h3>
      <form onSubmit={onSubmit} className="form" >
        <input onChange={onChangeInput} className="form__input" type='text' name='message' value={input} />
        <button type='submit' disabled={!input} className="form__button">Send</button>
      </form>

      <h3 className="h3"> Message </h3>
      <div className="message">
        {
          !!message
          && <>
            { message.map((message => <span key={message.date} className="message__span">{message.text}</span>)) }
          </>
        }
      </div>
    </>
  )
}