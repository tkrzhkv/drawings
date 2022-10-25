import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./PaintingInfo.module.scss";

const PaintingInfo: React.FC = () => {
  const [painting, setPainting] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPaintings() {
      try {
        const { data } = await axios.get(
          "https://63386d3b937ea77bfdbff520.mockapi.io/items/" + id
        );
        setPainting(data);
      } catch (error) {
        alert("Error with data");
        navigate("/");
      }
    }
    fetchPaintings();
  }, []);

  if (!painting) {
    return <>'Loading...'</>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <img
          className={styles.img}
          src={painting.imageUrl}
          alt='painting'
        />
        <p className={styles.discription}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
          aperiam assumenda eligendi et exercitationem facilis, fugiat iste
          labore minima necessitatibus nemo numquam, quod repellat sequi soluta
          sunt voluptate voluptatibus.Ad aperiam aspernatur, aut autem
          consectetur cupiditate delectus deserunt distinctio eveniet ex impedit
          incidunt inventore laborum minima mollitia nihil non nostrum optio
          provident qui quidem recusandae reprehenderit saepe sapiente
          soluta.Enim, provident voluptatem? Deleniti eveniet expedita facere
          fuga ipsum nemo, nostrum nulla numquam praesentium, quas quidem
          similique! Alias amet beatae dolores, eum incidunt iure laborum
          maiores, molestiae porro praesentium voluptates.Aspernatur atque dicta
          dolore doloribus, ex facere id ipsa laudantium minima nam nihil
          obcaecati praesentium quae quasi quia quidem sapiente soluta suscipit.
        </p>
      </div>
      <h2 className={styles.title}>{painting.title}</h2>
      <h4 className={styles.title}>{painting.price} $</h4>
    </>
  );
};

export default PaintingInfo;
