import { Button, Col, Drawer, Input, Row, Select, Slider, Spin } from 'antd';
import React, { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Category, Product, QueryParams, RangePrice } from 'src/interface/home';
import { useInfiniteQuery, useQuery } from 'react-query';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import ProductItem from './../../components/ProductItem';

const sortPrice: Record<string, string> = {
  DESC: 'High to low',
  ASC: 'Low to high'
};

const defaultItemTake = 10;

const getProducts = (query: QueryParams) => {
  const params: QueryParams = {
    page: query.page ?? 1,
    take: defaultItemTake
  };

  if (query.categoryId) {
    params.categoryId = query.categoryId;
  }

  if (query.minPrice && +query.minPrice > 0) {
    params.minPrice = query.minPrice;
  }

  if (query.maxPrice && +query.maxPrice > 0) {
    params.maxPrice = query.maxPrice;
  }

  if (query.q) {
    params.q = query.q;
  }

  if (query.order) {
    params.order = query.order;
  }

  if (query.orderField) {
    params.orderField = query.orderField;
  }

  return ProductService.getProducts(params);
};

const HomePage: React.FC = () => {
  const [rangePrice, setRangePrice] = useState<RangePrice>({ minPrice: 0, maxPrice: 0 });
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setOpen] = useState<boolean>(false);

  const { data } = useQuery('category', () => {
    return CategoryService.getCategory();
  });

  const baseParams = useMemo<QueryParams>(
    () => ({
      categoryId,
      minPrice: rangePrice.minPrice?.toString(),
      maxPrice: rangePrice.maxPrice?.toString(),
      q: searchText,
      order: sort,
      orderField: 'price'
    }),
    [rangePrice, categoryId, sort, searchText]
  );

  const {
    data: dataProduct,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ['product', rangePrice, categoryId, sort, searchText],
    ({ pageParam }) => {
      return getProducts({ ...baseParams, page: pageParam ?? 1 });
    },
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.data?.page + 1;
      }
    }
  );

  const products = useMemo<Product[]>(() => {
    if (!dataProduct) return [];
    let rs: Product[] = [];
    return dataProduct?.pages?.reduce((current: any, page: any) => {
      rs = [...current, ...page?.data?.data];
      return rs;
    }, rs);
  }, [dataProduct]);

  const categories = useMemo<Category[]>(() => {
    return data?.data || [];
  }, [data]);

  const onChangePrice = (value: number[]) => {
    setRangePrice({ minPrice: value[0], maxPrice: value[1] });
  };

  const onChangeCategory = (value: string) => {
    setCategoryId(value);
  };

  const onChangeSortPrice = (value: string) => {
    setSort(value);
  };

  const resetFilter = () => {
    setRangePrice({ minPrice: undefined, maxPrice: undefined });
    setCategoryId(undefined);
    setSort(undefined);
    setSearchText('');
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const observer: any = useRef();

  const lastElementRef = useCallback(
    async (node: any) => {
      if (isLoading || !hasNextPage) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [hasNextPage, isLoading, fetchNextPage]
  );

  const renderFilter = () => {
    return (
      <>
        <div className='mb-4'>
          <p className='text-base font-medium text-gray-600'>Price</p>
          <Slider
            range
            step={10}
            value={[rangePrice.minPrice ?? 0, rangePrice.maxPrice ?? 0]}
            max={2000}
            onChange={onChangePrice}
            onAfterChange={onChangePrice}
          />
          <div className='flex flex-row justify-between'>
            {(rangePrice.minPrice ?? 0) > 0 && <div>${rangePrice.minPrice}</div>}
            {(rangePrice.maxPrice ?? 0) > 0 && <div>${rangePrice.maxPrice}</div>}
          </div>
        </div>
        <div className='mb-4'>
          <p className='text-base font-medium text-gray-600 mb-1'>Category</p>
          <Select
            value={categoryId}
            style={{ width: '100%' }}
            onChange={onChangeCategory}
            options={categories.map((c) => ({
              value: c.id,
              label: c.name
            }))}
          />
        </div>
        <div className='mb-5'>
          <p className='text-base font-medium text-gray-600 mb-1'>Sort</p>
          <Select
            value={sort}
            style={{ width: '100%' }}
            onChange={onChangeSortPrice}
            options={Object.keys(sortPrice).map((key) => ({ value: key, label: sortPrice[key] }))}
          />
        </div>
        <Button onClick={resetFilter} className='bg-orange-p text-white'>
          Reset Filter
        </Button>
      </>
    );
  };

  return (
    <div className='p-5 h-full'>
      <Row className='h-full' gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col
          sm={0}
          md={6}
          lg={6}
          className='xs:hidden md:block h-full bg-white rounded-xl border border-[rgb(41 41 41 / 20%)]'
        >
          <div className='p-3'>{renderFilter()}</div>
        </Col>
        <Col sm={24} md={18} lg={18} className='w-full max-h-[calc(100vh-100px)]'>
          <div className='p-3 h-full bg-white rounded-xl border border-[rgb(41 41 41 / 20%)] mb-5 overflow-auto'>
            <div className='flex flex-row'>
              <Input placeholder='Search' onChange={onChangeSearch} value={searchText} />
              <FilterOutlined className='ml-3 cursor-pointer md:hidden' onClick={() => setOpen((prev) => !prev)} />
            </div>

            <div className='grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {products &&
                products?.length > 0 &&
                products.map((product) => <ProductItem product={product} key={product.id} />)}
              {(isLoading || hasNextPage) && <div ref={lastElementRef} />}
            </div>
          </div>
        </Col>
      </Row>

      <Drawer title='Filter' placement='right' onClose={() => setOpen((prev) => !prev)} open={isOpen}>
        {renderFilter()}
      </Drawer>
    </div>
  );
};

export default HomePage;
