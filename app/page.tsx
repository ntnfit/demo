"use client";

import React from "react";
import styles from "./page.module.css";
import Chat from "./components/chat";
import FileViewer from "./components/file-viewer";
import Header from "./components/header";

const Home = () => {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <div className={styles.column}>
            <FileViewer />
          </div>
          <div className={styles.chatContainer}>
            <div className={styles.chat}>
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
