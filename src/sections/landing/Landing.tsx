import './Landing.css'
import { motion, AnimatePresence } from 'framer-motion';
import { useState,useEffect } from 'react';





function Landing() {


  const words: string[] = ["INNOVATE", "TRANSFORM", "BE EPIC", "CHANGE"]
  const [index, setIndex] = useState<number>(0)
  

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prevIndex) => (prevIndex + 1) % words.length);

    }, 3000); 

    return () => clearInterval(interval); 
    
  }, []);

  return (
    <>

      <section className='s1'>

        <div className='basico'>

          <div className='columnas'> 

            <div className='' style={{display:"flex", alignItems:"center", justifyContent:"start"}}>

              <AnimatePresence>
                
                <motion.h1

                  key={index}

                  initial={{
                    opacity: 0,
                    y: 300,
                    x:200,
                    rotate: "45deg",
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                    x:0,
                    rotate: "0deg",
                  }}

                  transition={{
                    duration: 0.5,
                    delay:0.5
                  }}

                  exit={{

                    opacity: 0,
                    y:-350,
                    x:100,
                    rotate: "-50deg",
                    
                  }}

                  style={{position:'absolute'}}
                >

                  {words[index]}

                </motion.h1>

              </AnimatePresence>

            </div>

            <motion.div 
            
            initial={{

              x:100,
              opacity: 0

            }}

            animate={{

              x:0,
              opacity:1

            }}

            transition={{

              duration:0.75

            }}
            
            className='columna-2'>

              <div style={{border:"4px solid green", width:"400px", height:"400px"}}> TEST </div>

            </motion.div>

          </div>

        </div>

      </section>


    </>
  )
}

export default Landing
