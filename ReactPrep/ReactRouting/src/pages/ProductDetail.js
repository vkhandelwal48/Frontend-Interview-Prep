import { useParams, Link } from 'react-router-dom';

function ProductDetailPage() {
  const params = useParams();
  return (
    <>
      <h1>The Product Detail Page</h1>
      <p>{params.productId}</p>
      <p><Link to=".." relative="path">Back to Products</Link></p>
    </>
  );
}

export default ProductDetailPage;
