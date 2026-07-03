import React from 'react';
import styles from './ConnectedInteractive.module.css';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import { BiCodeAlt, BiBookOpen } from 'react-icons/bi';
import { LuSigma } from 'react-icons/lu';
import { MdColorLens } from 'react-icons/md';
import { IoLanguageOutline } from 'react-icons/io5';
import { FiMusic } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';

const ConnectedInteractive = () => {
  const categories = [
    { name: 'Coding', mentors: '42 Mentors', icon: <BiCodeAlt /> },
    { name: 'Math', mentors: '28 Mentors', icon: <LuSigma /> },
    { name: 'Design', mentors: '15 Mentors', icon: <MdColorLens /> },
    { name: 'Languages', mentors: '31 Mentors', icon: <IoLanguageOutline /> },
    { name: 'Music', mentors: '12 Mentors', icon: <FiMusic /> },
    { name: 'Exam Prep', mentors: '54 Mentors', icon: <BiBookOpen /> },
    { name: 'Other', mentors: '20 Mentors', icon: <BsThreeDots /> },
  ];

  return (
    <>
      <Navbar />
   <Hero/>
      <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Learn from <br />
            students. <br />
            <span className={styles.heroHighlight}>Teach what you<br />know.</span>
          </h1>
          <p className={styles.heroDescription}>
            Connect with verified peers at your college. Master new skills, share your expertise, and grow together.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>Explore Skills</button>
            <button className={styles.secondaryButton}>Become a Mentor</button>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <img 
            src="/students_learning_illustration.png" 
            alt="Students learning together" 
            className={styles.heroImage}
          />
        </div>
      </div>

      <div className={styles.categoriesSection}>
        <h2 className={styles.categoriesTitle}>Popular categories in your campus</h2>
        <div className={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.iconContainer}>
                {category.icon}
              </div>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryMentors}>{category.mentors}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default ConnectedInteractive;
