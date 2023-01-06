import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBarFinal from './components/AppBarFinal';
import NoteForm from './components/NoteForm';
import { initializeNotes } from './reducers/noteReducers';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  const notes = useSelector(({ notes }) => notes);

  return (
    <>
      <AppBarFinal />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        deleniti blanditiis reiciendis, soluta at ratione tenetur magni odio
        provident culpa hic quas? Vel debitis ratione autem facere porro,
        voluptates esse similique odit possimus eligendi, doloribus ad, numquam
        nulla. Cumque blanditiis quod ullam fuga optio ipsum obcaecati eius
        alias quas rerum quis, aliquid odit excepturi tenetur aliquam,
        laboriosam libero consequuntur amet asperiores totam. Doloribus adipisci
        illo minus odio pariatur delectus libero quia neque, minima hic, id ab?
        Optio mollitia quis autem aperiam molestias cumque minus consectetur
        earum? Repellendus quis, distinctio explicabo ducimus minus quos cumque
        sequi id a eum excepturi! Aperiam quidem eligendi accusamus
        necessitatibus odio sequi esse impedit expedita repellendus? Illum non
        recusandae iure dolores quo optio aut facere enim soluta voluptatum.
        Blanditiis, vero. Accusantium exercitationem distinctio beatae numquam
        ad totam sapiente cupiditate nisi magnam ullam dolore, perferendis
        fugiat blanditiis officiis ut error sequi ex explicabo sit, ipsam
        commodi? Fugit, quisquam ut officia debitis accusamus ipsa perspiciatis
        esse nobis id blanditiis quam, perferendis accusantium omnis autem
        repellat ab nam amet? A velit nemo consequatur ducimus incidunt illo
        harum, distinctio, accusamus iste hic impedit perspiciatis ut dolor
        illum earum eligendi nam eaque vitae repudiandae. Ut impedit soluta quod
        explicabo temporibus, magni voluptate enim delectus earum fuga placeat,
        adipisci voluptas mollitia cumque hic quia alias libero voluptatem,
        tenetur nulla assumenda perferendis repellat recusandae expedita!
        Inventore error dolores architecto saepe sequi incidunt exercitationem
        nemo velit, commodi veniam consectetur atque omnis, iste obcaecati. Eos
        tempore ipsum tempora temporibus vel velit dolores! Sit possimus ipsum
        architecto saepe quam. Vitae asperiores eveniet veritatis quis at
        consequatur ea rerum repellendus fugit excepturi, recusandae eius!
        Perferendis, inventore consequatur. Quos quae modi minus architecto
        necessitatibus nobis officiis, maxime tempore a, dolore facere dolorem,
        numquam maiores placeat ex reprehenderit laborum harum. Totam impedit
        accusamus mollitia similique velit molestiae fuga quas!
      </div>
    </>
  );
};
export default App;
