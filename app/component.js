/* global document */
import styles from './main.scss';

export default (text = 'Hello World') => {
  const ele = document.createElement('div');
  ele.className = `${styles.redButton} pure-button`;
  ele.innerHTML = text;

  return ele;
};
