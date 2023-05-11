import { Link } from 'react-router-dom';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={style.root}>
      <h2>Ничего не найдено!</h2>
      <h3>К сожалению, данная страница отстуствует в нашем магазине.</h3>
      <Link
        to="/"
        class="button button--outline button--add go-back-btn button--not"
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            srokeWidth="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default NotFoundBlock;
