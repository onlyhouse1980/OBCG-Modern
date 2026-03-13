'use client';
import styles from '../../styles/About.module.css'
import { motion } from 'framer-motion'


const Parade2024 = () => (
<motion.div exit={{ opacity: 0 }} initial={{opacity: 0 }} animate={{opacity: 1 }}>
   
    
    <motion.div className={styles.content}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <video className='fixed z-\[-1\]' controls muted loop style={{ width: '100%', height: '100%' }}
         src="https://res.cloudinary.com/dqxg7ccdf/video/upload/v1720796591/Orchard_Beach_July_4_parade_2024_sbfa5a.mp4#t=0.001" />
		 
    </motion.div>
    
  </motion.div>

);

export default Parade2024;