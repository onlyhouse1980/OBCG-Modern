'use client';
import styles from '../../styles/About.module.css'
import { motion } from 'framer-motion'


const Parade2025 = () => (
<motion.div exit={{ opacity: 0 }} initial={{opacity: 0 }} animate={{opacity: 1 }}>
   
    
    <motion.div className={styles.content}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <video className='fixed z-\[-1\]' controls muted loop style={{ width: '100%', height: '100%' }}
         src="https://res.cloudinary.com/dqxg7ccdf/video/upload/v1772472735/PXL_20250704_190947008.TS_lnddkd.mp4#t=0.001" />
		 
    </motion.div>
    
  </motion.div>

);

export default Parade2025;
