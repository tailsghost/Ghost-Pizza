import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import style from './PizzaBlock.module.scss';

const typeName = ['Тонкое', 'Традиционное'];
const sizeName = [26, 30, 40];

const PizzaBlock = ({
  id,
  imageUrl,
  title,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const [sizeActive, setSizeActive] = useState(0);
  const [typePizza, setTypePizza] = useState(0);
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeName[typePizza],
      size: sizes[sizeActive],
    };
    dispatch(addItem(item));
  };

  return (
    <div
      className={style.pizza_block}
      id={id}
      category={category}
      rating={rating}
    >
      <img src={imageUrl} alt="Pizza" />
      <h4 className={style.title}>{title}</h4>
      <div className={style.selector}>
        <ul>
          {types.map((type, index) => {
            return (
              <li
                key={index}
                onClick={() => setTypePizza(index)}
                className={typePizza === index ? `${style.active}` : ''}
              >
                {typeName[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((diameter, index) => {
            return (
              <li
                key={index}
                onClick={() => setSizeActive(index)}
                className={sizeActive === index ? `${style.active}` : ''}
              >
                {diameter} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.bottom}>
        <div className={style.price}>от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span>Добавить</span>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
