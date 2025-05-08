import FetchProductById from '@/hooks/fetchProductById.hook';
import CreateProductPage from '@/pages/Admin/createProduct';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import Loading from '@/components/ui/Loading';

const EditProduct = () => {
    const { id } = useParams();

    // Fetch Product Data using React Query
    const { data: product, isLoading, error } = FetchProductById(id || "");
    console.log(product)

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <CreateProductPage initialValues={product} />
            )}
        </div>
    );
};

export default EditProduct;
