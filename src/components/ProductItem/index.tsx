import { Rate } from 'antd';
import { Product } from 'src/interface/home';

interface PropProductItem {
  product: Product;
}

const ProductItem: React.FC<PropProductItem> = (props) => {
  const {
    product: { thumbnail, title, description, rating, price, discountPercentage }
  } = props;

  return (
    <div className='my-8 rounded shadow-lg bg-white duration-300 hover:-translate-y-1'>
      <a href='#' className='cursor-pointer'>
        <figure>
          <img src={thumbnail} className='rounded-t h-72 w-full object-cover' />

          <figcaption className='p-4'>
            <p className='text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300'>{title}</p>
            <Rate allowHalf value={rating} disabled />
            <p>
              <small className='leading-5 text-gray-500 dark:text-gray-400'>{description}</small>
            </p>
            <div className='flex flex-row justify-between'>
              <p className='text-orange-p font-bold'>${price}</p>
              {discountPercentage > 0 && <p className='text-red-400'>{discountPercentage}%</p>}
            </div>
          </figcaption>
        </figure>
      </a>
    </div>
  );
};

export default ProductItem;
