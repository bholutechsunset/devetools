import { useSelector } from 'react-redux'
import type { SelectorType } from '../redux/store'
import { Button, Card } from 'antd'
import { Navigate } from 'react-router-dom'

const ProductDetails = () => {
  const productsSlice = useSelector((res: SelectorType)=>res.productSlice)

  if(!productsSlice.product)
    return <Navigate to="/products" />
    
  return (
    <div className='w-4/12 mx-auto py-16'>
      <Card
        cover={<img src={productsSlice.product?.image} className='h-[350px] object-cover'/>}
      >
        <Card.Meta 
          title={productsSlice.product?.title}
          description={productsSlice.product?.description}
        />
        <Button size='large' type='primary' danger className='!w-full !mt-6'>Checkout now</Button>
      </Card>
    </div>
  )
}

export default ProductDetails