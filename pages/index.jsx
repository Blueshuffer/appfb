import React from 'react';
import Header from './Home/header';
import Main from './Home/main';
import Img from './Home/Img';
import Head from 'next/head';


export async function getStaticProps() {
  try {
    const res = await fetch('https://api.phoneonetwo.com/api/get');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const repo = await res.json();
    console.log('Fetched data:', JSON.stringify(repo, null, 2)); // Detailed log of the fetched data
    return { props: { data: repo } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { data: [] } }; // Return an empty array if there's an error
  }
}

export default function IndexPage({ data }) {
 
  return (
    <>
   <Head>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
<title> PG Games ความแตกต่างที่เป็นตัวตัดสิน pg slot game </title>
<meta name="description" content="ความแตกต่างที่เป็นตัวตัดสิน pg slot game และยังมีโปรโมชั่นแจกให้กับสมาชิกทุกท่านอีกด้วย" />
<meta property="og:title" content="PG Games ความแตกต่างที่เป็นตัวตัดสิน pg slot game"/>
<meta property="og:description" content="ความแตกต่างที่เป็นตัวตัดสิน pg slot game และยังมีโปรโมชั่นแจกให้กับสมาชิกทุกท่านอีกด้วย"/>
<meta property="og:url" content="https://www.chaiyoloan.com/"/>
<meta property="og:image" content="https://www.chaiyoloan.com/img/logo.jpg"/>



</Head>
  
      <section id="hero">
        <div className="hero-container">

        <div className="imges"> 
      
            <a href="https://line.me/ti/p/@fahlotto">     
            <Img data={data} className="img" />
         
            </a>
        </div>   </div>
      </section>
      <Header />
      <Main />
    </>
  );
}
