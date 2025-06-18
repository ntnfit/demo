"use client";

import React from "react";
import styles from "./header.module.css";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.title}>
          <h1>AI Assistant</h1>
          <p>Chat and File Search</p>
        </div>
        <div className={styles.controls}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
