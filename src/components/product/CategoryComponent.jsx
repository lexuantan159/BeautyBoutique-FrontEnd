import { BsFillTrash3Fill } from 'react-icons/bs';
import { HeaderInfo, HeaderPage, ListItem } from './ProductComponent.jsx';
import ModalDelete from '../modal/ModalDelete.jsx';
import { createContext, useContext, useState } from 'react';
import ModalCategory from '../modal/ModalCategory.jsx';

const testCategories = [
  { id: 1, name: 'Cleaner' },
  { id: 2, name: 'Lipstick' },
  { id: 3, name: 'Powder' },
  { id: 4, name: 'Highlighter' },
  { id: 5, name: 'Perfume' },
];
const CategoryInline = ({ category }) => {
  const { setCurrent } = useContext(CategoryContext);
  const keysArray = Object.keys(category);
  const count = keysArray.length + 1;
  return (
    <div
      className={`grid grid-cols-${count} hover:bg-slate-200`}
      onClick={() => {
        setCurrent(() => category);
        document.getElementById('modal_category')?.showModal();
      }}
    >
      <div className="m-auto">{category.id}</div>
      <div className="m-auto">{category.name}</div>
      <div
        id="delete"
        className="flex justify-center items-center w-full text-slate-400 hover:text-red-500 font-medium text-xl ease-in duration-200 hover:scale-110"
        onClick={e => {
          e.stopPropagation();
          document.getElementById('modal_delete')?.showModal();
        }}
      >
        <BsFillTrash3Fill />
      </div>
    </div>
  );
};
export const CategoryContext = createContext();
function ManageListCategory({ categories = testCategories }) {
  const [current, setCurrent] = useState({});
  return (
    <CategoryContext.Provider value={{ current, setCurrent }}>
      <div className="text-slate-500 bg-white">
        <HeaderPage
          info="Category"
          setCurrentItem={setCurrent}
          type="category"
        />
        <HeaderInfo headers={['No', 'Category', 'Delete']} />
        <ListItem>
          {categories.map(category => (
            <CategoryInline category={category} key={category.id} />
          ))}
        </ListItem>
        <ModalCategory type="category" key={current?.id || 99} />
        <ModalDelete info="category" />
      </div>
    </CategoryContext.Provider>
  );
}

export default ManageListCategory;
