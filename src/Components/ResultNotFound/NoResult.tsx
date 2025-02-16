import { FC } from 'react';
import { motion } from 'framer-motion';
import errorImage from '../../assets/error.png';
import style from './noresult.module.css';

interface ErrorProps {
  message: string;
}

const NoResults: FC<ErrorProps> = ({ message }) => {
  // Animation variants with responsive values
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const imageVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className={style.result}
      role="alert"
      aria-live="polite"
      aria-label="No results found"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }} // Reduced scale for better mobile experience
    >
      <motion.img 
        src={errorImage}
        alt="No results found"
        loading="lazy"
        aria-hidden="true"
        variants={imageVariants}
        whileHover={{ 
          rotate: [0, -3, 3, -3, 0], // Reduced rotation for better mobile experience
          transition: { duration: 0.4 }
        }}
      />
      <motion.p 
        className={style.message}
        tabIndex={0}
        aria-label={message}
        variants={itemVariants}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default NoResults;
