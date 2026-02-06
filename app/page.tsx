"use client";
import { useState } from "react";

export default function Home() {

  const [text,setText] = useState("");
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);

  async function generate(){
    if(!text) return;
    setLoading(true);
    setResult("");

    const res = await fetch("/api/generate",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({prompt:text})
    });

    const data = await res.json();
    setResult(data.code);
    setLoading(false);
  }

  return (
    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"#00ff88",
      fontFamily:"monospace",
      padding:40
    }}>

      <h1 style={{fontSize:40}}>NEXCODE AI</h1>
      <p>AI that converts ideas into code like a hacker</p>

      <textarea
      value={text}
      onChange={(e)=>setText(e.target.value)}
      placeholder="Describe what you want to build..."
      style={{
        width:"100%",
        height:150,
        background:"#010101",
        color:"#00ff88",
        border:"1px solid #00ff88",
        padding:15,
        marginTop:20
      }}
      />

      <br/>

      <button onClick={generate}
      style={{
        marginTop:20,
        padding:15,
        background:"#00ff88",
        color:"#000",
        fontWeight:"bold",
        border:"none",
        cursor:"pointer"
      }}>
        {loading ? "Generating..." : "Generate Code"}
      </button>

      <pre style={{
        marginTop:30,
        background:"#010101",
        padding:20,
        border:"1px solid #00ff88",
        whiteSpace:"pre-wrap"
      }}>
        {result}
      </pre>

    </div>
  );
}

