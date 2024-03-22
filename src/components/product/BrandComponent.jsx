import { BsFillTrash3Fill } from 'react-icons/bs';
import { HeaderInfo, HeaderPage, ListItem } from './ProductComponent.jsx';
import ModalDelete from '../modal/ModalDelete.jsx';
import { createContext, useContext, useState } from 'react';
import ModalBrand from '../modal/ModalBrand.jsx';

const testCategories = [
  { id: 1, name: 'Lifebouy' },
  { id: 2, name: 'Oriflame' },
];
const BrandInline = ({ item }) => {
  const { setCurrent } = useContext(BrandContext);
  const keysArray = Object.keys(item);
  const count = keysArray.length + 1;
  return (
    <div
      className={`grid grid-cols-${count} hover:bg-slate-200`}
      onClick={() => {
        setCurrent(() => item);
        document.getElementById('modal_brand')?.showModal();
      }}
    >
      <div className="m-auto">{item.id}</div>
      <div className="m-auto">{item.name}</div>
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
export const BrandContext = createContext();
function ManageListBrand({ categories = testCategories }) {
  const [current, setCurrent] = useState({});
  return (
    <BrandContext.Provider value={{ current, setCurrent }}>
      <div className="text-slate-500 bg-white">
        <HeaderPage info="Brand" setCurrentItem={setCurrent} type="brand" />
        <HeaderInfo headers={['No', 'Category', 'Delete']} />
        <ListItem>
          {categories.map(category => (
            <BrandInline item={category} key={category.id} />
          ))}
        </ListItem>
        <ModalDelete info="brand" />
        <ModalBrand type="brand" key={current?.id || 99} />
      </div>
    </BrandContext.Provider>
  );
}

export default ManageListBrand;
