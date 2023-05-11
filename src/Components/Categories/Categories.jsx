import style from './Categories.module.scss';

export const categoryData = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories = ({ index, onClickCategory }) => {
  return (
    <div className={style.categories}>
      <ul>
        {categoryData.map((category, indexId) => {
          return (
            <li
              key={indexId}
              onClick={() => onClickCategory(indexId)}
              className={index === indexId ? `${style.active}` : ''}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
