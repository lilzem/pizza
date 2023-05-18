import React from 'react';

type CategoriesProps = {
  value : number;
  onChangeCategory : (key: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  return (
      <div className="categories">
            <ul>
              {categories.map((categoryName, key) => (
              <li key={key} onClick={() => onChangeCategory(key)} className={value == key ? 'active' : ''}>
                {categoryName}
              </li>
              ))}
            </ul>
          </div>
  )
}

export default Categories;