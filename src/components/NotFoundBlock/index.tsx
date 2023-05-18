import React from 'react'

import styles from './NotFound.module.scss'

export const NotFoundBlock : React.FC = () => {
  return (
    <div className={styles.root}>
      <span> =( </span>

      <br/>

      <h1> Нічого не знайдено</h1>

      <p className={styles.description}>На жаль, даної сторінки не існує у нашому інтернет-магазині</p>

      <p>Не сумуйте!!!</p>

    </div>
  )
}

