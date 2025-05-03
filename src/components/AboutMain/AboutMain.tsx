import Image from 'next/image'

const AboutMain = () => {
  return (
    <section className="container flex flex-col justify-center items-center  mx-auto px-4 py-16">
       <div className='w-full flex justify-center mt-[10%] '>
        <h1 className='text-[150px] lg:text-[150px] md:text-[120px] sm:text-[80px] font-AboutMe tracking-[-15px] font-bold'>
            ABOUT ME
        </h1>
       </div>
       <div className='w-8/12 flex justify-center mt-[20%]'>
        <h2 className='text-[32px] flex justify-center '>
            7 years of extensive experience in web
            agencies, collaborating with both
            large-scale companies  and innovative
            smallerones. This has equipped me with the
            ability to effectively understand and meet
            companies' preferences and needs.
        </h2>
       </div>

       <div className='mt-[20%] w-7/12'>
        <div className='flex flex-row'>
            <img src="MainPic.jpg" alt=""  className='h-64 w-64 rounded-full '/>
            <h1 className='text-[96px] flex flex-col font-AboutMe font-[900] ml-[-40px] tracking-[-10px] '>
            PRINCIPLES{' '}
            <span className='mt-[-40px]'>&amp; GUIDELINES</span>
            </h1>
        </div>
        <div className='w-[500px]'>
            <h2>
            I am dedicated to accountability and excellence, always meeting deadlines and putting forth maximum effort.
            Driven by passion, I take on projects that captivate me, ensuring innovative and unique solutions.
            In collaboration, I prioritize respectful, harmonious relationships, fostering a positive and calm working environment.
            </h2>
        </div>
       </div>
    </section>
  )
}

export default AboutMain
