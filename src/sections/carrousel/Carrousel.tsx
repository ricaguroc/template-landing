import './Carrousel.css'
import Card from '../../components/Card'

import { useScroll, useTransform, motion, AnimatePresence} from 'framer-motion'
import { useState, useEffect, useRef} from 'react'


const TestCarrousel = () => {

    const ref = useRef<HTMLDivElement>(null)

    const {scrollYProgress} = useScroll({ target: ref })
    const x = useTransform(scrollYProgress, [0,1], ["1%", "-55%"])


    const refs = useRef<(HTMLDivElement | null)[]>([])
    const [scales, setScales] = useState<number[]>([])

    const calculateScales = () => {

        if (!refs.current) return

        const containerWidth = ref.current?.getBoundingClientRect().width || 0
        const centerX = containerWidth / 2
        const newScales = refs.current.map((item) => {

            if (item) {

                const rect = item.getBoundingClientRect()
                const distanceFromCenter = Math.abs(rect.left + rect.width / 2 - centerX)
                const scale = Math.max(0.7, 1.2 - (distanceFromCenter / containerWidth) * 0.5) // 0.7 es el mínimo tamaño

                return scale

            }

            return 1
        })

        setScales(newScales)
    }

    useEffect(() => {

        // Calcular escalas al iniciar y cuando cambia el scroll

        const handleScroll = () => {

            calculateScales()
            setGrande(false)

        }

        scrollYProgress.onChange(handleScroll)

        calculateScales()

        window.addEventListener('resize', calculateScales) // Recalcular cuando cambia el tamaño de la ventana

        return () => window.removeEventListener('resize', calculateScales)

    }, [scrollYProgress])
    

    const [grande, setGrande] = useState<boolean>(false)
    const [exit, setExit] = useState<boolean>(false)
    const [i, setIndex] = useState<number>(-1)

    return (
    
        <>

            <div className='carousel' ref={ref}>
                
                <div className='midContainer' style={{justifyContent: exit ? "center"  : "flex-start" }}>

                    <AnimatePresence onExitComplete={ () => { !grande && ( setExit(false) ) } }>
                        
                        {grande ? (
                            
                            <motion.div 
                            
                            key="bigImage" 
                            
                            style={{position:"absolute", width:"800px", height:"600px", background: `url(${imagenes[i].background}) no-repeat center/cover`, borderRadius:"10px"}}

                            animate={{

                                scaleX:1.4,
                                scaleY:1.2,

                            }}

                            exit={{

                                scaleX:0.8,
                                scaleY:0.7,
                                opacity:0.4

                            }}

                            transition={{
                                
                                duration:0.2,
                            
                            }}
                            
                            onClick={() => {setGrande(false)}}


                            >

                            </motion.div>
                            
                        
                        ) : ( exit ? (<></>) : (
                        
                            <motion.div className='itemsContainer' style={{x}}>

                            {

                                imagenes.map((imagen,index) => (

                                    <motion.div

                                    key={index}
                                    
                                    ref={(e) => (refs.current[index] = e)}

                                    onClick={() => {setExit(true),setGrande(!grande), setIndex(index)}}
                                    
                                    style={{position:"relative",margin:"auto", height:"400px", width:"600px", background:"black", display:"flex", alignItems:"center", justifyContent:"center",borderRadius:"10px", scale:scales[index]}}>
                                                    
                                        <Card backgroundImage={`${imagen.background}`}/>
                                        
                                        <div style={{background:"red",position:"absolute", zIndex:"-1"}}> {imagen.descripcion} </div>

                                    </motion.div>

                                ))

                            }

                            </motion.div>
                        
                        ))}

                    </AnimatePresence>
                    
                </div>

            </div>
        
        </>

    )

}

export default TestCarrousel

interface PropImagen {

    id:number,
    background:string,
    descripcion:string,


}

const imagenes: PropImagen[] = [

    {id:0,background:"/images/1.jpg", descripcion:"testttt"},
    {id:1,background:"", descripcion:"f"},
    {id:2,background:"",descripcion:""},
    {id:3,background:"",descripcion:""},
    {id:4,background:"",descripcion:""},

]

