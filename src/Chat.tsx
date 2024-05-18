import { useState, useEffect } from 'react';
import ollama from 'ollama';

function Chat() {
  const [output, setOutput] = useState("");

  useEffect(() => {
    const fetchOllamaData = async () => {
      try {
        const firstResult = await ollama.pull({
          model: "llama2"
        });
        console.log(firstResult);

        const response = await ollama.chat({
          model: 'llama2',
          messages: [{ role: 'user', content: 'Why is the sky blue?' }],
        })

        console.log(response.message.content);
        setOutput(response.message.content)
      } catch (error) {
        console.error("Error fetching data from Ollama:", error);
      }
    };

    fetchOllamaData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <p>In the Chat component</p>
      {output && <div>Output Result: {JSON.stringify(output)}</div>}
    </>
  );
}

export default Chat;
