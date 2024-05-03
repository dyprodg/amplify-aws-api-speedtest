'use client';


import Link from 'next/link';
import { useState } from 'react';
import { FaGithub } from "react-icons/fa";

const api = 'https://ci307xzkvj.execute-api.eu-central-1.amazonaws.com/dev';
const pythonpath = '/python';
const gopath = '/go';
const nodepath = '/js';


export default function Home() {

  const [input, setInput] = useState('');
  const [pythonResult, setPythonResult] = useState({});
  const [goResult, setGoResult] = useState({});
  const [nodeResult, setNodeResult] = useState({});
  const [pythonMore, setPythonMore] = useState(false);
  const [goMore, setGoMore] = useState(false);
  const [nodeMore, setNodeMore] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const handlePython = async () => {
    const body = {
      string: input
    }
    const response = await fetch(api+pythonpath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    setPythonResult(result);
  }

  const handleGo = async () => {
    const body = {
      string: input
    }
    const response = await fetch(api+gopath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    setGoResult(result);
  }

  const handleNode = async () => {
    const body = {
      string: input
    }
    const response = await fetch(api+nodepath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    setNodeResult(result);
  }

  const handleAll = async () => {
    await handleNode();
    await handlePython();
    await handleGo();
  }


  return (
    <div className='w-full h-screen items-center flex flex-col'>
      <h1 className='text-5xl font-bold p-4 text-center'>Serverless API Test</h1>

      <h1 className='w-[400px] md:w-[800px] text-center p-4'>
        This is a test for serverless API's using AWS Lambda. It will count the number of words and letters. Then it will create two sorted arrays, one for words and one for letters. It will also count the number of each letter in the text. There are three different API Routes. Python, Go and Node.js . The execution time will be displayed for each API. If you want to check if the response is the same you can click for more.
      </h1>

      <Link href="https://github.com/dyprodg/amplify-aws-api-speedtest">
        <div className='flex flex-col items-center m-6 border rounded-2xl p-2'>
          <p>Link to the Github Repo</p>
          <FaGithub size={50} />
        </div>
        
        
      </Link>
      <textarea 
        className='border rounded-xl resize-none w-[400px] md:w-[800px] text-black p-4'
        type="text" 
        onChange={handleInput} 
        rows={10}
        />
        <button onClick={handleAll} className='bg-white text-black text-2xl px-6 py-4 border rounded-full hover:scale-105 my-4'>Test all</button>
        <div className='w-full flex flex-col md:flex-row justify-evenly m-4'>
        <div className='ml-4'>
          <button onClick={handlePython} className='bg-white text-black text-2xl px-6 py-4 border rounded-full hover:scale-105 my-4'>Python</button>
          <pre>Word Count: {pythonResult.wordCount}</pre>
          <pre>Letter Count: {pythonResult.letterCount}</pre>
          <pre>Execution Time in MS: {pythonResult.executionTime}</pre>
          <button onClick={() => setPythonMore(!pythonMore)} className=' mt-8 border p-2 rounded-full'>Click for Full Response</button>
          <p>{`But be carefull this can be huge :)`}</p>
          {pythonMore && <pre>{JSON.stringify(pythonResult, null, 2)}</pre>}
        </div>
        <div className='ml-4'>
          <button onClick={handleGo} className='bg-white text-black text-2xl px-6 py-4 border rounded-full hover:scale-105 my-4'>Go</button>
          <pre>Word Count: {goResult.wordCount}</pre>
          <pre>Letter Count: {goResult.letterCount}</pre>
          <pre>Execution Time in MS: {goResult.executionTime}</pre>
          <button onClick={() => setGoMore(!goMore)} className=' mt-8 border p-2 rounded-full'>Click for Full Response</button>
          <p>{`But be carefull this can be huge :)`}</p>
          {goMore && <pre>{JSON.stringify(goResult, null, 2)}</pre>}
        </div>
        <div className='ml-4'>
          <button onClick={handleNode} className='bg-white text-black text-2xl px-6 py-4 border rounded-full hover:scale-105 my-4'>Node.js</button>
          <pre>Word Count: {nodeResult.wordCount}</pre>
          <pre>Letter Count: {nodeResult.letterCount}</pre>
          <pre>Execution Time in MS: {nodeResult.executionTime}</pre>
          <button onClick={() => setNodeMore(!nodeMore)} className=' mt-8 border p-2 rounded-full'>Click for Full Response</button>
          <p>{`But be carefull this can be huge :)`}</p>
          {nodeMore && <pre>{JSON.stringify(nodeResult, null, 2)}</pre>}
        </div>
      </div>
    </div>
  );
}
