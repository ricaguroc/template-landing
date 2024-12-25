
import { motion } from "framer-motion";


interface CardProps {

    backgroundImage?: string,

}

const Card = ({backgroundImage}: CardProps) => {



    return (

            <>

                <motion.div

                whileHover={{

                    opacity:0.3,

                }}

                transition={{

                    duration:0.5

                }}

                style={{

                    width: "100%",
                    height: "100%",
                    background: backgroundImage ? `url(${backgroundImage}) center/cover` : "gray",
                    borderRadius:"10px",


                }}


                >


                </motion.div>

            </>

            )

}

export default Card;
