'use client';
import styles from '../../styles/About.module.css'
import { motion } from 'framer-motion'


const video = () => (
<motion.div exit={{ opacity: 0 }} initial={{opacity: 0 }} animate={{opacity: 1 }}>
   
    
    <motion.div className={styles.iframe}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}>
      <iframe src="https://drive.google.com/file/d/1Op6BCXirdL5YD0YOXRKE890U7uzvESOf/preview" allowFullScreen width="640" height="480" allow="autoplay"></iframe>
	
		 
    </motion.div>
    
  </motion.div>

);

export default video;