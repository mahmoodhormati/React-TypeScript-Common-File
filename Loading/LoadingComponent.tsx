import './loading.scss';
import { LoadingProps } from './LoadingProps'


const LoadingComponent = ({name}:LoadingProps) => {

    const LoadingMapper=[
        {name:'profile',src:'/AnimationSrc/users.gif'},
        {name:'cart',src:'/AnimationSrc/ShoppingCart.gif'},
        {name:'orders',src:'/AnimationSrc/sales.gif'},
        {name:'invoicepayment',src:'/AnimationSrc/financial.gif'},
        {name:'support',src:'/AnimationSrc/support.gif'},
        {name:'wallets',src:'/AnimationSrc/wallet.gif'},
        {name:'addresses',src:'/AnimationSrc/address.gif'},
        {name:'info',src:'/AnimationSrc/users.gif'},
        {name:'invoices',src:'/AnimationSrc/invoice.gif'},
        {name:'payments',src:'/AnimationSrc/pay.gif'},
        {name:'news',src:'/AnimationSrc/news.gif'},
        {name:'users',src:'/AnimationSrc/users.gif'},
        {name:'sale',src:'/AnimationSrc/sales.gif'},
        {name:'catalog',src:'/AnimationSrc/catalog.gif'},
        {name:'supply',src:'/AnimationSrc/supply.gif'},
        {name:'financial',src:'/AnimationSrc/financial.gif'},
        {name:'logshipping',src:'/AnimationSrc/shipping.gif'},
        {name:'production',src:'/AnimationSrc/production.gif'},
        {name:'setting',src:'/AnimationSrc/setting.gif'},
        {name:'organizations',src:'/AnimationSrc/organization.gif'},
        {name:'usergroups',src:'/AnimationSrc/group.gif'},
        {name:'appusers',src:'/AnimationSrc/users.gif'},
        {name:'customers',src:'/AnimationSrc/customer.gif'},
        {name:'credentialgroups',src:'/AnimationSrc/credit.gif'},
        {name:'productgroups',src:'/AnimationSrc/productGroup.gif'},
        {name:'products',src:'/AnimationSrc/catalog.gif'},
        {name:'productsupplies',src:'/AnimationSrc/productSupplies.gif'},
        {name:'specification',src:'/AnimationSrc/specifics.gif'},
        {name:'categories',src:'/AnimationSrc/categories.gif'},
        {name:'suppliers',src:'/AnimationSrc/suppliers.gif'},
        {name:'supplies',src:'/AnimationSrc/supplies.gif'},
        {name:'warehouses',src:'/AnimationSrc/warehouse.gif'},
        {name:'shippings',src:'/AnimationSrc/shipping.gif'},
        {name:'shippingreports',src:'/AnimationSrc/shippingReport.gif'},
        {name:'shippingcontracts',src:'/AnimationSrc/contract.gif'},
        {name:'shippingcompanies',src:'/AnimationSrc/shippingCompany.gif'},
        {name:'warehousegroups',src:'/AnimationSrc/warehouseGroup.gif'},
        {name:'tickets',src:'/AnimationSrc/ticket.gif'},
        {name:'bkisps',src:'/AnimationSrc/bkisps.gif'},
        {name:'landing',src:'/AnimationSrc/Landing.gif'},
        {name:'/logout',src:'/AnimationSrc/logout.gif'},
        {name:'/login',src:'/AnimationSrc/login.gif'},
        {name:'/admin',src:'/AnimationSrc/admin.gif'},
        {name:'/client',src:'/AnimationSrc/client.gif'},
        {name:'loading',src:'/AnimationSrc/loading.gif'},
        {name:'bkispsshippings',src:'/AnimationSrc/bkishipping.gif'},
        {name:'blog',src:'/AnimationSrc/blog.gif'},
        {name:'manufacturers',src:'/AnimationSrc/manufacturers.gif'},
        {name:'cottages',src:'/AnimationSrc/cottage.gif'},
        {name:'roleaccess',src:'/AnimationSrc/roleaccess.gif'},
        {name:'supplyproducts',src:'/AnimationSrc/catalog.gif'},
        {name:'bank',src:'/AnimationSrc/bank.gif'},
      

    
    
    ]


 
    
  return (
    

    <img className='MyLoading ' src={LoadingMapper.filter((item:any)=>item.name===name).map((item:any)=>item.src)[0]} />

 
  )
}

export default LoadingComponent